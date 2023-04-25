import { all, call, put } from 'redux-saga/effects';
import request from 'axios';

import {
  LOAD_PEOPLE_FAILED,
  LOAD_PEOPLE_PENDING,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PLANETS_FAILED,
  LOAD_PLANETS_PENDING,
  LOAD_PLANETS_SUCCESS,
} from './constants';

export function* loadPeople(page = 0) {
  try {
    yield put({ type: LOAD_PEOPLE_PENDING });
    const { data } = yield call(
      request.get,
      `https://swapi.dev/api/people/?page=${page + 1}`
    );
    yield put({ type: LOAD_PEOPLE_SUCCESS, data, page });
  } catch (error) {
    yield put({ type: LOAD_PEOPLE_FAILED, error });
  }
}

export function* loadPlanets() {
  try {
    yield put({ type: LOAD_PLANETS_PENDING });
    const { data } = yield call(request.get, `https://swapi.dev/api/planets`);
    yield put({ type: LOAD_PLANETS_SUCCESS, data });
  } catch (error) {
    yield put({ type: LOAD_PLANETS_FAILED, error });
  }
}

export default function* rootSaga() {
  yield all([loadPeople(), loadPlanets()]);
}
