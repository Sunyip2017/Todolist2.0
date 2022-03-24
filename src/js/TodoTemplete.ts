import { todoItem } from '../types/todolist'
class TodoTemplete {
    protected todoView({id, content, completed}: todoItem): string{
        return `
        <div class="card my-2 ${completed ? 'bg-secondary bg-gradient bg-opacity-10' : ''}">
            <div class='card-body'>
                <input class='me-3 form-check-input' type="checkbox" ${completed ? 'checked' : ''} data-id="${id}"/>
                <span class='d-inline-block w-75 text-truncate' style="text-decoration: ${ completed ? 'line-through' : 'none' }">${content}</span>
                <div class='d-inline-block text-end' style='width:18%;'>
                    <button data-id="${id}" class="btn  btn-danger btn-sm">删除</button>
                </div>
            </div>
        </div>
        `
    }
}

export default TodoTemplete;