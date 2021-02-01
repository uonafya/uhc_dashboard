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
            <div className="column is-one-third ">
              <i className="fa fa-heart-o fa-2x" aria-hidden="true"></i>
            </div>
            <div className="column">
              <i className="fcprimary">{props.value}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DataLabel;