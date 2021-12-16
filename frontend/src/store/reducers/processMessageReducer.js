
import { PROCESS_MESSAGE } from '../types/actionTypes';

export const processMessageReducer= (state ={}, action) =>{

    switch(action.type){
        case PROCESS_MESSAGE:
            return {...action.payload};
        default:
            return state;
    }

}