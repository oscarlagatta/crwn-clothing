// Saga's effects generators, side effects generators
import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

/**
 *  
 */
export function* fetchCategoriesAsync() {
  try {
    /**
     * getCategoriesAndDocuments is an asyn event that happens, then yield 
     * awaits until the getCategoriesAndDocuments returns something. But this
     * needs to be a generator effect and that's why we use "call". Anywhere 
     * we have a function and we want to turn it into an effect we use the 
     * "call" keyword. The way call works, is we pass the callable method, the
     * getCategoriesAndDocuments, and then the parameters the method needs. 
     * getCategoriesAndDocuments receives a string and we are passing the 
     * "categories" string.  
     * Then we need to dispatch fetchCategoriesSuccess when the categories come
     * back. But we don't call dispatch in a generator function we call "put". 
     * yield put(fetchCategoriesSuccess(categoriesArray));
     * and we do the same with fetchCategoriesFailed in case of failure.
     * This is the method we pass to the onFetchCategories method takeLatest.
     * 
     * The way the code will flow, is 
     * 
     *  whenver we take the latest FETCH_CATEGORY_START ACTION we initialize 
     * fetchCategoriesAsync Saga. This saga is going to attempt to fetch the 
     * categories array from firebase if that's successful then we are going to
     * put; which is the generator version of DISPATCH; this 
     * fetchCategoriesSuccess action with the categories array. 
     * If fails we dispatch the fetchCategoriesFailed with the error.
     * 
     * Both of these action go back to the Redux flow and in turn update the 
     * reducer or any Sagas that are listening for these actions. 
     * 
     * Then we take the onFetchCategories Saga, and we are going to listen 
     * in the "categoriesSaga" aggregator. (the main export of this file)
     */
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

/**
 * This is triggered when we call Fetch category start, generators respond to
 * actions the same way reducers do inside of the switch. With Sagas whenever
 * an action happens we do something with it. 
 * The moment I hear the action FETCH_CATEGORIES_START we yield takeLatest, 
 * where take is when we receive action, takeLatest is when we hear a bunch 
 * of the same actions give me the latest one. All the previous same actions
 * are cancelled. 
 * The moment the action FETCH_CATEGORIES_START with takeLatest we run 
 * fetchCategoriesAsync 
 */
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

/**
 * This is the main export from this Saga file, this is an accumulator that 
 * holds all of our Sagas related to the categories. 
 * The function yield the all call, call is an effect that says, run everything
 * inside and only complete when all of it is done. 
 * "all" says we can give an array of different generators we are calling, and
 * will wait until all of them are complete before we can continue, inside
 * of this array is where we add the generators funtions. 
 */
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
