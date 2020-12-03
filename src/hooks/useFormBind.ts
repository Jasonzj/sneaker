import { useState, FormEvent, useCallback } from 'react'

type HTMLGeneralFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement

type useFormBindReturnType = [
  { value: string; onChange: (e: FormEvent<HTMLGeneralFormElement>) => void },
  string,
  React.Dispatch<React.SetStateAction<string>>,
]

const useInput = (initialValue = ''): useFormBindReturnType => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback((e: FormEvent<HTMLGeneralFormElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  return [{ value, onChange }, value, setValue]
}

export default useInput
