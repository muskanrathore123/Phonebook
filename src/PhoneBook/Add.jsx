import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { contactDetail } from '../Redux/reduxSlice';




function SimpleDialog(props) {
    let [user,setUser]=useState({id:'',name:'',phone_num:'',address:'',select:''})
    let dispatch=useDispatch();

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

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

  return (
    <Dialog onClose={handleClose} open={open}  PaperProps={{
    sx: {
      width: '600px',
      maxWidth: '90%',
      padding: 2,
    },
  }}>
      <DialogTitle>Add Contact</DialogTitle>
     <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="outlined-basic" required label="Name" name='name' value={user.name} onChange={change}/>
          </Typography>
           <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="outlined-basic"required label="Phone Number" type='number' variant="outlined" name='phone_num' value={user.phone_num} onChange={change} />
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
          
         
        >
          <MenuItem value="" defaultValue='select here'>
            <em>select here</em>
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
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
          Add Contact  
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}




