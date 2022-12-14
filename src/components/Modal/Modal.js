import { createPortal } from 'react-dom';
import { Overlay, Box } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

const Modal = ({ children }) => {
  return createPortal(
    <Overlay>
      <Box>{children}</Box>
    </Overlay>,
    ModalRoot
  );
};

export default Modal;
