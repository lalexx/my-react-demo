/**
 *
 * CharactersTable
 *
 */

import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './CharactersTable.css';

interface ICharactersTableProps extends ComponentProps {
  people: Array<any>;
  peopleCount: number;
  page: number;
  planets: Array<any>;
  searchValue: string;
  onChangePage(value: number): void;
  onChangeSearchValue(value: string): void;
}

const CharactersTable: React.FC<ICharactersTableProps> = ({
  people,
  peopleCount,
  page,
  planets,
  searchValue,
  onChangePage,
  onChangeSearchValue,
}) => {
  const handleChangePage = useCallback(
    (e, newPage) => {
      onChangePage(newPage);
    },
    [onChangePage]
  );

  const handleSearchValueChange = useCallback(
    e => {
      onChangeSearchValue(e.target.value);
    },
    [onChangeSearchValue]
  );

  return (
    <>
      <div className="header">
        <Typography
          className="title"
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Star Wars Characters
        </Typography>
        <TextField
          className="search"
          type="search"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="two-columns">
              <TableCell component="th" className="caption">
                Name
              </TableCell>
              <TableCell component="th" className="caption">
                Home World
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(person => {
              const planet = planets.find(
                ({ url }) => url === person.homeworld
              );
              return (
                <TableRow key={person.name} hover className="two-columns">
                  <TableCell>
                    <Link to={`hero/${person.id}`}>{person.name}</Link>
                  </TableCell>
                  <TableCell>{planet && planet.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={peopleCount}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}

export default CharactersTable;
