let tasks = [];
let completed = [];
let toogle = $(".toogle");
let footer = $(".footer");

let tarefa = $(".task");
let lista = $(".lista");
let concluidas = $(".concluidas");
let MeuCheckbox = $(".meu-checkbox");

const azul = $(".box-azul");
const verde = $(".box-verde");
const rosa = $(".box-rosa");
const roxo = $(".box-roxo");
const amarelo = $(".box-amarelo");
const laranja = $(".box-laranja");
const branco = $(".box-branco");

function backgroundColor(codigo) {

    if(codigo) {
        localStorage.setItem("color", codigo);
    } 

    footer.css("background",localStorage.getItem("color"));
    document.body.style.background = localStorage.getItem("color");
};

$(function toogleTasks(){
    $('.toogle-img').click(function(){

        if($(this).attr('src') === './img/zoom-in-icon.png') {
            $(this).attr('src', './img/zoom-out-icon.png')
           
            return showCompleteTasks();;
        }

        if($(this).attr('src') === './img/zoom-out-icon.png') {
            $(this).attr('src', './img/zoom-in-icon.png')
            
           
            return mapTasks();
        }

    })
})

$(function addColor(){
    
    azul.click(function(){
        backgroundColor('#DAF5FA');        
    });    
    verde.click(function(){
        backgroundColor('#D1FECB'); 
    });    
    rosa.click(function(){
        backgroundColor('#F6D0F6'); 
    });    
    roxo.click(function(){
        backgroundColor('#DCD0F3'); 
    });    
    laranja.click(function(){
        backgroundColor('#FBD4B4'); 
    });
    branco.click(function(){
        backgroundColor('#FFFFFF'); 
    });    
    amarelo.click(function(){
        backgroundColor('#FCFCCB'); 
    });    
})

$(function KeyboardCapture(){
    tarefa.keypress(function(key){
        
        if(key.originalEvent.key === 'Enter'){
            if(tarefa.val() !== ''){
                addTask(tarefa.val());
                tarefa.val('');
            }
        }
        
        // $('html, body').animate({ scrollTop: 200 }, 50);
        // $('.lista-tarefas').scrollIntoView({block: "end", behavior: "smooth"});
        $('.tarefas-container')[0].scrollIntoView({
            behavior: "smooth", // or "auto" or "instant"
            block: "start" // or "end"
        });
        
    }); 
});

function returnTaskComplete() {
    if(localStorage.completedTasks) {
        completed = JSON.parse(localStorage.getItem('completedTasks'))
    }
    
    $(".quantidade-tarefas").text("(" + completed.length + ")");
}

function addTask(task) {
    
    if(localStorage.myTasks){
        tasks = JSON.parse(localStorage.getItem('myTasks'))
    }
    
    if(tasks.includes(task)) {
        alert('Tarefa já existe')
        return;
    }
    tasks.push(task)
    localStorage.myTasks = JSON.stringify(tasks);
    createElements()   
};

function removeTask(task) {
    if(localStorage.myTasks) {
        tasks = JSON.parse(localStorage.getItem('myTasks'))
    }

    tasks = tasks.filter(valor => (valor !== task))
    localStorage.myTasks = JSON.stringify(tasks);

    if(!($('.toogle-img').attr('src') === './img/zoom-in-icon.png')){
        showCompleteTasks();
        returnTaskComplete();
    }
}

function removeCompletedTask(task) {
    if(localStorage.completedTasks) {
        completed = JSON.parse(localStorage.getItem('completedTasks'))
    }

    completed = completed.filter(valor => (valor !== task));
    localStorage.completedTasks = JSON.stringify(completed);

    returnTaskComplete()
}


function createElements() {
    if(localStorage.myTasks){
        
        backgroundColor();
        tasks = JSON.parse(localStorage.getItem('myTasks'))
        
        let valor = tasks[tasks.length - 1]
        let idCheck = 'myCheckbox' + tasks.length;
        
        let checkbox = ($("<input>", {
            type: 'checkbox',
            id: idCheck,
            class: 'meu-checkbox',
            name: 'task-check',
            value: 'task-check',
            click: function() {  
                    if($(this).is(":checked")){
                        completeTask($(this).siblings().text())
                        $(this).parent().remove()
                        removeTask($(this).siblings().text());
                        returnTaskComplete();
                    }
                }
            }))
        
        let text = ($("<label>", 
        {
            for: idCheck,
                class: 'label',
                name: 'task-label',
                id: 'inputlabel',
                text: valor
            }))
            
            let div = $("<div />")
            
            lista.append(div)
            div.append(checkbox, text)
        }
}
    
function completeTask(task) {
    if(localStorage.completedTasks){
        completed = JSON.parse(localStorage.getItem('completedTasks'))
    }
    completed.unshift(task)
    localStorage.completedTasks = JSON.stringify(completed);
}

function mapTasks(){

    returnTaskComplete();
    backgroundColor();
    concluidas.empty();

    if(localStorage.myTasks){
        tasks = JSON.parse(localStorage.getItem('myTasks'))
        
        if(localStorage.completedTasks) $(".quantidade-tarefas").text("(" + completed.length + ")");

        lista.empty()

        tasks.map((valor, index) => {
            let idCheck = 'myCheckbox' + index;

            let checkbox = ($("<input>", {
                type: 'checkbox',
                id: idCheck,
                class: 'meu-checkbox',
                name: 'task-check',
                value: 'task-check',
                click: function() { 
                    if($(this).is(":checked")){
                        completeTask($(this).siblings().text())
                        $(this).parent().remove()
                        $(".quantidade-tarefas").text("(" + completed.length + ")");
                        removeTask($(this).siblings().text());
                        }
                }
            }))
            
            let text = ($("<label>", 
                {
                    for: idCheck,
                    class: 'label',
                    name: 'task-label',
                    id: 'inputlabel',
                    text: valor
                }))
    
            let div = $("<div />",
            {
                class: idCheck
            })

            lista.append(div)
            div.append(checkbox, text)            
        });
    }
};

function showCompleteTasks(){
    if(localStorage.completedTasks){
        completed = JSON.parse(localStorage.getItem('completedTasks'))

        concluidas.empty()

        completed.map((valor, index) => {
            let idCheck = 'myCheckboxCompleted' + index;

            let checkbox = ($("<input>", {
                type: 'checkbox',
                id: idCheck,
                class: 'meu-checkbox',
                name: 'task-check',
                value: 'task-check',
                checked: 'true',
                disabled: 'false'
            }))
            
            let text = ($("<label>", 
                {
                    for: idCheck,
                    class: 'labelCompletedTask',
                    name: 'task-label',
                    id: 'inputlabel',
                    text: valor
                }))

            let img = ($("<img />",
                {
                    src: './img/delete-icon.png',
                    class: 'deleteIcon',
                    click: function() { 
                        if(!($(this).is(":checked"))){
                            completeTask($(this).siblings().text())
                            $(this).parent().remove();
                            removeCompletedTask($(this).siblings().text());
                        }
                    }
                }))
    
            let div = $("<div />",
            {
                class: idCheck
            })

            concluidas.append(div)
            div.append(checkbox, text, img)            
        });
    }
};

mapTasks();