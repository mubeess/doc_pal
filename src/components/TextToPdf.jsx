import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
export default function TextToPdf({ text }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    image: {
      width: 50,
      height: 50,
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.image} src="docpal.png" />
        <View style={styles.section}>
          <Text>{text}</Text>
        </View>
      </Page>
    </Document>
  );
}
