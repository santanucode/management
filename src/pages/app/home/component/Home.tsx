import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import ReactApexChart from 'react-apexcharts';
import { FcButtingIn } from 'react-icons/fc'
import { HomeProps } from '../container/HomeContainer';

function Home(props:HomeProps) {
  // const { getUsers, users } = useUsers()
  // const { t } = useTranslation(['translation'])
  // const theme = useTheme()

  // useEffect(() => {
  //   getUsers()
  // }, [])
  const {
    getRoleFuncn,
    role_function
  } = props
  
  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)
  
  const options = {
    title: {
      text: 'Monthly Attendance Report'
    },
    xaxis: {
      categories: [
        'jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
      labels: {
        show: true,
        style: {
          colors: 'black',
        },
      },
    },
    options: {



      chart: {
        height: 350,
        zoom: {
          enabled: false,
        },
      },
    },



    series: [
      {
        name: 'Attendance',
        data: [1957, 1985, 1707, 2259, 2152, 1996, 2285],
      },
      {
        name: 'Leave',
        data: [352, 324, 602, 157, 34, 313, 80],
      },
    ],
  }

  const fakedata = {
    series: [1744, 255, 41],
    labels: ["Present", "Absent", "Special Absent"],
    // legend: {
    //   position: 'bottom',
    // },
    title: {
      text: 'Today Attendance Report'
    },
    options: {
      legend: {
        position: 'bottom',
      },
      chart: {
        type: 'donut',
      },

      title: {
        text: 'Price Movements',
        align: 'left',
      },


      responsive: [
        {
          breakpoint: 480,
          legend: {
            position: 'bottom',
          },
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    },
  }

  return (
    <>
      {/* <p style={{ fontSize: 25 }}>{t("how_are_you", { ns: ['main'] })}</p> */}
      <div className="row mb-4">
        <div className="col-md-3">
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Total Employee
                </Typography>
                <Typography gutterBottom variant="h5" mb={0} component="div">
                  2309
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <CardContent>
                <FcButtingIn size={30} color={'red'} />
              </CardContent>
            </Box>
          </Card>
        </div>

        <div className="col-md-3">
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Today's Attendance
                </Typography>
                <Typography gutterBottom variant="h5" mb={0} component="div">
                  2009
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <CardContent>
                <FcButtingIn size={30} color={'red'} />
              </CardContent>
            </Box>
          </Card>
        </div>

        <div className="col-md-3">
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Leave
                </Typography>
                <Typography gutterBottom variant="h5" mb={0} component="div">
                  150
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <CardContent>
                <FcButtingIn size={30} color={'red'} />
              </CardContent>
            </Box>
          </Card>
        </div>

        <div className="col-md-3">
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Special Leave
                </Typography>
                <Typography gutterBottom variant="h5" mb={0} component="div">
                  50
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <CardContent>
                <FcButtingIn size={30} color={'red'} />
              </CardContent>
            </Box>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <Card>
            <CardContent>
              {/* <Typography sx={{ fontSize: 19 }} gutterBottom variant="h5" component="div">
              Monthly Attendance Status
            </Typography>
            <Typography sx={{ fontSize: 14 }} component="div">
              Attendance Of Employee
              </Typography> */}

              <ReactApexChart
                type="bar"
                options={options}
                series={options.series}
                height={350}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-md-5">
          <Card>
            <CardContent>
              {/* <Typography
                sx={{ fontSize: 19 }}
                gutterBottom
                variant="h5"
                component="div"
              >
                Today's Attendance Status
              </Typography>
              <Typography sx={{ fontSize: 14 }} component="div">
                Status Of Employee
              </Typography> */}

              <ReactApexChart
                type="donut"
                options={fakedata}
                series={fakedata.series}
                height={350}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home
