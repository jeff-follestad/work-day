
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
});

function createHourRow(hour) {
  let hourLabel = document.createElement("div");
  hourLabel.className = "col-sm-3 col-md-2 col-lg-1 hour text-right";
  hourLabel.innerText = moment().hour(hour).format("ha");

  let inputField = document.createElement("textarea");
  inputField.className = "col description";
  inputField.innerText = getStoredEvent(hour);

  let saveButton = document.createElement("button");
  saveButton.className = "col-sm-3 col-md-2 col-lg-1 saveBtn btn";
  saveButton.innerHTML = '<i class="far fa-save fa-lg"></i>';
  saveButton.dataset.hour = hour;
  saveButton.addEventListener("click", saveButtonClicked);

  let rowElement = document.createElement("div");
  rowElement.className = "row calendar-event " + getRowBackgroundClass(hour);
  rowElement.appendChild(hourLabel);
  rowElement.appendChild(inputField);
  rowElement.appendChild(saveButton);
  return rowElement;
}

function saveButtonClicked() {
  let hourToSaveFor = $(this).data("hour");
  let eventText = $(this).siblings(".description").val();
  setStoredEvent(hourToSaveFor, eventText);
}

function getStoredEvents() {
  let currentStoredAgenda = localStorage.getItem("work-day-agenda");
  if (currentStoredAgenda == null) {
    return {};
  } else {
    return JSON.parse(currentStoredAgenda);
  }
}

function getStoredEvent(hour) {
  let event = getStoredEvents()[hour];
  if (event == undefined) {
    return "";
  }
  return event;
}

function setStoredEvent(hour, event) {
  let storedEvents = getStoredEvents();
  storedEvents[hour] = event;
  localStorage.setItem("work-day-agenda", JSON.stringify(storedEvents));
}

function getRowBackgroundClass(hour) {
  let currentHour = new Date().getHours();
  if (hour > currentHour) {
    return "future";
  } else if (hour < currentHour) {
    return "past";
  } else {
    return "present";
  }
}
