import './navigation-component.css'
import { useEffect, useState, useContext } from 'react'
import { TableSizeContext } from './../contexts/opoinment-contexts.jsx'
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
  const [blueName, setBlueName] = useState(null)
  const [redName, setRedName] = useState(null)
  const [tableSize, setTableSize] = useState('')
  const { size, setSize } = useContext(TableSizeContext)

  useEffect(() => {
    if (!(blueName || redName)) return
    return () => {}
  }, [blueName, redName])

  useEffect(() => {
    if (!tableSize) return
    setSize(() => tableSize)
    return () => {}
  }, [tableSize])

  const handleChange = (event) => {
    const size = event.target.value
    setTableSize(size)
  }

  return (
    <nav>
      <h1>Tic-Toc</h1>
      <div className='user-menu-item'>
        <Box component='form' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }} noValidate autoComplete='off'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Size</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
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
              onChange={handleChange}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='input-with-icon-textfield'
            label='Blue party name'
            onChange={(event) => setBlueName(() => event.target.value)}
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
            onChange={(event) => setRedName(() => event.target.value)}
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
