// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const NUM_CATEGORIES = 6; // number of categories to displayu
const NUM_QUESTIONS_PER_CAT = 5; // questions per category
let categories = [];          // Main data structure to store categories 


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

//Fetch NUM_CATEGORIES random category IDs from the API.
async function getCategoryIds() {
    const response = await axios.get("https://rithm-jeopardy.herokuapp.com/api/categories");
    const data = response.data; // extract categories data


    //Get NUM_CATEGORIES random category from API.
    const randomCategories = _.sampleSize(data.categories, NUM_CATEGORIES);
    return randomCategories.map(category => category.id);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${catId});
    const data = response.data;

    //format the clues
    const clues = data.clues.slice(0, NUM_QUESTIONS_PER_CAT).map(clue => ({
        question: clue.question,
        answer: clue.answer,
        showing: null // to track whether the questions or answer is displayed

    }

    ));
    return {title: data.tile, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    const $thead = $("#jeopardy thead");
    const $tbody = $("#jeopardy tbody");

    $thead.empty();
    $tbody.empty();

    //category headers
    const $headerRow = $("<tr>");
     for (let category of categories) { 
     $headerRow.append($("<th>" + category.title + "</th>")); } 
     $thead.append($headerRow); 
     
     // Add rows for questions 
     for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
      const $row = $("<tr>"); 
      for (let j = 0; j < NUM_CATEGORIES; j++) { 
      const td = document.createElement("td");
       td.id = j + "-" + i; td.textContent = "?"; 
       $row.append(td); 
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
const id = evt.target.id;
    const [catIdx, clueIdx] = id.split("-").map(Number);
    const clue = categories[catIdx].clues[clueIdx];

    if (clue.showing === null) {
        evt.target.textContent = clue.question;
        clue.showing = "question";
    } else if (clue.showing === "question") {
        evt.target.textContent = clue.answer;
        clue.showing = "answer";
    }
}


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
$("#jeopardy thead").empty();
    $("#jeopardy tbody").empty();
    $("#spin-container").show();

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
$("#spin-container").hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    showLoadingView();

    const catIds = await getCategoryIds();
    categories = [];

    for (let id of catIds) {
        categories.push(await getCategory(id));
    }

    fillTable();
    hideLoadingView();
}
/** On click of start / restart button, set up game. */
$("#restart").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */
$("#jeopardy").on("click", "td", handleClick);

$(function() {
    setupAndStart();
});
