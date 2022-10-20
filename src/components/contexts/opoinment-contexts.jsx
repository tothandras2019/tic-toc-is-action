import { useState, useContext, createContext } from 'react'

export const OpponentContexts = createContext({
  red: '',
  blue: '',
})

export const OpponentContextsProvider = ({ children }) => {
  const [step, setStep] = useState(null)
  return <OpponentContexts.Provider value={{ step, setStep }}>{children}</OpponentContexts.Provider>
}

export const ActualTurnContext = createContext('blue')
export const ActualTurnContextProvider = ({ children }) => {
  const [turn, setTurn] = useState('blue')
  return <ActualTurnContext.Provider value={{ turn, setTurn }}>{children}</ActualTurnContext.Provider>
}

export const TableSizeContext = createContext('')
export const TableSizeContextProvider = ({ children }) => {
  const [size, setSize] = useState(3)
  return <TableSizeContext.Provider value={{ size, setSize }}>{children}</TableSizeContext.Provider>
}

export const PartyNamesContext = createContext({
  blueName: '',
  redName: '',
})
export const PartyNamesContextProvider = ({ children }) => {
  const [parties, setParties] = useState({
    blueName: '',
    redName: '',
  })
  return <PartyNamesContext.Provider value={{ parties, setParties }}>{children}</PartyNamesContext.Provider>
}
