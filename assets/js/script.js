
const WORK_START_HOUR = 9; // 9am
const WORK_END_HOUR = 17; // 5pm
const NOON_HOUR = 12;

function displayCurrentTime() {
  let currentDateTime = moment().format('dddd, MMMM Do');
  $("#current-time-header").text(currentDateTime);
}

function displayHourRows() {
  let rowContainer = $("#row-container");
  for (var hour = WORK_START_HOUR; hour <= WORK_END_HOUR; hour++) {
    let row = createHourRow(hour);
    rowContainer.append(row);
  }
}

$(document).ready(function () {
  displayCurrentTime();
  displayHourRows();

  //Set up local storage to store persistent changes in events by timeblock
  // button.on('click', function (event) {
  //   event.preventDefault();
  //   var text = $(this).siblings('.col-sm-10').val().replace(/['"]+/g, '');
  //   var parent = $(this).parent().attr('id');
  //   localStorage.setItem(parent, JSON.stringify(text));
  // })
});


// Set styling so that business hours that have passed are greyed out;  if / else for time component 
// Set styling so that the current time/hour is a red color;
// Set styling so that hours that have not yet occured are in green 

function createHourRow(hour) {
  const rowIndex = hour - WORK_START_HOUR;
  const hourRightNow = new Date().getHours();

  let hourLabel = document.createElement("div");
  hourLabel.className = "col-sm-1 hour text-right";
  hourLabel.innerText = moment().hour(hour).format("ha");

  let inputField = document.createElement("textarea");
  inputField.className = "col-sm-10 description";

  let saveButton = document.createElement("button");
  saveButton.className = "col-sm-1 saveBtn btn";
  saveButton.innerHTML = '<i class="far fa-save fa-lg"></i>';
  saveButton.dataset.rowIndex = rowIndex;
  // saveButton.addEventListener("click", selectedAnswer);

  let rowElement = document.createElement("div");
  rowElement.className = "row calendar-event";
  rowElement.appendChild(hourLabel);
  rowElement.appendChild(inputField);
  rowElement.appendChild(saveButton);
  return rowElement;
}
