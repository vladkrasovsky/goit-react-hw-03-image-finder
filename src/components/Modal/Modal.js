import { createPortal } from 'react-dom';
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

export default Modal;
