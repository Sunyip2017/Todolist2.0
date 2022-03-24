import { todoItem } from './src/types/todolist';
import TodoEvent from './src/js/TodoEvent';


;(function (doc) {
    const oInput: HTMLInputElement = doc.querySelector('input') as HTMLInputElement;
    const oAddBtn: HTMLElement = doc.querySelector('.btn') as HTMLElement;
    const oTodoList: HTMLElement = doc.querySelector('.todo-list') as HTMLElement;
    let todoData: todoItem[] = []

    const todoEvent: TodoEvent = new TodoEvent(todoData, oTodoList)

    const init = (): void => {
        bindEvent()
    }

    const bindEvent = (): void => {
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oTodoList.addEventListener('click', handleListClick, false);
    }
    function handleAddBtnClick():void {
        const val: string = oInput.value.trim();
        if(val.length) {
            const result:undefined|number = todoEvent.addTodo(<todoItem>{
                id: new Date().getTime(),
                content: val,
                completed: false
            })
            if(result) {
                alert('此项内容已存在')
            }
        }
        oInput.value = ''
    }
    function handleListClick(e: MouseEvent):void {
        const tar = e.target as HTMLElement;
        const tagName:string = tar.tagName;
        if(tagName === 'INPUT' || tagName === 'BUTTON') {
            const id = parseInt(tar.dataset.id as string);
            switch(tagName) {
                case 'INPUT':
                    todoEvent.toggleComplte(tar, id);
                    break;
                case 'BUTTON':
                    todoEvent.removeTodo(tar, id);
                    break;
                default:
                    break;
            }
        }
    }

    init()

})(document)

