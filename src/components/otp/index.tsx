import { ChangeEvent, ChangeEventHandler, FC, KeyboardEvent, memo, useState } from 'react'

import { KEYBOARD_KEYS, OtpProps } from './types'
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e

    if (key === KEYBOARD_KEYS.ARROW_RIGHT) {
      e.preventDefault()
      focusNext(target as HTMLInputElement)
    }

    if (key === KEYBOARD_KEYS.ARROW_LEFT) {
      e.preventDefault()
      focusPrev(target as HTMLInputElement)
    }

    if (key === KEYBOARD_KEYS.BACK_SPACE && (target as HTMLInputElement).value === '') {
      focusPrev(target as HTMLInputElement)
    }
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
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  )
}

export default memo(OtpField)
