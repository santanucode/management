import React, { useCallback } from 'react'
import { Button, DialogActions, DialogTitle } from '@mui/material'
import { InputProps } from './types'
import Swal from 'sweetalert2'

const StatusModal = (props: InputProps) => {
  const { handleModalClose, handleSelectClick } = props

  const handleAgree = () => {
    handleSelectClick()
  }

  const handledisagree = () => {
    handleModalClose()
  }
  const swal = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          //   handleSelectClick('success')
          handleAgree()

          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          //   handleSelectClick('error')
          handledisagree()
          //   swalWithBootstrapButtons.fire(
          //     'Cancelled',
          //     'Your imaginary file is safe :)',
          //     'error',
          //   )
        }
      })
  }

  return (
    <>
      {/* <DialogTitle id="responsive-dialog-title">
                {'Are you sure to change the status ?'}
            </DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={handleModalClose}>
                    Disagree
                </Button>
                <Button
                    autoFocus
                    onClick={handleAgree}
                >
                    Agree
                </Button>
            </DialogActions> */}
      {swal()}
    </>
  )
}

export default StatusModal

// import React from 'react';
// import {
//     Button,
//     DialogActions,
//     DialogTitle
// } from '@mui/material';
// import { InputProps } from './types';

// const StatusModal = (props: InputProps) => {
//     const {
//         handleModalClose,
//         handleSelectClick
//     } = props;

//     const handleAgree = () => {
//         handleSelectClick();
//     }

//     return (
//         <div>
//             <DialogTitle id="responsive-dialog-title">
//                 {'Are you sure to change the status ?'}
//             </DialogTitle>
//             <DialogActions>
//                 <Button autoFocus onClick={handleModalClose}>
//                     Disagree
//                 </Button>
//                 <Button
//                     autoFocus
//                     onClick={handleAgree}
//                 >
//                     Agree
//                 </Button>
//             </DialogActions>
//         </div>
//     );
// }

// export default StatusModal;
