import { settings } from './Settings'
import fetch from 'isomorphic-unfetch'
import MapCenters from '../../static/maps/county-centers-coordinates'
let cache = {
  countiesList: null,
  subcountiesList: null,
  surveySources: null
}

export async function FetchIndicatorData(id,ouid,pe,level,loading) {
  let tim = new Date()
  if(pe == undefined){
    pe=settings.previousYear;
  }
  console.log(`// running helper fetchIndicatorData. ID:${id} && OU:${ouid} && PE:${pe} && LEVEL:${level}`)
  loading = true;
  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/indicators/${id}`;
  if(pe != undefined && pe != null){
    fetchIndicatorDataUrl += `?pe=${pe}`;
  }
  if(ouid != undefined && ouid != null){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }
  if(level != undefined && level != null){
    fetchIndicatorDataUrl += `&level=${level}`;
  }
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  if(true){
    loading = false;
  }
  return {indicatorData, loading}
}

export async function fetchTimeSeriesData(id,ouid,periodSpan,periodType) {
  console.log("==========================+>");
  console.log(ouid);
  console.log(id);
  console.log(periodSpan);
  console.log(periodType);
  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/forecast/${id}`;
  if(periodSpan != undefined){
    fetchIndicatorDataUrl += `?periodspan=${periodSpan}`;
  }else{
    fetchIndicatorDataUrl += `?periodspan=2`;
  }
  if(ouid != undefined){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }else{
    fetchIndicatorDataUrl += `&ouid=18`; //default to national
  }
  if(periodType != undefined){
    fetchIndicatorDataUrl += `&periodtype=${periodType}`;
  }else{
    fetchIndicatorDataUrl += `&periodtype=yearly`;
  }
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();
  return indicatorData
}

export function getCadreGroupMapping(cadreData){
  let cadreGroupMap = {};
  cadreData.map(
    cadreEntity => {
      if (!(cadreEntity.id in cadreGroupMap)){
        cadreGroupMap[cadreEntity.id]=cadreEntity.cadreGroupId;
      }
    }
  );
  return cadreGroupMap;
}

export function getCadreGroupIdNameMap(cadreGroups){
  let cadreGroupIdNameMap = {};
  cadreGroups.map( cadgreGroupMap =>{
      cadreGroupIdNameMap[cadgreGroupMap.id]=cadgreGroupMap.name;
    }
  );
  return cadreGroupIdNameMap;
}

export function getCadreGroupCount(cadresData,cadreGroupMap,cadreGroupIdNameMap){
  let cardreGroupCount = {};
  // console.log("donee +=======>");
  // console.log(cadresData);
  cadresData.map(cadreMap => {
      let cadreGroupId=cadreGroupMap[cadreMap.id];
      let groupName= cadreGroupIdNameMap[cadreGroupId];
      if (!(groupName in cardreGroupCount)){
        cardreGroupCount[groupName]=Number(cadreMap.cadreCount);
      }else{
        cardreGroupCount[groupName]=Number(cardreGroupCount[groupName])+Number(cadreMap.cadreCount);
      }
    }
  );
  return cardreGroupCount;
}

export async function FetchCadreGroupData(ouid,pe) {
  let fetchCadreGroupsDataUrl = `${settings.dslBaseApi}/cadregroups/`;
  let fetchCadresDataUrl = `${settings.dslBaseApi}/cadres`;

  let _cadres = await fetch(fetchCadresDataUrl);
  let cadres = await _cadres.json();
  let _cadreGroups = await fetch(fetchCadreGroupsDataUrl);
  let cadreGroups = await _cadreGroups.json();

  let append=false;
  if(pe != undefined){
    fetchCadresDataUrl += `?pe=${pe}`;
    append = true;
  }
  if(ouid != undefined || ouid != null){
    if(append) fetchCadresDataUrl += `&ouid=${ouid}`;
    else  fetchCadresDataUrl += `?ouid=${ouid}`;
  }
  let _cadresData = await fetch(fetchCadresDataUrl);
  let cadresData = await _cadresData.json();
  let cadreGroupMap = getCadreGroupMapping(cadres);
  let cadreGroupIdNameMap = getCadreGroupIdNameMap(cadreGroups);
  let cardreGroupCount = getCadreGroupCount(cadresData,cadreGroupMap,cadreGroupIdNameMap);
  return cardreGroupCount

}


