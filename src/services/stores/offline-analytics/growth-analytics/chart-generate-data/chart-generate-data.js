const detectTrend = (revenues) => {
  const n = revenues.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += revenues[i];
    sumXY += i * revenues[i];
    sumX2 += i * i;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}
export const calculateApproximation = (index, revenues) => {
  const { slope, intercept } = detectTrend(revenues);
  return  slope * index + intercept;
}