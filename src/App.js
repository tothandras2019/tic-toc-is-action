import logo from './logo.svg'
// import './App.css';
import './AppMain.css'
import './Reset.css'
import { useState, useContext } from 'react'
import { Table } from './components/table/table-component'
import { TableSizeContext, PartyNamesContext, ActualTurnContext } from './components/contexts/opoinment-contexts'
import { Navigation } from './components/navigation/navigation-component'

function App() {
  const { size, setSize } = useContext(TableSizeContext)
  const { parties, setParties } = useContext(PartyNamesContext)
  const { turn, setTurn } = useContext(ActualTurnContext)

  return (
    <div className='App'>
      <Navigation />
      <section>
        <div>
          {!(parties.blueName && parties.redName) ? (
            <>
              <h3>Welcome Gamers!</h3>
              <h4>
                Choose table size and set your names! <br />
                Blue start!
              </h4>
            </>
          ) : (
            <h3>{turn === 'blue' ? parties.blueName : parties.redName} turn!</h3>
          )}
        </div>
        <Table size={size} />
      </section>
    </div>
  )
}

export default App
