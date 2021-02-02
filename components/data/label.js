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
              <h2 className="fcprimary">{props.value}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DataLabel;