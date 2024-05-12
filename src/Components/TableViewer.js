import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material'
import { map } from 'lodash';
import React from 'react'
import styled from 'styled-components';

const TableViewers = ({
  columns=[],
  tableResult=[],
}) => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {map(columns, (key) => <StyledTableCell key={key}>{key}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {map(tableResult, (row, r) => (
            <StyledTableRow key={`${row.name}-${r}`} 
              
            >
              {map(columns, (k) => {
                return (
                  <StyledTableCell sx={{
                    maxWidth: 600
                  }} key={`${row.name}-${k}`} align="left">
                    {JSON.stringify((row[k]))?.replace(/\\n|\\/g, " ")}
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TableViewers