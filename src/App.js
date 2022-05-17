import React from "react"
import './App.css';
import { useState, useEffect } from "react";
//Importing Components
import Form from './components/Form';
import ToDoList from './components/ToDoList';
function App() {
  
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

//This will run once when the effect starts

  useEffect(() => {
    getLocalTodos();
  }, []);


  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);


  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
  }
}
// Save to Local Storage
const saveLocalTodos = () => {
  
    localStorage.setItem('todos', JSON.stringify(todos));
  }
 //Get Local Todos
const getLocalTodos = () => {
    if(localStorage.getItem('todos')){
        setTodos(JSON.parse(localStorage.getItem('todos')));
    }
}
  return (
    <div className="App">
      <header>
        <h1>To Do List</h1>
      </header>
      
      
      <Form 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      inputText={inputText}
      setStatus = {setStatus}
      
      />
      
      
      <ToDoList 
      todos={todos}
      setTodos={setTodos}
      filteredTodos = {filteredTodos}
      />
    </div>
  );
}

export default App;
