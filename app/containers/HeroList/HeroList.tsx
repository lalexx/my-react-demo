/**
 *
 * HeroList
 *
 */

import React, { useContext, useMemo } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga, { loadPeople } from './saga';

import CharactersTable from '../../components/CharactersTable/CharactersTable';

interface IHeroListProps extends ComponentProps {
  people: Array<any>;
  peopleCount: number;
  page: number;
  planets: Array<any>;
  searchValue: string;
  dispatch(action: any): void;
}

const HeroList: React.FC<IHeroListProps> = ({
  people,
  peopleCount,
  page,
  planets,
  searchValue,
  dispatch,
}) => {
  useInjectReducer({ key: 'heroList', reducer });
  useInjectSaga({ key: 'heroList', saga });
  const context = useContext(ReactReduxContext);

  const searchedPeople = useMemo(
    () => {
      if (!searchValue) return people;

      return people.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    [people, searchValue]
  );

  return (
    <div>
      <Helmet>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars Characters" />
      </Helmet>
      <CharactersTable
        people={searchedPeople}
        peopleCount={peopleCount}
        page={page}
        planets={planets}
        searchValue={searchValue}
        onChangePage={newPage => context.store.runSaga(loadPeople, newPage)}
        onChangeSearchValue={newSearchValue =>
          dispatch(actions.setSearchValue(newSearchValue))
        }
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  people: selectors.getPeople(),
  peopleCount: selectors.getPeopleCount(),
  page: selectors.getPage(),
  planets: selectors.getPlanets(),
  searchValue: selectors.getSearchValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HeroList);
