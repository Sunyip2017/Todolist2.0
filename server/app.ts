import express, { Application } from 'express';
import bodyParse from 'body-parser';


import { todoItem } from './type.d'

import { fileOperation } from './utils'

const app: Application = express();

app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'GET,POST,DELETE,PUT,OPTION');
    next()
})

app.get('/', function (req, res) {
    res.send('<h1>TodoList</h1>')
})
app.get('/todolist', function (req, res) {
    const todoList: string = fileOperation('./todo.json') as string;
    res.send(todoList)
})
app.post('/add', function (req, res) {
    const todo: todoItem = JSON.parse(req.body.todo);
    fileOperation('./todo.json',function(todoData:todoItem[]) {
        const hasTodoItem = todoData.find((todoItem: todoItem) => todoItem.content === todo.content);
        if(hasTodoItem) {
            res.send({
                code:100,
                msg: 'ok'
            })
            return false
        }
        todoData.push(todo)
        return todoData
    })
    res.send({
        code:200,
        msg: 'ok'
    })
})
app.post('/toggle', function (req, res) {
    const id: number = parseInt(req.body.id);
    fileOperation('./todo.json',function(todoList: todoItem[]) {
        todoList.map((todo:todoItem) => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
        })
        return todoList
    });
    res.send({
        msg: 'ok',
        code: 200
    })
})
app.post('/remove', function (req, res) {
    const id: number = parseInt(req.body.id)
    fileOperation('./todo.json',function(todoList: todoItem[]) {
        return todoList.filter((item: todoItem) => item.id !== id);
    });
    res.send({
        msg: 'ok',
        code: 200
    })
})

app.listen(9000)