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
    width: '5%',
  },
  row2: {
    width: '14%',
  },
  row3: {
    width: '14%',
  },
  row4: {
    width: '18%',
  },
  row5: {
    width: '9%',
  },
  row6: {
    width: '9%',
  },
  row7: {
    width: '9%',
  },
  row8: {
    width: '9%',
  },
  row9: {
    width: '10%',
  },
  row10: {
    width: '9%',
  },
  row11: {
    width: '9%',
  },
  row12: {
    width: '9%',
  },
  row13: {
    width: '9 %',
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

const PDF_Table = (props: any) => {
  const { data,SelectMobthData } = props

  return (
    <>
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page} wrap>
            <View style={styles.table}>
              <View style={styles.paperheading}>
                <Text style={styles.heading}>ORISSA STEVEDORES LTD</Text>
                <Text style={styles.heading3}>
                  NATURE AND LOCATION OF WORK :LOADING & UN LOADING OF FERTLIZER
                  BAGS AT IFFCO RLY. SIDING.
                </Text>
                <Text style={styles.heading2}>P.F CONTRIBUTION STATEMENT</Text>
                <Text style={styles.heading4}>FOR THE MONTH OF {moment().month(SelectMobthData.month-1).format("MMMM")}  {SelectMobthData.year}</Text>
              </View>

              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={[styles.row1,styles.headingname]}>SL NO</Text>
                <Text style={[styles.row2,styles.headingname]}>PF NO</Text>
                <Text style={[styles.row3,styles.headingname]}>UAN NO</Text>
                <Text style={[styles.row4,styles.headingname]}>NAME OF EMPLOYEE</Text>
                <Text style={[styles.row5,styles.headingname]}>GROSS WAGES</Text>
                <Text style={[styles.row6,styles.headingname]}>EPF WAGES</Text>
                <Text style={[styles.row7,styles.headingname]}>EPS WAGES</Text>
                <Text style={[styles.row8,styles.headingname]}>EDLI WAGES</Text>
                <Text style={[styles.row9,styles.headingname]}>EE SHARE</Text>
                <Text style={[styles.row10,styles.headingname]}>EPS REMITED</Text>
                <Text style={[styles.row11,styles.headingname]}>ER SHARE</Text>
                <Text style={[styles.row12,styles.headingname]}>MCP DAYS </Text>
                <Text style={[styles.row13,styles.headingname]}>REFUND</Text>
              </View>

              {data.map((el: any) => (
                <View style={styles.row} wrap={false}>
                  <Text style={styles.row1}>{el.Sl_No}</Text>
                  <Text style={styles.row2}>{el.EPF_Number}</Text>
                  <Text style={styles.row3}>{el.UAN_Number}</Text>
                  <Text style={styles.row4}>{el.Person_Name}</Text>
                  <Text style={styles.row5}>{el.Gross_Wages}</Text>
                  <Text style={styles.row6}>{el.Epf_Wages}</Text>
                  <Text style={styles.row7}>{el.Eps_Wages}</Text>
                  <Text style={styles.row8}>{el.EDLI_Wages}</Text>
                  <Text style={styles.row9}>{el.EE_Share}</Text>
                  <Text style={styles.row10}>{el.EPS_Remitted}</Text>
                  <Text style={styles.row11}>{el.ER_Share}</Text>
                  <Text style={styles.row12}>{el.NCP_Days}</Text>
                  <Text style={styles.row13}>{el.Refund}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>

      
    </>
  )
}

export default PDF_Table
