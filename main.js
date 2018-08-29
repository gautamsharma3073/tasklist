// UI variables//
const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListener();

function loadEventListener(){
	document.addEventListener('DOMContentLoaded',getTask);
	form.addEventListener('submit',addItem);
	clearBtn.addEventListener('click',clear);
	ul.addEventListener('click',removeItem);
	filter.addEventListener('input',filterList);
}

function getTask(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}
	else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task){
		//get element from input form
		let val = task;
		//create li element 
		let li = document.createElement('li');
		//appending class into list item
		li.className = 'collection-item';
		//append text into element
		li.appendChild(document.createTextNode(val));
		//craeting x icon into list item
		//create a link element
		let link = document.createElement('a');
		//appending class into link
		link.className = 'delete-item secondary-content';
		//appending Cross into link 
		link.innerHTML = '<span class="fa fa-remove"></span>';
		//appending link into list item
		li.appendChild(link);

		ul.appendChild(li);
	});
}
function addItem(e){
	if (taskInput.value === '') {
		alert('Enter something ?');
		return 0;
	}

	//get element from input form
	let val = taskInput.value;
	//create li element 
	let li = document.createElement('li');
	//appending class into list item
	li.className = 'collection-item';
	//append text into element
	li.appendChild(document.createTextNode(val));
	//add item to local storage//
	addItemToLocalStorage(val);

	//create a link element
	let link = document.createElement('a');
	//appending class into link
	link.className = 'delete-item secondary-content';
	//appending Cross into link 
	link.innerHTML = '<span class="fa fa-remove"></span>';
	//appending link into list item
	li.appendChild(link);

	ul.appendChild(li);
	// console.log(li);

	taskInput.value = '';

	//preventing default feature//
	e.preventDefault();
}
function removeItem(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if (confirm('are u sure ?')) {
			e.target.parentElement.parentElement.remove();
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}		
	}
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addItemToLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}
	else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}
//clear all item from list item
function clear(){
	//remove element using innerHTML
	
	// ul.innerHTML = '';

	//remove element using removeChild
	while(ul.firstChild){
		ul.removeChild(ul.firstChild);
	}
	localStorage.clear();
}
//filter list 
function filterList(e){
	let text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(task){
		let list = task.firstChild.textContent.toLowerCase();
		if(list.indexOf(text) != -1){
			task.style.display = 'block';
		}
		else{
			task.style.display = 'none';
		}
	});
}

