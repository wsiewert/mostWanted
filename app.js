/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    // TODO: search by traits
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayInfo(person,people);
    break;
    case "family":
    displayFamily(person,people);
    break;
    case "descendants":
    displayDescendants(person,people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  for (var i = 0; i < people.length; i++) {
    if (people[i].firstName.toLowerCase() === firstName && people[i].lastName.toLowerCase() === lastName){
      let person = people[i];
      return mainMenu(person, people);
    }
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// function displayPerson(person){
//   // print all of the information about a person:
//   // height, weight, age, name, occupation, eye color.
//   var personInfo = "First Name: " + person.firstName + "\n";
//   personInfo += "Last Name: " + person.lastName + "\n";
//   personInfo += "ID: "+ person.id + "\n";
//   personInfo += "Gender: " +  person.gender + "\n";
//   personInfo += "DOB: " + person.dob + "\n";
//   personInfo += "Height: " +person.height + "\n";
//   personInfo += "Weight: " +person.weight + "\n";
//   personInfo += "Eye Color: " +person.eyeColor + "\n";
//   personInfo += "Occupation: " +person.occupation + "\n";
//   personInfo += "Parents: " +person.parents + "\n";
//   personInfo += "Current Spouse: " +person.currentSpouse + "\n"
//   // TODO: finish getting the rest of the information to display
//   alert(personInfo);
// }

function displayInfo(person,people){
  var personInfo = "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " +person.height + "\n";
  personInfo += "Weight: " +person.weight + "\n";
  personInfo += "Eye Color: " +person.eyeColor + "\n";
  personInfo += "Occupation: " +person.occupation + "\n";
  alert(personInfo);
  return mainMenu(person,people);
}

function displayFamily(person,people){
  // TODO: Display parents and current spouse.
}

function displayDescendants(person,people){
  if (checkDescendants(person,people).length === 0) {
    alert("No descendants.");
  } else {
    displayPeople(checkDescendants(person,people));
  }
  return mainMenu(person,people);
}

function checkDescendants(person,people){
  let descendants = [];
  for (var i = 0; i < people.length; i++) {
    if (people[i].parents.includes(person.id)) {
      descendants.push(people[i]);
    }
  }
  return descendants;
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
