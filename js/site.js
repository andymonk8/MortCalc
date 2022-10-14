/* ---------- STEP BY STEP LIST?! ---------- */
//-----------------------------------------------
/* 
--- Get Values from User - Loan Amount, Terms (Months), Interest Rate?! 
--- Do Math (For Loop?!)
--- Display Math / Results?! For Different Variables / Variable Results?! Month?!, Payment?!, Principle?!, Interest?!,
Total Interest?!, Balance?! (Based on Array?! Etc.?!)
-
--- Do in Order of the Formulas?! That was Provided?! Etc.?!
*/
//-----------------------------------------------
/* ---------- FORMULAS USED?! ---------- */
//-----------------------------------------------
/*
--- Total Monthly Payment = (Loan Amount / Amount Loaned) x (Rate?! Interest Rate?! / 1200) / (1 - (1 + Rate / 1200)(^-Number of Months))

--- Remaining Balance before the very first month equals the amount of the loan.?! (Balance / Remaining Balance / Etc.?! = Total Loan Amount - Principal?!)
(Perhaps for First, it's just Loan Amount - Principal, than take that New Balance Number / Sum?! / Etc.?! and -Minus- Again with Principal / New Prinicpal / Etc.?!)

--- Interest Payment =  Previous Remaining Balance x Rate / 1200 
- 1?! (Perhaps for First, it's just Loan Amount - Principal, than take that New Balance Number / Sum?! / Etc.?! and -Minus- Again with Principal / New Prinicpal / Etc.?!)

--- Principal = Total Monthly Payment - Interest Payment

--- At end each month, Remaining Balance = Previous Remaining Balance - principal payments
(Perhaps for First, it's just Loan Amount - Principal, than take that New Balance Number / Sum?! / Etc.?! and -Minus- Again with Principal / New Prinicpal / Etc.?!)

*/
//-----------------------------------------------
/* ---------- CODE STUFF?! ---------- */
//-----------------------------------------------
/*
--- Replace / Edit / Adjust / Etc. Build Drop Down with Fizz Buzz Get Value
---
*/



