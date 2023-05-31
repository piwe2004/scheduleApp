let keyId = 0

const currentSchedule = {
    scheduleList:[],
}

export const ADD = "ADD_SCHEDULE";
export const DELETE = "SCHEDULE/DELETE";
export const EDIT = "SCHEDULE/EDIT";
export const SUCCESS = "SCHEDULE/SUCCESS";


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