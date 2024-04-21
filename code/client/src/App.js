import './App.css';
import Form from "./components/Form/form";
import List from "./components/List/list";
import {useState, Fragment} from "react";
import axios from "axios";
import Scoreboard from "./components/Scoreboard/scoreboard";

function App() {
  const [fakeMatch, setFakeMatch] = useState([]);
  const [nameFirst, setNameFirst] = useState("");
  const [nameSec, setNameSec] = useState("");
  const [levelFirst, setLevelFirst] = useState(1);
  const [levelSec, setLevelSec] = useState(1);

  const [score, setScore] = useState(null);

  async function generateScoreboard() {
    let {data} = await axios.post("http://localhost:8080/scoreboard", {points: fakeMatch, players: [nameFirst, nameSec]});
    setScore(data);
  }

  function calcPoint() {
    let stat = levelFirst / (levelFirst + levelSec);
    let random = Math.random();
    return random < stat ? nameFirst : nameSec;
  }

  function genFakeMatch() {
    if (nameFirst.length === 0 || nameSec.length === 0 || nameSec === nameFirst)
      return;
    let arr = [];
    while(arr.length < 150) {
      arr.push(calcPoint());
    }
    setFakeMatch(arr);
  }

  return (
    <div className="app">
      <Form onClick={genFakeMatch}
            nameFirst={nameFirst}
            nameSec={nameSec}
            levelFirst={levelFirst}
            levelSec={levelSec}
            setNameFirst={setNameFirst}
            setNameSec={setNameSec}
            setLevelFirst={setLevelFirst}
            setLevelSec={setLevelSec}
      />
      { fakeMatch.length > 0 ?
        (<Fragment><List data={fakeMatch}/>
        <button className="send" onClick={generateScoreboard}>Send Score</button>
        </Fragment>)
        : ""
      }
      {score ? <Scoreboard playerOne={score[Object.keys(score)[0]]}
                           playerTwo={score[Object.keys(score)[1]]}
                           names={Object.keys(score)} />
        : ""}
    </div>
  );
}

export default App;
