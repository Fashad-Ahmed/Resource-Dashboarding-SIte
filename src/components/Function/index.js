import * as api from '../../utils/api';

export const readTodo = async () =>  {
    try {
        const { data } = await api.readTodos();
        return data
    } catch (error) {
        console.log(error)   
    }
}

export const createTodo = async (todo) =>  {
    try {
        const { data } = await api.createTodo(todo);
        return data
    } catch (error) {
        console.log(error)   
    }
}