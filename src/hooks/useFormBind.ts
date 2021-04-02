import { useState, FormEvent, useCallback } from 'react'

type HTMLGeneralFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement

export type BindFormType = { value: string; onChange: (e: FormEvent<HTMLGeneralFormElement>) => void }

type useFormBindReturnType = [BindFormType, string, React.Dispatch<React.SetStateAction<string>>]

const useFormBind = (initialValue = ''): useFormBindReturnType => {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: FormEvent<HTMLGeneralFormElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  return [{ value, onChange }, value, setValue]
}

export default useFormBind
