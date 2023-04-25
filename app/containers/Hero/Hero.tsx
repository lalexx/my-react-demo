/**
 *
 * Hero
 *
 */

import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import * as actions from '../HeroList/actions';
import * as selectors from '../HeroList/selectors';
import './Hero.css';

interface IHeroProps extends ComponentProps {
  people: Array<any>;
  planets: Array<any>;
  dispatch(action: any): void;
}

const Hero: React.FC<IHeroProps> = ({
  people,
  planets,
  dispatch,
}) => {
  const { heroId } = useParams();
  const hero = people.find(({ id }) => id === parseInt(heroId, 10));
  const planet = hero && planets.find(({ url }) => url === hero.homeworld);

  const handleChange = useCallback(
    (e, key) => {
      dispatch(actions.updateHero(hero.id, { [key]: e.target.value }));
    },
    [hero]
  );

  return (
    <div className="hero">
      <Helmet>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars Characters" />
      </Helmet>
      <div className="header">
        <Typography
          className="title"
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {hero ? hero.name : 'No such character'}
        </Typography>
      </div>
      {hero && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow key="name" className="two-columns">
                <TableCell>Name</TableCell>
                <TableCell>{hero.name}</TableCell>
              </TableRow>
              <TableRow key="height" className="two-columns">
                <TableCell>Height</TableCell>
                <TableCell>{hero.height}</TableCell>
              </TableRow>
              <TableRow key="mass" className="two-columns">
                <TableCell>Mass</TableCell>
                <TableCell>{hero.mass}</TableCell>
              </TableRow>
              <TableRow key="hair_color" className="two-columns">
                <TableCell>Hair Color</TableCell>
                <TableCell>{hero.hair_color}</TableCell>
              </TableRow>
              <TableRow key="skin_color" className="two-columns">
                <TableCell>Skin Color</TableCell>
                <TableCell>{hero.skin_color}</TableCell>
              </TableRow>
              <TableRow key="eye_color" className="two-columns">
                <TableCell>Eye Color</TableCell>
                <TableCell>{hero.eye_color}</TableCell>
              </TableRow>
              <TableRow key="birth_year" className="two-columns">
                <TableCell>Birth Year</TableCell>
                <TableCell>{hero.birth_year}</TableCell>
              </TableRow>
              <TableRow key="gender" className="two-columns">
                <TableCell>Gender</TableCell>
                <TableCell>{hero.gender}</TableCell>
              </TableRow>
              <TableRow key="homeworld" className="two-columns">
                <TableCell>Home World</TableCell>
                <TableCell className="with-input">
                  <FormControl variant="outlined">
                    <Select
                      value={planet ? planet.url : ""}
                      onChange={(e) => handleChange(e, "homeworld")}
                    >
                      <MenuItem value="" className="select-option">n/a</MenuItem>
                      {planets.map(({ name, url }) => <MenuItem value={url} className="select-option">{name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

// Hero.propTypes = {
//   people: PropTypes.array,
//   planets: PropTypes.array,
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  people: selectors.getPeople(),
  planets: selectors.getPlanets(),
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

export default compose(withConnect)(Hero);
