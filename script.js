// When my app loads for the first time
window.onload = function() {

    let toDoList = [];
    //Sharing Function

    //encoding the toDoList
    const url = "/" + encodeURIComponent(JSON.stringify(toDoList));
    console.log(url);
    //if URL has a search parameter
    if (window.location.search !== "")
    {
        //looks at url for encoded search parameters
        const params = new URLSearchParams(window.location.search)
        const todosString = params.get("toDoList") 

        //decoding the url
        const decodedToDo = decodeURIComponent(todosString);
        if (todosString !== null) {
            return JSON.parse(decodedToDo)}  
            else{return []};}



    console.log(toDoList)
    
    //declaring the local storage retrieval function
    const getFromStorage = (key) => {
    // array has been saved as a JSON string, parse will make it an array again
    //  need to handle scenario where localStorage.getItem(key) = null
    let x= localStorage.getItem(key);
    if (x == null || x == undefined)
    {
        return []
    }
    else{
        return JSON.parse(x);
    }
    };
    
    //calling the function with our key which is toDoKey
    toDoList = getFromStorage("toDoKey");
    console.log(toDoList)

    const storeInStorage=(key, data)=>{
        if(!data)
        {
            return
        }
        // Data needs to be a string but is an array of objects
        const dataString = JSON.stringify(data)

        localStorage.setItem(key, dataString)
    }

    
 



const start_Button = document.querySelector("#startButton");
const introScreen = document.querySelector(".start");
const main = document.querySelector(".main");
let toDo = document.getElementById("toDo");
let toDoDate = document.getElementById("toDoDate");
const submit = document.getElementById("submit");

start_Button.addEventListener("click", ()=>
{introScreen.classList.add("fadeOut");
main.classList.add("fadeIn");
});

submit.addEventListener("click", ()=>
{
    responseToDo = toDo.value;
    responseToDoDate = toDoDate.value;
    responseToDo = {TODO:toDo.value,DueDate:toDoDate.value, Completed: false};
    // responseToDo = { id: num, start : startDate, end: endDate, title: titl, description:descript, allDay: allD, free : fr, color: colour}
    console.log(toDo.value + toDoDate.value);
    console.log(responseToDo)
    toDo.value = "";
    toDoDate.value= "";
    toDoList.push(responseToDo);
    storeInStorage("toDoKey", toDoList)

} )


};

var oldEvent,
    tempEvent = {},
    deleteEvent,
    restoreEvent,
    titleInput = document.getElementById('event-title'),
    descriptionTextarea = document.getElementById('event-desc'),
    allDaySwitch = document.getElementById('event-all-day'),
    freeSegmented = document.getElementById('event-status-free'),
    busySegmented = document.getElementById('event-status-busy'),
    deleteButton = document.getElementById('event-delete'),
    datePickerResponsive = {
        medium: {
            controls: ['calendar'],
            touchUi: false
        }
    },
    datetimePickerResponsive = {
        medium: {
            controls: ['calendar', 'time'],
            touchUi: false
        }
    },
    now = new Date(),
    myData = [{
        id: 1,
        start: '2021-09-08T13:00',
        end: '2021-09-08T13:30',
        title: 'Lunch @ Butcher\'s',
        description: '',
        allDay: false,
        free: true,
        color: '#26c57d'
    }, {
        id: 2,
        start: '2021-09-19T15:00',
        end: '2021-09-19T16:00',
        title: 'General orientation',
        description: '',
        allDay: false,
        free: false,
        color: '#fd966a'
    }, {
        id: 3,
        start: '2021-09-18T18:00',
        end: '2021-09-18T22:00',
        title: 'Dexter BD',
        description: '',
        allDay: false,
        free: true,
        color: '#37bbe4'
    }, {
        id: 4,
        start: '2021-09-20T10:30',
        end: '2021-09-20T11:30',
        title: 'Stakeholder mtg.',
        description: '',
        allDay: false,
        free: false,
        color: '#d00f0f'
    }];

function createAddPopup(elm) {
    // hide delete button inside add popup
    deleteButton.style.display = 'none';

    deleteEvent = true;
    restoreEvent = false;

    // set popup header text and buttons for adding
    popup.setOptions({
        headerText: 'New event',
        buttons: ['cancel', {
            text: 'Add',
            keyCode: 'enter',
            handler: function () {
                calendar.updateEvent({
                    id: tempEvent.id,
                    title: tempEvent.title,
                    description: tempEvent.description,
                    allDay: tempEvent.allDay,
                    start: tempEvent.start,
                    end: tempEvent.end,
                    color: tempEvent.color,
                });

                // navigate the calendar to the correct view
                calendar.navigate(tempEvent.start);

                deleteEvent = false;
                popup.close();
            },
            cssClass: 'mbsc-popup-button-primary'
        }]
    });

    // fill popup with a new event data
    mobiscroll.getInst(titleInput).value = tempEvent.title;
    mobiscroll.getInst(descriptionTextarea).value = '';
    mobiscroll.getInst(allDaySwitch).checked = true;
    range.setVal([tempEvent.start, tempEvent.end]);
    mobiscroll.getInst(busySegmented).checked = true;
    range.setOptions({ controls: ['date'], responsive: datePickerResponsive });

    // set anchor for the popup
    popup.setOptions({ anchor: elm });

    popup.open();
}

