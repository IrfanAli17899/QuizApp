import React, { Component } from 'react';
import "./QA.css"
import swal from "sweetalert"
class QA extends Component {
    constructor() {
        super();
        var crrUser = JSON.parse(localStorage.getItem("crrUser"));
        this.state = {
            Ques: {
                html: [
                    {
                        Q: "Which Html Tag Is Use To Break A Line ??",
                        opt: ["<br/>", "<hr/>", "<marquee>", "<a>"],
                        ans: "<br/>"
                    }, {
                        Q: "Html Is A ______ Language ??",
                        opt: ["programming language", "Markup language", "Native Language", "National language"],
                        ans: "Markup language"
                    },
                    {
                        Q: "What Html Attribute Makes the Element Unique ??",
                        opt: ["id", "class", "href", "value"],
                        ans: "id"
                    }],
                css: [
                    {
                        Q: "Which Of The Following can Be Use To Specify Width ??",
                        opt: ["px", "xp", "cp", "df"],
                        ans: "px"
                    },
                    {
                        Q: "What is The Hex value Of Color Black ??",
                        opt: ["#000000", "#ffffff", "#f3f3f3", "#gfhtjs"],
                        ans: "#000000"
                    },
                    {
                        Q: "Which property Is Use to Align Text ??",
                        opt: ["font-align", "text-align", "text-float", "font-resize"],
                        ans: "text-align"
                    }],
                js: [
                    {
                        Q: "The Output From A Prompt Has A type of ??",
                        opt: ["String", "Boolean", "Undefined", "Object"],
                        ans: "String"
                    },
                    {
                        Q: "How Can We Alert A User,Using ??",
                        opt: ["prompt", "alert", "console.log()", "then"],
                        ans: "alert"

                    },
                    {
                        Q: "What Is Use To Convet A String To A Number , From Following ??",
                        opt: ["toDateString()", "toTimeString()", "Number()", "!Number"],
                        ans: "Number()"
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
        const { crrUser, Ques } = this.state;
        for (var i in crrUser.quizzes) {
            if (name === i) {
                if (crrUser.quizzes[i]) {
                    for (var j in crrUser.results) {
                        if (crrUser.results[j].QuizName === name) {
                            swal({
                                title: crrUser.results[j].status,
                                text: crrUser.results[j].result,
                                icon: crrUser.results[j].icon,
                            })
                            return;
                        }
                    }
                }
                for (var j in Ques) {
                    if (j === name) {
                        swal({
                           title:"Best Of Your Luck",
                           text:`Total Questions Are ${Ques[j].length} Each Carry Equal Marks` 
                        })
                        this.setState({
                            beginQuiz: true,
                            QuizName: name,
                            crrQuiz: Ques[j]
                        })
                    }
                }

            }
        }
    }

    createResult() {
        let { crrQuiz, crrUser, QuizName } = this.state;
        let users = JSON.parse(localStorage.getItem("users"))
        var score = 0;
        for (var index in crrQuiz) {
            var opt = document.getElementsByName(index);
            var found = false;
            for (var i in opt) {
                if (opt[i].checked) {
                    found = true;
                    if (opt[i].value === crrQuiz[index].ans) {
                        score += 4;
                        break;
                    }
                }
            }
            if (!found) {
                swal({
                    title: "Answer All Questions",
                    icon: "error"
                })
                return;
            }
        }

        var rightAns = score / 4;
        var wrongAns = crrQuiz.length - rightAns;
        var per = (score / 12) * 100
        var result = `Out Of ${crrQuiz.length} Answered ${rightAns} Correctly , ${wrongAns} Wrong Answered Your Percentage Is ${per}%`;
        var status = rightAns < 2 ? "Fail" : "Pass"
        var icon = rightAns < 2 ? "error" : "success"
        for (let i in crrUser.quizzes) {
            if (i === QuizName) {
                crrUser.quizzes[i] = true;
                crrUser.results.push({
                    status,
                    result,
                    icon,
                    QuizName
                })
            }
        }
        for (var j in users) {
            if (users[j].email === crrUser.email) {
                for (let i in users[j].quizzes) {
                    if (i === QuizName) {
                        users[j].quizzes[i] = true;
                        users[j].results.push({
                            status,
                            result,
                            icon,
                            QuizName
                        })
                    }
                }
            }
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("crrUser", JSON.stringify(crrUser))
        swal({
            title: status,
            text: result,
            icon
        })
        this.setState({
            beginQuiz: false
        })

    }

    Quiz() {
        const { QuizName, crrQuiz } = this.state;

        var name = QuizName.toUpperCase();
        return (
            <div className="Quiz">
                <h1 align="center">{name}</h1>
                <br />
                <br />
                <br />
                <ol>
                    {crrQuiz.map((item, index) => {
                        return (
                            <li className="Ques" key={index}>
                                <h3>{item.Q}</h3>
                                <br />
                                {
                                    item.opt.map((option, index2) => {
                                        return (
                                            <div className="radio" key={index2}>
                                                <input type="radio" id={option} name={index} value={option} />
                                                <label htmlFor={option}>{option}</label>
                                            </div>
                                        )
                                    })
                                }
                            </li>
                        )
                    })}

                </ol>
                <button className="Submit" onClick={() => this.createResult()}>Submit</button>
            </div>
        )


    }
    logOut(){
        localStorage.removeItem("crrUser");
        window.location.reload()
    }

    render() {
        const { beginQuiz } = this.state;
        const item = beginQuiz ? this.Quiz() : this.renderlist();
        return (
            <div>
                <button className="logOut" onClick={()=>this.logOut()}>LogOut</button>
                {item}
            </div>
        )
    }
}

export default QA