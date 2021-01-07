import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// components
import Input from '../../components/Input'
import Button from '../../components/Button'

// interface
import { LoginResType, LoginReqType, LoginFormData } from './type'

// css
import style from '../../styles/sign.module.css'

// api hooks
import useRequire from '../../hooks/useRequire'
import { LoginLoader } from '../../apis'

// config
import config from '../../utils/config'
import { usernameRules, passwordRules } from '../../utils/rules'

const SignIn: React.FC = () => {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm<LoginFormData>({ mode: 'onChange' })
  const { run, loading } = useRequire<LoginResType, LoginReqType>({
    apiLoader: LoginLoader,
    manual: true,
    defaultData: {} as LoginResType,
    loadingInitialState: false,
  })

  const onSubmit = async (data: LoginReqType) => {
    const user = await run(data)
    if (user) {
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('name', user.username)
      history.push(config.homePage)
    }
  }

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.title}>
          <Link to='/sign_in' className={style.active}>
            Sign In
          </Link>
          <b>·</b>
          <Link to='/sign_up'>Sign Up</Link>
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
          <Button text='Login In' type='submit' loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default SignIn
