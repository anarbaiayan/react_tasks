import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react'
import MyButton from '../../UI/myButton.tsx';

const DeleteConfirmModal = ({ open, handleClose, deleteSelectedUsers, onDelete, choose, id }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            choose ?
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Tap confirm to delete selected users
              </Typography>
              :
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Tap confirm to delete user
              </Typography>
          }

          {
            choose ? <MyButton onClick={deleteSelectedUsers} text='confirm' bgcolor='red' margin='20px 0 0 0' />
              : <MyButton onClick={() => onDelete(id)} text='confirm' bgcolor='red' margin='20px 0 0 0' />
          }

        </Box>
      </Modal>
    </div>
  )
}

export default DeleteConfirmModal