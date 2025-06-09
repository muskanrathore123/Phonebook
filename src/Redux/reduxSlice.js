import { createSlice } from "@reduxjs/toolkit";

let phonebookSlice= createSlice({
    name:"phonebook",
    initialState:{
        data:[],
        searchItem:"",
        filter:null
    },
    reducers:{
        contactDetail:(state,action)=>{
        state.data.push(action.payload)            
       },
       
       addContactData:(state,action)=>{
        let {id,data}=action.payload;
        state.data= state.data.map((val)=>(val.id==id?data:val))
       
        // or
    // const idx=state.data.findIndex((val)=>val.id===id)
    // if(idx !==-1){
    //     state.data[idx]=data
    // }
       },

       deleteData:(state,action)=>{
        let{id}=action.payload;
      state.data = state.data.filter((val)=>val.id!==id)
       },

       searchContact:(state,action)=>{
         state.searchItem=action.payload;
       },
       setFilterContact:(state,action)=>{
        state.filter=action.payload
       },

       setBookmark:(state,action)=>{
        let{id,updateBookmark}=action.payload
          let index=state.data.findIndex((val)=>val.id===id)
          if(index!==-1){
            // state.data[index].bookmark=updateBookmark
         var updateData=   {...state.data[index],bookmark:updateBookmark}
          }

          state.data.splice(index,1)

          if(updateBookmark){
            state.data.unshift(updateData);
          }
       },

       setCloseBookmark:(state,action)=>{
        let{id,closeBookmark}=action.payload
          let index=state.data.findIndex((val)=>val.id===id)
          if(index!==-1){
           var updateData={...state.data[index],bookmark:closeBookmark}                       
          }
          state.data.splice(index,1)

          if(!closeBookmark){
            state.data.push(updateData)
          }
       }
    }
})
export const{contactDetail,addContactData,deleteData,searchContact,setFilterContact,setBookmark,setCloseBookmark}=phonebookSlice.actions;
export default phonebookSlice.reducer;