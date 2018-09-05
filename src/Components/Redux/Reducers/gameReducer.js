export default function gameReducer(state = {}, action) {
    switch(action.type) {
        case 'ACCEPT_ANSWER' : 
            console.log("test",action.answer);
            console.log({ ...state, answer: action.answer })
            return { ...state, answer: action.answer };
        
        default:
            return state;
    }
}