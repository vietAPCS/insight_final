let Questions = []
let maxQuestion = 5
let shuffledQuestions = [] 
let allAnswer = [] // Store all answer's index
let indexNumber = 0
let courseId = ""
let difficulty = 0



function handleQuestions() { 
    while (shuffledQuestions.length < maxQuestion) {
        const random = Questions[Math.floor(Math.random() * Questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
            allAnswer.push(-1)
        }
    }
}

//GetAndDisplay
function GetQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = indexNumber + 1
    document.getElementById("question-number-max").innerHTML = maxQuestion
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.options[0];
    document.getElementById("option-two-label").innerHTML = currentQuestion.options[1];
    document.getElementById("option-three-label").innerHTML = currentQuestion.options[2];
    document.getElementById("option-four-label").innerHTML = currentQuestion.options[3];
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 

    const options = document.getElementsByName("option");
    options.forEach((option) => {
        if (option.checked == true) {
            allAnswer[indexNumber] = option.value
        }
    })
}

function handleNextQuestion() {
    checkForAnswer()
    indexNumber++
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber == maxQuestion - 1) {
            document.getElementById("next-submit-button").innerHTML = "Submit";
        }
        else {
            document.getElementById("next-submit-button").innerHTML = "Next";
        }
        if (indexNumber < maxQuestion ) {
            GetQuestion(indexNumber)
        }
        else {
            indexNumber = maxQuestion - 1
            handleEndGame()
        }
        resetOptionBackground()
    }, 100);
}

function handlePrevQuestion() {
    checkForAnswer() 
    indexNumber--
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber < 0) {
            indexNumber = 0
        }
        GetQuestion(indexNumber)
        unCheckRadioButtons()
        resetOptionBackground()
    }, 100);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
        if (options[i].value == allAnswer[indexNumber]) {
            options[i].checked = true;
        }
    }
}

async function verifyAnswers(shuffledQuestions,allAnswer) {
    let correct = 0
    for (let i = 0; i < shuffledQuestions.length; i++) {
        let apiPath = `http://localhost:3001/api/question/verifyanswer/?id=${shuffledQuestions[i]._id}&answer=${allAnswer[i]}`
        let response = await fetch(apiPath, {
            method: 'GET',
        });
        const resJson = await response.json();
        if (resJson.verification)
            correct++
    }
    return correct
}

function handleEndGame() {
    
    document.getElementById('grade-exam').style.display = "none"
    document.getElementById('score-modal').style.display = "flex"
}

async function closeScoreModal() {
    if (document.getElementById('grade-exam').style.display == "none") {
        let playerScore = await verifyAnswers(shuffledQuestions, allAnswer)
        let remark = null
        let remarkColor = null
        const playerGrade = (playerScore / maxQuestion) * 100
        // const socreInput = document.querySelector('#playerScore')
         // socreInput.value = playerScore

        let communityId = document.querySelector("#community_id").innerHTML
        let userId = document.querySelector("#user_id").innerHTML
        console.log('tesssst')
        console.log(userId)
        let res = await JoinCommunity(playerScore, communityId, userId)
        // console.log(res);

        if (playerGrade >= 80) {
            remark = "Excellent, Keep the good work going."
            remarkColor = "green"
        }
        else if (playerGrade >= 50) {
            remark = "Average Grades, You can do better."
            remarkColor = "orange"
        }
        else {
            remark = "Bad Grades, Keep Practicing."
            remarkColor = "red"
        }
        document.getElementById('remarks').innerHTML = remark
        document.getElementById('remarks').style.color = remarkColor
        document.getElementById('grade-percentage').innerHTML = playerGrade
        document.getElementById('attemps').innerHTML = maxQuestion
        document.getElementById('right-answers').innerHTML = playerScore
        document.getElementById('grade-exam').style.display = "flex"
        document.getElementById('modal-button-end').innerHTML = "Done"
    }
    else {
        document.getElementById('score-modal').style.display = "none"
        window.location.reload(true);
    }
    
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


async function JoinCommunity(playerScore, communityId, userId)
{
    const csrftoken = getCookie('csrftoken');
    console.log(csrftoken)
    
    // Define the URL you want to send the POST request to
    const url = 'http://127.0.0.1:8000/verify-exam-score';
    // Create a FormData object and append the parameters
    const formData = new FormData();
    formData.append('playerScore', playerScore);
    formData.append('communityId', communityId);
    formData.append('userId', userId);
    formData.append('csrfmiddlewaretoken', csrftoken);

    // Define the options for the fetch request

    const options = {
        method: 'POST',
        credentials : "include",
        body: formData, // Pass the FormData object as the request body
        headers: {
            // If needed, you can set custom headers here
            // 'Authorization': 'Bearer yourAccessToken',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/',
            // 'content-type': 'multipart/form-data',
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken,
            'Cookie': `csrftoken=${csrftoken}`
        },
    };
    console.log(options)
    // Send the POST request
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        response.json().then(data => {
            console.log(data) // You can change this to response.text() or other methods based on the expected response type
        })
    })
    .catch(error => {
        // Handle errors here
        console.error('Error:', error);
    });

    // const getCookie_url = "http://127.0.0.1:8000/admin/login/"
    // const getCoolie_options = {
    //     method: 'POST',
    //     credentials : "include",
    //     headers: {
    //                 // If needed, you can set custom headers here
    //                 // 'Authorization': 'Bearer yourAccessToken',
    //                 // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/',
    //                 'X-CSRFToken': csrftoken,
    //                 'Cookie': `csrftoken=${csrftoken}`
    //             },
    // }

    // fetch(getCookie_url, getCoolie_options)
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    // })
    // .catch(error => {
    //     // Handle errors here
    //     console.error('Error:', error);
    // });
    
}

async function closeStartModal() {
    document.getElementById('start-modal').style.display = "none"
    courseId = document.getElementById('course-id').value
    difficulty = 1
    let response = await fetch(`http://localhost:3001/api/question/getquestions/?courseId=${courseId}&difficulty=${difficulty}`, {
        method: 'GET',
    });
    const resJson = await response.json();
    Questions = resJson.questions
    GetQuestion(indexNumber)
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}