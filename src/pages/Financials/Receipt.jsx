import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { CgSpinnerTwo } from "react-icons/cg";
import baseUrl from "../../BaseUrl";
import numWords from "num-words";

const styles = StyleSheet.create({
  receiptContainer: {
    width: "98%",
    height: "auto",
    flexDirection: "row",
    padding: 8,
    border: 1,
    borderColor: "#000",
    borderStyle: "dashed",
    margin: "auto",
    marginTop: 10,
  },
  leftColumn: {
    width: "50%",
  },
  rightColumn: {
    width: "50%",
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
  },
  text: {
    fontSize: 9,
    textTransform: "uppercase",
  },
  logoContainer: {
    width: "100%",
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

function Receipt() {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const receiptId = JSON.parse(localStorage.getItem("receiptId"));
  const student_id = JSON.parse(localStorage.getItem("userData")).userData.id;
  const studentData = JSON.parse(localStorage.getItem("userData")).userData;

  const [installments, setInstallments] = useState([]);

  function fetchReceiptData(receiptId) {
    fetch(`https://mlight.nanesoft-lab.com/transactions/?search=${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const thisReceipt = res.filter((receipt) => {
          return receipt.id === receiptId;
        });
        setReceiptData(thisReceipt);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchReceiptData(receiptId);
  }, [receiptId]);

  useEffect(() => {
    const dueDates = JSON.parse(localStorage.getItem('ddd'));
    const newInstallments = [];
    dueDates.forEach((dueDate, index) => {
      const installmentDataJSON = localStorage.getItem(`Installment_${index}`);
      const installmentData = JSON.parse(installmentDataJSON);
      newInstallments.push(installmentData);
    });
    setInstallments(newInstallments);
    setDone(true);
  }, []);
  const firstNonNullItem = done ? installments.find(item => item !== null): null;

  return loading ? (
    <CgSpinnerTwo className="spin text-[24px]" />
  ) : (
    <View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} src="/logo.png" />
      </View>
      <View style={styles.receiptContainer}>
        <View style={styles.leftColumn}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Receipt Number:</Text>
            <Text style={styles.text}>
              {receiptData[0].reff_code}/{receiptData[0].id}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Student Number:</Text>
            <Text style={styles.text}>{studentData.registration_number}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>
              {studentData.first_name} {studentData.last_name}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Total Billed:</Text>
            <Text style={styles.text}>Kshs. {receiptData[0].total_amount}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Total Paid:</Text>
            <Text style={styles.text}>Kshs. {receiptData[0].amount}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>In words:</Text>
            <Text style={styles.text}>
              *** {numWords(receiptData[0].amount)}{" "}
              {receiptData[0].amount > 1 ? "shillings" : "shilling"} only ***
            </Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Date Paid:</Text>
            <Text style={styles.text}>
              {new Date(receiptData[0].date_paid).toDateString()}{" "}
              {new Date(receiptData[0].date_paid).toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Payment Mode:</Text>
            <Text style={styles.text}>{receiptData[0].mode_of_payment}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Ref number:</Text>
            <Text style={styles.text}>{receiptData[0].reff_code}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Balance Due:</Text>
            <Text style={styles.text}>Kshs. {receiptData[0].balance}</Text>
          </View>
          {receiptData[0].balance > 0 ? (
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.text}>Pay Kshs. {firstNonNullItem.dueB} Before {new Date(firstNonNullItem.dueD).toDateString()}</Text>
            </View>
          ) : (
            ""
          )}
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Printed On:</Text>
            <Text style={styles.text}>
              {new Date().toDateString()} {new Date().toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.servedBy}>
          <Text style={styles.label}>
            Received With thanks for and on behalf of MORINGA SCHOOL
          </Text>
          <Text style={styles.text}>You were Served By MORINGA/AUTOBANK</Text>
        </View>
      </View>
    </View>
  );
}

export default Receipt;
