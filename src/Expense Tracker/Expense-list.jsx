import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ExpenseList(){
    var [data,setdata]=useState([]);
    var navigate=useNavigate();
    useEffect(()=>{
      axios.get('http://localhost:1000/Expense-list').then((res)=>{
        setdata(res.data);
      }).catch((Err)=>{
        console.log("error" ,Err)
      })
    },[])

    const deleteData=(id)=>{
        var conformdata=window.confirm('are you sure ');
        if(conformdata){
        axios.get(`http://localhost:1000/delete/${id}`).then((res)=>{
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);

        })
    }
    }
    return(
        <>
        <div className="container p-5">
            <div className="row">
                <div className="col-md-12 alert alert-danger">
                    <h6>All Expense data here</h6>
                </div>
                <div className="col-md-12">
                      <table className="table table-striped table-bordered">
            <tbody>
                  <tr>
                <th>sr no</th>
                <th>descrption</th>
                <th>date</th>
                <th>amount</th>
                <th>action</th>
            </tr>
            {
                data.map((res)=>{
                   return (
                    <tr>
                       <td>{res.id}</td>
                       <td>{res.descreption}</td>
                       <td>{res.date}</td>
                       <td>{res.amount}</td>
                       <td>
                           <button className="btn btn-danger" onClick={()=>{deleteData(res.id)}} >delete</button>
                           <button className="btn btn-success ms-4" onClick={()=>{UpdateData(res.id)}} >update</button>
                       </td>
                    </tr>)
                })
            }
            {
                data.length==0 &&(
               <tr>
                <td colSpan='5' className="text-center">
                    <h5> no data found</h5>
                </td>
               </tr>
               )
            }
            </tbody>
        </table>

                </div>
            </div>
        </div>
      
        </>
    )};