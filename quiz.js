import React, {Component} from 'react';
import './quiz.css';

/*
 * Program should have a user login/register
 * to be able to take Quiz and keep
 * track of the logged in users answers based on personality i.e
 * Melancholic, Phlegmatic, Sanguine and Choleric
 *
 * @author: Destiny Rogers
 * @date: December 15, 2019
 * */

/*
 * Answers component renders a choice for the
 * user to select.
 * @state:
 *  currentAnswer: holds answers in array {array of arrays}
 * return (
 * answer selection
 * )
 */

class Answer extends Component {
  constructor(){
    super();
    this.state = {
      currentAnswer: [["taurus, capricorn,virgo", "sagitarrius, leo, aries", "cancer, scorpio, pisces", "libra, aquarius, gemini"],
    ["summer", "fall","spring",  "winter"],
  ["watermelon","hot cheetos","biscotti","cheese"],
["mango smoothie","coffee","baja blast","water"],
["lime green","firetruck red","banana yellow","cookie monster blue"],
["electro-goth","psychobilly","synthwave","ethereal pop"],
["","","",""]]
    }
  }
  render(){
    return(
      <div>
      <h2 className={this.props.classname} onClick={this.props.onClick}>{this.state.currentAnswer[this.props.questionNum-1][this.props.num]}</h2>
      </div>
    );
  }
}

/*
 * Question component renders a question for the
 * user to select an answer for i.e. What is your zodiac sign?
 * return (
 * 1 Question
 * 4 <Answer>
)
 */
class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
    questions: ["What is your zodiac sign?", "What is your favorite season?","Choose a snack.","Choose a drink"
  ,"Pick a color.",
"Choose an (eclectic) music genre."],
    answer1:0,
    answer2:0,
    answer3:0,
    answer4:0,
    selected: ["answer","answer","answer","answer"]
}
this.handleClick = this.handleClick.bind(this);
this.updateGame = this.updateGame.bind(this);
  }
  /*
  *@function updateGame
  *depending on user answer selected
  *it will be put into the database to later be used
  *to calculate a song reccomendation
  *
  *@param{i} is the answer index.
  */
  updateGame(i){
    const congrats = {
      id: this.props.currentUser,
      genre: i
    }
    fetch(`/updateGame/${congrats.id}/${congrats.genre}`)
    .then(res => res.json())
    .catch(e => {console.log(e);});
    this.setState({selected: ["answer","answer","answer","answer"]})
}

/*
@function handleClick
*when an <Answer> is clicked, that choice is sent to the database
*and CSS is rendered to change the color of a selected answer
*by setting the state of the class name
*calls function updateGame(i) to handle the fetch.
*/
  handleClick(i){
    this.setState({selected: ["answer","answer","answer","answer"]})
    switch(i){
      case 0:
      this.setState({answer1: this.state.answer1+1})
      this.updateGame(i)
      if(this.state.selected[0]!=="select"){
        this.setState({selected: ["select","answer","answer","answer"]})
      }else this.setState({selected: ["answer","answer","answer","answer"]})
        break;
        case 1:
        this.setState({answer2: this.state.answer2+1})
        this.updateGame(i)
        if(this.state.selected[1]!=="select"){
          this.setState({selected: ["answer","select","answer","answer"]})
        }else this.setState({selected: ["answer","answer","answer","answer"]})
        break;
        case 2:
        this.setState({answer3: this.state.answer3+1})
        this.updateGame(i)
        if(this.state.selected[2]!=="select"){
          this.setState({selected: ["answer","answer","select","answer"]})
        }else this.setState({selected: ["answer","answer","answer","answer"]})
        break;
        case 3:
        this.setState({answer4: this.state.answer4+1})
        this.updateGame(i)
        if(this.state.selected[3]!=="select"){
          this.setState({selected: ["answer","answer","answer","select"]})
        }else this.setState({selected: ["answer","answer","answer","answer"]})
        break;
        default: break;
    }
  }
  render(){
    return(
      <div>
      <h1 className="question">{this.state.questions[this.props.questionNum-1]}</h1>
<Answer num={0} questionNum={this.props.questionNum} onClick={() =>this.handleClick(0)} classname={this.state.selected[0]}/>
<Answer num={1} questionNum={this.props.questionNum} onClick={() =>this.handleClick(1)} classname={this.state.selected[1]}/>
<Answer num={2} questionNum={this.props.questionNum} onClick={() =>this.handleClick(2)} classname={this.state.selected[2]}/>
<Answer num={3} questionNum={this.props.questionNum} onClick={() =>this.handleClick(3)} classname={this.state.selected[3]}/>

  </div>
    );
  }
}

/*
*QuestionNum component displays the current user logged in (passed in through props)
*and it displays questionNumber (passed in through props)
*@state: none
*
*return (
*current user logged in
*current question number
*)
*/
class QuestionNum extends Component {
  render(){
    return(
      <div>
      <h2 className="loggedin">{this.props.currentUser} is logged in</h2>
      <h2 className="loggedin">Question {this.props.questionNumber}/6</h2>
      </div>
    );
  }
}

