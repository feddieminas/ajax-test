const baseURL="https://swapi.co/api/"

function getData(type, cb) { //cb is the function arg below. We are invoking a getData function and can avoid setting a Timeout.
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", baseURL + type + "/");
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

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data"); //reset everytime you click another button. Clean your sheet
    el.innerHTML =  "";
    
    getData(type, function(data) {
        data = data.results;
        // console.log(data); // or // console.dir(data); // what access our data has 
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
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}

