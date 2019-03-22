chrome.tabs.executeScript({
    code:'document.querySelector("#problem-info").innerHTML'
}, function(result){
    var problem_info = result[0];
    document.querySelector('#problem_info').innerHTML = problem_info;
});

chrome.tabs.executeScript({
    code:'document.querySelector("#problem_title").innerText'
}, function(result){
    var problem_title = result[0];
    document.querySelector('#problem_title').innerText = problem_title;
});

chrome.tabs.executeScript({
    code:'document.querySelector("#problem_input").innerText'
}, function(result){
    var problem_input = result[0];
    document.querySelector('#problem_input').innerText = problem_input;
});

chrome.tabs.executeScript({
    code:'document.querySelector("#problem_output").innerText'
}, function(result){
    var problem_output = result[0];
    document.querySelector('#problem_output').innerText = problem_output;
});

chrome.tabs.executeScript({
    code:'document.querySelector("#problem_description").innerHTML'
}, function(result){
    var problem_description = result[0];
    document.querySelector('#problem_description').innerHTML = problem_description;
});