import "./form.css";

const Form = ({onClick, nameFirst, nameSec, levelFirst, levelSec, setNameFirst, setNameSec, setLevelFirst, setLevelSec}) => {

  return (
    <div className="form">
      <span className="title">Générer un match</span>
      <div className="player">
        <span className="field">Joueur 1 :</span>
        <input className="name" placeholder="Player Name" onChange={e => setNameFirst(e.target.value)} value={nameFirst}/>
        <span className="field">Niveau : {levelFirst} / 10</span>
        <input type="range" min={1} max={10} onChange={e => setLevelFirst(parseInt(e.target.value))} value={levelFirst}/>
      </div>
      <div className="player">
        <span className="field">Joueur 2 :</span>
        <input className="name" placeholder="Player Name" onChange={e => setNameSec(e.target.value)} value={nameSec}/>
        <span className="field">Niveau : {levelSec} / 10</span>
        <input type="range" min={1} max={10} onChange={e => setLevelSec(parseInt(e.target.value))} value={levelSec}/>
      </div>
      <button onClick={e => onClick()}>Générer</button>
    </div>
  );
}

export default Form;