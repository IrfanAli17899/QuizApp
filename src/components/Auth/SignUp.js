import React, { Component } from "react";
import "./Auth.css"
import swal from "sweetalert"

class SignUp extends Component {
    constructor() {
        super();
        var users = JSON.parse(localStorage.getItem("users"));

        this.state = {
            users: users ? users : []

        }
    }

    SignUp() {
        var { users } = this.state;
        var { HaveCred } = this.props;
        let form = new FormData(document.querySelector('#SignUpForm'));
        if (!form.get("name").trim() || !form.get("email").trim() || !form.get("password").trim()) {
            swal({
                title:"Credentials",
                text:"Please provide A Valid data",
                icon:"error"
            })
            return;
        }
        for(var i in users){
            if(users[i].email === form.get("email")){
                swal({
                    title:"Email",
                    text:"Email Adress Is Already In Use",
                    icon:"error"
                })
                return;
            }
        }
        if(form.get("name").length < 2){
            swal({
                title:"Name",
                text:"Atleast Contains Two Characters As Your NickName",
                icon:"error"
            })
            return;
        }
        if(form.get("password").length < 6){
            swal({
                title:"Password",
                text:"Atleast Contains 6 Characters",
                icon:"error"
            })
            return;
        }
        users.push({
            name:form.get("name"),
            email:form.get("email"),
            password:form.get("password"),
            quizzes:{
                html:false,
                css:false,
                js:false
            },
            results:[]
        })
        localStorage.setItem("users",JSON.stringify(users));
        swal({
            title:"Successfull",
            icon:"success"
        })

        HaveCred()
    }
    render() {
        const { HaveCred } = this.props;
        return (
            <div className="formContainer">
                <form action="JavaScript:void(0)" method="post" id="SignUpForm" className="form animated fadeIn" onSubmit={() => this.SignUp()}>
                    <h1>Sign-Up</h1>
                    <div className="data">
                        <i className="fa fa-user"></i>
                        <input type="text" name="name" placeholder="Name" id="name" />
                        <br />
                        <i className="fa fa-envelope"></i>
                        <input type="email" name="email" id="email" placeholder="Email Address" autoComplete="on"  />
                        <br /><i className="fa fa-lock"></i>
                        <input type="password" name="password" placeholder="Password" id="Password"  />
                        <br /> <a href="JavaScript:void(0)" onClick={HaveCred}><i>Already Have An Account</i></a>
                        <br /><input type="submit" value="SignUp" /></div>
                    <div className="bottom"><i> All Rights Reservers To Irfan Ali</i></div>
                </form>
            </div>
        )

    }

}

export default SignUp;