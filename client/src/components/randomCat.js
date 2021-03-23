import React from 'react'
//import warshipInfo from './Warship_stuff/warship_info.json'
import '../esports.css'
//import '../contexts/FunStuffContext'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: '#ddd',
    margin: '20px',
    height: 400,
  },
  media: {
    height: 140,
  },
});



const RandomCats = (props) => {
  const classes = useStyles()
  
 

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='kitty'
          image={'https://cdn2.thecatapi.com/images/9du.gif'}
          title={'Kitty'}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
           A random cat
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default RandomCats





