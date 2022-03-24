import $ from 'jquery'
import { todoItem } from '../types/todolist.d'
export function getTodo(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor 
): void {
    const _origin = descriptor.value;
    descriptor.value = function(todoData: todoItem[]) {
        $.get('http://localhost:9000/todolist').then((res: string) => {
            if(!res) {
                return ;
            }
            todoData = JSON.parse(res)
        }).then(() => {
            _origin.call(this,todoData)
        })
    }

}

export function removeTodo(
    target: any,
    methodNanme: string,
    descriptor:PropertyDescriptor,
):void {
    const _origin = descriptor.value;
    descriptor.value = function(target: HTMLElement, id: number) {
        $.post('http://localhost:9000/remove', {id} ).then((res: {msg: string, code: number}) => {
            if(res.msg === 'ok'){
                _origin.call(this, target, id);
                alert('删除成功');
            }

        })
    }
}

export function toggleTodo(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _origin = descriptor.value;
    descriptor.value = function(target: HTMLElement, id: number) {
        $.post('http://localhost:9000/toggle', {id} ).then((res: {msg: string, code: number}) => {
            if(res.msg === 'ok'){
                _origin.call(this, target, id);
                alert('修改成功');
            }

        })
    }
}

export function addTodo(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const _origin = descriptor.value;
    descriptor.value = function(todo: todoItem) {
        $.post('http://localhost:9000/add', {todo: JSON.stringify(todo)} ).then((res: {msg: string, code: number}) => {
            if(res.code === 100) {
                alert('该项数据已存在')
                return false
            }
            if(res.msg === 'ok'){
                _origin.call(this, todo);
                alert('新增成功');
            }
        })
    }
}