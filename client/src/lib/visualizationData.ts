// Churn Analysis Data
export const churnData = [
  { name: "Month-to-Month", value: 43 },
  { name: "One Year", value: 17 },
  { name: "Two Year", value: 8 },
  { name: "Other", value: 32 }
];

export const churnByTenure = [
  { name: "0-6", churnRate: 30 },
  { name: "7-12", churnRate: 65 },
  { name: "13-24", churnRate: 50 },
  { name: "25-36", churnRate: 35 },
  { name: "37-48", churnRate: 25 },
  { name: "49-60", churnRate: 15 },
  { name: "60+", churnRate: 8 }
];

// Fake News Detection Data
export const modelMetrics = [
  { name: "Precision", value: 0.94 },
  { name: "Recall", value: 0.91 },
  { name: "F1 Score", value: 0.93 }
];

// Financial Time-Series Data
export const stockPriceData = [
  { date: "Jan", actual: 100, prediction: null, upperBound: null, lowerBound: null },
  { date: "Feb", actual: 105, prediction: null, upperBound: null, lowerBound: null },
  { date: "Mar", actual: 110, prediction: null, upperBound: null, lowerBound: null },
  { date: "Apr", actual: 115, prediction: null, upperBound: null, lowerBound: null },
  { date: "May", actual: 120, prediction: null, upperBound: null, lowerBound: null },
  { date: "Jun", actual: 115, prediction: null, upperBound: null, lowerBound: null },
  { date: "Jul", actual: 125, prediction: null, upperBound: null, lowerBound: null },
  { date: "Aug", actual: 130, prediction: null, upperBound: null, lowerBound: null },
  { date: "Sep", actual: 135, prediction: null, upperBound: null, lowerBound: null },
  { date: "Oct", actual: 140, prediction: null, upperBound: null, lowerBound: null },
  { date: "Nov", actual: 145, prediction: null, upperBound: null, lowerBound: null },
  { date: "Dec", actual: 150, prediction: null, upperBound: null, lowerBound: null },
  { date: "Jan", actual: 155, prediction: null, upperBound: null, lowerBound: null },
  { date: "Feb", actual: 160, prediction: null, upperBound: null, lowerBound: null },
  { date: "Mar", actual: 165, prediction: null, upperBound: null, lowerBound: null },
  { date: "Apr", actual: 170, prediction: 170, upperBound: 175, lowerBound: 165 },
  { date: "May", actual: 175, prediction: 180, upperBound: 190, lowerBound: 170 },
  { date: "Jun", actual: 180, prediction: 185, upperBound: 195, lowerBound: 175 },
  { date: "Jul", actual: 185, prediction: 195, upperBound: 205, lowerBound: 185 },
  { date: "Aug", actual: 190, prediction: 200, upperBound: 210, lowerBound: 190 }
];

export const volatilityData = [
  { day: "Mon", level: 0.2 },
  { day: "Tue", level: 0.3 },
  { day: "Wed", level: 0.5 },
  { day: "Thu", level: 0.9 },
  { day: "Fri", level: 0.7 },
  { day: "Sat", level: 0.4 },
  { day: "Sun", level: 0.2 }
];

export const modelComparisonData = [
  { name: "LSTM", value: 2.35 },
  { name: "ARIMA", value: 3.10 },
  { name: "Prophet", value: 1.85 }
];
