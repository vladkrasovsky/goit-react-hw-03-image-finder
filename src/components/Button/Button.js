import { StyledButton } from './Button.styled';

const Button = ({ onClick, children }) => {
  return (
    <StyledButton onClick={onClick} type="button">
      {children}
    </StyledButton>
  );
};

export default Button;
