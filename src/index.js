import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  OpponentContextsProvider,
  TableSizeContextProvider,
  PartyNamesContextProvider,
  ActualTurnContextProvider,
  WinnerContextProvider,
  SameInALineContextProvider,
  ResetContextProvider,
  HelperContextProvider,
} from './components/contexts/opoinment-contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ResetContextProvider>
      <HelperContextProvider>
        <SameInALineContextProvider>
          <WinnerContextProvider>
            <ActualTurnContextProvider>
              <PartyNamesContextProvider>
                <TableSizeContextProvider>
                  <OpponentContextsProvider>
                    <App />
                  </OpponentContextsProvider>
                </TableSizeContextProvider>
              </PartyNamesContextProvider>
            </ActualTurnContextProvider>
          </WinnerContextProvider>
        </SameInALineContextProvider>
      </HelperContextProvider>
    </ResetContextProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
