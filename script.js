// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    
  // Display current day 
  var currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);

  // Made Time blocks
  var businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  for (var i = 0; i < businessHours.length; i++) {
    var hour = businessHours[i];
    var timeBlock = $("<div>").addClass("row time-block");
    var hourColumn = $("<div>").addClass("col-md-2 hour").text(hour);
    var textArea = $("<textarea>").addClass("col-md-9 description");

    // Check block for tense
     var currentHour = dayjs().hour();
     var blockHour = parseInt(hour);
     if (blockHour < currentHour) {
       textArea.addClass("past");
     } else if (blockHour === currentHour) {
       textArea.addClass("present");
     } else {
       textArea.addClass("future");
     }

     // Local storage load for time block
    var savedEvent = localStorage.getItem(hour);
    if (savedEvent !== null) {
      textArea.val(savedEvent);
    }

    var saveButton = $("<button>").addClass("col-md-1 saveBtn").html("<i class='fas fa-save'></i>");

    // Save local when clicked
    saveButton.click(function() {
        var eventText = $(this).siblings(".description").val();
        localStorage.setItem(hour, eventText);
      });
  
      timeBlock.append(hourColumn, textArea, saveButton);
      $(".container").append(timeBlock);
    }

  });
  