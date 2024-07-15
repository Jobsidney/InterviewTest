import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Receipt from "./Receipt";

function Test() {
  const registrationNumber = JSON.parse(localStorage.getItem("userData"))
    .userData.registration_number;

  return (
    <div className="w-full h-full flex flex-col items-center justify-evenly">
      <PDFDownloadLink
        className="bg-light-secondary dark:bg-dark-secondary_3 py-2 px-4 text-light-text_color dark:text-dark-text_color font-semibold transition-all duration-500 hover:bg-light-secondary_2 hover:dark:bg-dark-secondary_2 dark:bg-dark-secondary_2 rounded-md"
        document={
          <Document>
            <Page>
              <Receipt />
            </Page>
          </Document>
        }
        fileName={`receipt-${registrationNumber}.pdf`}
      >
        Download now
      </PDFDownloadLink>
      <PDFViewer className="w-full h-[90%]">
        <Document>
          <Page>
            <View>
              <Receipt />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default Test;
