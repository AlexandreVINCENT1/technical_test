import "./list.css";

const Row = ({step, name}) => {
  return (
    <span>- Point {step + 1} : remporté par {name}</span>
  )
}

const List = ({data}) => {
  return (
    <div className="list">
      {data.map((e, i) => <Row step={i} name={e} />)}
    </div>
  );
}

export default List;