import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardHeader, IconButton } from '@mui/material'
import { MdClose } from 'react-icons/md'
import {
  BASICLABEL,
  BASICPLACEHOLDER,
  CANLABEL,
  CANPLACEHOLDER,
  HRALABEL,
  HRAPLACEHOLDER,
  SHIFTLABEL,
  SHIFTPLACEHOLDER,
} from 'components/form/holidayConfigForm/holidayConfigString'
import { DALABEL, DAPLACEHOLDER } from 'components/form/wageForm/wageString'
import './style.scss'

const HolidayConfigData = (props: any) => {
  const { initialValue = {}, onHandleClose } = props

  console.log(initialValue, 'initialValue')
  return (
    <>
      
        <CardHeader
          sx={{ textAlign: 'center' }}
          action={
            <IconButton aria-label="settings" onClick={onHandleClose}>
              <MdClose />
            </IconButton>
          }
          title={'FH/NH Configuration'}
        />
        <CardContent className='form-height'>
          <div className="row">
            <div className="col-md-6">
              <Typography
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                Config Name :<strong>{initialValue.config_name}</strong> 
              </Typography>
            </div>
            <div className="col-md-6 text-end">
              <Typography
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                Effective Date : <strong>{initialValue.effective_from}</strong> 
              </Typography>
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-md-12">
              <Typography
                sx={{ fontSize: 15 }}
                color="text.secondary"
                gutterBottom
              >
                Was staff member who are having off day on this national
                festival holiday ? :{' '}
                <strong>{initialValue.config.day_config.absent_day ? 'Yes' : 'No'}</strong>
              </Typography>
              <Typography
                sx={{ fontSize: 15 }}
                color="text.secondary"
                gutterBottom
              >
                Was staff member is eligible for off day ? :{' '}
                <strong>{initialValue.config.day_config.off_day ? 'Yes' : 'No'}</strong>
              </Typography>
              <Typography
                sx={{ fontSize: 15 }}
                color="text.secondary"
                gutterBottom
              >
                staff member was absent even though it was a working day ? :{' '}
                <strong>{initialValue.config.day_config.off_eligible ? 'Yes' : 'No'}</strong>
              </Typography>
            </div>
          </div>
          <hr />

          <form className="mt-3">
            <div className="form-group row mb-3">
              <label className="col-3 col-form-label">
                {SHIFTLABEL}
                <span> &#10005;</span>{' '}
              </label>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  placeholder={BASICPLACEHOLDER}
                  type="number"
                  readOnly
                  value={initialValue.config.wage_component.shift_allowance.factor}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-3 col-form-label">
                {BASICLABEL}
                <span> &#10005;</span>{' '}
              </label>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  placeholder={BASICPLACEHOLDER}
                  type="number"
                  readOnly
                  value={initialValue.config.wage_component.basic_amount.factor}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-3 col-form-label">
                {DALABEL}
                <span> &#10005;</span>{' '}
              </label>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  placeholder={BASICPLACEHOLDER}
                  type="number"
                  readOnly
                  value={initialValue.config.wage_component.da_amount.factor}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-3 col-form-label">
                {HRALABEL}
                <span> &#10005;</span>{' '}
              </label>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  placeholder={BASICPLACEHOLDER}
                  type="number"
                  readOnly
                  value={initialValue.config.wage_component.hra_amount.factor}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-3 col-form-label">
                {CANLABEL}
                <span> &#10005;</span>{' '}
              </label>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  placeholder={BASICPLACEHOLDER}
                  type="number"
                  readOnly
                  value={initialValue.config.wage_component.ca_amount.factor}
                />
              </div>
            </div>

            {/* <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{BASICLABEL} <span> &#10005;</span></label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={BASICPLACEHOLDER} type="number"  value={basicAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{DALABEL} <span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={DAPLACEHOLDER} type="number"  value={daAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{HRALABEL} <span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={HRAPLACEHOLDER} type="number" value={hraAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{CANLABEL} <span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={CANPLACEHOLDER} type="number" value={canAmount} />
              </div>
            </div> */}
          </form>
        </CardContent>
     
    </>
  )
}

export default HolidayConfigData
