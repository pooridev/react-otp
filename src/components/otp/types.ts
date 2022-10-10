import { HTMLProps } from 'react'

type HtmlInputProps = Partial<HTMLProps<HTMLInputElement>>

export type OtpProps = Omit<HtmlInputProps, 'onChange'> & {
  fields: number
  onChange: (value: string) => void
}
