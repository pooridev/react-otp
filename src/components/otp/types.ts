import { HTMLProps } from 'react'

type HtmlInputProps = Partial<HTMLProps<HTMLInputElement>>

export type OtpProps = Omit<HtmlInputProps, 'onChange' | 'value' | 'onPaste' | 'onKeyDown' | 'onFocus'> & {
  fields: number
  onChange: (value: string) => void
  value: string
}
