// Store all transactions
let transactions = [];


// Store monthly budget
let monthlyBudget = 0;


// Go to Add Expense section

function goToExpense() {

    document.getElementById("add-expense")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// Add Transaction

function addTransaction() {

    let type =
        document.getElementById("type").value;

    let amount =
        Number(
            document.getElementById("amount").value
        );

    let category =
        document.getElementById("category").value;

    let description =
        document.getElementById("description").value;

    let date =
        document.getElementById("date").value;


    // Check if amount is valid

    if (amount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    if (description === "") {

        alert("Please enter a description.");

        return;
    }


    // Create transaction object

    let transaction = {

        id: Date.now(),

        type: type,

        amount: amount,

        category: category,

        description: description,

        date: date

    };


    // Add transaction to array

    transactions.push(transaction);


    // Clear form

    document.getElementById("amount").value = "";

    document.getElementById("description").value = "";

    document.getElementById("date").value = "";


    // Update website

    displayTransactions();

    calculateTotals();


    alert("Transaction added successfully!");
}


// Display transactions

function displayTransactions() {

    let list =
        document.getElementById(
            "transactionList"
        );


    list.innerHTML = "";


    if (transactions.length === 0) {

        list.innerHTML =
            '<p class="empty">No transactions yet.</p>';

        return;
    }


    transactions.forEach(function(transaction) {

        let div =
            document.createElement("div");


        div.className =
            "transaction";


        let sign =
            transaction.type === "expense"
            ? "-"
            : "+";


        let className =
            transaction.type === "expense"
            ? "expense"
            : "income";


        div.innerHTML = `

            <div class="transaction-info">

                <h3>
                    ${transaction.category}
                </h3>

                <p>
                    ${transaction.description}
                    |
                    ${transaction.date}
                </p>

            </div>

            <div>

                <span class="${className}">
                    ${sign}₹${transaction.amount}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">

                    Delete

                </button>

            </div>
        `;


        list.appendChild(div);

    });
}


// Calculate totals

function calculateTotals() {

    let totalIncome = 0;

    let totalExpenses = 0;


    transactions.forEach(
        function(transaction) {

            if (
                transaction.type === "income"
            ) {

                totalIncome +=
                    transaction.amount;

            } else {

                totalExpenses +=
                    transaction.amount;

            }

        }
    );


    let balance =
        totalIncome - totalExpenses;


    document.getElementById("income")
        .innerText =
        "₹" + totalIncome;


    document.getElementById("expenses")
        .innerText =
        "₹" + totalExpenses;


    document.getElementById("balance")
        .innerText =
        "₹" + balance;


    checkBudget(totalExpenses);
}


// Delete transaction

function deleteTransaction(id) {

    transactions =
        transactions.filter(
            function(transaction) {

                return transaction.id !== id;

            }
        );


    displayTransactions();

    calculateTotals();
}


// Set budget

function setBudget() {

    monthlyBudget =
        Number(
            document.getElementById(
                "budgetInput"
            ).value
        );


    if (monthlyBudget <= 0) {

        alert("Enter a valid budget.");

        return;
    }


    document.getElementById(
        "budgetMessage"
    ).innerText =
        "Your monthly budget is ₹"
        + monthlyBudget;


    calculateTotals();
}


// Check budget

function checkBudget(totalExpenses) {

    let message =
        document.getElementById(
            "budgetMessage"
        );


    if (monthlyBudget === 0) {

        return;
    }


    let remaining =
        monthlyBudget - totalExpenses;


    if (remaining < 0) {

        message.innerText =
            "⚠️ You have exceeded your budget by ₹"
            + Math.abs(remaining);

        message.style.color = "#e05252";

    }

    else if (
        totalExpenses >=
        monthlyBudget * 0.8
    ) {

        message.innerText =
            "⚠️ You have used more than 80% of your budget.";

        message.style.color = "#d28b00";

    }

    else {

        message.innerText =
            "✅ You have ₹"
            + remaining
            + " remaining.";

        message.style.color = "#27945b";
    }
}

Object.assign(window, {
    goToExpense,
    addTransaction,
    deleteTransaction,
    setBudget
});