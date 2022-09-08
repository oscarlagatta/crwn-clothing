import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from 'redux-logger';

import { rootReducer } from "./root-reducer";

import { loggerMiddleware } from "./middleware/logger";

// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import  { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};


const sagaMiddleware = createSagaMiddleware();


// persisted Reducer to use for the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  sagaMiddleware
  // thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// persistedReducer to use for the store; the store now will use by default
// persistedReducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
