var problem_info = "";
var problem_title = "";
var problem_description = "";
var problem_input = "";
var problem_output = "";

function problemParsing(tag){
    chrome.tabs.executeScript({
        code:'document.querySelector("' + tag + '").innerHTML'
    }, function(result){
        problem = result[0];
        document.querySelector(tag).innerHTML = problem;
    });
}

problemParsing("#problem-info");
problemParsing("#problem_title");
problemParsing("#problem_description");
problemParsing("#problem_input");
problemParsing("#problem_output");