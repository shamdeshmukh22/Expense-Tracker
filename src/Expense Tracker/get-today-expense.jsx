import axios, { toFormData } from "axios";
import {useState, useEffect } from "react";

export default function GetTodayAllExpense(){
    var[data,setdata]=useState([]);
   
    useEffect(()=>{
      axios.get("http://localhost:1000/get-today-expense").then((res)=>{
        setdata(res.data.data); 
        setTotalAmount(res.data.totalAmount);   
      }).catch((err)=>{
        console.log("error",err);
      }); 
    },[]) 
    var[totalamount,setTotalAmount]=useState(0);
    return(
        <>
        <div className="container-fluid alert alert-primary p-5">
            <div className="row">
                <div className="col-md-12">
                   <a href="/" > <button className="btn btn-dark float-end ">home page</button></a>
                    <table className="w-100 table table-striped table-bordered  ">
            <tr>
                <th>sr no</th>
                <th>description</th>
                <th>date</th>
                <th>payment method</th>
                <th>amount</th>
            </tr>
            <tbody>
            {
                data && data.map((item,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.descreption}</td>
                        <td>{item.date}</td>
                        <td>{item.paymentMethod}</td>
                        <td>{item.amount}</td>
                        
                    </tr>
                    
                ))
            }
            <tr>
                <td colSpan="4">total amount</td>
                <td>{totalamount}</td>         
                   </tr>
            {
                data.length===0 && <tr><td colSpan={5} className="text-center">No expense found for today</td></tr>
            }
            </tbody>

        </table>
                </div>
            </div>
        </div>
        </>
    )
}