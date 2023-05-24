import Button from '@mui/material/Button'
import { Add } from 'iconsax-react'
import './CommonMainButton.scss'
import React from 'react'
interface buttonProps{
  onAddclick: (data?:any) => void
  label:string
}
const CommonMainButton = (props: buttonProps) => {
  const { onAddclick, label } = props

  const handleClick = () => {
    onAddclick()
  }

  return (
    <>
      <Button
        className="buttonStyle"
        sx={{ borderRadius: '8px' }}
        size="medium"
        variant="contained"
        startIcon={<Add size="22" color="#FFFFFF" />}
        onClick={handleClick}
      >
        {label}
      </Button>
    </>
  )
}

export default CommonMainButton
