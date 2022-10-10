import { ChangeEvent, ChangeEventHandler, FC, memo, useState } from 'react'

import { OtpProps } from './types'
import './style.css'
import { convertStringValueToAValidOtpValue, isValidNumber } from '../../utils/functions'

const OtpField: FC<OtpProps> = props => {
  const { fields = 4, autoFocus = false, onChange, value = '', ...htmlInputProps } = props

  const [values, setValues] = useState<Array<string>>(() => convertStringValueToAValidOtpValue(value, fields))

  const handleChange = (inputIndex: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.trim()

      if (!isValidNumber(newValue)) return

      setValues(prevValues => {
        const newValues = prevValues.map((oldValue, index) => (index === inputIndex ? newValue : oldValue))
        // Prevent concurrent re-rendering
        setTimeout(() => onChange?.(newValues.join('')), 0)
        return newValues
      })
      focusNext(e.target)
    }
  }

  const focusNext = (target: HTMLInputElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null
    nextElementSibling?.focus()
  }

  const focusPrev = (target: HTMLInputElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null
    previousElementSibling?.focus()
  }

  return (
    <div className='otp-wrapper'>
      {values.map((_, index) => (
        <input
          {...htmlInputProps}
          key={index}
          inputMode='decimal'
          maxLength={fields}
          className={`otp-input ${htmlInputProps.className}`}
          onChange={handleChange(index)}
          value={values[index]}
          tabIndex={0}
          autoFocus={autoFocus && index === 0}
        />
      ))}
    </div>
  )
}

export default memo(OtpField)
