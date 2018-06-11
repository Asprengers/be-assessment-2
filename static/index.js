/* eslint-env browser */
/* eslint-disable semi */

var remove = document.getElementById('js-remove')

if (remove) {
    remove.addEventListener('click', onremove)
}

function onremove(ev) {
    var node = ev.target
    var id = node.dataset.id

    fetch('/' + id, {
            method: 'delete'
        })
        .then(onresponse)
        .then(onload, onfail)

    function onresponse(res) {
        return res.json()
    }

    function onload() {
        window.location = '/'
    }

    function onfail() {
        throw new Error('Could not delete!')
    }
}


var body = document.body
var Quest = new Array(10); //this sets up an array for all of the answers that are given



function populate() {
    // alert("function populate started");
    // this function gives each of the answers 0 points so if someone doesn't answer a question
    // the whole thing will continue to work
    for (var i = 0; i < 10; i++) {
        Quest[i] = 0;
    }
}

function total() {
    // alert("function total started");
    // this function adds the number of points each answer is worth together
    myScore = 0;
    for (var i = 0; i < 10; i++) {
        myScore = myScore + Quest[i];
    }
    analyzer(myScore);
}

myContents = new Array();
myContents[0] = "Je hebt de beste match met: <br /><img src='images/nate.jpg' width='200'/>" + "" + ("nate.html");
myContents[1] = "Je hebt de beste match met: <br /><img src='images/ian.jpg' width='200'/>" + "" + ("ian.html");
myContents[2] = "Je hebt de beste match met: <br /><img src='images/tom.jpg' width='200'/>" + "" + ("tom.html");


function analyzer(myScore) {
    // this function uses the total calculated score to figure out which personality type they are
    if (myScore > 5) {
        myContentsPtr = 2;
    } //6
    else {
        if (myScore > 3) {
            myContentsPtr = 1;
        } //5
        else {
            myContentsPtr = 0;
        } //1
    }
    myDisplay(myContents[myContentsPtr])
}


function myDisplay(myContents) {
    //This function will open a new window and show the results calculated
    // alert(myContents); **use alert for testing only**.
    document.getElementById("result").innerHTML = (myContents);
}

function saver(q, points) {
    // this function puts the points that each answer is worth into the array
    q = q - 1;
    Quest[q] = points
}

var buttons = document.getElementsByClassName('button'),
    toggleItems = document.getElementsByClassName('toggleItem'),
    tables = document.getElementsByClassName('header');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = getFunction(toggle, i);
}
// getFunction is needed for reasons to do with variable scope
function getFunction(f, p) {
    return function () {
        f(p)
    }
}

function toggle(selected) {
    for (var i = 0; i < toggleItems.length; i++) {
        toggleItems[i].style.display = i == selected ? '' : 'none';
        tables[i].className = i == selected ? 'header open' : 'header closed';
        buttons[i].className = i == selected ? 'button show' : 'button hide';
    }
}
toggle(0); // initially show only the first one



var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Volgende";
    }



    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}
