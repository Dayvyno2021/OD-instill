import {memo} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = ({count, page, handlePageClick}) => {
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} shape="rounded" color='secondary' onChange={handlePageClick} />
    </Stack>
  );
}

export default memo(PaginationRounded)