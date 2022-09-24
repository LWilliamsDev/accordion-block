//***BASE ACCORDION FUNCTIONALITY***

//Get list of all elements with accordion__header class
const acc = document.getElementsByClassName("accordion__header");

//Declare counter variable
var i;

for (i = 0; i < acc.length; i++) { //add click event listener to all accordion__header elements
  acc[i].addEventListener("click", accordionClickBehavior);
}

function accordionClickBehavior() { //adds the open/close functionality of accordion

  /* Add or remove the is-open class to the accordion__header element */
  this.classList.toggle("is-open");

  let button = this.querySelector(".accordion__trigger"); //First child of each accordion__header element is the toggle button

  /* Toggle between hiding and showing the active panel */
  let panel = this.nextElementSibling; //the panel is the div immediately following the accordion__header element

  if (panel.style.display === "block") {
    panel.style.display = "none"; //if the panel is visible, hide it
    button.setAttribute("aria-expanded", false); //also change aria-expanded value on the button
  }
  else {
   panel.style.display = "block";
   button.setAttribute("aria-expanded", true);
  }
}

//***DEEP LINKING FUNCTIONALITY (automatically open accordion by URL hash or link on the page)***

function getAccParameter(string) { //pull in string of target accordion and strip out special characters
  return string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''); //strip special characters from the hash value to prevent XSS
}


function deepLinks(parameter) { //adds base deep linking functionality to accordion
  let linkedAcc = document.querySelector("#" + parameter); //Get HTML DOM element for target accordion
  let accBtn; //stores the button for the target accordion
  let accPanel = linkedAcc.nextElementSibling; //Get HTML DOM element for the target accordion's panel (hidden content)
  let parents = []; //array that stores all parent elements of target accordion that are accordion headers. Addresses the issue of linking to a nested accordion

  if (linkedAcc && accPanel.classList.contains("accordion__panel")) { //if there is an element where the ID = URL parameter AND the next element is an accordion panel
    parents.push(linkedAcc);
    while (linkedAcc)  {
      linkedAcc = linkedAcc.parentNode; //climb DOM tree to get parent of target accordion
      if (linkedAcc.matches('body')) { break; } //stop the loop if the parent is the HTML body element
    else {
      let header = linkedAcc.previousElementSibling; //since the parent element is likely another accordion__panel element, get the sibling, which will be the accordion__header element
      let headerElement = header && header.classList.contains("accordion__header"); //this will contain a value if the header element is NOT null AND contains the accordion__header class
      if (headerElement) { parents.push(header);} //if the header variable is NOT null AND has class accordion__header, then push the header variable into an array of all parent accordion__header elements
    }

  }
    for (i = 0; i < parents.length; i++) { //loop through all preceding accordion__header elements
      accBtn = parents[i].querySelector(".accordion__trigger"); //get the button element for the targeted accordion
      if (!parents[i].classList.contains("is-open")) { //if the targeted accordion is already open - then do not simulate a click (as simulating a click would close it)
        accBtn.click(); //click on the button element
        linkedAcc.scrollIntoView(); //scroll to the specific accordion
      }
    }
  }
}

function accordionLink() { //allows accordions to be opened via a link on the page.
  var accordionLinks = document.querySelectorAll(".accordion__open-link > a"); //accordion open links must have this specific class. Get all elements with this class
  if (accordionLinks.length > 0) {
        for (var accordionLink of accordionLinks) {
          var linkedPanel = accordionLink.getAttribute("href"); //for each accordion link, get the href value
          let panelHeader = getAccParameter(linkedPanel); //strip special characters from the href value
          accordionLink.addEventListener("click", function(event) {
            deepLinks(panelHeader);
            event.preventDefault();
       }); //click on the appropriate button to open the specific accordion via the deepLinks function

    }
  }
}

var accParameter = getAccParameter(window.location.hash.substr(1));

if (accParameter) { deepLinks(accParameter); } //if accordion parameter is in URL, then run deepLinks function

accordionLink(); //run accordionLink function to collect all accordion links
