import SimpleSlider from '../components/utils/SimpleSlider'
import IndicatorLineGraph from '../components/utils/IndicatorLineGraph'
import IndicatorLineBarGraph from '../components/utils/IndicatorBarGraph'
import UhcIndicators from '../components/LandingPageUhc'
import MalariaIndicators from '../components/LandingPageMalaria'
import LandingCadrePieChart from '../components/CadreGroupDistribution'
import FacilityTypeCountPieChart from '../components/FacilityDistribution'
import Map from '../components/Map'
import { fetchIndicators } from '../components/utils/Helpers'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Router from 'next/router'
import Layout from '../components/Layout'

import DataLabel from '../components/data/label'
import Years from '../components/data/years_list'
import Months from '../components/data/months_list'
import OrgUnitNestedMenu from '../components/utils/OrgUnitNestedMenu'
import GenericYearDropDown from '../components/utils/GenericYearDropDown'
import { useState } from 'react'
import { ChartType } from '../components/utils/charts/ChartTypes'
import CountyDropDown from '../components/utils/CountyDropDown'
import Counties from '../components/utils/CountiesDropDown'
import SubCounties from '../components/utils/SubCountiesDropDown'
import YearsDropDown from '../components/data/year_dropdown'


const Page = (props) => {

  const [orgUnit, setOrgUnit] = useState(18);
  const [period, setPeriod] = useState(2019);
  const [parentOrgId, setParentOrgId] = useState(null);

  let handleCountyUnitChange = (orgUnitId) => {
    setOrgUnit(orgUnitId);
    console.log(orgUnitId);
  }

  let updateCountyIdHandler= (orgUnitId) => {
  }

  let handleSubCountyUnitChange = (orgUnitId) => {
    setOrgUnit(orgUnitId);
  }

  let handlePeriodChange = (periodId) => {
    setPeriod(periodId);
  }

  return <div>
    <Layout>
      <section className="section">
        {/* Data labels */}
        <div className="container">
          <div style={{ display: "inline-block" }} className="m-r-5">
            <Counties callBackHandler={handleCountyUnitChange} updateCountyIdHandler={updateCountyIdHandler}></Counties>
          </div>
          <div style={{ display: "inline-block" }}>
            <SubCounties callBackHandler={handleSubCountyUnitChange}></SubCounties>
          </div>
          <div style={{ display: "inline-block" }} className="is-pulled-right">
            <YearsDropDown handlePeriodChange={handlePeriodChange}></YearsDropDown>
          </div>
          
        </div>
        <hr/>
        <div className="container is-fluid">
          <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold"></h4>
        
          <div className="columns has-same-height is-gapless">
            <LandingCadrePieChart />
          </div>
        </div>
      </section>

    </Layout>
  </div>
}


const Home = withRouter(props => (
  <Page props={props} />
));

Home.getInitialProps = async function (context) {

  const mapFilterYear = 2019;
  const mapFilterIndicator = 21030
  let { indicatorsData, loading } = await fetchIndicators();
  const years = ["2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"];
  return { dslIndicators: indicatorsData, years, error: false, loading };
};


export default Home;
