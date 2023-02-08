input = document.querySelector('input')
btn = document.querySelector('button')
var todos = document.querySelector('.todos')
var todosElements = []
var ids = []
var currentEditing = ''
if (localStorage.getItem('todos')) {
  todosElements = JSON.parse(localStorage.getItem('todos'))
  for (var i = 0; i < todosElements.length; i++) {
    ids.push(todosElements[i].id)
  }
}
for (var i = 0; i < todosElements.length; i++) {
  todoContainer = document.createElement('div')
  todoContainer.classList.add('todo')
  todoContainer.id = todosElements[i].id
  todoText = document.createElement('p')
  todoText.addEventListener('click', function (e) {
    edit(e)
  })
  todoText.textContent = todosElements[i].text
  todoDel = document.createElement('span')
  todoDel.textContent = 'DEL'

  todoDel.addEventListener('click', function (e) {
    console.log(e.target.parentElement.id)
    del(e.target.parentElement.id, e)
  })
  todoContainer.appendChild(todoText)
  todoContainer.appendChild(todoDel)
  todos.appendChild(todoContainer)
}
setInfo('todos loaded!')
function addTodo(e) {
  console.log(e)
  if (input.value === '' || (e.key && e.key !== 'Enter')) return
  todosElements.push({ text: input.value, id: generateID() })
  localStorage.setItem('todos', JSON.stringify(todosElements))
  todoContainer = document.createElement('div')
  todoContainer.classList.add('todo')
  todoContainer.id = todosElements[todosElements.length - 1].id
  todoText = document.createElement('p')
  todoText.addEventListener('click', function (e) {
    edit(e)
  })
  todoText.textContent = input.value
  todoDel = document.createElement('span')
  todoDel.textContent = 'DEL'
  todoDel.addEventListener('click', function (e) {
    del(e.target.parentElement.id, e)
  })
  todoContainer.appendChild(todoText)
  todoContainer.appendChild(todoDel)
  todos.appendChild(todoContainer)
  input.value = ''
  setInfo('todo added!')
}
btn.addEventListener('click', function (e) {
  addTodo(e)
})
window.addEventListener('keypress', function (e) {
  addTodo(e)
})

function del(id, e) {
  //  this.parentElement.remove()
  e.target.parentElement.remove()
  let newTodosElements = []
  let newIds = []
  for (let i = 0; i < todosElements.length; i++) {
    if (todosElements[i].id !== id) {
      newTodosElements.push(todosElements[i])
    }
  }
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== id) {
      newIds.push(ids[i])
    }
  }
  todosElements = newTodosElements
  ids = newIds
  localStorage.setItem('todos', JSON.stringify(todosElements))
  setInfo('todo deleted!')
}
function edit(e) {
  document.querySelector('#submit').style.display = 'none'
  document.querySelector('#edit').style.display = 'block'
  input.value = e.target.innerHTML
  input.focus()
  currentEditing = e.target.parentElement.id
}
function doneEditing() {
  for (let i = 0; i < todosElements.length; i++) {
    if (todosElements[i].id === currentEditing) {
      todosElements[i].text = input.value
    }
  }
  let allTodos = document.querySelectorAll('.todo')
  for (let i = 0; i < allTodos.length; i++) {
    if (currentEditing === allTodos[i].id) {
      allTodos[i].children[0].textContent = input.value
    }
  }
  localStorage.setItem('todos', JSON.stringify(todosElements))
  document.querySelector('#submit').style.display = 'block'
  document.querySelector('#edit').style.display = 'none'
  setInfo('todo edited!')
}

function setInfo(info) {
  document.querySelector('#info').innerHTML = info
  l = setTimeout(function () {
    document.querySelector('#info').innerHTML = ''
  }, 2000)
}

function generateID() {
  id = ''

  idKeys = '123456789AZERTYUIOPQSDFGHJKLMWXCVBN*-!:;&@'
  test = false
  while (test === false) {
    for (let i = 0; i < 5; i++) {
      randomChar = Math.floor(Math.random() * idKeys.length)
      id += idKeys[randomChar]
    }
    test = true
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === id) {
        test = false
      }
    }
  }
  ids.push(id)
  return id
}
