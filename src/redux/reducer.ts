import { combineReducers } from 'redux'
import { configReducer, ConfigState } from './reducers/configReducer'

export type Reducers = {
    config: ConfigState
}

const rootReducer = combineReducers({
    config: configReducer
})

export default rootReducer