// this initial dataset for superdog.
//It is an array of objects
const events = [
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

//builds a list of specific cities. Entry point for our App
function buildDropDown() {
  let eventDD = document.getElementById("eventDropDown");
  eventDD.innerHTML = "";

  //grab my template from the template tag
  const template = document.getElementById("cityDD-template");

  let curEvents = getEventData();

  //filter our array by distinct cities
  ///["new york","san diego", "charlotte"];
  let citiesOnly = curEvents.map((event) => event.city);

  //distinct set
  let distinctEvents = [...new Set(citiesOnly)];

  //<ul class="dropdown-menu"></ul>
  let ddul = document.createElement("ul");
  ddul.classList.add("dropdown-menu");

  //Add the all item
  let ddlItemNodeAll = document.importNode(template.content, true);
  let cityName = `All`;
  //this returns <a class="dropdown-item" onclick="getEvents(this)" data-string="New York"  >New York</a>
  let ddItemAll = ddlItemNodeAll.querySelector("a");
  ddItemAll.textContent = cityName;
  ddItemAll.setAttribute("data-string", cityName);

  //add the item to the ul
  ddul.appendChild(ddlItemNodeAll);

  for (let i = 0; i < distinctEvents.length; i++) {
    //this gets the <li><a></a></li> from the template --- / ---- " <li><a class="dropdown-item" onclick="getEvents()"></a></li> "
    let ddlItemNode = document.importNode(template.content, true);
    let cityName = distinctEvents[i];
    //this returns <a class="dropdown-item" onclick="getEvents(this)" data-string="New York"  >New York</a>
    let ddItem = ddlItemNode.querySelector("a");
    ddItem.textContent = cityName;
    ddItem.setAttribute("data-string", cityName);

    //add the item to the ul
    ddul.appendChild(ddlItemNode);

    //<ul>
    //<li><a></a></li>
    //</ul>
  }

  eventDD.appendChild(ddul);

  //display the stats for all events
  displayStats(curEvents);

  //load the data in the grid
  displayEventData();
}

//called from our dropdown items
function getEvents(element) {
  let city = element.getAttribute("data-string");

  let curEvents = getEventData();

  let statsHeader = document.getElementById("statsHeader");

  statsHeader.innerHTML = `Stats For ${city} Events`;

  //display stats for all or the selected city
  let filteredEvents = curEvents;

  if (city != "All") {
    //filter the array by cityname
    filteredEvents = curEvents.filter(function (event) {
      if (event.city == city) {
        return event;
      }
    });
  }

  //call a function with a list of events
  displayStats(filteredEvents);
}
//display the stats for the selected city
function displayStats(events) {
  let total = 0;
  let average = 0;
  let most = 0;
  let least = -1;

  total = totalAttendance(events);
  document.getElementById("total").innerHTML = total.toLocaleString();

  average = averageAttendance(events, total);
  document.getElementById("average").innerHTML = average.toLocaleString(
    "en-US",
    { minimumFractionDigits: 0, maximumFractionDigits: 0 }
  );

  least = leastAttendance(events);
  document.getElementById("least").innerHTML = least.toLocaleString();

  most = mostAttendance(events);
  document.getElementById("most").innerHTML = most.toLocaleString();
}

function totalAttendance(events) {
  let totalAttendance = 0;

  for (let index = 0; index < events.length; index++) {
    totalAttendance += events[index].attendance;
  }

  return totalAttendance;
}

function averageAttendance(events, totalAttendance) {
  let averageAttendance = 0;

  //  for (let index = 0; index < events.length; index++) {
  //    averageAttendance += events[index].attendance;
  //  }

  averageAttendance = totalAttendance / events.length;

  //--Bobby " return averageAttendance/events.length; " --/
  return averageAttendance;
}

function leastAttendance(events) {
  let least = -1;
  for (let index = 0; index < events.length; index++) {
    let currentAttendance = events[index].attendance;

    if (least > currentAttendance || least < 0) {
      least = currentAttendance;
    }

    return least;
  }
}

function mostAttendance(events) {
  let most = 0;
  for (let index = 0; index < events.length; index++) {
    let currentAttendance = events[index].attendance;

    if (most < currentAttendance) {
      most = currentAttendance;
    }
  }
  return most;
}

/*
function mostAttendance(events) {
  let mostAttendance = 0;
  mostAttendance = math.max(...events.map(item=>item.attendance));

  return mostAttendance;
}
*/

//retrieve data from local storage.
function getEventData() {
  let curEvents = JSON.parse(localStorage.getItem("eventData"));

  if (curEvents == null) {
    curEvents = events;
    localStorage.setItem("eventData", JSON.stringify(curEvents));
  }

  return curEvents;
}

//Displays the Event Data in the Grid
function displayEventData() {
  //get the template
  const template = document.getElementById("eventData-template");

  //get the location where the template will be written - and or also placed
  const eventBody = document.getElementById("eventBody");
  eventBody.innerHTML = "";

  let curEvents = getEventData();

  for (let index = 0; index < curEvents.length; index++) {
    const eventRow = document.importNode(template.content, true);

    const eventCols = eventRow.querySelectorAll("td");

    eventCols[0].textContent = curEvents[index].event;
    eventCols[1].textContent = curEvents[index].city;
    eventCols[2].textContent = curEvents[index].state;
    eventCols[3].textContent = curEvents[index].attendance;

    //format the date for the page
    let eventDate = new Date(curEvents[index].date).toLocaleDateString();

    eventCols[4].textContent = eventDate;

    eventBody.appendChild(eventRow);
  }
}

//saves a new event to a local storage
function saveEventData() {

  let curEvents = getEventData();

  /*  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  } */
  let newEventObj = {};

  newEventObj["event"] = document.getElementById("newEventName").value;
  newEventObj["city"] = document.getElementById("newEventCity").value;
  
  let stateSel = document.getElementById("newEventState");
  newEventObj["state"] = stateSel.options[stateSel.selectedIndex].text;

  newEventObj["attendance"] = parseInt(document.getElementById("newEventAttendance").value,10);

  let eventDate = document.getElementById("newEventDate").value;
  let eventDate2 = `${eventDate} 00:00`;
  newEventObj["date"] = new Date(eventDate2).toLocaleDateString();

  curEvents.push(newEventObj);

  localStorage.setItem("eventData", JSON.stringify(curEvents));

  buildDropDown();

}



/* ----- FizzBuzz / Fizz Buzz to Collect User Input?! ----- */
/* " //get starting values from the scree
//Controller Function

function getValues() {
  // get the values from the page
  let fizzValue = document.getElementById("fizzValue").value;
  let buzzValue = document.getElementById("buzzValue").value;
  let customValue = document.getElementById("customValue").value;

  // parse the values in to integers
  fizzValue = parseInt(fizzValue);
  buzzValue = parseInt(buzzValue);
  customValue = parseInt(customValue);

  if (Number.isInteger(fizzValue) && Number.isInteger(buzzValue) && fizzValue > 0 && buzzValue > 0 && Number.isInteger(customValue)) {
    // generate the numbers based on user input
    let numbers = generateFizzBuzz(fizzValue, buzzValue, customValue);

    // display result on page
    displayFizzBuzz(numbers);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Only intergers and numbers greater than 0 are allowed for FizzBuzz!",
    });
  }
}

function generateFizzBuzz(fizzValue, buzzValue, customValue) {
  let fizzbuzz = [];
  let cap = customValue;

  for (let i = 1; i <= cap; i++) {
    if((i % fizzValue == 0) && (i % buzzValue == 0)){
      fizzbuzz.push('FizzBuzz');
    }
    else if(i % fizzValue == 0){
      fizzbuzz.push('Fizz')
    }
    else if(i % buzzValue == 0){
      fizzbuzz.push('Buzz')
    }    
    else{
      fizzbuzz.push(i);
    }
  }

  return fizzbuzz;
}

function displayFizzBuzz(numbers) {
  let className = "even";
  let templateRows = "";

  for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];

    if (i % 10 == 0) {
      templateRows += "<tr>";
    }

    templateRows += `<td class="${className}"> ${number} </td>`;

    //An templateRows += `<tr><td class="${className}">${number}</td></tr>`;

    if ((i + 1) % 10 == 0) {
      templateRows += "</tr>";
    }
  }

  document.getElementById("results").innerHTML = templateRows;
} " */