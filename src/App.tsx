import { useState } from 'react'

import OtpField from './components/otp'
import './app.css'

function App() {
  const [value, setValue] = useState('')

  return (
    <div className='App'>
      <OtpField
        fields={5}
        value={value}
        onChange={value => {
          setValue(value)
        }}
      />
    </div>
  )
}

export default App
