import './App.css';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { PinDropSharp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
function App() {
  const [taskList, setTaskList] = React.useState([]);

  const addTask=()=>{
    setTaskList(taskList=>[...taskList,document.getElementById('task').value]);
  };

  const removeTask=(task)=>{
    setTaskList(taskList.filter(t => t != task));
  };
  const updateTask=(oldTask,newTask)=>{
    setTaskList([...taskList.slice(0,taskList.indexOf(oldTask)),newTask,...taskList.slice(taskList.indexOf(oldTask)+1)]);
  }

  // React.useEffect(() => {
  //   console.log('item added');
  // }, [taskList]);
  
  return (
    <div className="App">
      <textarea id="task" name="task" />
      <button id="btn" onClick={addTask}> Add new Task</button>
      { taskList.map(item => <Item update={updateTask} remove={removeTask} value={item}/>)}
    </div>
  );
}

function Item(props){
  const startval = props.value;
  const [val,setVal] = React.useState(props.value);
  const classes = useStyles();
  const [editMode, setEditMode] = React.useState(false);
  const handleDelete=()=>props.remove(val);
  const handleUpdate=()=>{
    props.update(startval,val);
    setEditMode(false);
  };
  return (
    <div className="list" key={props.value}>
      <textarea disabled={!editMode} onChange={(e)=>{setVal(e.target.value)}}>{props.value}</textarea>
      <IconButton aria-label="delete" className={classes.margin} onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        {editMode?<IconButton aria-label="save" className={classes.margin} onClick={handleUpdate}>
          <SaveIcon fontSize="small" />
        </IconButton>: null}
        <IconButton aria-label="edit" className={classes.margin} onClick={()=>setEditMode(!editMode)}>
          <EditIcon fontSize="small" />
        </IconButton>
    </div>
  );
}

export default App;
