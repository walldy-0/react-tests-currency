export const convertPLNToUSD = (PLN) => {

  if (PLN === undefined || (typeof PLN === 'string' && Object.prototype.toString.call(PLN) === '[object String]')) {
    return NaN;
  }

  if (typeof PLN !== 'number' && !(typeof PLN === 'string' && Object.prototype.toString.call(PLN) === '[object String]')) {
    return 'Error';
  }

  if (PLN < 0) {
    return '$0.00';
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}