import { Chip } from '@mui/material';

export interface BoxProps {
  name: string
}

const AttendanceChip = (props: {
  label: string
  id: number
  style?:any
}) => {
  const { label,style} = props

  return (
    <span  data-testid={`box`} >
      <Chip label={label} style={style} />
    </span>
  )
}

export default AttendanceChip
