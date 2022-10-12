const convertStringValueToAValidOtpValue = (value: string, fields: number): string[] => {
  const trimmedValueLength = value.split('').length

  // handle empty string case (initial value)
  if (!trimmedValueLength) return Array.from({ length: fields }).fill('') as string[]

  if (trimmedValueLength > fields || trimmedValueLength < fields)
    throw '`value` length should not be greater or smaller than `fields`'

  // convert valid value string into an array of strings
  return value.split('')
}

const isValidNumber = (value: string) => /^[0-9]*$/.test(value)

export { convertStringValueToAValidOtpValue, isValidNumber }
