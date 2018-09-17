import React, { Component } from "react";
import swal from "sweetalert"
import "./Auth.css"

class Login extends Component {
    constructor(props) {
        super(props);
        var users = JSON.parse(localStorage.getItem("users"));
        this.state = {
            users: users ? users : []
        }
    }

    Login(){
        const {users} = this.state;
        let form = new FormData(document.querySelector('#LogInForm'));

       var crrUser =  users.filter((user)=>{
            return user.email === form.get("email")
        })
        if(!crrUser.length){
            swal({
                title:"User Not Found",
                text:"Please SignUp First",
                icon:"error"
            })
            return;
        }
        if(crrUser[0].password!==form.get("password")){
            console.log(crrUser);
            
            swal({
                title:"Wrong Password",
                text:"Re-Type Your Password",
                icon:"error"
            })
            return;
        }
        localStorage.setItem("crrUser",JSON.stringify(crrUser[0]));
        swal({
            title:"Successfull",
            icon:"success"
        })
        window.location.reload();
        
    }

    render() {
        const {NotHaveCred} = this.props
        return(
        <div className="formContainer">
            <form action="JavaScript:void(0)" onSubmit = {()=>this.Login()} method="post" id="LogInForm" className="form animated fadeIn">
                <h1>Log-In</h1>
                <div className="data">
                    <i className="fa fa-envelope"></i>
                    <input type="text" name="email" id="email" placeholder="Email Address" autoComplete="on" />
                    <br /><i className="fa fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" id="Password"  />
                   <br/> <a href="JavaScript:void(0)" onClick={NotHaveCred}><i>Not Registered</i></a>
                    <br /><input type="submit" value="LogIn" /></div>
                <div className="bottom"><i> All Rights Reservers To Irfan Ali</i></div>
            </form>
        </div>
        );

    }

}

export default Login;