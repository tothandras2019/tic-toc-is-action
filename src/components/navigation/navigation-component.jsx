import './navigation-component.css'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

export const Navigation = () => {
  const [blueName, setBlueName] = useState(null)
  const [redName, setRedName] = useState(null)

  useEffect(() => {
    if (!(blueName || redName)) return
    console.log(blueName, redName)
    return () => {}
  }, [blueName, redName])

  return (
    <nav>
      <h1>Tic-Toc</h1>
      <div className='user-menu-item'>
        <Box component='form' sx={{ '& > :not(style)': { m: 1, width: '19ch' } }} noValidate autoComplete='off'>
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
