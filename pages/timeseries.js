import Link from 'next/link';
import React, { PureComponent } from 'react';
import Layout from '../components/Layout';
import {fetchTimeSeriesData} from '../components/utils/Helpers';
import ProjectionTimeSeriesLineGraph from '../components/utils/ProjectionTimeSeriesLineGraph.js';
import TrendTimeSeriesLineGraph from '../components/utils/TrendTimeSeriesLineGraph.js';
import SeasonTimeSeriesLineGraph from '../components/utils/SeasonTimeSeriesLineGraph.js'
import PeriodType from '../components/timeseries/PeriodTypeFilter'
import PeriodSpan from '../components/timeseries/PeriodSpanFilter'

class Timeseries extends React.Component {

  static getInitialProps({query}) {
    return {query}
  }

  constructor(props){
    super(props);
    this.state = {
      ouid: this.props.query.ouid,
      id: this.props.query.id,
      periodSpan: 2,
      periodtype: 'yearly',
      data: ''
    }
    this.handlePeriodTypeChange = this.handlePeriodTypeChange.bind(this);
    this.handlePeriodSpanChange = this.handlePeriodSpanChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handlePeriodTypeChange(periodType) {
    this.setState({ periodtype: periodType });
  }

  handlePeriodSpanChange(periodSpan) {
    this.setState({ periodSpan: periodSpan });
  }

  fetchData(){
    let ouId=this.state.ouid;
    console.log("debug 3=====>");
    console.log(ouId);
    if(ouId==null || ouId=='undefined'){
      ouId=18;
    }
    (async () => {
      let indicatorData=await fetchTimeSeriesData(this.state.id,ouId,this.state.periodSpan,this.state.periodtype);
      console.log("debug here");
      console.log(this.state.data);
      this.setState({
        data: indicatorData.result
      });
    })()
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(){
    this.fetchData();
  }

  render() {
    //console.log(this.props.query) // The query is available in the props object
    return(
      <Layout>
        {/*
          <style jsx>
            {`
              a {
                text-decoration: none;
              }
              a:hover {
                opacity: 0.6;
              }
            `}
          </style>
        */}

        {/* Breadcrumb */}
        <section className="section m-t-50 m-b-5 bcclear p-b-15">
          <div className="container">
            <div className="columns">
                <div className="column is-one-third">
                  <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                    <ul>
                        <li><Link href="/"><a className="m-t-3">Home</a></Link></li>
                        <li><Link href="/indicators"><a>All indicators</a></Link></li>
                        <li id="thirdelem"><Link href={"/indicator/"+this.props.query.id}>
                          <a>
                              {this.props.query.id} &nbsp;
                          </a>
                        </Link></li>
                        <li className="is-active">
                          <a aria-current="page">
                            TimeSeries
                          </a>
                        </li>
                    </ul>
                  </nav>
                </div>
                <div className="column text-right">
                  <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                    <ul>
                      <li>
                        <Link href={"/indicator/"+this.props.query.id+"?ouid="+this.props.query.ouid+"&level="+this.props.query.level+"&pe="+this.props.query.pe}>
                          <a className="is-link">&larr; Back to indicator summary</a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb */}

        <section style={{paddingBottom: "0" }} class="section">
          <div class="columns">
              <div class="column is-narrow">
                <h6>Period Type:</h6>
                <div class="control">
                  <div class="select">
                    <PeriodType handler={this.handlePeriodTypeChange}/>
                  </div>
                </div>
              </div>
              <div class="column is-narrow">
                <h6>Period Span:</h6>
                <div class="control">
                  <div class="select">
                    <PeriodSpan  handler={this.handlePeriodSpanChange}/>
                  </div>
                </div>
              </div>
          </div>


          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">Projection Analysis:  {this.state.period}</h5>
            <br/>
            <ProjectionTimeSeriesLineGraph data={this.state.data}/>
          </div>

          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">General Trend Analysis:  {this.state.period}</h5>
            <br/>
            <TrendTimeSeriesLineGraph data={this.state.data}/>
          </div>

          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">Seasonal Trends Analysis:  {this.state.period}</h5>
            <br/>
            <SeasonTimeSeriesLineGraph data={this.state.data}/>
          </div>


        </section>
      </Layout>
    );

  }
}

export default Timeseries;
