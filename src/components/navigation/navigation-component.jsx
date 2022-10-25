import './navigation-component.css'
import { useEffect, useState, useContext } from 'react'
import { TableSizeContext, PartyNamesContext, SameInALineContext } from './../contexts/opoinment-contexts.jsx'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export const Navigation = () => {
  const [blueNameInput, setBlueNameInput] = useState(null)
  const [redNameInput, setRedNameInput] = useState(null)
  const [tableSize, setTableSize] = useState('')
  const [winnerLane, setWinnerLane] = useState('')

  const { setSize } = useContext(TableSizeContext)
  const { parties, setParties } = useContext(PartyNamesContext)
  const { setSameInALine } = useContext(SameInALineContext)

  useEffect(() => {
    if (!(blueNameInput || redNameInput)) return
    setParties(() => ({
      blueName: blueNameInput,
      redName: redNameInput,
    }))

    return () => {}
  }, [blueNameInput, redNameInput])

  useEffect(() => {
    if (!tableSize) return
    setSize(() => tableSize)
    return () => {}
  }, [tableSize])

  useEffect(() => {
    if (!winnerLane) return
    setSameInALine(winnerLane)
    return () => {}
  }, [winnerLane])

  const handleSetTableSize = (event) => {
    const sizeFromInput = event.target.value
    setTableSize(sizeFromInput)
  }

  const handleSetWinnCondition = (event) => {
    const lineToWinnNo = parseInt(event.target.value)

    setWinnerLane(lineToWinnNo)
  }

  return (
    <nav>
      <h1>Tic-Toc</h1>
      <div className='user-menu-item'>
        <Box component='form' sx={{ '& > :not(style)': { m: 1, width: '30ch' } }} noValidate autoComplete='off'>
          <FormControl fullWidth>
            <InputLabel id='same-line-label'>Same in one line</InputLabel>
            <Select
              labelId='same-line-label'
              id='same-line-label-select'
              value={winnerLane}
              sx={{
                minWidth: '200px',
                backgroundColor: '#154066;',
                input: { color: 'white' },
                label: {
                  before: { width: '50px' },
                  color: '#184fbd',
                  fontWeight: '700',
                  fontSize: '20px',
                  '&.Mui-focused': {
                    color: '#184fbd',
                  },
                },
                fontSize: '10',
              }}
              label='Same in one line'
              onChange={handleSetWinnCondition}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='table-size'>Size</InputLabel>
            <Select
              labelId='table-size'
              id='table-size-select'
              value={tableSize}
              sx={{
                backgroundColor: '#154066;',
                input: { color: 'white' },
                label: {
                  color: '#184fbd',
                  fontWeight: '700',
                  fontSize: '20px',
                  '&.Mui-focused': {
                    color: '#184fbd',
                  },
                },
                fontSize: '10',
              }}
              label='Size'
              onChange={handleSetTableSize}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='input-with-icon-textfield'
            label='Blue party name'
            onChange={(event) => setBlueNameInput(() => event.target.value)}
            sx={{
              backgroundColor: '#154066;',
              input: { color: 'white' },
              label: {
                color: '#184fbd',
                fontWeight: '700',
                fontSize: '20px',
                '&.Mui-focused': {
                  color: '#184fbd',
                },
              },
              fontSize: '10',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle sx={{ color: '#184fbd', mr: 1, my: 0.5 }} />
                </InputAdornment>
              ),
            }}
            variant='standard'
          />
          <TextField
            id='input-with-icon-textfield'
            label='Red party name'
            onChange={(event) => setRedNameInput(() => event.target.value)}
            sx={{
              backgroundColor: '#154066;',
              input: { color: 'white' },
              label: {
                color: '#ae3232',
                fontWeight: '700',
                fontSize: '20px',
                '&.Mui-focused': {
                  color: '#ae3232',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle sx={{ color: '#ae3232', mr: 1, my: 0.5 }} />
                </InputAdornment>
              ),
            }}
            variant='standard'
          />
        </Box>
      </div>
    </nav>
  )
}
