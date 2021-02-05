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
  const [period, setPeriod] = useState(2020);
  const [parentOrgId, setParentOrgId] = useState(null);

  let handleCountyUnitChange = (orgUnitId) => {
    setOrgUnit(orgUnitId);
    setParentOrgId(orgUnitId)
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

        <div className="container is-fluid">
          <div className="columns has-same-height is-gapless">
            {/* <UhcIndicators /> */}

            <div class="column ">
                <IndicatorLineGraph id={96871} pe={period} ouid={orgUnit} selfContained={true} removePeriodFilter={true} removeOrgFilter={true} />
            </div>
            <div class="column ">
                <IndicatorLineGraph id={31584} pe={period} ouid={orgUnit} selfContained={true} removePeriodFilter={true} removeOrgFilter={true} chartType={ChartType.column}/>
            </div>
            
          </div>

          <div className="columns has-same-height is-gapless">
            {/* <UhcIndicators /> */}

            <div class="column ">
                <IndicatorLineGraph id={85000} pe={period} ouid={orgUnit} selfContained={true} removePeriodFilter={true} removeOrgFilter={true} />
            </div>
            <div class="column ">
                <IndicatorLineGraph id={342134} pe={period} ouid={orgUnit} selfContained={true} removePeriodFilter={true} removeOrgFilter={true} chartType={ChartType.column}/>
            </div>
            
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading m-b-20">
          <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">Partners</h4>
        </div>
        <div className="container hide-overflow">
          <div className="columns">
            <div className="column is-one-fifth p-10 card m-5">
              <a href="https://www.usaid.gov/kenya" target="_blank">
                <img src="/static/images/usaid.jpeg" className="carousel-images mx-auto" alt="Partners" />
                <hr className="m-t-0 m-b-0" />
                <h5 className="text-bold text-center fcblack-1">USAID Kenya</h5>
              </a>
            </div>
            <div className="column is-one-fifth p-10 card m-5">
              <a href="https://www.uonbi.ac.ke/" target="_blank">
                <img src="/static/images/uon.jpeg" className="carousel-images mx-auto" alt="Partners" />
                <hr className="m-t-0 m-b-0" />
                <h5 className="text-bold text-center fcblack-1">University of Nairobi</h5>
              </a>
            </div>
            <div className="column is-one-fifth p-10 card m-5">
              <a href="http://www.health.go.ke/" target="_blank">
                <img src="/static/images/MOH.png" className="carousel-images mx-auto" alt="Partners" />
                <hr className="m-t-0 m-b-0" />
                <h5 className="text-bold text-center fcblack-1">Ministry of Health</h5>
              </a>
            </div>
            <div className="column is-one-fifth p-10 card m-5">
              <a href="http://www.kemsa.co.ke/" target="_blank">
                <img src="/static/images/kemsa.jpeg" className="carousel-images mx-auto" alt="Partners" />
                <hr className="m-t-0 m-b-0" />
                <h5 className="text-bold text-center fcblack-1">KEMSA</h5>
              </a>
            </div>
            <div className="column is-one-fifth p-10 card m-5">
              <a href="hiskenya.org" target="_blank">
                <img src="/static/images/khis.png" className="carousel-images mx-auto" alt="Partners" />
                <hr className="m-t-0 m-b-0" />
                <h5 className="text-bold text-center fcblack-1">KHIS</h5>
              </a>
            </div>
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
