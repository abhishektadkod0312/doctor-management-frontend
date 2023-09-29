import initialState from "./state";
import {combineReducers, createStore} from 'redux'

function add(state=initialState, action) {
    switch (action.type) {
      case "INCREMENT":
        return {
          ...state,
          num: state.num + action.step
        };
      case "DECREMENT":
        return {
          ...state,
          num: state.num - action.step
        };
      default:
        return state;
    }
  }

  function deletez(state=initialState, action) {
    switch (action.type) {
      case "INCREMENT":
        return {
          ...state,
          num: state.num + action.step
        };
      case "DECREMENT":
        return {
          ...state,
          num: state.num - action.step
        };
      default:
        return state;
    }
  }

  function storeMed(state=initialState, action) {
    switch (action.type) {
      case "addIt":
        return {
          ...state,
          val:action.val
        };
      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    add,
    deletez,
    storeMed
})

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
  
export default store;