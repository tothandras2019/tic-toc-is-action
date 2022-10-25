import logo from './logo.svg'
// import './App.css';
import './AppMain.css'
import './Reset.css'
import { useState, useContext, useEffect } from 'react'
import { Table } from './components/table/table-component'
import {
  TableSizeContext,
  PartyNamesContext,
  ActualTurnContext,
  WinnerContext,
  ResetContext,
  HelperContext,
} from './components/contexts/opoinment-contexts'
import { Navigation } from './components/navigation/navigation-component'

function App() {
  const { size, setSize } = useContext(TableSizeContext)
  const { parties, setParties } = useContext(PartyNamesContext)
  const { turn, setTurn } = useContext(ActualTurnContext)
  const { winner, setWinner } = useContext(WinnerContext)
  const { setReset } = useContext(ResetContext)
  const { setHelper } = useContext(HelperContext)

  useEffect(() => {
    let timerID = null
    if (winner.red || winner.blue) {
      setSize(0)
      timerID = setTimeout(() => {
        setWinner({ blue: false, red: false })
        setSize(3)
      }, 2500)
    }

    return () => {
      setSize((prev) => size)
      clearTimeout(timerID)
    }
  }, [winner.red, winner.blue])

  return (
    <div className='App'>
      <Navigation />
      <section>
        <div className='message-container'>
          {!(parties.blueName && parties.redName) ? (
            <>
              <h3>Welcome Gamers!</h3>
              <h4>
                Choose table size and set your names! <br />
                Blue starts!
              </h4>
            </>
          ) : (
            <h3>{turn === 'blue' ? parties.blueName : parties.redName} turn!</h3>
          )}
        </div>
        <Table size={size} />
        {winner.red && (
          <div className='winner-message '>
            <h1 className='red'>RED WONN!</h1>
          </div>
        )}
        {winner.blue && (
          <div className='winner-message blue'>
            <h1 className='blue'>BLUE WONN!</h1>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
