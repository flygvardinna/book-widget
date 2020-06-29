import React, { Component } from 'react';
import { Link, withRouter} from "react-router-dom";
import NavigationTabs from '../NavigationTabs';
import BookCard from '../BookCard';
import { Message, DATA_URL } from '../../constants';
import Styles from './BookList.module.css';
import {
  getBooks,
  setBooks,
  findActiveState,
  findNextState,
  filterByTags,
  clearFilter
 } from '../../utils';

class BookList extends Component {
  constructor() {
    super();
    this.changeBookStatus = this.changeBookStatus.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      books: getBooks()
    }
  }

  componentDidMount() {
    if (!this.state.books) {
      fetch(DATA_URL)
        .then(response => response.json())
        .then(
          (result) => {
            const items = {
              toRead: result.items,
              inProgress: [],
              done: []
            };
            this.setState({
              isLoaded: true,
              books: items
            });
            setBooks(items);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  }

  changeBookStatus(id, activeState) {
    const books = this.state.books;
    const nextState = findNextState(activeState);
    const listToRemove = books[activeState];
    const listToAdd = books[nextState];
    const bookIndex = listToRemove.findIndex(item => item.id === id);
    listToAdd.push(...listToRemove.splice(bookIndex, 1));
    setBooks(books);
    this.setState({books});
  }

  render() {
    const error = this.state.error;
    if (error) {
      return (
        <div className={Styles.bookList}>
          <p className={Styles.message}>
            {Message.ERROR} {error.message}
          </p>
        </div>
      );
    } else if (!this.state.books && !this.state.isLoaded) {
      return (
        <div className={Styles.bookList}>
          <p className={Styles.message}>
            {Message.LOADING}
          </p>
        </div>
      );
    }

    const query = new URLSearchParams(this.props.location.search);
    const activeState = findActiveState(query);
    const isFilterApplied = query.has('tags');
    let books = this.state.books[activeState];
    let tags;

    if (isFilterApplied) {
      tags = query.get('tags').split(',');
      books = filterByTags(books, tags);
    }

    return (
      <div className={Styles.bookList}>
        <NavigationTabs books={this.state.books} />
        {isFilterApplied &&
          <div className={Styles.filter}>
              <p>Filtered by tags:</p>
              {tags.map((tag, index) => (
                <div key={index} className={Styles.tag}>#{tag}</div>
              ))}
              <Link
                className={Styles.clearFilterButton}
                to={`${clearFilter(query)}`}
              >
                (<span>clear</span>)
              </Link>
          </div>
        }
        {books.length > 0
          ? books.map((book) =>
            <BookCard
              key={book.id}
              book={book}
              state={activeState}
              onBookStatusChange={this.changeBookStatus}
            />
          )
          : <div className={Styles.emptyList}>
              <p className={Styles.message}>{Message.EMPTY_LIST}</p>
            </div>
        }
      </div>
    );
  }
}

export default withRouter(BookList);
