export const ADD = "SCHEDULE/ADD";
export const DELETE = "SCHEDULE/DELETE";
export const EDIT = "SCHEDULE/EDIT";
export const SUCCESS = "SCHEDULE/SUCCESS";


export const addSchedule = scheduleData => ({type:ADD, scheduleData});

const initalSchedule = {
    scheduleList: []
}

const schedule = (state = initalSchedule, action) => {
    switch(action.type){
        case ADD :
            return {
                scheduleList:[...state, action.scheduleData]
            };
        default :
        return state
    }
}

export default schedule;