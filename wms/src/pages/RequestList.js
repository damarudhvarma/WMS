import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { URTListHead, URTListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// APIs
import { getPickUpRequests } from '../api/api';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'requestId', label: 'Request ID', alignRight: false },
  { id: 'address', label: 'Pick Up Address', alignRight: false },
  { id: 'requestStatus', label: 'Request Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (request) => (request.requestId.toLowerCase().indexOf(query.toLowerCase()) !== -1));
    // (_user.firstName.toLowerCase().indexOf(query.toLowerCase()) || _user.lastName.toLowerCase().indexOf(query.toLowerCase())) !== -1
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RequestList() {
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [usersList, setUsersList] = useState([]);

  // const [filteredPickUpRequests, setFilteredUsers] = useState(null);

  // const [isPickUpRequestNotFound, setIsUserNotFound] = useState();

  // let filteredPickUpRequests = null;
  // let isPickUpRequestNotFound = null;
  // let usersList = null;
  
  // function assign(temp) {
  //     filteredPickUpRequests = applySortFilter(usersList, getComparator(order, orderBy), filterName);
  //     isPickUpRequestNotFound = filteredPickUpRequests.length === 0;
  //     console.log(filteredPickUpRequests);
  //     console.log(usersList);
  // }

  let allPickUpRequestPromise;
  const [requestId, setRequestId] = useState(null); 

  useEffect(() => {
    
    allPickUpRequestPromise = getPickUpRequests();
   
    allPickUpRequestPromise.then((res) => {
     
      // usersList = res;
      setUsersList(res);
      // assign(usersList);
      // setFilteredUsers(applySortFilter(usersList, getComparator(order, orderBy), filterName));
      // setIsUserNotFound(filteredPickUpRequests.length === 0);
      setLoading(false);
     
    });
  }, [loading,requestId]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const emptyRows = loading && page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredPickUpRequests.length) : 0;

  const filteredPickUpRequests = loading ? null : applySortFilter(usersList, getComparator(order, orderBy), filterName);

  const isPickUpRequestNotFound = loading ? false : filteredPickUpRequests.length === 0;


  const [open, setOpen] = useState(false);
  
  const handleClick = (requestId) => {
      setRequestId(requestId);
      setOpen(true);
  };

  const handleApprove = async() => {
      setOpen(false);
      try {
       const res = await axios.post("http://localhost:8000/pickupApprove", { requestId });
       if(res.status === 200){
        alert("Request Approved");
        setRequestId(null);
       } 
        
        
    } catch (error) {
      console.error("Error saving request:", error);
    }
     
  };

  const handleSaveForLater =  () => {
      setOpen(false);
  };

  return (
    <Page title="Requests">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            PickUp Requests
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Request
          </Button> */}
          <Button variant="contained" component={RouterLink} to="/dashboard/schedule" startIcon={<Iconify icon="akar-icons:clock" />}>
            Begin Scheduling
          </Button>
        </Stack>

          <Card>
            <URTListToolbar placeHolder="Search Request..." numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <URTListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={loading ? 0 : filteredPickUpRequests.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {
                      loading ? <Typography variant="h5" sx = {{ pl: '24px', pt: '16px'}} noWrap>Loading...</Typography> : 
                        filteredPickUpRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        // const name = row.firstName + " " + row.lastName;
                        return (
                          <TableRow
                            hover
                            key={row._id}
                            tabIndex={-1}
                            role="checkbox"
                          >
                            <TableCell component="th" scope="row" sx={{ pl: 3, minWidth: '150px' }}>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                {/* <Avatar alt={name} src={avatarUrl} /> */}
                                <Typography variant="subtitle2" sx = {{ fontWeight: 500 }} noWrap>
                                  {`${row.requestId}`}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell sx={{ pl: 3 }} align="left">{row.pickUpAddress}</TableCell>
                            <TableCell
                            onClick={() =>{
                              handleClick(row.requestId);
                            } } 
                             sx={{ pl: 3, minWidth: '150px' }} align="left">{row.requestStatus}</TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                          
                        );
                        
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isPickUpRequestNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={loading ? 0 : filteredPickUpRequests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                          <DialogTitle>Confirm Action</DialogTitle>
                          <DialogContent>Do you want to approve or save for later?</DialogContent>
                          <DialogActions>
                              <Button onClick={handleApprove} color="primary">Approve</Button>
                              <Button onClick={handleSaveForLater} color="secondary">Save for Later</Button>
                          </DialogActions>
                      </Dialog>
          </Card>
      </Container>
    </Page>

  );
}
