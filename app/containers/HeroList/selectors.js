import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the heroList state domain
 */

const selectHeroListDomain = state => state.heroList || initialState;

/**
 * Other specific selectors
 */

export const getPeople = () =>
  createSelector(
    selectHeroListDomain,
    substate => substate.people,
  );

// export const getPeople = createSelector(
//   selectHeroListDomain,
//   substate => substate.people,
// );

export const getPeopleCount = () =>
  createSelector(
    selectHeroListDomain,
    substate => substate.peopleCount,
  );

export const getPage = () =>
  createSelector(
    selectHeroListDomain,
    substate => substate.page,
  );

export const getPlanets = () =>
  createSelector(
    selectHeroListDomain,
    substate => substate.planets,
  );

export const getSearchValue = () =>
  createSelector(
    selectHeroListDomain,
    substate => substate.searchValue,
  );

export { selectHeroListDomain };
