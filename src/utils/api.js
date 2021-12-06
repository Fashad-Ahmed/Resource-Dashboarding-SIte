import axios from 'axios';
const url = 'http://localhost:3000/teacher';

export const realTodo = () => {
    axios.get(url)
}

 