import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';

import { OtpProps } from './types';
import './style.css';

const OtpField: FC<OtpProps> = props => {
  const { counts = 4, autoFocus = false, onChange, ...htmlInputProps } = props;

  const [values, setValues] = useState(
    Array.from({ length: counts }).fill('') as string[]
  );

  const handleChange = (inputIndex: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setValues(prevValues => {
        const newValue = e.target.value.trim();

        const newValues = prevValues.map((value, index) =>
          index === inputIndex ? newValue : value
        );

        onChange?.(newValues.join(''));

        return newValues;
      });
    };
  };

  return (
    <div className='otp-wrapper'>
      {values.map((_, index) => (
        <input
          className={`otp-input ${htmlInputProps.className}`}
          onChange={handleChange(index)}
          value={values[index]}
        />
      ))}
    </div>
  );
};

export default OtpField;
