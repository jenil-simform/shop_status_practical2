const inquirer = require("inquirer");
const findShopStatus = require('./phase1');
const findNextOpenTimeInHours = require('./phase2');
const findNextOpenTimeInDaysAndHours = require('./phase3');

//here i am writing weekdays two times, because later we have to find two weekdays index difference
//so if i will not write like this, it will give output "5" as "Sat" and "Mon" difference, but real output is "2"
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let input_weekday, input_time, phase;


//validating input time entered by user
const validateTime = (time) => {
    //regular expression which checks whether time is in format of 'HH:MM AM/PM'
    const regex = /^(1[012]|[1-9]):[0-5][0-9](\s)?(am|pm)$/i;
    const result = regex.test(time);
    return result;
};


//taking user input
inquirer
    .prompt([
        {
            type: "list",
            name: "weekday",
            message: "Choose weekday : ",
            choices: weekdays,
        },
        {
            type: "input",
            name: "time",
            message: `Enter time in format of 'HH:MM AM/PM' :`,
            default: "10:00 AM",
        },
        {
            type: "list",
            name: "phase",
            message: "Choose Phase : ",
            choices: ['phase1', 'phase2', 'phase3'],
        },
    ])
    .then((answers) => {
        input_weekday = answers.weekday;
        input_time = answers.time;
        phase = answers.phase;

        if (!validateTime(input_time)) {
            throw new Error(`Please enter correct time in format of 'HH:MM AM/PM'`);
        }

        let shop_status;

        if(phase === "phase1")  shop_status = findShopStatus(input_time, input_weekday);
        else if(phase === "phase2") shop_status = findNextOpenTimeInHours(input_time, input_weekday, weekdays);
        else shop_status = findNextOpenTimeInDaysAndHours(input_time, input_weekday, weekdays);
        
        console.log(shop_status);
    })
    .catch((error) => {
        console.error(error.message);
        process.exit();
    });
