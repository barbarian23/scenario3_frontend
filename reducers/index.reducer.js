import {
   
} from "../actions/index.action"
const initState = {
    isShowNoticeFailedModal: false,
}
const indexReducer = (state = initState, action) => {
    switch (action.type) {
      
        default:
            console.log("defaul reducer ", state.bookingSuccess)
            return {
                ...state,
                bookingSuccess: ""
            };
    }
}

export default indexReducer;