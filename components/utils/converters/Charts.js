//recharts format
export function ConvertToMonthlyLineGraph(_data){
  console.log("debug ===>");
  console.log(_data);
  const data = [
    {
      name: 'Jan', value: null
    },
    {
      name: 'Feb', value: null
    },
    {
      name: 'Mar', value: null
    },
    {
      name: 'Apr', value: null
    },
    {
      name: 'May', value: null
    },
    {
      name: 'Jun', value: null
    },
    {
      name: 'Jul', value: null
    },
    {
      name: 'Aug', value: null
    },
    {
      name: 'Sep', value: null
    },
    {
      name: 'Oct', value: null
    },
    {
      name: 'Nov', value: null
    },
    {
      name: 'Dec', value: null
    },
  ];
  var mapData=null;
  for(var key in _data){
    mapData=_data[key];
  }
  if(mapData!=null || mapData!=undefined){
    var lineGraphData= [];
    mapData.map(singleMap => {
      var entry = {};
      var month=singleMap['period'].slice(-2);
      data[parseInt(month)-1]['value']=singleMap['value'];
    });
    return data;
  }else return null;

}

//highcharts format
export function ConvertToMonthlyLineGraph2(_data){
  console.log("debug ===>");
  console.log(_data.data);

  let indicatorList =_data.dictionary.indicators;
  let indicatorMap ={}; //indicator mete data placeholder
  indicatorList.map(indicatorMeta => {
    let singleIndicMap={};
    singleIndicMap['last_updated']= indicatorMeta.last_updated;
    singleIndicMap['date_created']= indicatorMeta.date_created;
    singleIndicMap['name']= indicatorMeta.name;
    singleIndicMap['description']= indicatorMeta.description;
    singleIndicMap['source']= indicatorMeta.source;
    indicatorMap[indicatorMeta.id] = singleIndicMap;
  });

  const data = [];

  var mapData=null;

  for(var key in _data.data){
    console.log("debug 0");
    console.log(key);
    mapData=_data.data[key];
    console.log("=====");
    console.log(mapData);
    if(mapData!=null || mapData!=undefined){
      var orgUnitIndicatorData = {};
      var lineGraphData= [];
      let indicName = indicatorMap[key]['name'];
      console.log("debug 1");
      console.log(indicName);
      mapData.map(singleMap => {
        if(!(singleMap['ou'] in orgUnitIndicatorData)){
          orgUnitIndicatorData[singleMap['ou']]={
            name: indicName,
            data: [null, null, null, null, null, null, null, null, null, null, null, null]
          };
        }
        var month=singleMap['period'].slice(-2);
        orgUnitIndicatorData[singleMap['ou']].data[parseInt(month)-1]=Number(singleMap['value']);
        console.log("debug 2");
        console.log(orgUnitIndicatorData);
      });

      for(var key in orgUnitIndicatorData){
        data.push(orgUnitIndicatorData[key]);
        console.log("debug 3");
      }
      console.log(data)
      return data;
    }else{
      console.log("got data");
      console.log(data);
      return null
    };
  }

}



// _data is a js object/map
export function ConvertToLineBarGraph(_data){
  const data = [];
  for(var key in _data){
    let mapEntity= {};
    mapEntity['name']=key;
    mapEntity['value']=Number(_data[key]);
    data.push(mapEntity);
  }
  return data;
}

//convert api data to (highcharts) pie chart
export function ConvertToCadreGroupPieChart(_data,_name){
  let seriee=[];
  let data=[]
  var counter=0;
  _data.map((item) => {
    let dataEntity;
    if(counter==0){
       dataEntity={"name": item.cadre, "y": Number(item.cadreCount),"sliced": true, "selected": true};
    }else{
       dataEntity={"name": item.cadre, "y": Number(item.cadreCount)};
    }
    data.push(dataEntity);
    counter=counter+1;
  })

  let envelop = {};
  if(_name!=null || _name!= undefined){
    envelop["name"] = _name;
  }
  envelop["colorByPoint"] = true;
  envelop["data"]=data;
  seriee.push(envelop);
  return seriee;
}


//convert api data to (highcharts) pie chart
export function ConvertToCadreTable(_data){
  let data=[]
  var counter=1;
  _data.map((item) => {
    let dataEntity;
    dataEntity={id: counter, Cadre: item.cadre, Count: item.cadreCount};
    data.push(dataEntity);
    counter=counter+1;
  })
  return data;
}



//takes a map of the format {cadreGroupName: cadreGroupCount}
export function ConvertToCadreSimplePieChart(_data){
  var mapData=[];
  for(var key in _data){
    var data={};
    data['name']=key;
    data['value']=_data[key];
    mapData.push(data);
  }
  return mapData;
}
