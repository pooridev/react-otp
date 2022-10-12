import { useState } from 'react'

import OtpField from './components/otp'
import './app.css'

function App() {
  const [value, setValue] = useState('')

  return (
    <div className='App'>
      <h1>React OTP Input</h1>
      <OtpField fields={5} value={value} onChange={newValue => setValue(newValue)} />
    </div>
  )
}

export default App
