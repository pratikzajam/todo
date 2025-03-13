export let Add = (payload) => {
    console.log(payload)
    return {
        type: "Add",
        payload
    }

}



export let Delete = (payload) => {

    return {
        type: "Delete",
        payload
    }

}

export let MarkasComplete = (payload) => {



    return {
        type: "MarkasComplete",
        payload
    }

}


export let Pending = (payload) => {

    return {
        type: "Pending",
        payload
    }

}



export let Completed = (payload) => {

    return {
        type: "Completed",
        payload
    }

}




export let Update = (payload, payload1) => {

    console.log(payload, payload1)

    return {
        type: "Update",
        payload,
        payload1
    }

}