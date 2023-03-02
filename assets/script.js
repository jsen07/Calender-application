$( document ).ready(function() {
    console.log( "ready!" );
  
  
  
  setInterval(function() {
    let now = dayjs();
  
    $('#currentDay').text(now.format('D MMMM YYYY'));  //display date
    $('#currentTime').text(now.format('H:mm:ss A')) //display time
  }, 1000); //set interval to increment seconds of the time 

  let now = dayjs();
  
  
  for (var i = 9; i < 18; i++) { 
      const tasksToDo = JSON.parse(localStorage.getItem("hour-"+ i)); //loop through local storage 
    if(tasksToDo !== null) {
    $('[id^="hour-"]').each(function() { 
    if ($(this).attr('id') === tasksToDo.time) {  //if id matches the time in local storage 
      $(this).find("textarea").val(tasksToDo.do); //find the sibling element textarea and set value to the property stored in localstorage
    }
  });
     }
    }
  
  $('[id^="hour-"]').each(function () { //for each div starting with id find button sibling
    let newHour = $(this ).attr('id').replace('hour-', ''); //get the hour in the id
    $(this).attr("timeOfDay", newHour); //sets value attribute to the schedules hour
    let schedHour = parseInt($(this).attr("timeOfDay")); // get schedule hour
    let currentHour = parseInt(now.format('H')); //get current hour
  
    if (schedHour > currentHour) { // if the calander hour is greater than the current time then add future class
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    }
  
    else if (schedHour === currentHour) { // if the calander hour is equal to the current time then add present class
      $(this).addClass("present");
      $(this).removeClass("future");
      $(this).removeClass("past");
    }
  
    else if (schedHour < currentHour) { // if the calander hour is less than the current time then add past class
      $(this).addClass("past");
      $(this).removeClass("future");
      $(this).removeClass("present");
    
    }
    $(this).find('button').click(function () {
  
      let parent = $(this).parent(); //get parent element of button
       let time = parent.attr("id"); //get attribute of parent element
       let toDo = parent.find("textarea").val(); //get sibling element textarea value
  
      tasks = { //store properties in tasks object
        time: time,
        do: toDo
      };
  
      localStorage.setItem(time, JSON.stringify(tasks)); //store into local storage
      $.fn.update(parent); // then do update function
    });
  
  });
  
  $.fn.update = function(parentEl){  //sets the value of the textarea to the value that the user inputted into the textarea
  
    let parent = parentEl;
    for (var i = 9; i < 18; i++) {
    let tasksToDo = JSON.parse(JSON.stringify(localStorage.getItem("hour-"+ i)));
  if(tasksToDo !== null) {
  if (parent.attr('id') === tasksToDo.time) {
    let doTask = tasksToDo.do;
  
    parent.find("textarea").val(doTask);
  }
   }
  }
  }
  
  });
  