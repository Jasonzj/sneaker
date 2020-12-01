import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// components
import Input from '../../components/Input'
import Button from '../../components/Button'

// interface
import { RegisterResType, RegisterReqType, RegisterFormData } from './type'

// css
import style from '../../styles/sign.module.css'

// api hooks
import useRequire from '../../hooks/useRequire'
import { RegisterLoader } from '../../utils/api'

// config
import config from '../../utils/config'
import { usernameRules, passwordRules } from '../../utils/rules'

const SignUp: React.FC = () => {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm<RegisterFormData>({ mode: 'onChange' })
  const { run, loading } = useRequire<RegisterResType, RegisterReqType>({
    apiLoader: RegisterLoader,
    manual: true,
    defaultData: {} as RegisterResType,
    loadingInitialState: false,
  })

  const onSubmit = async (data: RegisterReqType) => {
    const user = await run(data)
    if (user) {
      history.push(config.openPages[0])
    }
  }

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.title}>
          <Link to='/sign_in'>Sign In</Link>
          <b>·</b>
          <Link to='/sign_up' className={style.active}>
            Sign Up
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <Input
            type='text'
            name='username'
            register={register}
            errors={errors}
            rules={usernameRules}
            placeholder='username'
          />
          <Input
            type='password'
            name='password'
            register={register}
            errors={errors}
            rules={passwordRules}
            placeholder='password'
          />
          <Button text='Register' type='submit' loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default SignUp
