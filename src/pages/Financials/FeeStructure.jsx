import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { CgSpinnerTwo } from "react-icons/cg";
import baseUrl from "../../BaseUrl";

const styles = StyleSheet.create({
  receiptContainer: {
    width: "1000px",
    height: "100px",
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 8,
    border: 1,
    borderColor: "#000",
    borderStyle: "dashed",
    margin: "auto",
    marginTop: 10,
  },
  leftColumn: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerInfo: {
    width: "75%",
    display: "flex",
    margin: 'auto',
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
    width: "50%",
    display: "flex",
    flexDirection: "column",
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
    width: '100%',
    fontSize: 8,
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingVertical: 4,
    borderRight:1,
    borderLeft:1,
    paddingLeft: 4,

  }, 
  label3: {
    width: '100%',
    fontSize: 8,
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingVertical: 4,
    borderRight:1,
    borderLeft:1,
    paddingLeft: 4,
    borderTop: 1,
  }, 
  text: {
    width: "100%",
    fontSize: 8,
    textTransform: "uppercase",
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingVertical: 4,
    borderRight:1,
    paddingLeft: 4,
  },  
  text3: {
    width: "100%",
    fontSize: 8,
    textTransform: "uppercase",
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingVertical: 4,
    borderRight:1,
    paddingLeft: 4,
    borderTop: 1,
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
function FeeStructure() {
  const [loading, setLoading] = useState(true);
  const [feeStructure, setFeeStructure] = useState([]);
  const student_id = JSON.parse(localStorage.getItem("userData")).userData.id;
  const studentData = JSON.parse(localStorage.getItem("userData")).userData;
  const courseName = JSON.parse(localStorage.getItem("courseName"));
  const cohortName = JSON.parse(localStorage.getItem("cohortName"));

  function fetchFeeStructure() {
    fetch(`https://mlight.nanesoft-lab.com/generate/fee-stracture/?student_id=${student_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeStructure(res);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchFeeStructure();
  }, []);
  return loading ? (
    <CgSpinnerTwo className="spin text-[24px]" />
  ) : (

    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">
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
          <Text style={styles.text4}>Printed On: {new Date().toDateString()} {new Date().toLocaleTimeString()}</Text>
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
          <Text style={styles.label3}>Cohort</Text>
          <Text style={styles.label}>Course</Text>
          <Text style={styles.label}>Course Fees</Text>
          <Text style={styles.label}>Installment Plan</Text>
          <Text style={styles.label}>Installments</Text>
          <Text style={styles.label}>Interest per Installment</Text>
          <Text style={styles.label}>Total Billed</Text>
          <Text style={styles.label}>Mode of Learning</Text>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.label}>End Date</Text>
        </View>
        {feeStructure ? (
            <View style={styles.rightColumn} key={feeStructure.id}>
              <Text style={styles.text3}>{feeStructure.cohort}</Text>
              <Text style={styles.text}>{feeStructure.course}</Text>
              <Text style={styles.text}>Kshs. {feeStructure.course_fees}</Text>
              <Text style={styles.text}>{feeStructure.installement_plan}</Text>
              <Text style={styles.text}>{feeStructure.installements}</Text>
              <Text style={styles.text}>Kshs. {feeStructure.interest}</Text>
              <Text style={styles.text}>Kshs. {feeStructure.total_fees}</Text>
              <Text style={styles.text}>{feeStructure.mode}</Text>
              <Text style={styles.text}>{feeStructure.start_date}</Text>
              <Text style={styles.text}>{feeStructure.end_date}</Text>
            </View>
        ) : (
          <Text>No feeStructure Found</Text>
        )}
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.servedBy}>
          <Text style={styles.label2}>
            Received With thanks for and on behalf of MORINGA SCHOOL
          </Text>
          <Text style={styles.text2}>You were Served By MORINGA/AUTOBANK</Text>
        </View>
      </View>
    </View>
    </div>
    </div>
    </div>
  );
}

export default FeeStructure;
