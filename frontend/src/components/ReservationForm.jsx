import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from '../App'

const ReservationForm = () => {
    const[formData,setFormData]= useState({
        name:'',
        email:'',
        phone:'',
        date: "",
        time:'',
        guest:''
    })

    const handelChanges = (e)=> {
        setFormData({...formData,[e.target.name]: e.target.value })
    }


     const handelSubmit = async (e) => {
      e.preventDefault();

      try{
        await axios.post(`${backendUrl}/api/reservations/create`, formData);

      toast.success('Reservation successfully created!');

        setFormData({ name : "" ,email : "", phone : "", date : "" ,time : "", guest : "1", })

      }catch(error){
          console.log("error making reservation");
      }
     };



    const generateTimeSlots=()=>{
        const slots=[];
        for(let hour=9; hour<=21;hour++){
            const startHour = hour % 12 === 0 ? 12 : hour % 12;
            const startPeriod= hour < 12 ? 'AM' :' PM';

            const endHour = (hour+1) % 12 === 0 ? 12 : (hour + 1) % 12;
            const endPeriod = hour + 1 < 12 ? 'AM' : 'PM';

            slots.push(`${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`)
        }
        return slots;
    }
  return (
    <div  className='flex justify-center items-center min-h-screen bg-gray-100                 '>
       <form  onSubmit={handelSubmit}
       className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'    >
         <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>Book a Reservation</h2>


         <input type='text' placeholder='Full Name'  name='name' value={formData.name}  onChange={handelChanges} required  className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-emerald-300 '/>

         <input type='email' placeholder='Enter Your Email'    name='email' value={formData.email}  onChange={handelChanges} required  className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-emerald-300 '   />

         <input type='tel' placeholder='Enter Mobile Number'   name='phone' value={formData.phone} onChange={handelChanges} required  className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-emerald-300 '   />

         <input type='date' required   name='date' value={formData.date} onChange={handelChanges} className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-emerald-300 ' />

         <select required  name='time'  value={formData.time} onChange={handelChanges} className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-emerald-300 ' >
             <option value=''>Select Time</option> 
             {
                generateTimeSlots().map((slot,index) =>( 
                     <option  key={index} value={slot} >{slot}   </option>
           ))} 
         </select>
         <select required name='guest' value={formData.guest} onChange={handelChanges} className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-emerald-300 ' >
        {
         Array.from(Array(10).keys()).map(i => (
  <option key={i+1} value={i+1}>{i + 1} Guest(s)</option>
))
}
         </select>
         
         <button type='submit' className='w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 transition '>Book NOW</button>
       </form>
    </div>
  )
}

export default ReservationForm
