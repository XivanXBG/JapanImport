import { createStore } from 'redux';
import searchCriteriaReducer from './reducer';

const store = createStore(searchCriteriaReducer);

export default store;