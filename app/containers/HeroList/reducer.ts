/*
 *
 * HeroList reducer
 *
 */
import produce from 'immer';
import {
  LOAD_PEOPLE_SUCCESS,
  LOAD_PLANETS_SUCCESS,
  SET_SEARCH_VALUE,
  UPDATE_HERO,
  REGEX_HERO_ID,
} from './constants';

export const initialState = {
  people: [],
  peopleCount: 0,
  page: 0,
  planets: [],
  searchValue: '',
};

/* eslint-disable default-case, no-param-reassign */
const heroListReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log(action);
    switch (action.type) {
      case LOAD_PEOPLE_SUCCESS:
        draft.people = action.data.results.map(person => ({
          ...person,
          id: parseInt(person.url.match(REGEX_HERO_ID)[0], 10),
        }));
        draft.peopleCount = action.data.count;
        draft.page = action.page;
        break;

      case LOAD_PLANETS_SUCCESS:
        draft.planets = action.data.results;
        break;

      case SET_SEARCH_VALUE:
        draft.searchValue = action.searchValue;
        break;

      case UPDATE_HERO:
        const heroIndex = draft.people.findIndex(({ id }) => id === action.heroId);
        draft.people[heroIndex] = { ...draft.people[heroIndex], ...action.patch };
        break;
    }
  });

export default heroListReducer;
