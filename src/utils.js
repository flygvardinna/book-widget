import { useLocation } from "react-router-dom";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const getBooks = () => {
  return JSON.parse(localStorage.getItem('books'));
};

export const setBooks = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

export const addTagToUrl = (tag, query) => {
  if (query.has('tags')) {
    const tags = query.get('tags').split(',');
    return tags.includes(tag) ? query : query + ',' + tag;
  } else if (query.has('tab')) {
    return query + '&tags=' + tag;
  }
  return 'tags=' + tag;
};

export const filterByTags = (books, filters) => {
  return books.filter((book) => {
    return filters.filter((filter) => book.tags.includes(filter)).length === filters.length;
  });
};

export const clearFilter = (query) => {
  query.delete('tags');
  if (query.has('tab')) {
    return '/?' + query;
  }
  return '/' + query;
};

export const findActiveState = (query) => {
  if (query.has('tab')) {
    return query.get('tab') === 'inprogress' ? 'inProgress' : 'done';
  }
  return 'toRead';
};

export const findNextState = (activeState) => {
  if (activeState === 'toRead') {
    return 'inProgress';
  } else if (activeState === 'inProgress') {
    return 'done';
  }
  return 'toRead';
};

export const setLinkName = (link, activeState) => {
  if (activeState === 'toRead') {
    return link.TO_PROGRESS
  } else if (activeState === 'inProgress') {
    return link.TO_DONE;
  }
  return link.TO_READ;
};
