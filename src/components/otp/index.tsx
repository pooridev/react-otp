import { ChangeEvent, ChangeEventHandler, FC, FocusEvent, KeyboardEvent, memo, useState } from 'react'

import { KEYBOARD_KEYS, OtpProps } from './types'
import { convertStringValueToAValidOtpValue, isValidNumber } from '@utils/functions'
import './style.css'

const OtpField: FC<OtpProps> = props => {
  const { fields = 4, autoFocus = false, onChange, value = '', ...htmlInputProps } = props

  const [values, setValues] = useState<Array<string>>(() => convertStringValueToAValidOtpValue(value, fields))

  const handleChange = (inputIndex: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.trim()

      if (!isValidNumber(newValue) || newValue.length === fields) return

      setValues(prevValues => {
        const newValues = prevValues.map((oldValue, index) => (index === inputIndex ? newValue : oldValue))
        // Prevent concurrent re-rendering
        onChange?.(newValues.join(''))
        return newValues
      })
      if (newValue) focusNext(e.target)
    }
  }

  // Select the input value when user clickes on the input
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.focus()
    e.target.setSelectionRange(0, e.target.value.length)
  }

  const focusNext = (target: HTMLInputElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null
    nextElementSibling?.focus()
  }

  const focusPrev = (target: HTMLInputElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null
    previousElementSibling?.focus()
  }

  // Navigate between inputs using keyboard
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

    if (key === KEYBOARD_KEYS.DELETE && (target as HTMLInputElement).value === '') {
      focusNext(target as HTMLInputElement)
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
          onFocus={handleFocus}
          maxLength={1}
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
