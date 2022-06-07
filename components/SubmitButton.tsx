import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const SubmitButton = () => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: '5%',
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (
    <ColorButton variant="contained" type="submit">
      Submit
    </ColorButton>
  );
};

export default SubmitButton;