export async function FetchCadreGroupAllocation(id,ouid,pe) {
  let fetchCadreGroupsDataUrl = `${settings.dslBaseApi}/cadregroups/`;

  let append=false;
  if(pe != undefined){
    fetchCadreGroupsDataUrl += `?pe=${pe}`;
    append = true;
  }
  if(ouid != undefined || ouid != null){
    if(append) fetchCadreGroupsDataUrl += `&ouid=${ouid}`;
    else  fetchCadreGroupsDataUrl += `?ouid=${ouid}`;
  }
  if(id != undefined || id != null){
    if(append) fetchCadreGroupsDataUrl += `&id=${id}`;
    else  fetchCadreGroupsDataUrl += `?id=${id}`;
  }
  let _cadresData = await fetch(fetchCadreGroupsDataUrl);
  let cadresData = await _cadresData.json();
  return cadresData
}


export async function FetchCadreAllocation(id,ouid,pe,periodtype) {
  let fetchCadreGroupsDataUrl = `${settings.dslBaseApi}/cadres/`;

  let append=false;
  if(pe != undefined){
    fetchCadreGroupsDataUrl += `?pe=${pe}`;
    append = true;
  }
  if(ouid != undefined || ouid != null){
    if(append) fetchCadreGroupsDataUrl += `&ouid=${ouid}`;
    else  fetchCadreGroupsDataUrl += `?ouid=${ouid}`;
  }
  if(id != undefined || id != null){
    if(append) fetchCadreGroupsDataUrl += `&id=${id}`;
    else  fetchCadreGroupsDataUrl += `?id=${id}`;
  }
  console.log(periodtype);
  if(periodtype!= undefined ||periodtype!= null ){
    if(periodtype== "monthly"){
      if(append) fetchCadreGroupsDataUrl += "&periodtype=monthly";
    }
  }
  console.log("Making request to: "+fetchCadreGroupsDataUrl);
  let _cadresData = await fetch(fetchCadreGroupsDataUrl);
  let cadresData = await _cadresData.json();
  return cadresData
}

export async function FetchFacilityCountByType() {
  let facilityCountDataUrl = `${settings.dslBaseApi}/facilitytype/all`;
  const facilityData = await fetch(facilityCountDataUrl);
  const facilityCountData = await facilityData.json();
  return facilityCountData
}


export async function FetchCountyList() {
  if(cache.countiesList==null){
    let countyListUrl = `${settings.dslBaseApi}/counties`;
    const _countyData = await fetch(countyListUrl);
    const countyData = await _countyData.json();
    cache.countiesList=countyData;
    return countyData;
  }else{
    return cache.countiesList;
  }
}

export async function FetchSubCountyList() {
  if(cache.subcountiesList==null){
    let subCountyListUrl = `${settings.dslBaseApi}/subcounties`;
    const _subCountyData = await fetch(subCountyListUrl);
    const subCountyData = await _subCountyData.json();
    cache.subcountiesList=subCountyData;
    return subCountyData;
  }else{
    return cache.subcountiesList;
  }
}

// <<<<<<<<<<<<<<<<Search
export function searchIndicator(array, string) {
  console.log("function searchIndicator for "+string)
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}
// >>>>>>>>>>>>>>>>Search

export async function fetchIndicators() {
  let loading = true
  let fetchIndicatorsUrl = `${settings.dslBaseApi}/indicators`;

  const fetchIndicators = await fetch(fetchIndicatorsUrl);

  let indicatorsData = await fetchIndicators.json();
  if(indicatorsData.length > 5){
    loading = false
  }

  console.log(`All Indicators fetched. Count: ${indicatorsData.length} & Url: ${fetchIndicatorsUrl} `);

  return {indicatorsData, loading}
}

