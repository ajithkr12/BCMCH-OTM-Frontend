import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

import Dots from '../Components/Dots';
import { Colors } from "../Constants/Colors";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFFFFF',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#D7E9B9',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function createData(uhid, patientName, surgeonName, surgeryName, pac,admit,ready) {
  return {
    uhid, 
    patientName, 
    surgeonName, 
    surgeryName, 
    pac,
    admit,
    ready
  };
}

const rows = [
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
  createData('ABGTH1245687', "Ravi Shangar", "Alex", "Xyz abc", "Y","Y","Y"),
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  console.log("row count",rowCount)

  return (
    <TableHead style={{backgroundColor:Colors.SecondaryBlue, color: 'white'}}>
      <TableRow>
        <TableCell padding="checkbox">
        <IconButton>
        <DeleteIcon />
        </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      </TableCell>
        <TableCell align="center" style={{fontWeight:800}}>Patient's UHID</TableCell>
        <TableCell align="center" style={{fontWeight:800}}>Patient's Name</TableCell>
        <TableCell align="center" style={{fontWeight:800}}>Surgeon's Name</TableCell>
        <TableCell align="center" style={{fontWeight:800}}>Surgery's Name</TableCell>
        <TableCell align="center" style={{fontWeight:800}}>PAC Status</TableCell>
        <TableCell align="center" style={{fontWeight:800}}>Admit Status</TableCell>
        <TableCell align="center" style={{fontWeight:800}}>Ready Status</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          
        </Typography>
      )}

    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {
                rows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      <IconButton>
                      <DeleteIcon />
                    </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.uhid}
                      </TableCell>
                      <TableCell align="center">{row.patientName}</TableCell>
                      <TableCell align="center">{row.surgeonName}</TableCell>
                      <TableCell align="center">{row.surgeryName}</TableCell>
                      <TableCell align="center"><Dots/></TableCell>
                      <TableCell align="center"><Dots/></TableCell>
                      <TableCell align="center"><Dots/></TableCell>
                    </StyledTableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}

