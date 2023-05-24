import React, { useState } from 'react'
import { Box, Chip } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'


export interface ISubmitResult {
  value?: any
  error?: boolean
  success?: boolean
}

const FormTextDropdown = (props: any) => {
  const {
    Options,
    Value,
    label,
    CustomErrorLine,
    multiSelect,
    Required,
    disable,
    defaultValue,
    onSelect,
  } = props

  const [selectValue, setSelectValue] = useState<any>({
    value: '',
    error: false,
    success: false,
  })

  const [multSelectValue, setMultiSelectValue] = useState<any>({
    value: defaultValue ? defaultValue : [],
    error: false,
    success: false,
  })

  const [error, setError] = useState('')

  const handleSelect = (event: any) => {
    const value = {
      value: event.target.value,
      error: false,
      success: true,
    }
    setSelectValue(value)
    onSelect(value)
    if (event.target.value) {
      setError('')
    }
  }

  const handleChangeBlur = () => {
    if (Required) {
      if (selectValue.value) {
        setError('')
        const value = {
          value: selectValue.value,
          error: false,
          success: true,
        }
        setSelectValue(value)
        onSelect(value)
      } else {
        const value = {
          value: '',
          error: true,
          success: false,
        }
        setSelectValue(value)
        onSelect(value)
        setError(CustomErrorLine ? CustomErrorLine : 'Select One Option')
      }
    } else {
      setError('')
      const value = {
        value: selectValue.value,
        error: false,
        success: true,
      }
      setSelectValue(value)
      onSelect(value)
    }
  }

  const handleChangeMultiSelect = (data: any) => {
    if (Required) {
      if (multSelectValue.value.length > 0) {
        const value = {
          value: data.target.value,
          error: false,
          success: true,
        }
        setMultiSelectValue(value)
        onSelect(value)
        setError('')
      } else {
        const value = {
          value: data.target.value,
          error: false,
          success: true,
        }
        setMultiSelectValue(value)
        onSelect(value)
        setError(CustomErrorLine ? CustomErrorLine : 'Select Atleast One')
      }
    } else {
      const value = {
        value: data.target.value,
        error: false,
        success: true,
      }
      setMultiSelectValue(value)
      onSelect(value)
      setError('')
    }
  }

  const handleChangeMultiBlur = (data: any) => {
    if (Required) {
      if (multSelectValue.value.length > 0) {
        setError('')
        const value = {
          value: data.target.value,
          error: false,
          success: true,
        }
        setMultiSelectValue(value)
        onSelect(value)
      } else {
        const value = {
          value: [],
          error: true,
          success: false,
        }
        setError(CustomErrorLine ? CustomErrorLine : 'Select atleast one')
        setMultiSelectValue(value)
        onSelect(value)
      }
    } else {
      const value = {
        value: [],
        error: false,
        success: true,
      }
      setError('')
      setMultiSelectValue(value)
      onSelect(value)
    }
  }

  return (
    <Box
      sx={{
        maxWidth: '100%',
      }}
    >
      <FormControl sx={{ minWidth: 120 }} fullWidth>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        {multiSelect === true ? (
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            required={Required}
            fullWidth
            multiple
            value={multSelectValue.value}
            onChange={handleChangeMultiSelect}
            onBlur={handleChangeMultiBlur}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} key={selected}>
                {selected.map((item: any) => (
                  <Chip
                    key={item}
                    label={Options.find((e: any) => e.id === item)?.label}
                  />
                ))}
              </Box>
            )}
          >
            {Options.map((item: any) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={multSelectValue.value.includes(item.id)} />
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={Value ? Value : selectValue.value}
            label={label}
            onChange={handleSelect}
            onBlur={handleChangeBlur}
              disabled={disable}
              className='mb-3'
            required={Required}
          >
            <MenuItem value="">
              <em>-Select-</em>
            </MenuItem>
            {Options &&
              Options.map((ele: any, index: number) => (
                <MenuItem value={ele.value} key={index}>
                  {ele.label}
                </MenuItem>
              ))}
          </Select>
        )}

        <FormHelperText>
          <span className="d-block text-end" style={{ color: '#FF0000' }}>
            {error}
          </span>
        </FormHelperText>
      </FormControl>
    </Box>
  )
}

export default FormTextDropdown
