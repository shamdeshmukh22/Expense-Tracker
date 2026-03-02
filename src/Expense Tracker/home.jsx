import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    var [data,setdata]=useState({
        totalEaring:0,
        totalExpense:0,
       
});
var navigate=useNavigate();
var [expense,setexpense]=useState({
    descreption:"",
    date:"",
    paymentMethod:"",
    amount:0
});
var [todayTotalTransaction,setTodayTotalTransaction]=useState(0);

var savedata=async(e)=>{
    e.preventDefault();
    console.log("expense",expense);
    axios.post("http://localhost:1000/save-expense",expense).then((res)=>{
       
        setexpense({
            descreption:"",
            date:"",
            paymentMethod:"",
            amount:0
        })
        location.href="/";

    }).catch((err)=>{
       console.log("error",err)
    });
}
useEffect(()=>{
    axios.get("http://localhost:1000/getEarning").then((res)=>{
           setdata((p)=>({
            ...p,
             totalEaring: res.data.totalEaring
           }));
    }).catch((err)=>{
        console.log("error",err);
    });

    axios.get("http://localhost:1000/get-today-expense").then((res)=>{
      setTodayTotalTransaction(res.data.data.length);
    }).catch((err)=>{
        console.log("error",err);
    });

   axios.get("http://localhost:1000/get-data").then((res)=>{
    setdata((p)=>({
        ...p,
          totalExpense:res.data.totalExpense
    }));
    }).catch((err)=>{
    console.log("error",err);
   });
},[]);
const saveEaring=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:1000/save-earing",{totalEaring:data.totalEaring}).then((res)=>{
        location.href="/";
        console.log("res",res);
    }).catch((err)=>{
        console.log("error",err);
    });
console.log("saveEaring",e.target[0].value);
};


const user_id = localStorage.getItem("user_id");

  return (
    <div className="home">
      <div className="container-fluid alert alert-primary p-4">
        <div className="row">
          <div className="col-md-12 alert alert-secondary">
            <h4>
              Welcome to Expense Tracker
              <ul className="navbar-nav">
                {user_id ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/profile">
                        <img src="/images/user.svg" alt="profile"/>
                      </a>
                    </li>

                    <li className="nav-item">
                      <button
                        className="btn btn-dark ps-4 pe-4"
                        onClick={() => {
                          localStorage.removeItem("user_id");
                          window.location.href = "/login";
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      <button className="btn btn-dark">Login / SignUp</button>
                    </a>
                  </li>
                )}
              </ul>
            </h4>
            <p>Track your expenses and manage your budget effectively.</p>
          </div>
          <div className="col-md-12 pt-4">
            <div className="row">
              <span className="col-md-2 border border-lg border-white rounded-3 bg-dark p-2 text-white pe-5 ps-5">
                {" "}
                total amount: {data.totalEaring}
              </span>
              <span className="col-md-2 border border-lg border-white rounded-3 bg-dark p-2 text-white pe-5 ps-5">
                {" "}
                total Expense: {data.totalExpense}
              </span>
              <span className="col-md-2 border border-lg border-white rounded-3 bg-dark p-2 text-white pe-5 ps-5">
                {" "}
                balance: {data.totalEaring - data.totalExpense}
              </span>

              <span className="col-md-2 border border-lg border-white rounded-3 bg-dark p-2 text-white pe-5 ps-5">
                {" "}
                today transaction: {todayTotalTransaction}
              </span>

              <span className="col-md-2 border border-lg border-white rounded-3 bg-dark p-2 text-white pe-5 ps-5">
                <a
                  href="/get-today-expense"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  get today expense
                </a>
              </span>

              <span className="col-md-2 border border-lg border-white rounded-3 bg-dark p-2 text-white pe-5 ps-5">
                <a
                  href="/Expense-list"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  get all expense
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3 p-3 mt-5">
              <form onSubmit={saveEaring} method="post">
                <h6 htmlFor="amount" className="text-dark fw-bolder">
                  Enter Earning Amount :
                </h6>
                <input
                  type="number"
                  value={data.totalEaring}
                  onChange={(e) => {
                    setdata({ ...data, totalEaring: Number(e.target.value) });
                  }}
                  className="form-control"
                  name="amount"
                  id="amount"
                />
                <button
                  type="submit"
                  className="btn btn-primary ms-4 mt-4 ps-5 pe-5"
                >
                  save earing
                </button>
              </form>
            </div>
            <div className="col-md-9 p-5">
              <form onSubmit={savedata} method="POST">
                <h4 className="mt-4 text-center">Add New Transaction</h4>
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-7 border border-2 border-dark p-4 border-radius-3 rounded-4">
                    <div className="col-md-12 mt-4">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <select
                        className="form-control"
                        name="description"
                        id="description"
                        value={expense.descreption}
                        onChange={(e) =>
                          setexpense({
                            ...expense,
                            descreption: e.target.value,
                          })
                        }
                      >
                        <option value="">Select description</option>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="utilities">Utilities</option>
                        <option value="rent"> house rent</option>
                        <option value="petrol">petrol</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-12 mt-4">
                      <label htmlFor="date" className="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={expense.date}
                        onChange={(e) =>
                          setexpense({ ...expense, date: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-12 mt-4">
                      <label htmlFor="description" className="form-label">
                        payment method
                      </label>
                      <select
                        className="form-select"
                        id="paymentMethod"
                        value={expense.paymentMethod}
                        onChange={(e) =>
                          setexpense({
                            ...expense,
                            paymentMethod: e.target.value,
                          })
                        }
                      >
                        <option value="">Select payment method</option>
                        <option value="cash">Cash</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="onlinePayment">Online Payment</option>
                      </select>
                    </div>

                    <div className="col-md-12 mt-4">
                      <label htmlFor="amount" className="form-label">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Enter amount"
                        defaultValue={expense.amount}
                        onChange={(e) =>
                          setexpense({
                            ...expense,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="col-md-12 mt-4 d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary">
                        Add Transaction
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}