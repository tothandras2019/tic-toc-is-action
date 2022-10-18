import logo from './logo.svg'
// import './App.css';
import './AppMain.css'
import { Table } from './components/table/table-component'

function App() {
  const size = 5
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
