import './App.css'
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import { PinDropSharp } from '@material-ui/icons'
import Reset from '@material-ui/icons/Restore'
import Header from './components/Header.js'
import {
  TextField,
  Container,
  Box,
  CardContent,
  Card,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
const dashboardRoutes = ['']
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))
function App () {
  const [taskList, setTaskList] = React.useState([])
  const [textValue, setTextValue] = React.useState('')
  const classes = useStyles()
  const addTask = () => {
    setTaskList(taskList => [...taskList, textValue])
  }
  const removeTask = task => {
    setTaskList(taskList.filter(t => t != task))
  }
  const updateTask = (oldTask, newTask) => {
    setTaskList([
      ...taskList.slice(0, taskList.indexOf(oldTask)),
      newTask,
      ...taskList.slice(taskList.indexOf(oldTask) + 1)
    ])
  }

  //const handleChange=(e)=>setTextValue(e.target.value);

  return (
    <div className="App">
      <Header
        color='primary'
        routes={dashboardRoutes}
        brand='The ultimate To Do List'
        changeColorOnScroll={{
          height: 200,
          color: 'white'
        }}
      />
      <Grid container  spacing={2} justify="center" alignItems="center">
          <Grid item>
            <TextField
              id='task'
              label='Add Task'
              multiline
              value={textValue}
              rowsMax={4}
              variant="outlined"
              size="medium"
              onChange={e => setTextValue(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              id='btn'
              onClick={addTask}
              variant='contained'
              color='primary'
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
        <Grid className='App' container spacing={2} justify="center">
          <Grid >
            <List className={classes.center}>
              {taskList.map(item => (
                <Item update={updateTask} remove={removeTask} value={item} />
              ))}
            </List>
          </Grid>
        </Grid>
    </div>
  )
}

function Item (props) {
  const startval = props.value
  const [val, setVal] = React.useState(props.value)
  const classes = useStyles()
  const [editMode, setEditMode] = React.useState(false)
  const handleDelete = () => props.remove(val)
  const handleUpdate = () => {
    props.update(startval, val)
    setEditMode(false)
  }
  return (
    <ListItem className='list' key={props.value}>
      <TextField
      rowsMax={4}
        disabled={!editMode}
        onChange={e => {
          setVal(e.target.value)
        }}
        value={props.value}
      />
      <IconButton
        aria-label='delete'
        className={classes.margin}
        onClick={handleDelete}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
      {editMode ? (
        <IconButton
          aria-label='save'
          className={classes.margin}
          onClick={handleUpdate}
        >
          <SaveIcon fontSize='small' />
        </IconButton>
      ) : null}
      <IconButton
        aria-label='edit'
        className={classes.margin}
        onClick={() => setEditMode(!editMode)}
      >
        <EditIcon fontSize='small' />
      </IconButton>
    </ListItem>
  )
}
export default App
