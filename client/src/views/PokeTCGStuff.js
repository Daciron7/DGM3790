import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import _ from 'lodash'
import {
    Container,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    TextField,
    IconButton,
    makeStyles,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Formik } from 'formik'
import * as Yup from 'yup'


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    },
    card: {
        width: 400,
        margin: 20,
      },
      content: {
        display: 'flex',
        justifyContent: 'space-evenly',
      },
}))

const CardList = () => {
    const classes = useStyles()
    const [selectedCard, setSelectedCard] = useState({ title: ''})
    const [cardList, setCardList] = useState([])
    const [debouncedName, setDebouncedName] = useState('')
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    
    const handleInput = (event) => {
      debounce(event.target.value)
    }

    const debounce = useCallback(
      _.debounce((searchVal) => {
          setDebouncedName(searchVal)
      }, 1000),
      [],
    )

    const handleSearch = () => {
      if (debouncedName) {
        setCardList(cardList.filter(card => card.title.includes(debouncedName)))
      } else {
        fetchCards()
      }
    }

    const handleClickEditOpen = (card) => {
      setSelectedCard(card.card)
      setEditOpen(true)
    }

    const handleCloseEdit = () => {
      setEditOpen(false)
    }

    const handleUpdate = async (values) => {
      try {
        const result = await axios.put('/card/update', {
          data: {
            cardId: values.id,
            title: values.title,
            types: values.types,
            hp: values.hp,
            imageUrl: values.imageUrl,
            height: values.height,
            width: values.width,
          },
        })
        if (result.status === 200) {
          fetchCards()
        }
      } catch (err) {
        console.error(err)
      }
    }

    const handleClickDeleteOpen = (card) => {
        setSelectedCard(card.card)
        setDeleteOpen(true)
      }
    
      const handleCloseDelete = () => {
        setDeleteOpen(false)
      }
    
      const handleDelete =  async () => {
        setDeleteOpen(false)
    }

    const fetchCards = async () => {
        try {
          const cards = await axios.get(`/card`)
          setCardList(cards.data)
        } catch (err) {
          console.error(err)
        }
      }
    
      useEffect(() => {
        fetchCards()
      }, [])
    
      return (
        <>
          <form>
            <TextField placeholder='Search' />
            <IconButton aria-label='search'>
              <SearchIcon />
            </IconButton>
            <IconButton aria-label='add cards'>
          <AddCircleIcon/>
            </IconButton>
          </form>
          <Container className={classes.root}>
            {cardList.map((card) => {
              return (
                <Card className={classes.card} key={card.data.id}>
                  <CardMedia
                    component='img'
                    height='300'
                    className={classes.media}
                    image={card.image?.imageUrl}
                    title={card.title}
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card.title}
                    </Typography>
                    <Box className={classes.content}>
                      <Typography variant='subtitle1' color='textSecondary'>
                        Year: {card.year}
                      </Typography>
                      <Typography variant='subtitle1' color='textSecondary'>
                        Rank: {card.rank}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label='edit'>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({card})}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            })}
          </Container>
          <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        aria-labelledby='edit-dialog-title'
      >
        <Formik
          initialValues={{
            title: selectedCard?.title,
            types: selectedCard?.types,
            imageUrl: selectedCard?.image?.imageUrl,
            height: selectedCard?.image?.height,
            width: selectedCard?.image?.width,
            id: selectedCard?.id,
            attacks: selectedCard?.attacks,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string('Enter card title.').required(
              'Card title is required',
            ),
            types: Yup.string('Pokemon types'),
            height: Yup.number('Height'),
            imageUrl: Yup.string('Image URL'),
            width: Yup.number('Width'),
            id: Yup.string('ID').required('ID is required.'),
            attacks: Yup.string('Pokemon attacks'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await handleUpdate(values)
              handleCloseEdit()
            } catch (err) {
              console.error(err)
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit}
              className={classes.dialogContent}
            >
              <DialogTitle id='edit-dialog-title'>Edit Card</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make changes below to the data about this card:
                </DialogContentText>
                <TextField
                  autoFocus
                  id='title'
                  name='title'
                  label='Card Title'
                  type='text'
                  fullWidth
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Box className={classes.content}>
                  <TextField
                    autoFocus
                    id='attacks'
                    name='attacks'
                    label='attacks'
                    type='text'
                    value={values.attacks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.year && errors.year)}
                    helperText={touched.year && errors.year}
                  />
                  <TextField
                    autoFocus
                    name='types'
                    id='types'
                    label='Types'
                    type='text'
                    value={values.types}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.rank && errors.rank)}
                    helperText={touched.rank && errors.rank}
                  />
                </Box>
                <TextField
                  autoFocus
                  id='imageUrl'
                  name='imageUrl'
                  label='Image URL'
                  type='text'
                  fullWidth
                  value={values.imageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.imageUrl && errors.imageUrl)}
                  helperText={touched.imageUrl && errors.imageUrl}
                />
                <Box className={classes.content}>
                  <TextField
                    autoFocus
                    id='height'
                    name='height'
                    label='Height'
                    type='number'
                    value={values.height}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.height && errors.height)}
                    helperText={touched.height && errors.height}
                  />
                  <TextField
                    autoFocus
                    id='width'
                    name='width'
                    label='Width'
                    type='number'
                    value={values.width}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.width && errors.width)}
                    helperText={touched.width && errors.width}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
          <Dialog open={deleteOpen} onClose={handleCloseDelete}>
            <DialogTitle>Delete Card</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this card?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancel</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
        </>
      )
    }
    
    export default CardList

