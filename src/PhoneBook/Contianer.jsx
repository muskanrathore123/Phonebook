import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import  './container.css'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { BiFilterAlt } from "react-icons/bi";
import StickyHeadTable from './ShowContact';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { searchContact } from '../Redux/reduxSlice';
import { useDispatch } from 'react-redux';
import { setFilterContact} from '../Redux/reduxSlice';
import SimpleDialogDemo from './Add';


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



function Contianer() {
let [opendetail,setOpenDetail]=useState(false);
let[search,setSearch]=useState("")
let[searchData,setSearchData]=useState(null)
let [filter,setFilter]=useState(false)

let dispatch=useDispatch()
    let {data}=useSelector((state)=>state.contact)
    
    
    function addContact(){
        setOpenDetail(!opendetail)     
    }

    
    
      function handleSearch(e){
      setSearchData(e.target.value)
      dispatch(searchContact(e.target.value))
      }

      function handleFilter(){
          setFilter(!filter)
            dispatch(setFilterContact(filter))
      }
   

  return (
   <React.Fragment>
        <Box sx={{width:"100vw",height:"100vh", padding:'0',margin:'0', bgcolor: '#F2F9FE',justifyContent:"center" }} > 
           <div className='header'>
            <div style={{display:"flex", gap:"10px", marginTop:"10px"}}>
 <Avatar
            sx={{ bgcolor: deepOrange[500] ,marginTop:"10px" }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
            >
            P
            </Avatar>
            <p>PhoneBook</p>
            </div>
           
            <Search style={{marginTop:"10px"}}>
            <SearchIconWrapper>
            </SearchIconWrapper>
        <TextField id="outlined-basic" label="Search" variant="outlined"  onChange={handleSearch}></TextField>
          </Search>
           <div style={{display:"flex", gap:"10px" ,marginTop:"10px"}}>
             <BiFilterAlt style={{width:"45px", height:'45px'}} onClick={handleFilter}
             />
        
    <SimpleDialogDemo/>
           </div>
           </div>
           <StickyHeadTable/>
        </Box>
       
    </React.Fragment>
  )
}

export default Contianer