/*
*Song component displays a song based on user (passed through props) selected answers (fetch)
*has button to DELETE ACCOUNT
*
*@state: none
*
*@return(
*song recommendation
*album cover
*song link
*delete account button
*
)
*/
class Song extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
}
/*
*@function _deleteAccount
*allows a user to purge all data from database
*using a fetch and id (passed through props)
*
*@param{} none.
*
*@return(
* none.
* )
*/
_deleteAccount(){
  const congrats = {
    id: this.props.currentUser
  }
  fetch(`/deleteUser/${congrats.id}`,{
    method: 'DELETE',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(e => {console.log(e);
  });
}
/*
*@function _songLink
*choses specific song link for song that was recommended
*
*@param{} none.
*
*@return(
* songlink
*@type {string}
* )
*/
_songLink(){
  if(this.props.songrec==="Don't You Want Me - The Human League"){
    var yt = "https://www.youtube.com/watch?v=uPudE8nDog0";
    return yt;
  }
  else if(this.props.songrec==="Goo Goo Muck - The Cramps"){
var ret = "https://www.youtube.com/watch?v=wrarS7mLlB0";
return ret;

  }
  else if(this.props.songrec==="Spaceage Lovesong - A Flock of Seagulls"){
    var link = "https://www.youtube.com/watch?v=gOK3rqVgN2I";
    return link;
  }
  else if(this.props.songrec==="Stop & Smell the Roses - Television Personalities"){
var link = "https://www.youtube.com/watch?v=_qOMsyW1v-E";
return link;
  }
}
/*
*@function _songImg
*choses specific album cover link for song that was recommended
*
*@param{} none.
*
*@return(
* album cover link
*@type {string}
* )
*/
_songImg(){
  if(this.props.songrec==="Don't You Want Me - The Human League"){
  var ret = "https://cps-static.rovicorp.com/3/JPG_500/MI0004/200/MI0004200549.jpg?partner=allrovi.com"
    return ret;
  }
  else if(this.props.songrec==="Goo Goo Muck - The Cramps"){
var ret = "https://images.genius.com/2a43ca87e9a03c2790e3dff2cc93b662.1000x1000x1.jpg";
return ret;

  }
  else if(this.props.songrec==="Spaceage Lovesong - A Flock of Seagulls"){
    var link = "https://www.youtube.com/watch?v=gOK3rqVgN2I";
    var ret = "https://m.media-amazon.com/images/M/MV5BZWM3M2YwMGItMDVlZC00YjJjLWJiNTEtYWVlYjJjNDdkMDI2XkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg"
    return ret;
  }
  else if(this.props.songrec==="Stop & Smell the Roses - Television Personalities"){
var ret = "https://images.genius.com/d06448c94c927c2ed5b1786a4d1c27f9.1000x1000x1.png";
return ret;
  }
}
/*
*@function _showSong
*displays explanation / song description for song recommended
*
*@param{} none.
*
*@return(
* song desription
*@type {string}
* )
*/
_showSong(){
  if(this.props.songrec==="Don't You Want Me - The Human League"){
    var u = "This synthy track is perfect for someone who is in the mood to ";
    var r = "drink lemonade on a fresh spring morning. Put this in your jogging playlist";
    var ret = u+r;
    return ret;
  }
  else if(this.props.songrec==="Goo Goo Muck - The Cramps"){
var r = "This punky and downbeat track may have you feeling highly talkative, enthusiastic, active, and social. ";
var e = "You tend to be more extroverted and enjoy being part of a crowd; and find that being social, outgoing, and charismatic is easy to accomplish.";
var t =  " Individuals with this personality have a hard time doing nothing and engage in more risk seeking behaviour.";

var ret = r+e+t;
return ret;
  }
  else if(this.props.songrec==="Spaceage Lovesong - A Flock of Seagulls"){
    var r = "A song perfect for someone who is independent, decisive amd goal-oriented";
    return r;
  }
  else if(this.props.songrec==="Stop & Smell the Roses - Television Personalities"){
var r = "You might be an individual who tends to be relaxed, peaceful, quiet, and easy-going. You may be sympathetic and care about others, yet try to hide your emotions. Phlegmatic individuals also are good at generalizing ideas or problems to the world and making compromises";
return r;
  }
}
    render(){
      return(
        <div className="img">
        <h1 className="question">You Got</h1>
        <h1 className="songrec">{this.props.songrec}</h1>
        <p>{this._showSong()}</p>
        <a href = {this._songLink()}>
        <h1>Listen here</h1>
        </a>
        <img src={this._songImg()}/><br></br>
      <button className="delete" onClick={()=>this._deleteAccount()}>Delete account</button>
        </div>
      );
  }
}

/*
*@function Login(props)
*prompts a user to login.
*
*@param{props} onSubmit function defined in Quiz component.
*
*@return(
* Form
*@type {<form>}
* )
*/
function Login(props){
      return(
        <div>
        <h2>Type your name and hit ENTER:</h2>
        <form onSubmit={props.onSubmit}>
        <input type="text" id="name" name="name" placeholder="Type Your Name Here"/>
        <input type='submit' value='Submit'/>
        </form>
        </div>
      );
}

/*
 * Quiz component renders entire game
 *
 * @state:
 *  questionNumber: current question
 *  currentUser: JSON of userdata fetched from server
 *  numberofQuestions: doesnt get updated but holds max number of questions
 *  img: holds image to be rendered when questionNum === 0
 *
 * return (
 * all components
 * )
 */
class Quiz extends Component {
constructor(props) {
  super(props);
  this.state = {
  questionNumber : 0,
  answers: [],
  currentUser: [],
  numberOfQuestions: 6,
  songrec:"",
  img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mOgOQAbR_F8pVHp86Vix2SKys3y-T3z9-VtuPNDcrJm1D5N2&s"
  }
  this._nextQuestion = this._nextQuestion.bind(this);
  this._prevQuestion = this._prevQuestion.bind(this);
  this.doPost = this.doPost.bind(this);
  this._getSong = this._getSong.bind(this);
  this._playAgain = this._playAgain.bind(this);
  }
  /*
  *@function _nextQuestion
  *when clicked it sets state of questionNumber +1
  *also calls this._getSong to update table for answer selected
  *
  *@param{none}
  *
  *@return(
  * none
  * )
  */
  _nextQuestion(){
    this.setState({questionNumber: this.state.questionNumber+1})
    this._getSong()
  }
  /*
  *@function _prevQuestion
  *when clicked it sets state of questionNumber -1
  *
  *
  *@param{none}
  *
  *@return(
  * none
  * )
  */
  _prevQuestion(){
    this.setState({questionNumber: this.state.questionNumber-1})
  }
  /*
  *@function _playAgain
  *when clicked it sets state of questionNumber : 0
  *
  *
  *@param{none}
  *
  *@return(
  * none
  * )
  */
_playAgain(){
  this.setState({questionNumber: 0});
}
/*@function doPost
 * user logins in via form, a fetch
 * sends name and retrieves user data {answers/name/id}
 *
 * @param {event} when a form is submitted
 */
  doPost(event){
     event.preventDefault();
    const person = {
      name: document.getElementById('name').value || null
    }
        fetch('/createUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(person)
        })
    .then(res => res.json())
    .then(currentUser => this.setState({currentUser: currentUser[0]},() => console.log('User fetched...', currentUser[0]["username"])));
    return this.state.currentUser["username"]
  }
  /*
  *@function _getSong
  *this function retrieves current users data to keep track of the
  *answer the song to be rendered
  *
  *
  *@param{none}
  *
  *@return(
  * none
  * )
  */
  _getSong(){
    const congrats = {
      id: this.state.currentUser["id"]
    }
    fetch(`/getSong/${congrats.id}`)
    .then(res => res.json())
    .then(answers => this.setState({answers: answers[0]},() => console.log('Choices fetched...', answers[0])));
    //.catch(e => {console.log(e);});
  var max = this.state.answers["answer1"];
  var index = 0;
  let array = [this.state.answers["answer1"],this.state.answers["answer2"],this.state.answers["answer3"],this.state.answers["answer4"]]
  for(var i=0; i<Object.keys(this.state.answers).length; i++){
if(array[i] >= max){
  index = i;
  max = array[i];
}
  }
  if(index===0){
    this.setState({songrec: "Don't You Want Me - The Human League"})
  }
  else if(index===3){
      this.setState({songrec: "Spaceage Lovesong - A Flock of Seagulls"})
  }
  else if(index===2){
    this.setState({songrec: "Stop & Smell the Roses - Television Personalities"})
  }
  else if(index===1){
    this.setState({songrec: "Goo Goo Muck - The Cramps"})
  }
  }

render(){
  return(
    <div>
    {this.state.questionNumber === 0 &&<img src={this.state.img}/>}
    {this.state.questionNumber === 0 && <Login onSubmit={(event) => this.doPost(event)}/>}
    {this.state.questionNumber <= 6 && this.state.questionNumber>0 &&<QuestionNum questionNumber={this.state.questionNumber} currentUser={this.state.currentUser["username"]}/>}
    {this.state.questionNumber > 6 &&<Song songrec = {this.state.songrec} currentUser = {this.state.currentUser["id"]}/>}
    {this.state.questionNumber <=6 && this.state.questionNumber>0 &&<Question questionNum = {this.state.questionNumber} currentUser={this.state.currentUser["id"]} click={["answer","answer","answer","answer"]}/>}
    {this.state.questionNumber > 6 && <button className="restart" onClick={()=>this._playAgain()}>Retake Quiz</button>}
    {this.state.questionNumber <=6 && <button className="button" onClick={this._prevQuestion}>Previous Question</button>}{this.state.questionNumber <=6 && <button className="button2" onClick={this._nextQuestion}>Next Question</button>}
</div>
  );
}
}

export default Quiz;
