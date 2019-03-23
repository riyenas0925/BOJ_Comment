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

function time(option){
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if(option == 0){
        var time = year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + second + "초";
        return time;
    }
    else{
        var time = year + "년 " + month + "월 " + date + "일 " + "시 " + "분 " + "초";
        return time;
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

function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  }

function createHtml(){
    alert("HTML 복사되었습니다!")
    var html = document.documentElement.innerHTML;

    html = html.replace(/(\<button[^>]+[\>])([^<]*)(\<\/button\>)/g, "");
    html = html.replace(/\/upload\/201003\/dd.bmp/g, url + "/upload/201003/dd.bmp");

    copyToClipboard(html);
}

function createCode(){
    alert("주석이 복사되었습니다!")
    copyToClipboard(createComments());
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
    comments += "*Start Time : " + time(0) + "\n";
    comments += "*End Time : " + time(1) + "\n";
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