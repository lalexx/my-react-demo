import { setSearchValue, updateHero } from '../actions';
import { SET_SEARCH_VALUE, UPDATE_HERO } from '../constants';

describe('HeroList actions', () => {
  describe('setSearchValue', () => {
    it('has a type of SET_SEARCH_VALUE', () => {
      const expected = {
        type: SET_SEARCH_VALUE,
      };
      expect(setSearchValue()).toEqual(expected);
    });
  });

  describe('updateHero', () => {
    it('has a type of UPDATE_HERO', () => {
      const expected = {
        type: UPDATE_HERO,
      };
      expect(updateHero()).toEqual(expected);
    });
  });
});
