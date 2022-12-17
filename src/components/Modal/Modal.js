import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Box } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Box>{children}</Box>
    </Overlay>,
    ModalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
