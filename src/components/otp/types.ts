import { HTMLProps } from 'react'

type HtmlInputProps = Partial<HTMLProps<HTMLInputElement>>

export type OtpProps = Omit<HtmlInputProps, 'onChange' | 'value' | 'onPaste' | 'onKeyDown' | 'onFocus'> & {
  fields: number
  onChange: (value: string) => void
  value: string
}

export enum KEYBOARD_KEYS {
  TAB = 'Tab',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_LEFT = 'ArrowLeft',
  BACK_SPACE = 'Backspace',
}
