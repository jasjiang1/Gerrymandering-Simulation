import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function GinglesTable({ ginglesTableData }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx ={{fontSize: '1.5rem'}}>Precinct</TableCell>
                  <TableCell sx ={{fontSize: '1.5rem'}}>Minority Percentage</TableCell>
                  <TableCell sx ={{fontSize: '1.5rem'}}>Republican Vote Margin</TableCell>
                  <TableCell sx ={{fontSize: '1.5rem'}}>Democratic Vote Margin</TableCell>
                  <TableCell sx ={{fontSize: '1.5rem'}}>Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ginglesTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow sx={{ color: 'white', fontSize: '1.5rem' }}key={row.precinct}>
                    <TableCell sx={{ color: 'white', fontSize: '1.5rem' }}>{row.precinct}</TableCell>
                    <TableCell sx={{ color: 'white', fontSize: '1.5rem' }}>{parseFloat(row.minorityPCT).toFixed(2)}</TableCell>
                    <TableCell sx={{ color: 'white', fontSize: '1.5rem' }}>{parseFloat(row.republicanPCT).toFixed(2)}</TableCell>
                    <TableCell sx={{ color: 'white', fontSize: '1.5rem' }}>{parseFloat(row.democraticPCT).toFixed(2)}</TableCell>
                    <TableCell sx={{ color: 'white', fontSize: '1.5rem' }}>{row.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={ginglesTableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
    );
};

export default GinglesTable;
