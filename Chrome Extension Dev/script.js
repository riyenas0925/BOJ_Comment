var problemComments = new Array("","","","","","");
var i = 0;

function problemParsing(tag, selector){

    if(arguments.length == 1){
        chrome.tabs.executeScript({
            code:'document.querySelector("' + tag + '").innerHTML'
        }, function(result){
            problem = result[0];
            problemComments[i] = removeTag(problem);
            i++;

            if(typeof problem != null){
                document.querySelector(tag).innerHTML = problem;
            }
        });
    }
    else{
        chrome.tabs.executeScript({
            code:'document.querySelector("' + tag + '").innerHTML'
        }, function(result){
            problem = result[0];
            problemComments[i] = removeTag(problem);
            i++;

            if(typeof problem != null){
                document.querySelector(selector).innerHTML = problem;
            }
        });
    }
}

function removeTag(text){
    text = text.replace(/<br\/>/ig, "\n"); 
    text = text.replace(/<(sup)([^>]*)>/gi,"^")
    text = text.replace(/<(sub)([^>]*)>/gi,"_")
    text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    text = text.replace(/\	/g,"");
    text = text.replace(/\&nbsp;/g," ");
    text = text.replace(/\s+$/," ");
    text = text.replace(/\n/g,"");
    text = text.replace(/&lt;/g,"<");
    text = text.replace(/&gt;/g,">");

    return text;
}

function createHtml(){
    alert(document.documentElement.innerHTML);
    console.log(document.documentElement.innerHTML);
}

function createCode(){
    alert(createComments());
    console.log(createComments());
}

document.addEventListener('DOMContentLoaded', function() {
    var htmlbtn = document.getElementById('htmlbtn');

    htmlbtn.addEventListener('click', function() {
        createHtml();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var codebtn = document.getElementById('codebtn');

    codebtn.addEventListener('click', function() {
        createCode();
    });
});

function createComments(){
    comments = "";
    comments += "/*********************************************************************\n";
    comments += "*Title : " + problemComments[1] + "\n";
    comments += "*Number : " + problemComments[2] + "\n";
    comments += "*Author : " + problemComments[3] + "\n";
    comments += "*Description : " + problemComments[4] + "\n";
    comments += "*Input : " + problemComments[5] + "\n";
    comments += "*Output : " + problemComments[6] + "\n";
    comments += "*Start Time : " + "\n";
    comments += "*End Time : " + "\n";
    comments += "*********************************************************************/";

    return comments;
}

problemParsing("#problem-info");
problemParsing("#problem_title");
problemParsing("body > div.wrapper > div.container.content > div.row > div:nth-child(2) > ul > li.active > a", "#problem_number");
problemParsing(".username");
problemParsing("#problem_description");
problemParsing("#problem_input");
problemParsing("#problem_output");