import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers/index'

const combinedReducer = rootReducer();


const store = configureStore({
    reducer: combinedReducer,
})

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/index', () => store.replaceReducer(combinedReducer))
}

export default store;
