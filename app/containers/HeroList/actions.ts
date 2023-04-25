/*
 *
 * HeroList actions
 *
 */

import { SET_SEARCH_VALUE, UPDATE_HERO } from './constants';

export function setSearchValue(searchValue) {
  return {
    type: SET_SEARCH_VALUE,
    searchValue,
  };
}

export function updateHero(heroId, patch) {
  return {
    type: UPDATE_HERO,
    heroId,
    patch,
  };
}
