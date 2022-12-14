import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';

import Button from '@mui/material/Button';

import BookingRegistrationForm from '../layouts/BookingRegistrationForm';
import PopUp from '../layouts/PopUp';
import {GetSelectList} from "../services/UserServices";

const Home = () => {

  let {uhid,name} = useParams();

    const BtnStyle={backgroundColor:'#874563'}

    const [open,setOpen] =useState(false);

    const [state, setState] = useState({
      loading:false,
      results:{},
      errorMessage:'',
    });
    const handleClickOpen =()=>{
        setOpen(true)
    }

    useEffect(() => {

      const FetchData= async () => {
        console.log('##############')
        try {
              const response =  await GetSelectList();
              setState({
                  ...state,
                  loading:false,
                  results:response,
                
              }) ;
        } 
        catch (error) {
          const _error =
          (error.response &&
            error.response.data &&
              error.response.data.message) ||
                error.message ||
                  error.toString();
          setState({
            ...state,
            loading:false,
            errorMessage:_error
          }) ;
        }
        finally {
          console.log("The END");
        }
      };
      FetchData();
    },[])

    let { loading,results,errorMessage}=state;

  return (   
    <div>
        <Button variant="contained" onClick={handleClickOpen} style={BtnStyle}>Click</Button>
        <PopUp openPopUp={open} setOpen={setOpen}>
            <BookingRegistrationForm uhid={uhid} EpId={name} results={results}/>
        </PopUp>
    </div>
  )
}

export default Home