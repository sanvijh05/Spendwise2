const monthLabel = document.querySelector('#monthLabel');
const balanceValue = document.querySelector('#balanceValue');
const budgetValue = document.querySelector('#budgetValue');
const expenseValue = document.querySelector('#expenseValue');
const incomeValue = document.querySelector('#incomeValue');
const categoryList = document.querySelector('#categoryList');
const transactionList = document.querySelector('#transactionList');

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const renderCategories = (categories) => {
  categoryList.innerHTML = categories
    .map(
      (category) => `
        <div>
          <div class="category-item">
            <div class="category-meta">
              <span class="color-dot" style="background:${category.color};"></span>
              <div>
                <div class="category-name">${category.name}</div>
              </div>
            </div>
            <div class="category-amount">${formatCurrency(category.amount)}</div>
          </div>
          <div class="category-progress">
            <span style="width:${Math.min(category.percent, 100)}%; background:${category.color};"></span>
          </div>
        </div>
      `
    )
    .join('');
};

const renderTransactions = (transactions) => {
  transactionList.innerHTML = transactions
    .map(
      (item) => `
        <div class="transaction-item">
          <div class="transaction-info">
            <strong>${item.title}</strong>
            <span class="transaction-meta">${item.date} • ${item.category}</span>
          </div>
          <div class="transaction-amount ${item.amount >= 0 ? 'positive' : 'negative'}">
            ${item.amount >= 0 ? '+' : '-'}${formatCurrency(Math.abs(item.amount))}
          </div>
        </div>
      `
    )
    .join('');
};

async function loadDashboard() {
  const response = await fetch('/data.json');
  const data = await response.json();

  monthLabel.textContent = data.month;
  balanceValue.textContent = formatCurrency(data.balance);
  budgetValue.textContent = formatCurrency(data.budget);
  expenseValue.textContent = formatCurrency(data.expenses);
  incomeValue.textContent = formatCurrency(data.income);

  renderCategories(data.categories);
  renderTransactions(data.transactions);
}

loadDashboard().catch((error) => {
  console.error('Failed to load data:', error);
  monthLabel.textContent = 'Unable to load';
});
