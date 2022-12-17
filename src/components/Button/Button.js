import { StyledButton } from './Button.styled';

const Button = ({ onClick, type = 'button', children }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
