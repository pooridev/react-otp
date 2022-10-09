import { HTMLProps } from 'react';

export type OtpProps = Omit<
  Partial<HTMLProps<HTMLInputElement>>,
  'onChange'
> & {
  counts?: number;
  onChange: (value: string) => void;
};
