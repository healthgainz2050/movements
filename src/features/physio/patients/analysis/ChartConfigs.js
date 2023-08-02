export const lineChartConfig = {
  backgroundColor: 'white',
  backgroundGradientFrom: '#d7e1ec',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(17,162,199,0.60)`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 0,
    fontSize: 1,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '1',
    stroke: '#ffa726',
    fontSize: 1,
  },
};

export const pieChartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
