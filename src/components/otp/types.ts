import { HTMLProps } from 'react'

type HtmlInputProps = Partial<HTMLProps<HTMLInputElement>>

export type OtpProps = Omit<HtmlInputProps, 'onChange'> & {
  counts?: number
  onChange: (value: string) => void
}
