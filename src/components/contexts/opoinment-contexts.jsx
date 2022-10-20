import { useState, useContext, createContext } from 'react'

export const OpponentContexts = createContext({
  red: '',
  blue: '',
})

export const OpponentContextsProvider = ({ children }) => {
  const [step, setStep] = useState(null)
  return <OpponentContexts.Provider value={{ step, setStep }}>{children}</OpponentContexts.Provider>
}

export const TableSizeContext = createContext('')
export const TableSizeContextProvider = ({ children }) => {
  const [size, setSize] = useState(3)
  return <TableSizeContext.Provider value={{ size, setSize }}>{children}</TableSizeContext.Provider>
}
