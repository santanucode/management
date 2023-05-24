import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    padding: 8,
    fontSize: '8px',
  }, 
  header: {
    borderTop: 'none',
    backgroundColor:"#f1f1f1"
  },
  bold: {
    fontWeight: 'bold',
  },
  headingname:{
    borderRight: '1px solid #848484 ',
    paddingRight: 3,
    paddingLeft:3
  },
  // So Declarative and unDRY 👌
  
  row1: {
    width: '5%',
  },
  row2: {
    width: '15%',
  },
  row3: {
    width: '18%',
  },
  row4: {
    width: '12%',
  },
  row5: {
    width: '18%',
  },
  row6: {
    width: '18%',
  },
  row7: {
    width: '12%',
  },
 
  heading: {
    fontSize: '20px',
    width: '100%',
    marginBottom: 2,
  },
  heading2: {
    fontSize: '10px',
    width: '100%',
    marginBottom: 2,
  },
  heading3: {
    fontSize: '9px',
    width: '100%',
    marginBottom: 2,
  },
  heading4: {
    fontSize: '12px',
    width: '100%',
    marginBottom: 2,
  },
  paperheading: {
    padding: 4,
  },
})

const PDF_TableAR = (props: any) => {
  const { data } = props

  console.log('Many', data)
  return (
    <>
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page} wrap>
            <View style={styles.table}>
              <View style={styles.paperheading}>
                <Text style={styles.heading}>ORISSA STEVEDORES LTD, PARADIP</Text>
                <Text style={styles.heading3}>
                  NATURE AND LOCATION OF WORK :LOADING & UN LOADING OF FERTLIZER
                  BAGS AT IFFCO RLY. SIDING.
                </Text>
                <Text style={styles.heading2}>ESI CONTRIBUTION STATEMENT</Text>
                <Text style={styles.heading4}>FOR THE MONTH OF OCT 2022</Text>
              </View>

              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={[styles.row1, styles.headingname]}>SL NO</Text>
                <Text style={[styles.row2, styles.headingname]}>INSURANCE NO	</Text>
                <Text style={[styles.row3, styles.headingname]}>NAME OF INSURED PERSON</Text>
                <Text style={[styles.row4, styles.headingname]}>NO. OF DAYS WAGES PAID</Text>
                <Text style={[styles.row5, styles.headingname]}>TOTAL AMOUNT OF WAGES PAID	</Text>
                <Text style={[styles.row6, styles.headingname]}>EMPLOYEE'S CONTRIBUTION DEDUCTED	</Text>
                <Text style={[styles.row7, styles.headingname]}>DAILY WAGES</Text>
              </View>

              {data.map((el: any) => (
                <View style={styles.row} wrap={false}>
                  <Text style={styles.row1}>{el.id}</Text>
                  <Text style={styles.row2}>{el.Insurance_Number}</Text>
                  <Text style={styles.row3}>{el.Insurance_Person}</Text>
                  <Text style={styles.row4}>{el.wages_Paid_Day}</Text>
                  <Text style={styles.row5}>{el.Total_Amount}</Text>
                  <Text style={styles.row6}>{el.Esi_Amount}</Text>
                  <Text style={styles.row7}>{el.Daily_Amount}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>

      
    </>
  )
}

export default PDF_TableAR;
