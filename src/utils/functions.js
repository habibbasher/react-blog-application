import { parse } from 'query-string';

export const limit = 10;

export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start);
};

export const getPaginator = searchString => {

  const parsedSearchString = parse(searchString);
  const currentPage = parsedSearchString.page ? Number(parsedSearchString.page) : 1;
  const offset = currentPage * limit - limit;
  return { currentPage, offset };
};