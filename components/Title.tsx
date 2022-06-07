import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleStyle = styled.h1`
    font-size: 1.5em;
    text-align: center;
`;

const Title = ({ txt }) => (
  <TitleStyle>{txt}</TitleStyle>
);

export default Title;

Title.defaultProps = {
  txt: 'Demo',
};

Title.propTypes = {
  txt: PropTypes.string,
};
