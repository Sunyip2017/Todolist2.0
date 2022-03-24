import { todoItem } from '../types/todolist'
import TodoTemplate from './TodoTemplete'
import { findParentNode, createItem } from '../utils'

class TodoDom extends TodoTemplate{
    constructor(private todoWrapper:HTMLElement) {
        super()
    }
    protected initList (todoData: todoItem[]) {
        if(todoData.length) {
            const oFrag = document.createDocumentFragment();
            todoData.map( (todo: todoItem) => {
               const oItem = createItem('div','todo-item',this.todoView(todo));
                oFrag.appendChild(oItem)
            })
            this.todoWrapper.appendChild(oFrag)
        }
    }
    protected addItem (todo:todoItem) {
        const oItem = createItem('div','todo-item',this.todoView(todo))
        this.todoWrapper.appendChild(oItem)
    }

    protected removeItem (target: HTMLElement) {
        const oParentNode = findParentNode(target,'todo-item');
        oParentNode?.remove() 

    }

    protected changeCompleted (target: HTMLElement, completed: boolean) {
        const oParentNode: HTMLElement = findParentNode(target,'todo-item') as HTMLElement;
        const oCard: HTMLElement = oParentNode.querySelector('.card') as HTMLElement;
        const oContent: HTMLElement  = oParentNode.querySelector('span') as HTMLElement;
        oContent.style.textDecoration = (completed ? 'line-through' :'none');
        oCard.classList.add('bg-secondary', 'bg-gradient','bg-opacity-10');
    }
}

export default TodoDom;