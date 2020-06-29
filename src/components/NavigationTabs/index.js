import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { useQuery } from '../../utils';
import { Tab, ROUTES } from '../../constants';
import Styles from './NavigationTabs.module.css';

const propTypes = {
  books: PropTypes.shape({
    toRead: PropTypes.array.isRequired,
    inProgress: PropTypes.array.isRequired,
    done: PropTypes.array.isRequired
  })
};

const NavigationTabs = (props) => {
  const query = useQuery();

  return (
    <div className={Styles.tabs}>
      <NavLink
        className={Styles.tab}
        to={ROUTES.ROOT}
        isActive={() => !query.has('tab')}
      >
        {Tab.TO_READ} ({props.books.toRead.length})
      </NavLink>
      <NavLink
        className={Styles.tab}
        to={ROUTES.IN_PROGRESS}
        isActive={() => query.get('tab') === 'inprogress'}
      >
        {Tab.IN_PROGRESS} ({props.books.inProgress.length})
      </NavLink>
      <NavLink
        className={Styles.tab}
        to={ROUTES.DONE}
        isActive={() => query.get('tab') === 'done'}
      >
        {Tab.DONE} ({props.books.done.length})
      </NavLink>
    </div>
  );
};

NavigationTabs.propTypes = propTypes;

export default NavigationTabs;
