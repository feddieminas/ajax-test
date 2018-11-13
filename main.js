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
        
        var pagination; 
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous) //look it as a linked list
        }
        
        data = data.results;
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

