
const WORK_START_HOUR = 9; // 9am
const HOURS_IN_WORK_DAY = 8; // 9am+8 = 5pm.

function displayCurrentTime() {
  let currentDateTime = moment().format('dddd, MMMM Do');
  $("#current-time-header").text(currentDateTime);
}

$(document).ready(function () {
  displayCurrentTime();

  //Create code that adds in business hours (9am - 5pm) into file for adding in hourly events to the left of the 
  //event text box
  let rowContainer = $("#row-container");
  for (var index = 0; index <= HOURS_IN_WORK_DAY; index++) {
    let currentHour = index + WORK_START_HOUR;
    let row = createHourRow(currentHour, index);
    rowContainer.append(row);
  }

  //Set styling so that business hours that have passed are greyed out;  if / else for time component 
  //Set styling so that the current time/hour is a red color;
  //Set styling so that hours that have not yet occured are in green 

  //Set up local storage to store persistent changes in events by timeblock
  // button.on('click', function (event) {
  //   event.preventDefault();
  //   var text = $(this).siblings('.col-sm-10').val().replace(/['"]+/g, '');
  //   var parent = $(this).parent().attr('id');
  //   localStorage.setItem(parent, JSON.stringify(text));
  // })
});

function createHourRow(hour, index) {
  let hourLabel = document.createElement("div");
  hourLabel.className = "col-sm-1 hour text-right";
  hourLabel.innerText = hour; // TODO: Want to add am/pm suffix.

  let inputField = document.createElement("textarea");
  inputField.className = "col-sm-10 description";

  let saveButton = document.createElement("button");
  saveButton.className = "col-sm-1 saveBtn btn";
  saveButton.innerHTML = '<i class="far fa-save fa-lg"></i>';
  saveButton.dataset.rowIndex = index;
  // saveButton.addEventListener("click", selectedAnswer);

  let rowElement = document.createElement("div");
  rowElement.className = "row calendar-event";
  rowElement.appendChild(hourLabel);
  rowElement.appendChild(inputField);
  rowElement.appendChild(saveButton);
  return rowElement;
}
