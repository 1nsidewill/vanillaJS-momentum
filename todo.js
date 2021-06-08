const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';

// 데이터를 담을 array 
let toDos = [];



// 삭제 기능
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter == foreach 느낌 비슷
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


// Local Storage에 저장하는 기능
function saveToDos(){
    // JSON.stringify 는 jscode 를 string으로 바꿔준다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}



// 화면에 뿌려주는 기능
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

;

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        // array toDos [] 에 있는 item들을 보여준다
        parsedToDos.forEach(function (toDo){
            // paintToDo 펑션 사용해서 화면에 뿌려줌
            paintToDo(toDo.text);
        });
    } else {

    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();