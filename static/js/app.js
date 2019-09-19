//Read in JSON
var idsData = [];
var metaData = [];
var jsonData = [];
var samplesData = [];

console.log("start")
d3.json("../static/js/samples.json").then(data => {
    console.log('data',data);
    jsonData = data;
    samplesData = data.samples[0];
    idsData = data.names;
    var samplesValues = samplesData.sample_values
    metaData = data.metadata[0];
    var otuLabels = samplesData.otu_labels;
    var otuIds = samplesData.otu_ids;
    console.log("samples",samplesData);
    console.log("ids",idsData);
    console.log("sample values",samplesValues);
    console.log("metadata",metaData);
    console.log("otu_labels",otuLabels);
    console.log("otu_ids",otuIds);
    var trace1 = {
        x: samplesData.otu_ids,
        y: samplesValues,
        type:"bar",
        orientation: 'h'
    };
    //panel data init()
    metaDataFunction(0);


    //binding data
    //This populates the dropdown list in html using dynamic D3 data binding
    // @wl - this code is working.  I am able to populate the dropdown
    d3.select("#selDataset").selectAll("option")
        .data(idsData)
        .enter()
        .append("option")
        .html(function(d){
            //console.log(d)
            return `<option value="${d}">${d}</option>`
        });

    //create data for bar plot
    var data = [trace1];

    // Define the plot layout
    var layout = {
    title: "OTU sample count",
    yaxis: { title: "OTU_ID" },
    xaxis: { title: "Sample value" }
    };

    // Plot the chart to a div tag with id "plot"
    //#wlPlotly.newPlot("bar", data, layout);

    //sort and slice for top10
    var tempObject = []
    for (var i = 0; i < otuIds.length; i++) {
        
            tempObject.push({
            otu_id : `otu ID: ${otuIds[i]}`,
     
            otu_labels : otuLabels[i],
            sample_values : samplesValues[i]
        });
    }

    // var sortedSamplesValues = samplesValues.sort((a,b)=> b.samplesValues - a.samplesValues);
    // console.log("sorted",sortedSamplesValues);
    // var slicedSamplesValues = sortedSamplesValues.slice(0,10);
    // console.log("top10",slicedSamplesValues)

    var sortedSamplesValues = tempObject.sort((a,b)=> b.samplesValues - a.samplesValues);
    //console.log("sorted",sortedSamplesValues);
    var slicedSamplesValues = sortedSamplesValues.slice(0,10);
    var reversedData = slicedSamplesValues.reverse();
    console.log("top10_reversedData",reversedData)

    var trace3 = {
      y: reversedData.map(object => object.otu_id),
      x: reversedData.map(object => object.sample_values),
      text: reversedData.map(object=>object.otu_labels),
      type:"bar",
      orientation: 'h'
  };
    var data2 = [trace3];
    Plotly.newPlot("bar", data2, layout);

    //metadata
    var id = metaData.id;
    var ethnicity = metaData.ethnicity;
    var gender = metaData.gender;
    var age = metaData.age;
    var location = metaData.location;
    var bbtype = metaData.bbtype;
    var wfreq = metaData.wfreq;
    // console.log("id",id);
    // console.log("ethnicity", ethnicity);
    // console.log("gender",gender);
    // console.log("age",age);
    // console.log("location",location);
    // console.log("bbtype",bbtype);
    // console.log("wfreq",wfreq);

    //bubble chart
    var trace2 = {
        x: otuIds,
        y: samplesValues,
        mode: 'markers',
        marker: {
          size: samplesValues,
          color: otuIds
        },
        text: otuLabels   
      };
      
      var data = [trace2];
      
      var layout = {
        title: 'bubble chart samples',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);  

});