export async function fetchCadres() {
  let loading = true
  let fetchCadresUrl = `${settings.dslBaseApi}/cadres`;

  const fetchCadres = await fetch(fetchCadresUrl);

  const cadresData = await fetchCadres.json();
  if(cadresData.length > 5){
    loading = false
  }

  console.log(`All Cadres fetched. Count: ${cadresData.length} & Url: ${fetchCadresUrl} `);

  return {cadresData, loading}
}

export async function fetchSurveySources() {
  if(cache.surveySources==null){
    let fetchSurveySourcesUrl = `${settings.dslBaseApi}/survey/sources/`;
    const surveySourcesData = await fetch(fetchSurveySourcesUrl);
    const _surveySourcesData = await surveySourcesData.json();
    cache.surveySources=_surveySourcesData;
    return _surveySourcesData;
  }else{
    return cache.surveySources;
  }
}

export async function fetchSurveyData(sourceId,id,orgId,pe,catId) {
  let fetchSurveyDataUrl = `${settings.dslBaseApi}/survey/sources/${sourceId}`;

  let append=false;
  if(id != undefined && id != null){
    fetchSurveyDataUrl += `?id=${id}`;
  }
  if(pe != undefined && pe != null){
    fetchSurveyDataUrl += `&pe=${pe}`;
    append = true;
  }
  if(orgId != undefined && orgId != null){
    fetchSurveyDataUrl += `&orgId=${orgId}`;
  }
  if(catId != undefined && catId != null){
    fetchSurveyDataUrl += `&catId=${catId}`;
  }
  console.log("Making request to: "+fetchSurveyDataUrl);
  let _surveyData = await fetch(fetchSurveyDataUrl);
  let surveyData = await _surveyData.json();
  return surveyData
}

export async function fetchCovidData(id, ouid, startDate, endDate, loading) {
  loading = true;
  let fetchCovidDataUrl = `${settings.dslBaseApi}/pandemics/covid19`;
  if(startDate != undefined && startDate != null){
    fetchCovidDataUrl += `?start_date=${startDate}`;
  }
  if(ouid != undefined && ouid != null){
    fetchCovidDataUrl += `&org_id=${ouid}`;
  }
  if(id != undefined && id != null){
    fetchCovidDataUrl += `&id=${id}`;
  }
  if(endDate != undefined && endDate != null){
    fetchCovidDataUrl += `&end_date=${endDate}`;
  }
  const fetchCovidData = await fetch(fetchCovidDataUrl);
  const covidData = await fetchCovidData.json();
  if(true){
    loading = false;
  }
  return {covidData, loading}
}

export function dateToStr(ledate) {
  ledate = ledate.trim()
  if(ledate.length < 5){
    return ledate
  }
  var leyear = ledate.substr(0, 4);
  var lemonth = ledate.substr(4, 5);
  if (lemonth == "01") { var numonth = "Jan"; }
  if (lemonth == "02") { var numonth = "Feb"; }
  if (lemonth == "03") { var numonth = "Mar"; }
  if (lemonth == "04") { var numonth = "Apr"; }
  if (lemonth == "05") { var numonth = "May"; }
  if (lemonth == "06") { var numonth = "Jun"; }
  if (lemonth == "07") { var numonth = "Jul"; }
  if (lemonth == "08") { var numonth = "Aug"; }
  if (lemonth == "09") { var numonth = "Sept"; }
  if (lemonth == "10") { var numonth = "Oct"; }
  if (lemonth == "11") { var numonth = "Nov"; }
  if (lemonth == "12") { var numonth = "Dec"; }
  var lenudate = numonth + " " + leyear;
  return lenudate;
}

