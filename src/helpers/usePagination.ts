import {useState} from 'react';
import {PaginateType} from '../types/PaginateType';

export default (initPage = 1) => {
  const [page, setPage] = useState(initPage);
  return {
    page,
    useNext: (pagination: PaginateType<any> | undefined) => {
      return () => {
        if (pagination?.links.next) {
          setPage(page + 1);
        }
      };
    },
  };
};