function metaDataFunction(index){
    metaData = jsonData.metadata[index];
    //metadata
    var id = metaData.id;
    var ethnicity = metaData.ethnicity;
    var gender = metaData.gender;
    var age = metaData.age;
    var location = metaData.location;
    var bbtype = metaData.bbtype;
    var wfreq = metaData.wfreq;
    // console.log("id",id);
    // console.log("ethnicity", ethnicity);
    // console.log("gender",gender);
    // console.log("age",age);
    // console.log("location",location);
    // console.log("bbtype",bbtype);
    // console.log("wfreq",wfreq);
    var panelData = [];
    panelData = [
        {"id":id},
        {"ethnicity": ethnicity},
        {"gender": gender},
        {"age": age},
        {"location":location},
        {"bbtype":bbtype},
        {"wfreq":wfreq}
    ]

    //<p class="card-text">Some quick example text to build on the panel title and make up the bulk of the panel's content.</p>

    //binding data  
    d3.select("#sample-metadata")
      .html(() => {return '';});
    // console.log("test data");
    
    d3.select("#sample-metadata").selectAll("p")
        .data(panelData)
        .enter()
        .append("p")
        .html(function(d,index){
            // console.log("panel data",d);
            //return `<option value="${d}">${d}</option>`
            return `${Object.keys(d)}: ${Object.values(d)}`
            //${d[index]}: ${d.value} ${index} ${d} ${d.name} ${d.key} ${d["id"]} ${d[0]} ${d[1]}
        });
};

function ChartFunction(index){
    samplesData = jsonData.samples[index];
    console.log("samples data", samplesData);
    var samplesValues = samplesData.sample_values
    var otuLabels = samplesData.otu_labels;
    var otuIds = samplesData.otu_ids;
    //bubble chart
    var trace2 = {
        x: otuIds,
        y: samplesValues,
        mode: 'markers',
        marker: {
          size: samplesValues,
          color: otuIds
        },
        text: otuLabels   
      };
      
      var data = [trace2];
      
      var layout = {
        title: 'bubble chart samples',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);


//####wl - slice top10





    //Horizonal bar chart
    var trace1 = {
        x: otuIds,
        y: samplesValues,
        type:"bar",
        orientation: 'h'
    };    

    //create data for bar plot
    var data = [trace1];

    // Define the plot layout
    // var layout = {
    // title: "OTU sample count",
    // xaxis: { title: "OTU_ID" },
    // yaxis: { title: "Sample value" }
    // };

    // Plot the chart to a div tag with id "plot"
    //Plotly.newPlot("bar", data, layout);

// Define the plot layout
var layout = {
  title: "OTU sample count",
  yaxis: { title: "OTU_ID" },
  xaxis: { title: "Sample value" }
  };

  // Plot the chart to a div tag with id "plot"
  //#wlPlotly.newPlot("bar", data, layout);

  //sort and slice for top10
  var tempObject = []
  for (var i = 0; i < otuIds.length; i++) {
      
          tempObject.push({
          otu_id : `otu ID: ${otuIds[i]}`,
   
          otu_labels : otuLabels[i],
          sample_values : samplesValues[i]
      });
  }

  // var sortedSamplesValues = samplesValues.sort((a,b)=> b.samplesValues - a.samplesValues);
  // console.log("sorted",sortedSamplesValues);
  // var slicedSamplesValues = sortedSamplesValues.slice(0,10);
  // console.log("top10",slicedSamplesValues)

  var sortedSamplesValues = tempObject.sort((a,b)=> b.samplesValues - a.samplesValues);
  //console.log("sorted",sortedSamplesValues);
  var slicedSamplesValues = sortedSamplesValues.slice(0,10);
  var reversedData = slicedSamplesValues.reverse();
  console.log("top10_reversedData",reversedData)

  var trace3 = {
    y: reversedData.map(object => object.otu_id),
    x: reversedData.map(object => object.sample_values),
    text: reversedData.map(object=>object.otu_labels),
    type:"bar",
    orientation: 'h'
};
  var data2 = [trace3];
  Plotly.newPlot("bar", data2, layout);




};

function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    var dropDownValue = dropdownMenu.property("value");
    var index = idsData.indexOf(dropDownValue);
    console.log(dropDownValue);
    console.log("drop down index",index);
    metaDataFunction(index);
    ChartFunction(index);
};




    
