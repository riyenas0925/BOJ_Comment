let problemComments = new Array(6).fill('');
let i = 0;

let codeLanguage = {
    default: '',
    c: '#include<stdio.h>\n\nint main(void) {\n\n\treturn 0;\n}',
    cpp: '#include<iostream>\n#include<string>\n#include<algorithm>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}',
    java: 'public class Main {\n\n\tpublic static void main(String[] args) {\t\n\n\t}\n}',
    python: '\n'
}

const getTabId = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

async function problemParsing(tag, selector){
    const getInnerHtml = (tag) => document.querySelector(tag).innerHTML;
    const tabId = await getTabId();


    if(arguments.length == 1){
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: getInnerHtml,
            args: [tag],
        }, (result) => {
            let problem = result[0].result;

            problemComments[i] = removeTag(problem);
            i++;

            document.querySelector(tag).innerHTML = problem;
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: getInnerHtml,
            args: [tag],
        }, (result) => {
            let problem = result[0].result;

            if(selector == null){
                problemComments[i] = problem;
                i++;
            } else {
                problemComments[i] = removeTag(problem);
                i++;
                document.querySelector(selector).innerHTML = problem;
            }
        });
    }
}

const getCurrentTime = (option) => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    if(option == 0){
        return year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + second + "초";
    }
    else{
        return year + "년 " + month + "월 " + date + "일 " + "시 " + "분 " + "초";
    }
}

const removeTag = (text) => {
    text = text.replace(/<br\/>/ig, "\n");
    text = text.replace(/<(sup)([^>]*)>/gi,"^")
    text = text.replace(/<(sub)([^>]*)>/gi,"_")
    text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    text = text.replace(/	/g,"");
    text = text.replace(/&nbsp;/g," ");
    text = text.replace(/\s+$/," ");
    text = text.replace(/\n/g,"");
    text = text.replace(/&lt;/g,"<");
    text = text.replace(/&gt;/g,">");

    return text;
}

const copyToClipboard = (val) => {
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}

const createHtml = () => {
    alert("HTML 복사되었습니다!");
    let html = document.documentElement.innerHTML;
    html = html.replace(/(<button[^>]+[>])([^<]*)(<\/button>)/g, "");
    html = html.replace(/(<select[^>]+[>])([^]*)(<\/select>)/g, "");
    copyToClipboard(html);
}

const createCode = () => {
    alert("주석이 복사되었습니다!")
    copyToClipboard(getInitialCode());
}

const getSelectedLanguage = () => {
    return document.getElementById("selectLanguage").value;
}

const initialCodeOfSelectedLanguage = () => {
    return codeLanguage[getSelectedLanguage()];
}

const getDefaultComments = () => {
    let comments = '';
    comments += '/*********************************************************************\n';
    comments += '*Title : ' + problemComments[1] + '\n';
    comments += '*Number : ' + problemComments[2] + '\n';
    comments += '*Author : ' + problemComments[3] + '\n';
    comments += '*Description : ' + problemComments[4] + '\n';
    comments += '*Input : ' + problemComments[5] + '\n';
    comments += '*Output : ' + problemComments[6] + '\n';
    comments += '*Start Time : ' + getCurrentTime(0) + '\n';
    comments += '*End Time : " ' + getCurrentTime(1) + '\n';
    comments += '*********************************************************************/\n\n';

    return comments;
}

const getPythonComments = () => {
    let comments = '';
    comments += '"""\n';
    comments += 'Title : ' + problemComments[1] + '\n';
    comments += 'Number : ' + problemComments[2] + '\n';
    comments += 'Author : ' + problemComments[3] + '\n';
    comments += 'Description : ' + problemComments[4] + '\n';
    comments += 'Input : ' + problemComments[5] + '\n';
    comments += 'Output : ' + problemComments[6] + '\n';
    comments += 'Start Time : ' + getCurrentTime(0) + '\n';
    comments += 'End Time : ' + getCurrentTime(1) + '\n';
    comments += '"""\n';

    return comments;
}

const getInitialCode = () => {
    const language = getSelectedLanguage();

    let code = ''

    if (language == 'python') {
        code += getPythonComments();
    } else {
        code += getDefaultComments();
    }
    code += initialCodeOfSelectedLanguage();

    return code;
}

document.addEventListener('DOMContentLoaded', function() {
    let htmlbtn = document.getElementById('htmlbtn');

    htmlbtn.addEventListener('click', function() {
        createHtml();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let codebtn = document.getElementById('codebtn');

    codebtn.addEventListener('click', function() {
        createCode();
    });
});

problemParsing("#problem-info");
problemParsing("#problem_title");
problemParsing("body > div.wrapper > div.container.content > div.row > div:nth-child(2) > ul > li.active > a", null);
problemParsing(".username", null);
problemParsing("#problem_description");
problemParsing("#problem_input");
problemParsing("#problem_output");
