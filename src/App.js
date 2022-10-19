import logo from './logo.svg'
// import './App.css';
import './AppMain.css'
import { useState, useContext } from 'react'
import { Table } from './components/table/table-component'
import { OpponentContexts } from './components/contexts/opoinment-contexts'

function App() {
  const size = 4
  return (
    <div className='App'>
      <nav></nav>
      <section>
        <Table size={size} />
      </section>
    </div>
  )
}

export default App
