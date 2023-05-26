let keyId = 0

export const initalSchedule = ({title, date, content}) => {
    return {
        scheduleList:{
            keyId:keyId++,
            title,
            date,
            content
        }
    }
}
const currentSchedule = {
    scheduleList:[],
}


export const ADD = "ADD_SCHEDULE";
export const DELETE = "SCHEDULE/DELETE";
export const EDIT = "SCHEDULE/EDIT";
export const SUCCESS = "SCHEDULE/SUCCESS";


export const add_schedule = ({title, date, content}) => {
    return{
        type:ADD, 
        scheduleList:{
            keyId:keyId++,
            title,
            date,
            content
        }
    }
};

const schedule = (state = currentSchedule, action) => {
    switch(action.type){
        case ADD :
            return {
                scheduleList : [...state.scheduleList, action.scheduleList]
            }
        default :
        return state
    }
}

export default schedule;