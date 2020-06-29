import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import { setLinkName, addTagToUrl } from '../../utils';
import { statusLink } from '../../constants';
import { ReactComponent as ArrowIcon} from '../../assets/icons/arrow.svg';
import { ReactComponent as ReturnIcon} from '../../assets/icons/return.svg';
import BookListStyles from '../BookList/BookList.module.css';
import Styles from './BookCard.module.css';

const propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired
  }),
  state: PropTypes.string.isRequired,
  onBookStatusChange: PropTypes.func.isRequired
};

class BookCard extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, activeState) {
    this.props.onBookStatusChange(id, activeState);
  }

  render() {
    const query = new URLSearchParams(this.props.location.search);
    return (
      <div className={Styles.bookCard}>
        <div className={Styles.header}>
          <div className={Styles.heading}>
            <p>{this.props.book.author}</p>
            <p className={Styles.title}>{this.props.book.title}</p>
          </div>
          <div
            className={Styles.link}
            onClick={() => this.handleChange(this.props.book.id, this.props.state)}
          >
            <p className={Styles.status}>
              {setLinkName(statusLink, this.props.state)}
            </p>
            {this.props.state === 'done'
              ? <ReturnIcon />
              : <ArrowIcon />
            }
          </div>
        </div>
        <p className={Styles.description}>{this.props.book.description}</p>
        <div className={Styles.tags}>
          {this.props.book.tags.map((tag, index) => (
            <Link
              className={BookListStyles.tag}
              key={index}
              to={'/?' + addTagToUrl(tag, query)}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

BookCard.propTypes = propTypes;

export default withRouter(BookCard);
