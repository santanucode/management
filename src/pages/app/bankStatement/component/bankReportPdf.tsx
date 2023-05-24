import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    Link
} from "@react-pdf/renderer";

const BankReportPdf = () => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
            width: "100%",
            flex: 1
        },
        viewer: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        section: {
            margin: 10,
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid black",
            marginRight: "25px",
            marginLeft: "25px"
        },
    });
    
    return (
        <div>
            Hi
        </div>
    );
}

export default BankReportPdf;
