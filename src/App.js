import logo from './logo.svg'
// import './App.css';
import './AppMain.css'
import './Reset.css'
import { useState, useContext } from 'react'
import { Table } from './components/table/table-component'
import { TableSizeContext } from './components/contexts/opoinment-contexts'
import { Navigation } from './components/navigation/navigation-component'

function App() {
  const { size, setSize } = useContext(TableSizeContext)

  return (
    <div className='App'>
      <Navigation />
      <section>
        <Table size={size} />
      </section>
    </div>
  )
}

export default App
