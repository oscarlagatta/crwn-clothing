# category.saga.js

<!-- > this is quote  -->

 <!-- **Bold sentence**
__Bold sentence__ -->



### The category saga replaces the async thunk, this will be stored in a new file the category.saga.js. 

We replicate the **fetchCategoriesAsync** from the _category.actions.js_, we need
to import 4 of the saga base effects generators, which are similar to the ones we use in 
the generator functions. 
Sagas have redux bindings, meaning that we are able to access the redux store,
we are able to dispatch to it, and we do so through these methods. 

import { takeLatest, all, call, put } from 'redux-saga/effects';  

effects tells us these are effects generators. 

We need to import getCategoriesAndDocuments from the firebase.utils.js file.
We also need to import the action creators, fetchCategoriesSuccess, and the 
fetchCategoriesFail. 
We need also the CATEGORIES_ACTION_TYPES from category.types. 


- First we need to setup the export from this saga, and this is an accumulator 
that holds all of the sagas that are related to the categories 

export function* categoriesSaga() {
    yield all([])
}

- First generators is the one we trigger when we call fetchCategoriesStart, so
generators respond to ACTIONS the same way reducers do inside of their **_switch_**
case. With Saga is similar to reducers, whenever an action happens we do something
with it.

    - export function* onFetchCategories() { 
        yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, )
     }

- We create the saga that goes with the fetch categories start, 

    - export function* fetchCategoriesAsync() {}