import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { CgSpinnerTwo } from "react-icons/cg";
import baseUrl from "../../BaseUrl";

const styles = StyleSheet.create({
  receiptContainer: {
    width: "98%",
    height: "auto",
    flexDirection: "column",
    padding: 8,
    border: 1,
    borderColor: "#000",
    borderStyle: "dashed",
    margin: "auto",
    marginTop: 10,
  },
  leftColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    borderBottomStyle: "solid",
  },
  containerInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    borderBottomStyle: "solid",
    marginTop: 6,
  },
  infoContainer: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    gap: 4,
    padding: 8,
  },
  rightColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
  },

  servedBy: {
    padding: 8,
    marginTop: 4,
    textAlign: "center",
    width: "100%",
    margin: "auto",
    gap: 6,
    borderBottom: 1,
    borderBottomStyle: "solid",
  },
  label: {
    fontWeight: 900,
    fontSize: 10,
    textAlign: "center",
    width: "calc(100% / 7)",
    borderRight: 0.5,
    borderTop: 0.5,
    borderRightStyle: "solid",
    paddingVertical: 6,
  },
  label3: {
    fontWeight: 900,
    fontSize: 10,
    textAlign: "center",
    width: "calc(100% / 7)",
    borderRight: 0.5,
    borderTop: 0.5,
    borderRightStyle: "solid",
    paddingVertical: 6,
    borderLeft: 0.5,
  },
  text: {
    fontSize: 8,
    textTransform: "uppercase",
    textAlign: "center",
    borderBottomStyle: "solid",
    borderBottom: 0.5,
    borderRight: 0.5,
    borderRightStyle: "solid",
    paddingVertical: 4,
    width: "calc(100% / 7)",
  },
  text3: {
    fontSize: 8,
    textTransform: "uppercase",
    textAlign: "center",
    borderBottomStyle: "solid",
    borderBottom: 0.5,
    borderRight: 0.5,
    borderLeft: 0.5,
    borderRightStyle: "solid",
    paddingVertical: 4,
    width: "calc(100% / 7)",
  },
  label2: {
    fontWeight: 900,
    fontSize: 10,
    textAlign: "center",
  },
  text2: {
    fontSize: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  text4: {
    fontSize: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  logoContainer: {
    width: "auto",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: "cover",
  },
});

function FeeStatements() {
  const [loading, setLoading] = useState(true);
  const [statements, setStatements] = useState([]);
  const student_id = JSON.parse(localStorage.getItem("userData")).userData.id;
  const studentData = JSON.parse(localStorage.getItem("userData")).userData;
  const courseName = JSON.parse(localStorage.getItem("courseName"));
  const cohortName = JSON.parse(localStorage.getItem("cohortName"));

  function fetchStatements() {
    fetch(`https://mlight.nanesoft-lab.com/transactions/?search=${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setStatements(res);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchStatements();
  }, []);
  return loading ? (
    <CgSpinnerTwo className="spin text-[24px]" />
  ) : (

    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Fee StETEMENT</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
    <pdf size="A4">
      <View>
        <View style={styles.containerInfo}>
          <View style={styles.infoContainer}>
            <Text style={styles.text4}>
              Name: {studentData.first_name} {studentData.last_name}{" "}
            </Text>
            <Text style={styles.text4}>
              Reg Number: {studentData.registration_number}
            </Text>
            <Text style={styles.text4}>Course: {courseName}</Text>
            <Text style={styles.text4}>Cohort: {cohortName}</Text>
            <Text style={styles.text4}>
              Printed On: {new Date().toDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/logo.png" />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text4}>Moringa School</Text>
            <Text style={styles.text4}>P.O Box 28860 - 00100, Nairobi</Text>
            <Text style={styles.text4}>Ngong Lane, Ngong Lane Plaza</Text>
            <Text style={styles.text4}>1st Floor, Nairobi Kenya</Text>
            <Text style={styles.text4}>0205002167 (General Enquiries)</Text>
          </View>
        </View>
        <View style={styles.receiptContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.label3}>No.</Text>
            <Text style={styles.label}>Date Paid</Text>
            <Text style={styles.label}>Ref Number.</Text>
            <Text style={styles.label}>Mode of Payment</Text>
            <Text style={styles.label}>Total Billed</Text>
            <Text style={styles.label}>Paid</Text>
            <Text style={styles.label}>Balance Due</Text>
          </View>
          {statements.length > 0 ? (
            statements.map((statement, index) => (
              <View style={styles.rightColumn} key={statement.id}>
                <Text style={styles.text3}>{index + 1}</Text>
                <Text style={styles.text}>
                  {new Date(statement.date_paid).toDateString()}
                </Text>
                <Text style={styles.text}>{statement.reff_code}</Text>
                <Text style={styles.text}>{statement.mode_of_payment}</Text>
                <Text style={styles.text}>Kshs. {statement.total_amount}</Text>
                <Text style={styles.text}>Kshs. {statement.amount}</Text>
                <Text style={styles.text}>Kshs. {statement.balance}</Text>
              </View>
            ))
          ) : (
            <Text>No Statements Found</Text>
          )}
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.servedBy}>
            <Text style={styles.label2}>
              Received With thanks for and on behalf of MORINGA SCHOOL
            </Text>
            <Text style={styles.text2}>
              You were Served By MORINGA/AUTOBANK
            </Text>
          </View>
        </View>
      </View>
    </pdf>
    </div>
    </div>  </div>  </div>  </div>  </div>  
  );
}

export default FeeStatements;
