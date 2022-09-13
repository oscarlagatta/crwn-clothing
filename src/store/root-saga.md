/**
 * REDUX SAGA
 * 
 * We have a couple of methods that we import exclusively from Redux Saga, the 
 * "all" and the "call", Redux Saga has a bunch of redux binding that allows us 
 * to interact with Redux Store while we are working within the saga's 
 * themselve.
 * And the sagas themselves are based of JavaScript generator functions (f*)
 * 
 * Here below we are configuring the actual Saga code so that we can start 
 * working. before we write any saga.
 * 
 * We import all and call from redux-saga/effects, (effects => side effects)
 * 
 * 
 * Then we need to export a generator function and that generator function is 
 * distiguished by the function signature 
 * export function* rootSaga, the star determines that is a ES6 generator 
 * function.
 * import { all, call } from "redux-saga/effects";
 * 
 * export function* rootSaga() {}
 * 
 * ************************* STORE.JS **************************************
 * Then we need to update the "store.js" and import the createSagaMiddleware, 
 * Saga replaces Thunks (we want only one asynchronous side effect library )
 * 
 * import createSagaMiddleware from 'redux-saga';
 * 
 * import { rootSaga } from './root-saga';
 * 
 * Then we need to create the Saga Middleware
 * 
 * const sagaMiddleware = createSagaMiddleware();
 * 
 * And we put this sagaMiddleware inside the middleWares array 
 * 
 * const middleWares = [process.env.NODE_ENV !== "production" && loggerMiddleware,
 *                      sagaMiddleware
 *  ].filter(Boolean);
 * 
 * 
 * And after the Store has been instaiated with the saga middleware inside, 
 * then we tell the Saga Middleware to run and we pass the rootSaga.
 * 
 * sagaMiddleware.run(rootSaga);
 * 
 * This is very unique to Redux Saga configuration and intantiation, but that's 
 * all needed.
 * 
 */