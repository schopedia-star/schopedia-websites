const amountInput = document.querySelector('#loan-amount');
const termInput = document.querySelector('#loan-term');
const rateInput = document.querySelector('#loan-rate');

const display = {
  amount: document.querySelector('[data-display="amount"]'),
  term: document.querySelector('[data-display="term"]'),
  rate: document.querySelector('[data-display="rate"]'),
  payment: document.querySelector('[data-display="payment"]'),
  total: document.querySelector('[data-display="total"]'),
  interest: document.querySelector('[data-display="interest"]'),
  summary: document.querySelector('[data-display="summary"]'),
  apr: document.querySelector('[data-display="apr"]'),
const amountInput = document.getElementById('amount');
const monthsInput = document.getElementById('months');
const loanTypeSelect = document.getElementById('loanType');

const summary = {
  amount: document.getElementById('sumAmount'),
  tenure: document.getElementById('sumTenure'),
  type: document.getElementById('sumType'),
  fee: document.getElementById('fee'),
  net: document.getElementById('net'),
  repayment: document.getElementById('repayment'),
  nextDate: document.getElementById('nextDate'),
};

const SERVICE_FEE_RATE = 0.1;
const INTEREST_RATE = 0.15;

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const calculatePayment = ({ principal, months, annualRate }) => {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    return principal / months;
  }
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
  `K${value.toLocaleString('en-ZM', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getSanitizedNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const updateView = () => {
  const principal = Number(amountInput.value);
  const months = Number(termInput.value);
  const annualRate = Number(rateInput.value);
  const payment = calculatePayment({ principal, months, annualRate });
  const totalPayment = payment * months;
  const totalInterest = totalPayment - principal;

  display.amount.textContent = formatCurrency(principal);
  display.term.textContent = `${months} months`;
  display.rate.textContent = `${annualRate.toFixed(1)}% APR`;
  display.payment.textContent = formatCurrency(Math.round(payment));
  display.total.textContent = formatCurrency(Math.round(totalPayment));
  display.interest.textContent = formatCurrency(Math.round(totalInterest));
  display.summary.textContent = `Total repayment ${formatCurrency(
    Math.round(totalPayment)
  )} · Total interest ${formatCurrency(Math.round(totalInterest))}`;
  display.apr.textContent = `${annualRate.toFixed(1)}%`;
const updateEstimator = () => {
  const amount = Math.max(getSanitizedNumber(amountInput.value, 0), 0);
  const months = Math.max(
    Number.parseInt(monthsInput.value, 10) || 1,
    1
  );
  const loanType = loanTypeSelect.value;

  const fee = amount * SERVICE_FEE_RATE;
  const net = amount - fee;
  const monthlyRepayment = (amount * (1 + INTEREST_RATE)) / months;

  summary.amount.textContent = formatCurrency(amount);
  summary.tenure.textContent = `${months} month${months === 1 ? '' : 's'}`;
  summary.type.textContent = loanType;
  summary.fee.textContent = formatCurrency(fee);
  summary.net.textContent = formatCurrency(net);
  summary.repayment.textContent = formatCurrency(monthlyRepayment);

  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + 1);
  summary.nextDate.textContent = nextDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

[amountInput, termInput, rateInput].forEach((input) => {
  input.addEventListener('input', updateView);
[amountInput, monthsInput].forEach((input) => {
  input.addEventListener('input', updateEstimator);
});

updateView();
loanTypeSelect.addEventListener('change', updateEstimator);

updateEstimator();
