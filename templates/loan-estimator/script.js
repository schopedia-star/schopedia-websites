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
};

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
};

[amountInput, termInput, rateInput].forEach((input) => {
  input.addEventListener('input', updateView);
});

updateView();