function createEditPopup(args) {
    var ev = args.event;

    // show delete button inside edit popup
    deleteButton.style.display = 'block';

    deleteEvent = false;
    restoreEvent = true;

    // set popup header text and buttons for editing
    popup.setOptions({
        headerText: 'Edit event',
        buttons: ['cancel', {
            text: 'Save',
            keyCode: 'enter',
            handler: function () {
                var date = range.getVal();
                // update event with the new properties on save button click
                calendar.updateEvent({
                    id: ev.id,
                    title: titleInput.value,
                    description: descriptionTextarea.value,
                    allDay: mobiscroll.getInst(allDaySwitch).checked,
                    start: date[0],
                    end: date[1],
                    free: mobiscroll.getInst(freeSegmented).checked,
                    color: ev.color,
                });

                // navigate the calendar to the correct view
                calendar.navigate(date[0]);;

                restoreEvent = false;
                popup.close();
            },
            cssClass: 'mbsc-popup-button-primary'
        }]
    });

    // fill popup with the selected event data
    mobiscroll.getInst(titleInput).value = ev.title || '';
    mobiscroll.getInst(descriptionTextarea).value = ev.description || '';
    mobiscroll.getInst(allDaySwitch).checked = ev.allDay || false;
    range.setVal([ev.start, ev.end]);

    if (ev.free) {
        mobiscroll.getInst(freeSegmented).checked = true;
    } else {
        mobiscroll.getInst(busySegmented).checked = true;
    }

    // change range settings based on the allDay
    range.setOptions({
        controls: ev.allDay ? ['date'] : ['datetime'],
        responsive: ev.allDay ? datePickerResponsive : datetimePickerResponsive
    });

    // set anchor for the popup
    popup.setOptions({ anchor: args.domEvent.currentTarget });
    popup.open();
}

var calendar = mobiscroll.eventcalendar('#demo-add-delete-event', {
    clickToCreate: 'double',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
        calendar: { labels: true }
    },
    data: myData,
    onEventClick: function (args) {
        oldEvent = Object.assign({}, args.event);
        tempEvent = args.event;

        if (!popup.isVisible()) {
            createEditPopup(args);
        }
    },
    onEventCreated: function (args) {
        popup.close();
        // store temporary event
        tempEvent = args.event;
        createAddPopup(args.target);
    },
    onEventDeleted: function () {
        mobiscroll.snackbar({            button: {
                action: function () {
                    calendar.addEvent(args.event);
                },
                text: 'Undo'
            },
            message: 'Event deleted'
        });
    }
});

var popup = mobiscroll.popup('#demo-add-popup', {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: function () {
        if (deleteEvent) {
            calendar.removeEvent(tempEvent);
        } else if (restoreEvent) {
            calendar.updateEvent(oldEvent);
        }
    },
    responsive: {
        medium: {
            display: 'anchored',
            width: 400,
            fullScreen: false,
            touchUi: false
        }
    }
});

titleInput.addEventListener('input', function (ev) {
    // update current event's title
    tempEvent.title = ev.target.value;
});

descriptionTextarea.addEventListener('change', function (ev) {
    // update current event's title
    tempEvent.description = ev.target.value;
});

allDaySwitch.addEventListener('change', function () {
    var checked = this.checked
    // change range settings based on the allDay
    range.setOptions({
        controls: checked ? ['date'] : ['datetime'],
        responsive: checked ? datePickerResponsive : datetimePickerResponsive
    });

    // update current event's allDay property
    tempEvent.allDay = checked;
});

var range = mobiscroll.datepicker('#event-date', {
    controls: ['date'],
    select: 'range',
    startInput: '#start-input',
    endInput: '#end-input',
    showRangeLabels: false,
    touchUi: true,
    responsive: datePickerResponsive,
    onChange: function (args) {
        var date = args.value;
        // update event's start date
        tempEvent.start = date[0];
        tempEvent.end = date[1];
    }
});

document.querySelectorAll('input[name=event-status]').forEach(function (elm) {
    elm.addEventListener('change', function () {
        // update current event's free property
        tempEvent.free = mobiscroll.getInst(freeSegmented).checked;
    });
});

deleteButton.addEventListener('click', function () {
    // delete current event on button click
    calendar.removeEvent(oldEvent);
    popup.close();

    // save a local reference to the deleted event
    var deletedEvent = tempEvent;

    mobiscroll.snackbar({        button: {
            action: function () {
                calendar.addEvent(deletedEvent);
            },
            text: 'Undo'
        },
        message: 'Event deleted'
    });
});
// { 
//     let interval;
//     let i = 0 ;
//     interval = setInterval(()=> {
//       if(i ===5) {
//           console.log("Stopping")
//             clearInterval(interval);
//       }else {
//         console.log("incrementing i", i)
//         i++
//       }
// }, 1000)


