import produce from 'immer';
import heroListReducer from '../reducer';
import { setSearchValue, updateHero } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('heroListReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      people: [{ id: 1, name: 'Test 1' }],
      peopleCount: 0,
      page: 0,
      planets: [],
      searchValue: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(heroListReducer(undefined, {})).toEqual(expectedResult);
  });

  it('handles the setSearchValue action', () => {
    const expectedResult = produce(state, draft => {
      draft.searchValue = 'test';
    });
    expect(heroListReducer(state, setSearchValue('test'))).toEqual(expectedResult);
  });

  it('handles the updateHero action', () => {
    const expectedResult = produce(state, draft => {
      draft.people = [{ id: 1, name: 'Test 2' }];
    });
    expect(heroListReducer(state, updateHero(1, { name: 'Test 2'}))).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
