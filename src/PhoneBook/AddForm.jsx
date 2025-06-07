import React,{ useState }  from 'react'
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { contactDetail } from '../Redux/reduxSlice';
import { RxCross1 } from "react-icons/rx";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function AddForm() {
let [user,setUser]=useState({id:'',name:'',phone_num:'',address:'',select:''})
let dispatch=useDispatch();
     function change(e){
            setUser({...user,[e.target.name]:e.target.value})
                    
        }
       
        function submit(e){
           e.preventDefault();
           if(user.name==='' && user.address==="" && user.phone_num===""&& user.select===""){
            return;
           }
           const newUser = {
         ...user,
             id: Date.now().toString(),  
  };
          dispatch(contactDetail(newUser))
           console.log(user);    
           setUser({id:'',name:'',phone_num:'',address:'',select:''})
        }

        function handleClose(){
          console.log(setOpenDetail);
        }
    
  return (
    <div>
      <Box sx={style}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
      <Typography variant="h5" gutterBottom>
        Add Contact
      </Typography>
      <Typography>
        <RxCross1 onClick={handleClose} style={{height:'40px',width:'40px'}}/>
      </Typography>
        </div>
         
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="outlined-basic" required label="Name" name='name' value={user.name} onChange={change}/>
          </Typography>
           <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="outlined-basic"required label="Phone Number" variant="outlined" name='phone_num' value={user.phone_num} onChange={change} />
          </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="outlined-basic" label="Address" required variant="outlined" name='address' value={user.address} onChange={change}/>
          </Typography>
           <InputLabel id="demo-simple-select-helper-label" required >Select</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          name='select'
          value={user.select}
          label="Select"
          onChange={change}
          placeholder='select one'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Work'}>work</MenuItem>
          <MenuItem value={'School'}>School</MenuItem>
          <MenuItem value={'Friend'}>Friend</MenuItem>
          <MenuItem value={'Family'}>Family</MenuItem>

        </Select>
        <Typography id="button" >
              <Button variant="outlined" onClick={submit} color="error">
        Add Contact
      </Button>
      </Typography>
      </Box>
    </div>
  )
}

export default AddForm;