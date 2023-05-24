import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'
import moment from 'moment'

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
    width: '10%',
  },
  row2: {
    width: '20%',
  },
  row3: {
    width: '18%',
  },
  row4: {
    width: '35%',
  },
  row5: {
    width: '18%',
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

const PDF_TableBank = (props: any) => {
  const { data, SelectMobthData } = props

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
                <Text style={styles.heading2}>BANK REGISTER</Text>
                <Text style={styles.heading4}>FOR THE MONTH OF {moment().month(SelectMobthData.month-1).format("MMMM")}  {SelectMobthData.year}</Text>
              </View>

              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={[styles.row1, styles.headingname]}>SL NO</Text>
                <Text style={[styles.row2, styles.headingname]}>UNION NO</Text>
                <Text style={[styles.row3, styles.headingname]}>EMPLOYEE NAME</Text>
                <Text style={[styles.row4, styles.headingname]}>BANK ACCOUNT NO</Text>
                <Text style={[styles.row5, styles.headingname]}>NET AMOUNT</Text>
              </View>

              {data.map((el: any) => (
                <View style={styles.row} wrap={false}>
                  <Text style={styles.row1}>{el.Sl_No}</Text>
                  <Text style={styles.row2}>{el.Union_Serial_Number}</Text>
                  <Text style={styles.row3}>{el.Name}</Text>
                  <Text style={styles.row4}>{el.Bank_Acc_Number}</Text>
                  <Text style={styles.row5}>{el.Net_Amount}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>

      
    </>
  )
}

export default PDF_TableBank
