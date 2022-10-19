import { useState, useContext, createContext } from 'react'

export const OpponentContexts = createContext({
  red: '',
  blue: '',
})

export const OpponentContextsProvider = ({ children }) => {
  const [step, setStep] = useState(null)
  return <OpponentContexts.Provider value={{ step, setStep }}>{children}</OpponentContexts.Provider>
}
