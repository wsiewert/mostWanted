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
    searchMenu(people);
    break;
    default:
    app(people);
    // restart app
    break;
  }
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){
/* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
    displayInfo(person,people);
    break;
    case "family":
    displayFamily(person,people);
    break;
    case "descendants":
    displayDescendants(person, people);
    break;
    case "restart":
    app(people);
    break;
    return;
    default:
    return;
  }
}

function searchMenu(people){
  var criteriaArray = ["age","height", "weight", "occupation", "eye color"];
  var displaySearchMenu = prompt("Search for the person by the following traits: age, height (in.), weight (lbs), occupation, and eye color. Type the option you want or 'restart' or 'quit'.");
  switch(displaySearchMenu){
    case "age":
    getCriteria(people, criteriaArray, 0);
    break;
    case "height":
    getCriteria(people, criteriaArray, 1);
    break;
    case "weight":
    getCriteria(people, criteriaArray, 2);
    break;
    case "occupation":
    getCriteria(people, criteriaArray, 3);
    break;
    case "eye color":
    getCriteria(people, criteriaArray, 4);
    break;
    case "restart":
    app(people);
    break;
    default:
    return;
  }
}

function getCriteria(people,criteriaArray,index){
  let criteriaList = criteriaArray;
  let userInput = prompt("Please provide: " + criteriaArray[index]);
  if (userInput === ""){
    return getCriteria(people,criteriaArray,index);
  }
  if (!userInput){
    return;
  }
  if (criteriaArray[index] === "age" || criteriaArray[index] === "height" || criteriaArray[index] === "weight"){
    if (isNaN(parseInt(userInput))){
      alert("You must provide a number for this search!");
      return getCriteria(people,criteriaArray,index);
    } else {
      userInput = parseInt(userInput);
    }
  }
  let criteria = criteriaList.splice(index,1);
  criteria = criteria[0];
  return refineSearch(people,criteriaList,getPeopleByCriteria(criteria,people,userInput));
}

function getPeopleByCriteria(criteria,people,userInput){
  let peopleArray = [];

  if (criteria === "age"){
    peopleArray.push.apply(peopleArray,people.filter(function(personObject){
      if(getAgeByDob(personObject.dob) === userInput){
        return true;
      }
    }));
  } else if(criteria === "height"){
    peopleArray.push.apply(peopleArray,people.filter(function(personObject){
      if(personObject.height === userInput){
        return true;
      }
    }));
  } else if(criteria === "weight"){
    peopleArray.push.apply(peopleArray,people.filter(function(personObject){
      if(personObject.weight === userInput){
        return true;
      }
    }));
  } else if(criteria === "occupation"){
    peopleArray.push.apply(peopleArray,people.filter(function(personObject){
      if(personObject.occupation === userInput){
        return true;
      }
    }));
  } else if(criteria === "eye color"){
    peopleArray.push.apply(peopleArray,people.filter(function(personObject){
      if(personObject.eyeColor === userInput){
        return true;
      }
    }));
  }
return peopleArray;
}

function refineSearch(people,criteriaArray, result){
  let peopleByCriteria = DisplayPersonByCriteria(result,criteriaArray);
  let promptCriteria = ("Here is the list of people who fit that criteria:" +peopleByCriteria+ "\n" +  "Or, type one of the following:"+  " " +criteriaArray+ " "+ "\n"+"to refine your search or 'restart' or 'quit'.");
prompt (promptCriteria);
return searchMenu(people, criteriaArray);
}

function DisplayPersonByCriteria (people,criteriaArray){
  let arrayToString = people.map(function(personObject){
    return " "+personObject.firstName+ " " +personObject.lastName+"\n";
  }).join("");
  if(arrayToString.length === 0){
    return "No one fits this criteria" + "\n"
  } else {
    return arrayToString;
  }
}

function getAgeByDob(dob){
  let dateOfBirth = Date.parse(dob);
  let currentDate = Date.now();
  let millisecondsPerYear = 31536000000;
  let age = Math.floor((currentDate - dateOfBirth) / millisecondsPerYear);
  return age;
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
  alert ("\n"+"no person found");
  return app(people);
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayInfo(person,people){
  var personInfo = person.firstName + " " + person.lastName + "'s information:" + "\n" + "\n"
  personInfo += "Gender: " +person.gender+ "\n";
  personInfo += "DOB: " +person.dob+ "\n";
  personInfo += "Height: " +person.height+ "\n";
  personInfo += "Weight: " +person.weight+ "\n";
  personInfo += "Eye Color: " +person.eyeColor+ "\n";
  personInfo += "Occupation: " +person.occupation+ "\n";
  alert(personInfo);
  return mainMenu(person,people);
}
function displayFamily(person,people){
  let parents = displayFamilyFormat(getParents(person,people));
  let spouse = displayFamilyFormat(getSpouse(person,people));
  let children = displayFamilyFormat(getChildren(person,people));
  let family = person.firstName + " " + person.lastName + "'s Family" + "\n" + "\n" + "Parents:" + "\n" + parents + "\n" + "Spouse:" + "\n" + spouse + "\n" + "Children:" + "\n" + children;
  alert(family);
  return mainMenu(person,people);
}

function displayFamilyFormat(peopleArray){
  let arrayToString = peopleArray.map(function(personObject){
      return "  " + personObject.firstName + " " + personObject.lastName + "\n";
  }).join("");
  if(arrayToString.length === 0){
    return "  -None-" + "\n"
  } else {
    return arrayToString;
  }
}

function displayDescendants(person,people){
  let descendants = checkDescendants(person,people)
  if (descendants.length === 0) {
    alert("No descendants.");
  } else {
    displayPeople(descendants);
  }
  return mainMenu(person,people);
}

function getSpouse(spouse,people){
  let person = people.filter(function(object){
    if (object.currentSpouse === spouse.id){
  return true;
    }
  });
  return person;
}

function getParents(person,people){
  let personsParents = person.parents.length;
  let parentsArray = [];
  for (var i = 0; i < personsParents; i++) {
    parentsArray.push(getPersonById(person.parents[i],people));
  }
  return parentsArray;
}

function getChildren(person,people){
  let children = [];
  for (var i = 0; i < people.length; i++) {
    if (people[i].parents.includes(person.id)) {
      children.push(people[i]);
    }
  }
  return children;
}

function getPersonById(Id,people){
  let person = people.filter(function(personObject){
    if (personObject.id === Id){
      return true;
    }
  });
  return person[0];
}

function checkDescendants(person,people){
  let descendantsArray = [];
  let personChange = person;

  for (var i = 0; i < people.length; i++) {
    if(people[i].parents.includes(person.id)){
      personChange = people[i];
      descendantsArray.push(people[i]);
      descendantsArray.push.apply(descendantsArray,checkDescendants(personChange,people));
    }
  }
  return descendantsArray;
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
