import { v4 as uuidv4 } from 'uuid';

let initialState = []



let todoReducer = (state = initialState, action) => {



    if (action.type == "Add") {
        console.log(action.payload)
        let todo = {
            id: uuidv4(),
            task: action.payload,
            isCompleted: false
        }

        return [...state, todo]
    }


    if (action.type == "Delete") {
        return state.filter(todo => todo.id != action.payload)
    }



    if (action.type == "MarkasComplete") {

      

        return state.map((todo) =>
            (todo.id === action.payload) ? { ...todo, isCompleted: true } : todo
        )
    }



    if (action.type == "Update") {

        return state.map((todo) =>
            (todo.id === action.payload) ? { ...todo, task: action.payload1 } : todo
        )
    }


    if (action.type === "Pending") {

        return state.filter(task=>task.isCompleted==false)
    }


    if (action.type === "Completed") {

        return state.filter(task=>task.isCompleted==true)
    }

    return state


}

export default todoReducer