//returns an ordered list of objects [{date: xxxx-xx-xx, value: x}, ...] of given case id
export function getCummulativeCases(data, caseId) {
    let cummulativeCases = {};
    let cummulativeCasesList = [];

    data.result.data[caseId].forEach(dataEntity =>{
      if(dataEntity.period in cummulativeCases){
          if(dataEntity.value > cummulativeCases[dataEntity.period]){
            cummulativeCases[dataEntity.period]= dataEntity.value;
          }
      }else{
        cummulativeCases[dataEntity.period]= dataEntity.value;
      }
    });

    for (var m in cummulativeCases){
        let dEntry= {};
        dEntry['date']=m;
        dEntry['value']=cummulativeCases[m];
        cummulativeCasesList.push(dEntry);
    }

    let sortedCummulativeCasesList=cummulativeCasesList.sort(compareDates);
    return sortedCummulativeCasesList;
}

// creates a list of sorted cases for each county; output = {indicatorId: { orgId: [date: xxxx-xx-xx, value: xx] }}

function getCummulativeCasesByOrgUnit(data) {

    let perIndicatorCountyData = {}
    let cummulativeCases = {};

    let cummulativeCasesList = [];

    for(var key in data.result.data){
        if(!(key in perIndicatorCountyData)) perIndicatorCountyData[key]={}; //indicator
        data.result.data[key].forEach(dataEntity => {
          if(!(dataEntity.ou in perIndicatorCountyData[key])) perIndicatorCountyData[key][dataEntity.ou]={}; //orgunit
            perIndicatorCountyData[key][dataEntity.ou][dataEntity.period]=dataEntity.value;
        });
    }


    for (var indicatorID in perIndicatorCountyData){

      for (var orgId in perIndicatorCountyData[indicatorID]){

        let countycummulativeCasesList=[];
        let summedCountycummulativeCasesList=[];

        for (var period in perIndicatorCountyData[indicatorID][orgId]){
          let dEntry= {};
          dEntry['date']=period;
          dEntry['value']=perIndicatorCountyData[indicatorID][orgId][period];
          countycummulativeCasesList.push(dEntry);
        }

        let sortedCountycummulativeCasesList=countycummulativeCasesList.sort(compareDates); //sort the values from earliest date

        //sum up the sorted by period per county cases.
        let cummulativeCount=0;
        sortedCountycummulativeCasesList.forEach(
          (dateValueCountyCases)=>{
            cummulativeCount=cummulativeCount+dateValueCountyCases.value;
            dateValueCountyCases.value=cummulativeCount;
            summedCountycummulativeCasesList.push(dateValueCountyCases)
          }
        );

        perIndicatorCountyData[indicatorID][orgId]=summedCountycummulativeCasesList;
      }

    }

    return perIndicatorCountyData;
}


function compareDates(a, b) {
  let d1 = new Date(a.date);
  let d2 = new Date(b.date);
  let same = d1.getTime() === d2.getTime();

  let comparison = 0;
  if (d1 > d2) {
    comparison = 1;
  } else if (d1 < d2) {
    comparison = -1;
  }
  return comparison;
}

//insert covid data value to geoJson for choropleth mapping
// indicId is the id of indicator to inject in the data
export function insertCovidValues(data, geoJson, indicId, indicatoName) {
    let counties = {};
    MapCenters.forEach(county=>{
      counties[county.dsl_id]=county.name;
    });

    let orderedData=getCummulativeCasesByOrgUnit(data);
    geoJson.features.forEach(countyData =>{
       for(let indicatorId in orderedData){
         if(indicatorId==indicId){
           for(var orgId in orderedData[indicatorId]){
             if(countyData.properties.AREA_NAME.toLowerCase()==counties[orgId].toLowerCase()){
               let len=orderedData[indicatorId][orgId].length-1 //the top most value on the list is the current value
               let caseValue =  orderedData[indicatorId][orgId][len].value;
               countyData.properties['density']=caseValue;
               countyData.properties['indicatorName']=indicatoName;
             }

           }
         }
       }
    });
    return geoJson;
}

//compares equality of two objects
export function isObjectEquivalent(a, b) {
    if(a==null && b==null){
      return true;
    }
    if(a==null) a={};
    if(b==null) b={};
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

//scale/normalize a range of numbers to another scale r1 is range to scale numbers from to the range r2
export function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
