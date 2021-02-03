import UrgeWithPleasureComponent from "../utils/DonutChart"

const DataLabel = (props) => {
  return (
    <div className="card display-inline-b m-r-5">
      <div className="card-content">
        <div className="content">

          <div className="columns">
            <div className="column  ">
              {props.name}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              {props.noChart?
                <h2 className="fcprimary">{props.value}</h2>:
                <UrgeWithPleasureComponent value={props.value}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DataLabel;