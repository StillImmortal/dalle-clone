import { createStore } from "redux"

const initialState = {
  text: null,
  data: null,
}

export const search = (load) => ({
  type: 'SEARCH',
  load,
})

const reducer = (initialState, action) => {
  switch (action.type) {
      case 'SEARCH': 
        return {
          ...initialState,
          text: action.load.text,
          data: action.load.data
        }
      default:
        return initialState
  }
}

const store = createStore(reducer)
// store.subscribe(() => console.log(store.getState()))
export default store