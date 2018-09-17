import React, { Component } from 'react';
import "./QA.css"
import swal from "sweetalert"
class QA extends Component {
    constructor() {
        super();
        var crrUser = JSON.parse(localStorage.getItem("crrUser"));
        this.state = {
            Ques:{
                html:[
                {
                    Q:"Which Html Tag Is Use To Break A Line ??",
                    opt:["<br/>","<hr/>","<marquee>","<a>"],
                    ans:"<br/>"
                },{
                    Q:"Html Is A ______ Language ??",
                    opt:["programming language","Markup language","Native Language","National language"],
                    ans:"Markup language"
                },
                {
                    Q:"What Html Attribute Makes the Element Unique ??",
                    opt:["id","class","href","value"],
                    ans:"id"
                }],
                css:[
                    {
                        Q:"Which Of The Following can Be Use To Specify Width ??",
                        opt:["px","xp","cp","df"],
                        ans:"px"
                    },
                    {
                        Q:"What is The Hex value Of Color Black ??",
                        opt:["#000000","#ffffff","#f3f3f3","#gfhtjs"],
                        ans:"#000000"
                    },
                    {
                        Q:"Which property Is Use to Align Text ??",
                        opt:["font-align","text-align","text-float","font-resize"],
                        ans:"text-align"
                    }],
                js:[
                    {
                        Q:"The Output From A Prompt Has A type of ??",
                        opt:["String","Boolean","Undefined","Object"],
                        ans:"String"
                    },
                    {
                        Q:"How Can We Alert A User,Using ??",
                        opt:["prompt","alert","console.log()","then"],
                        ans:"alert"
                        
                    },
                    {
                        Q:"What Is Use To Convet A String To A Number , From Following ??",
                        opt:["toDateString()","toTimeString()","Number()","!Number"],
                        ans:"Number()"
                    }],
                
            },
            beginQuiz: false,
            crrUser
        }
    }
    renderlist() {
        return (
            <ol className="quizzes">
                <h1>Select-Quiz</h1>
                <li>
                    <span>HTML</span>
                    <br />
                    <button onClick={() => this.StartQuiz("html")}>Start Quiz</button>
                </li>
                <li>
                    <span>CSS</span>
                    <br />
                    <button onClick={() => this.StartQuiz("css")}>Start Quiz</button>
                </li>
                <li>
                    <span>JAVASCRIPT</span>
                    <br />
                    <button onClick={() => this.StartQuiz("js")}>Start Quiz</button>
                </li>
                <div className="bottom"><i> All Rights Reservers To Irfan Ali</i></div>
            </ol>
        )
    }

    StartQuiz(name) {
        const { crrUser } = this.state;
        for (var i in crrUser.quizzes) {
            if (name === i) {
                if (crrUser.quizzes[i]) {
                    swal({
                        title: "You have Given The Test"
                    })
                    return;
                }
                this.setState({
                    beginQuiz: true,
                    QuizName: name
                })
            }
        }


    }

    render() {
        const { beginQuiz, QuizName } = this.state;
        const item = beginQuiz ? this.Quiz(QuizName) : this.renderlist();
        return (
            item
        )
    }
}

export default QA