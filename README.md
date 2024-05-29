﻿# SojournSuites
import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';

// Register a font to support bold text, you can skip this if not needed
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2' }, // Normal
    { src: 'https://fonts.gstatic.com/s/opensans/v15/mem6YaGs126MiZpBA-UFVp0bbck.woff2', fontWeight: 700 }, // Bold
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Open Sans',
    fontWeight: 700
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
    margin: 'auto',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: '#f3f3f3',
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 5,
  },
});

// Parse JSON data
const parseData = (data) => {
  // Assuming data is structured as per your JSON description
  return {
    hosts: Object.entries(data.host_details).map(([hostName, details]) => ({
      name: hostName,
      overallResult: details.overallResult || "Unknown",
      infraChecks: details.InfraChecks || [],
      associatedServices: Object.entries(details.AssociatedServices || {}).map(([serviceName, serviceDetails]) => ({
        name: serviceName,
        overallResult: serviceDetails.overallResult || "Unknown",
        infraChecks: serviceDetails.InfraChecks || [],
        performanceChecks: serviceDetails.PerformanceChecks || [],
      })),
    })),
    lambdas: Object.entries(data.lambda_details || {}).map(([lambdaName, lambdaDetails]) => ({
      name: lambdaName,
      performanceChecks: lambdaDetails.PerformanceChecks || [],
      availabilityChecks: lambdaDetails.AvailabilityChecks || [],
    })),
    databases: Object.entries(data.database_details || {}).map(([dbName, dbDetails]) => ({
      name: dbName,
      infraChecks: dbDetails.InfraChecks || [],
      performanceChecks: dbDetails.PerformanceChecks || [],
    })),
  };
};

// Document Component
const MyDocument = ({ data }) => {
  const parsedData = parseData(data);

  return (
    <Document>
      <Page style={styles.page}>
        {parsedData.hosts.map((host, index) => (
          <View key={index}>
            <Text style={styles.title}>{host.name} - Overall: {host.overallResult}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Metric Name</Text>
                <Text style={styles.tableColHeader}>Result</Text>
                <Text style={styles.tableColHeader}>Threshold</Text>
                <Text style={styles.tableColHeader}>Measured Value</Text>
              </View>
              {host.infraChecks.map((check, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{check.metricName}</Text>
                  <Text style={styles.tableCol}>{check.Result}</Text>
                  <Text style={styles.tableCol}>{check.thresholdValue}</Text>
                  <Text style={styles.tableCol}>{check.MessureValue}</Text>
