import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import FeeStatements from "./FeeStatements";

function ShowStatement() {
    const registrationNumber = JSON.parse(localStorage.getItem("userData")).userData.registration_number;

  return (
    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Download</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
    <div className="w-100">
      <PDFDownloadLink
        className="bg-light-secondary dark:bg-dark-secondary_3 py-2 px-4 text-light-text_color dark:text-dark-text_color font-semibold transition-all duration-500 hover:bg-light-secondary_2 hover:dark:bg-dark-secondary_2 dark:bg-dark-secondary_2 rounded-md"
        document={
          <Document>
            <Page>
              <FeeStatements />
            </Page>
          </Document>
        }
        fileName={`fee-statement-${registrationNumber}.pdf`}
        >
        Download Now
      </PDFDownloadLink>
      <PDFViewer className="w-100">
        <Document>
          <Page>
            <View>
              <FeeStatements />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div></div></div></div></div></div></div>
  );
}

export default ShowStatement;
