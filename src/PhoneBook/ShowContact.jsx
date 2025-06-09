import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { MdDelete } from "react-icons/md";
import { addContactData } from '../Redux/reduxSlice';
import { useDispatch } from 'react-redux';
import { deleteData } from '../Redux/reduxSlice';
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { IoBookmarkOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { setBookmark ,setCloseBookmark} from '../Redux/reduxSlice';

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
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let {data,searchItem,filter}=useSelector((state)=>state.contact)
  let [obj,setObj]=useState(null)
  let [editData,setEditData]=useState({})
  let [editId,setEditId]  =useState(null)
const [open, setOpen] = React.useState(false);
  let dispatch=useDispatch()

  
console.log(data);

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  function handleEdit(id ,row){    
    setEditId(id)
    setEditData({...row})

  }

  const filterData=searchItem?( 
    data.filter((val)=>(
      val.name.toLowerCase().includes(searchItem.toLowerCase())
    ))
  ):filter?(
    [...data].sort((a,b)=>a.name>b.name?1:-1)
  ):data;


 function handleChange(e){
  setEditData({...editData,[e.target.name]:e.target.value})
  
 }

  function handleSave(e){
      e.preventDefault();
     dispatch(addContactData({id:editId, data:editData}));
          setEditId(null);    
  }

  function handleDelete(id){    
    dispatch(deleteData({id}))
  }

  function showUserData(data){
    setObj(data);    
  setOpen(true);  
  }


  function handleOpenBookmark(id,bookmark){
      let updateBookmark=!bookmark;
     dispatch(setBookmark({id,updateBookmark}))
               
    }

    function handleCloseBookmark(id,bookmark){
      let closeBookmark=!bookmark;      
        dispatch(setCloseBookmark({id,closeBookmark}))
    }

  return (
    <Paper sx={{ width: '50%', overflow: 'hidden',  margin:'auto', marginTop:'50px'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
             <TableCell style={{fontSize:'20px'}}>Name</TableCell>
            <TableCell style={{fontSize:'20px'}}>Phone Number</TableCell>   
            <TableCell><span>contact({filterData.length})</span></TableCell>   
            </TableRow>
          </TableHead>

          <TableBody>
            {filterData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isEditing=editId===row.id
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      
                      {
                        isEditing?(
                         <>
                          <TableCell>
                          <TextField
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="phone_num"
                            value={editData.phone_num}
                            onChange={handleChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <button onClick={handleSave}>Save</button>
                        </TableCell>  
                         </>
                          
                        ):(
                          <>
                           <TableCell component="th" scope="row" style={{fontSize:'20px'}} onClick={()=>showUserData(row)}>
                                    {row.name} 
                                  </TableCell>
                                  <TableCell style={{ width: 160 ,fontSize:'20px'}} align="right">
                                      {row.phone_num}
                                    </TableCell>      
                                    <TableCell>
                                      <MdEdit onClick={()=>handleEdit(row.id,row)} style={{width:'30px',height:'30px'}}/>
                                      </TableCell>
                                      <TableCell>
                                        {
                                            row.bookmark?(
                                            <FaBookmark style={{width:'30px',height:'30px'}} onClick={()=>handleCloseBookmark(row.id,row.bookmark)}/> 
                                          ):(
                                             <IoBookmarkOutline style={{width:'30px',height:'30px'}} onClick={()=>handleOpenBookmark(row.id,row.bookmark)}/>
                                          )
                                        }
                                      </TableCell>
                                      <TableCell>
                                      <MdDelete onClick={()=>handleDelete(row.id)}  style={{width:'30px',height:'30px'}}/>
                            </TableCell>                               
                          </>
                        )                    
                      }                                          
                  </TableRow>     
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

{/* after name clicking  dialoge box open */}
      {
        open?(
      <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="user-dialog-title"
  PaperProps={{
    sx: {
      width: '500px',
      maxWidth: '90%',
      padding: 2,
    },
  }}
>
  <DialogTitle id="user-dialog-title">
    Contact Details
  </DialogTitle>
  <DialogContent>
    {obj && (
      <DialogContentText>
        <Typography variant='h3'>Name: {obj.name}</Typography> <br />
        <Typography variant='h6'>Phone Number:{obj.phone_num}</Typography> 
      <Typography variant='h6'>Address:{obj.address}</Typography> 
      <Typography variant='h6'>Select:{obj.select}</Typography> 
      </DialogContentText>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
</Dialog>
        ):""
      }
    </Paper>
  );
}

