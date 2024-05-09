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
                  <TableCell>Precinct</TableCell>
                  <TableCell>Minority Percentage</TableCell>
                  <TableCell>Republican Vote Margin</TableCell>
                  <TableCell>Democratic Vote Margin</TableCell>
                  <TableCell>Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ginglesTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow sx={{ color: 'white' }}key={row.precinct}>
                    <TableCell sx={{ color: 'white' }}>{row.precinct}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.minorityPCT}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.republicanPCT}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.democraticPCT}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.winner}</TableCell>
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
