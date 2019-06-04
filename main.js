// const baseURL="https://swapi.co/api/"

function getData(url, cb) { //cb is the function arg below. We are invoking a getData function and can avoid setting a Timeout.
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", url); // ex baseURl + type + "/"
    xhr.send();
    
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText)); // document.getElementById("data").innerHTML = cb
                                               // data = JSON.parse(this.responseText)
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) { //be just the next button
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {  
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data"); //reset everytime you click another button. Clean your sheet
    el.innerHTML =  "";
    
    getData(url, function(data) {
        
        var pagination = ""; 
        
        //console.log('data.next', data.next); //https://swapi.co/api/people/?page=2
        //console.log('data.previous', data.previous); //null
        
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous) //look it as a linked list
        }
        
        data = data.results;
        //console.log('data', data);
        
        //console.log('data[0]', data[0]);
        
        // console.log(data); // or // console.dir(data); // what access our data has. maybe insert it before the data.results to see all of its objs 
        var tableHeaders = getTableHeaders(data[0]); //data[0] is the first row
        
        data.forEach(function(item) {
            var dataRow = [];
            
            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0,15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            
              // Object.keys(item).forEach(function(key) { // Object.keys creates an array comprised of the keys in an object. 
                 // console.log(key); // Per row it prints all column keys
              // })
            
            // el.innerHTML += "<p>" + item.name + "</p>"; // item.name loops through the array per row (each individual JSON string) and prints the value of key name
            // if not using the +, then it will print only the very last of loop as it overwrites
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g,""); //replace all commas with empty strings that appear at the beginning. /g means global search
    });
}

/*

function getData(url, cb) { 
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", url, true); 
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText)); 
                                               
        }
    };
}
    
getData('https://swapi.co/api/people', function(data) {
    console.log(data);
    data = data.results;
    data.forEach(function(item) {
        Object.keys(item).forEach(function(key) {
            var rowData = item[key].toString();
            var truncatedData = rowData.substring(0,15);
            console.log(truncatedData);
        });
    });
});


Output:
{count: 87, next: "https://swapi.co/api/people/?page=2", previous: null, results: Array(10)}count: 87next: "https://swapi.co/api/people/?page=2"previous: nullresults: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]__proto__: Object
script.js:44 Luke Skywalker
script.js:44 172
script.js:44 77
script.js:44 blond
script.js:44 fair
script.js:44 blue
script.js:44 19BBY
script.js:44 male
5script.js:44 https://swapi.c
script.js:44 2014-12-09T13:5
script.js:44 2014-12-20T21:1
script.js:44 https://swapi.c
script.js:44 C-3PO
script.js:44 167
script.js:44 75
script.js:44 n/a
script.js:44 gold
script.js:44 yellow
script.js:44 112BBY

*/
