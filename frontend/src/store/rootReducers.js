import {combineReducers} from 'redux';
import {processMessageReducer} from './reducers/processMessageReducer'

const rootReducers = combineReducers({
    processMesssage: processMessageReducer
})

export default rootReducers;