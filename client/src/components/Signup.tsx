import { useCallback, useState } from 'react'
import { Typography, Box, Card, CardContent, CardActions, Button, TextField, Grid, Autocomplete,InputAdornment,IconButton } from '@mui/material'
import {Visibility,VisibilityOff } from '@mui/icons-material' 

const Signup = () => {
    // Default Values
    const options = [
        { id: 1, label: 'Admin' },
        { id: 2, label: 'User' },
    ]

    // States

    const [showPassword, setShowPassword] = useState(false);
    const [cshowPassword, setCShowPassword] = useState(false);

    const handleClickShowPassword = useCallback((name : string) => () => {
        console.log(name)
        name == 'password' ? setShowPassword((show) => !show) : setCShowPassword((show) => !show);
    }, [])

    return (
        <>
            <Box>
                <Card sx={{ maxWidth: 800 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', mt: 2 }}>SIGNUP</Typography>
                    <CardContent>
                        <Grid container spacing={8} >
                            <Grid item xs={6}>
                                <TextField fullWidth label="Name" variant="standard" placeholder='Enter name' />
                                <Autocomplete
                                    disablePortal
                                    options={options}
                                    renderInput={(params: any) => <TextField {...params} label="Role" variant="standard" />}
                                />
                                <TextField fullWidth name='password' label="Password" variant="standard" placeholder='Enter password' type={showPassword ? 'text' : 'password' }
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword('password')}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                  }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Age" variant="standard" placeholder='Enter age' type='number' InputProps={{
                                    maxLength: 2,
                                }} />
                                <TextField fullWidth label="Email" variant="standard" placeholder='Enter email' />
                                <TextField fullWidth name='cpassword' label="Confirm Password" variant="standard" placeholder='Enter password again' type={cshowPassword ? 'text' : 'password' }
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword('cpassword')}
                                        >
                                            {cshowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                  }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    {/* <CardActions>
        <Button size="small">Submit</Button>
        </CardActions> */}
                </Card>
            </Box>
        </>
    )
}

export default Signup;