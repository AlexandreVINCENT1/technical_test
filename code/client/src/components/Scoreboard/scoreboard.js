import "./scoreboard.css";

const Header = ({content}) => {
  return (
    <span className="header">{content}</span>
  )
}

const Row = ({content, line}) => {
  return (
    <span className={"row " + line}>{content}</span>
  )
}

const Scoreboard = ({playerOne, playerTwo, names}) => {

  function displayWinner(playerOne, playerTwo, names) {
    if (!Object.keys(playerOne).includes("winner"))
      return  (<span>Résultat : Jeu en cours, pas de vainqueur </span>);
    else if (playerOne.winner)
      return (<span>Résultat : Jeu finis, {names[0]} est le vainqueur </span>);
    else
      return (<span>Résultat : Jeu finis, {names[1]} est le vainqueur </span>);
  }

  return (
    <div className="scoreboard">
      {displayWinner(playerOne, playerTwo, names)}
      <div className="grid">
        {Object.keys(playerOne).filter(e => e != "winner").map(e => <Header content={e}/>).reverse()}
        {Object.values(playerOne).filter(e => typeof e != "boolean").map(e => <Row content={e} line="one"/>).reverse()}
        {Object.values(playerTwo).filter(e => typeof e != "boolean").map(e => <Row content={e} line="two"/>).reverse()}
        {names.map((e,i) => <Row content={e} line={i === 0 ? "one" : "two"}/>)}
      </div>
    </div>
  )
}


export default Scoreboard;