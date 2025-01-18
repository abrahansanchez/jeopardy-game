// Constants
const NUM_CATEGORIES = 6; // Number of categories to display
const NUM_QUESTIONS_PER_CAT = 5; // Questions per category
let categories = []; // Main data structure for the app

/** Get NUM_CATEGORIES random category IDs from the API.
 *
 * Returns array of category IDs
 */
async function getCategoryIds() {
    const response = await axios.get("https://rithm-jeopardy.herokuapp.com/api/categories");
    const data = response.data; // Extract categories data
    console.log("API Response Data:", data); // Debugging

    // Shuffle and select NUM_CATEGORIES random categories
    const randomCategories = _.sampleSize(data.categories, NUM_CATEGORIES);
    return randomCategories.map(category => category.id);
}

/** Return object with data about a category:
 *
 * Returns { title: "Category Title", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Question Text", answer: "Answer Text", showing: null},
 *      {question: "Another Question", answer: "Another Answer", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
    const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`);
    const data = response.data;
    console.log("Category Data for ID", catId, ":", data); // Debugging

    // Format the clues
    const clues = data.clues.slice(0, NUM_QUESTIONS_PER_CAT).map(clue => ({
        question: clue.question,
        answer: clue.answer,
        showing: null // Track whether the question or answer is displayed
    }));

    return { title: data.title, clues };
}

/** Fill the HTML table#jeopardy with the categories and cells for questions.
 *
 * - The <thead> should be filled with a <tr> and a <td> for each category
 * - The <tbody> should be filled with NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */
function fillTable() {
    const $thead = $("#jeopardy thead"); 
    const $tbody = $("#jeopardy tbody");
    $thead.empty(); 
    $tbody.empty();

    // Add category headers
    const $headerRow = $("<tr>");
    for (let category of categories) {
        $headerRow.append($(`<th>${category.title}</th>`)); 
    } 
    $thead.append($headerRow);

    // Add rows for questions
    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
        const $row = $("<tr>"); 
        for (let j = 0; j < NUM_CATEGORIES; j++) {
            $row.append($(`<td id="${j}-${i}">?</td>`));  
        }
        $tbody.append($row);
    }

    // Add event handler for clicking clues
    $("#jeopardy").off("click").on("click", "td", handleClick);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 */
function handleClick(evt) {
    const id = evt.target.id;
    const [catIdx, clueIdx] = id.split("-").map(Number);
    console.log("Clicked ID:", id);
    console.log("Category Index:", catIdx, "Clue Index:", clueIdx);
    console.log("Categories Array:", categories);

    if (categories[catIdx]) {
        const clue = categories[catIdx].clues[clueIdx];
        if (clue.showing === null) {
            evt.target.textContent = clue.question;
            clue.showing = "question";
        } else if (clue.showing === "question") {
            evt.target.textContent = clue.answer;
            clue.showing = "answer";
        }
    } else {
        console.error('Category not found');
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
 * - get random category IDs
 * - get data for each category
 * - create HTML table
 */
async function setupAndStart() {
    try {
        showLoadingView();
        const catIds = await getCategoryIds();
        console.log("Fetched Category IDs:", catIds); // Debugging
        categories = [];

        for (let id of catIds) {
            const category = await getCategory(id);
            console.log("Fetched Category:", category); // Debugging
            categories.push(category);
        }

        console.log("Final Categories Array:", categories); // Debugging
        fillTable(); // Fill the table after categories are fetched
        hideLoadingView();
    } catch (error) {
        console.error('Error setting up the game:', error);
        hideLoadingView();
    }
}

/** On click of start / restart button, set up game. */
$("#restart").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */
$("#jeopardy").off("click").on("click", "td", handleClick);

$(function() {
    setupAndStart();
});
