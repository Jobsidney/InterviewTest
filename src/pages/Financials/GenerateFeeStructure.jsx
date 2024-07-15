import React from "react";
import {
  Document,
  Page,
  View,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import FeeStructure from "./FeeStructure";

function GenerateFeeStructure() {
  const registrationNumber = JSON.parse(localStorage.getItem("userData"))
    .userData.registration_number;

  return (
    <div className="w-full h-full flex flex-col items-center justify-evenly">
      <PDFDownloadLink
        className="bg-light-secondary dark:bg-dark-secondary_3 py-2 px-4 text-light-text_color dark:text-dark-text_color font-semibold transition-all duration-500 hover:bg-light-secondary_2 hover:dark:bg-dark-secondary_2 dark:bg-dark-secondary_2 rounded-md"
        document={
          <Document>
            <Page>
              <View>
                <FeeStructure />
              </View>
            </Page>
          </Document>
        }
        fileName={`fee-structure-${registrationNumber}.pdf`}
      >
        Download Now
      </PDFDownloadLink>
      <PDFViewer className="w-full h-[90%]">
        <Document>
          <Page>
            <View>
              <FeeStructure />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default GenerateFeeStructure;
