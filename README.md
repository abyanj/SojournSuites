# SojournSuites
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define interfaces for the JSON data structure
interface PerformanceCheck {
  metricName: string;
  thresholdValue: string;
  MeasuredValue: string;
  Result: string;
}

interface InfrastructureCheck extends PerformanceCheck {}

interface ServiceDetails {
  overallResult: string;
  InfrastructureChecks: InfrastructureCheck[];
  PerformanceChecks: PerformanceCheck[];
}

interface HostDetails {
  overallResult: string;
  InfrastructureChecks: InfrastructureCheck[];
  AssociatedServices: { [key: string]: ServiceDetails };
}

interface LambdaDetails {
  PerformanceChecks: PerformanceCheck[];
  AvailabilityChecks: PerformanceCheck[];
}

interface DatabaseDetails {
  InfrastructureChecks: InfrastructureCheck[];
  PerformanceChecks: PerformanceCheck[];
}

interface Data {
  Guardian_Host_Details: { [key: string]: HostDetails };
  Guardian_Lambda_Details: { [key: string]: LambdaDetails };
  Guardian_Database_Details: { [key: string]: DatabaseDetails };
}

// Styles for PDF
const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 30 },
  title: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#000' },
  tableRow: { flexDirection: 'row' },
  tableColHeader: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', backgroundColor: '#f0f0f0' },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000' },
  tableCell: { margin: 'auto', marginTop: 5, marginBottom: 5 },
});

// Document Component
const MyDocument: React.FC<{ data: Data }> = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Guardian Host Details</Text>
      {Object.entries(data.Guardian_Host_Details).map(([hostName, hostDetails], index) => (
        <View key={index}>
          <Text style={styles.title}>{hostName} - Overall Result: {hostDetails.overallResult}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Metric Name</Text>
              <Text style={styles.tableColHeader}>Result</Text>
              <Text style={styles.tableColHeader}>Threshold</Text>
              <Text style={styles.tableColHeader}>Measured Value</Text>
            </View>
            {hostDetails.InfrastructureChecks.map((check, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCol}>{check.metricName}</Text>
                <Text style={styles.tableCol}>{check.Result}</Text>
                <Text style={styles.tableCol}>{check.thresholdValue}</Text>
                <Text style={styles.tableCol}>{check.MeasuredValue}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

// Component to provide download link
const DownloadPDF: React.FC<{ data: Data }> = ({ data }) => (
  <PDFDownloadLink document={<MyDocument data={data} />} fileName="detailed_report.pdf">
    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
  </PDFDownloadLink>
);

export default DownloadPDF;
