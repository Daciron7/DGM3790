import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#556B2F'
    }
}))

const Landing = () => {
    const classes = useStyles()

    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Box className={classes.root}>
            { 
                isAuthenticated ?
            <h1>Welcome to Fun Stuff!</h1>
                    :
            <h1>HOLD UP! You need to register or login to access any data for FunStuff.</h1>
            }
        </Box>
        
    )
}

export default Landing