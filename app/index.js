import clock from "clock";
import document from "document";
import {
    preferences
} from "user-settings";
import * as util from "../common/utils";
import {
    goals
} from "user-activity";
import {
    me as device
} from "device";
import {
    today
} from "user-activity";
import * as messaging from "messaging";




// Useful routines
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Test code
let stepgoal = goals.steps.toLocaleString();


if (!device.screen) device.screen = {
    width: 348,
    height: 250
};
const screenWidth = device.screen.width;
const screenHeight = device.screen.height;

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const hourLabel = document.getElementById("hours");
const minLabel = document.getElementById("minutes");
const monthLabel = document.getElementById("month");
const dateLabel = document.getElementById("date");
const stepsArc = document.getElementById("stepsArc");
const stepsLabel = document.getElementById("stepsLabel");
const stepsImage = document.getElementById("stepsImage");
const calsArc = document.getElementById("cals");
const calsLabel = document.getElementById("calsLabel");
const calsImage = document.getElementById("calsImage");
const floorsArc = document.getElementById("floorsArc");
const floorsLabel = document.getElementById("floorsLabel");
const floorsImage = document.getElementById("floorsImage");
const activityArc = document.getElementById("activityArc");
const activityLabel = document.getElementById("activityLabel");
const activityImage = document.getElementById("activityImage");
const bg = document.getElementById("bg");

const hour1 = document.getElementById("hour1");
const hour2 = document.getElementById("hour2");
const min1 = document.getElementById("min1");
const min2 = document.getElementById("min2");
const mon1 = document.getElementById("mon1");
const mon2 = document.getElementById("mon2");
const date1 = document.getElementById("date1");
const date2 = document.getElementById("date2");

const fontheight = hour1.height;
const fontwidth = hour1.width;

min1.style.display = "none";
min1.style.fill = "blue";
min1.style.display = "inline";

hour1.style.display = "none";
hour2.style.display = "none";

var numbers = ["zero.png", "one.png", "two.png",
    "three.png", "four.png", "five.png",
    "six.png", "seven.png", "eight.png",
    "nine.png"
];

// Initial selection of colors - changable in Settings
let backgroundColor = "lightblue";
let hourColor = "blue";
let minuteColor = "red";
let monthColor = "brown";
let dateColor = "green";
let stepsColor = "brown";
let calsColor = "red";
let floorsColor = "black";
let activityColor = "yellow";

const updateArc = (arc, label, goal, burned) => {
    let myGoal = (goal || 0);
    let myBurned = (burned);
    if (myBurned > myGoal) {
        myBurned = myGoal;
    }
    arc.sweepAngle = (myBurned * 360) / myGoal;
    label.text = numberWithCommas(burned);
}


const placeNumbers = (hour1, hour2, num, xloc, yloc, color, applyOffset) => {
    let tens = Math.floor(num / 10);
    let ones = num % 10;
    let offset = 0;

    //  if (tens != 0) {
    hour1.href = numbers[tens];
    hour1.x = xloc;
    hour1.y = yloc;
    hour1.style.fill = color;
    hour1.style.display = "inline";
    offset = fontwidth;
    //  } else {
    //    hour1.style.display = "none";
    //    if(applyOffset)
    //      offset = fontwidth;
    //  }

    hour2.href = numbers[ones.toFixed()];
    hour2.x = xloc + offset;
    hour2.y = yloc;
    hour2.style.fill = color;
    hour2.style.display = "inline";

}


// Update the <text> element every tick with the current time
clock.granularity = "minutes";
clock.ontick = (evt) => {

    let now = evt.date;
    let hours = now.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
        let hourformat = 12;
    } else {
        // 24h format
        hours = util.zeroPad(hours);
        let hourformat = 24;
    }


    let mins = now.getMinutes();
    let month = now.getMonth() + 1;
    let date = now.getDate();

    // Place month along the bottom
    let monthloc = Math.round(((month - 1) * (screenWidth - fontwidth - 6) / 12) /* + fontwidth */ );
    let yloc = screenHeight - fontheight - 4;
    placeNumbers(mon1, mon2, month, monthloc, yloc, monthColor, true);

    // Place date along the left side
    let dateloc = Math.round(((date - 1) * (screenHeight - (fontheight /**2*/ )) / 31) /* + fontheight */ );
    //let xloc = Math.round(fontwidth/2)-4;
    let xloc = 0;
    placeNumbers(date1, date2, date, xloc, dateloc, dateColor, false);

    // Place minutes along the right side
    let minuteloc = Math.round(((mins * ((screenHeight - 4) - fontheight)) / 60)) + 4;
    let xloc = screenWidth - (fontwidth * 2);
    placeNumbers(min1, min2, mins, xloc, minuteloc, minuteColor, true);

    // Place hours along top
    let hourloc = Math.round(((hours - 1) * (screenWidth - (fontwidth * 2)) / hourformat));
    let yloc = 2;
    placeNumbers(hour1, hour2, hours, hourloc, yloc, hourColor, true);

    // Steps
    updateArc(stepsArc, stepsLabel, (goals.steps || 0), (today.local.steps || 0));

    // Calories
    updateArc(calsArc, calsLabel, (goals.calories || 0), /*(today.local.calories)*/ 1000);

    // Floors
    updateArc(floorsArc, floorsLabel, (goals.elevationGain || 0), (today.local.elevationGain));

    // Active Minutes
    updateArc(activityArc, activityLabel, (goals.activeMinutes || 0), (today.local.activeMinutes));


}

function applySettings() {

    bg.style.fill = backgroundColor;
    hour1.style.fill = hourColor;
    hour2.style.fill = hourColor;
    min1.style.fill = minuteColor;
    min2.style.fill = minuteColor;
    mon1.style.fill = monthColor;
    mon2.style.fill = monthColor;
    date1.style.fill = dateColor;
    date2.style.fill = dateColor;

    stepsArc.style.fill = stepsColor;
    stepsLabel.style.fill = stepsColor;
    stepsImage.style.fill = stepsColor;

    calsArc.style.fill = calsColor;
    calsLabel.style.fill = calsColor;
    calsImage.style.fill = calsColor;

    floorsArc.style.fill = floorsColor;
    floorsLabel.style.fill = floorsColor;
    floorsImage.style.fill = floorsColor;

    activityArc.style.fill = activityColor;
    activityLabel.style.fill = activityColor;
    activityImage.style.fill = activityColor;
}

// Receiving messages from companion
messaging.peerSocket.onmessage = evt => {

    //  console.log("message for you, sir! " + evt.data.key + " = " + evt.data.value);
    switch (evt.data.key) {
        case "hourColor":
            hourColor = evt.data.value.name;
            break;
        case "minuteColor":
            minuteColor = evt.data.value.name;
            break;
        case "monthColor":
            monthColor = evt.data.value.name;
            break;
        case "dateColor":
            dateColor = evt.data.value.name;
            break;
        case "bgColor":
            backgroundColor = evt.data.value.name;
            break;
        case "stepsColor":
            stepsColor = evt.data.value.name;
            break;
        case "calsColor":
            calsColor = evt.data.value.name;
            break;
        case "floorsColor":
            floorsColor = evt.data.value.name;
            break;
        case "activityColor":
            activityColor = evt.data.value.name;
            break;

    }

    applySettings();
}

applySettings();