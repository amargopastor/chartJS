/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
      />
      {' '}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

export default Option;

Option.defaultProps = {
  isSelected: false,
  label: 'default',
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
};
