import { toast } from 'react-toastify'

const convertStringValueToAValidOtpValue = (value: string, fields: number): string[] => {
  const trimmedValueLength = value.split('').length

  // handle empty string case (initial value)
  if (!trimmedValueLength) return Array.from({ length: fields }).fill('') as string[]

  if (trimmedValueLength > fields || trimmedValueLength < fields) {
    toast.error('`value` length should not be greater or smaller than `fields`', {
      autoClose: 8000,
      type: 'warning',
      role: 'popover',
      theme: 'dark',
      hideProgressBar: true,
    })
  }

  // convert valid value string into an array of strings
  return value.split('')
}

const isValidNumber = (value: string) => /^[0-9]*$/.test(value)

export { convertStringValueToAValidOtpValue, isValidNumber }
