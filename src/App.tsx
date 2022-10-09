import { useState } from 'react';

import OtpField from './components/otp';
import './app.css';

function App() {
  const [value, setValue] = useState('');

  return (
    <div className='App'>
      <OtpField
        value={value}
        onChange={value => {
          console.log(value);
        }}
        counts={4}
      />
    </div>
  );
}

export default App;
