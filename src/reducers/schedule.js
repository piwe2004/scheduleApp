let keyId = 0


const currentSchedule = {
    scheduleList:[],
}

export const ADD = "ADD_SCHEDULE";
export const DELETE = "DELETE_SCHEDULE";
export const EDIT = "EDIT_SCHEDULE";


export const add_schedule = ({title, date, content, isComplate}) => {
    return{
        type:ADD, 
        scheduleList:{
            keyId:keyId++,
            title,
            date,
            content,
            isComplate
        }
    }
};

export const edit_schedule = ({keyId, title, date, content, isComplate}) => {
    return{
        type:EDIT,
        scheduleList:{
            keyId,
            title,
            date,
            content,
            isComplate
        }
    }
};

export const delete_schedule = (keyId) => {
    return{
        type:DELETE,
        keyId
    }
};


const schedule = (state = currentSchedule, action) => {
    switch(action.type){
        case ADD :
            return {
                scheduleList : [...state.scheduleList, action.scheduleList]
            }
        case EDIT :
            return {
                scheduleList : [...state.scheduleList.slice(0, action.scheduleList.keyId), action.scheduleList, ...state.scheduleList.slice(action.scheduleList.keyId + 1) ]
            }
        case DELETE :
            return {
                scheduleList : [...state.scheduleList.filter(x => x.keyId !== action.keyId)]
            }
        default :
        return state
    }
}

export default schedule;