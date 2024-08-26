document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    const table = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>${date}</td><td>${category}</td><td>${amount}</td>`;

    // Optional: Save to localStorage or send to server
    // localStorage.setItem('expenses', JSON.stringify(expenses));
});
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    const expense = { date, category, amount };

    fetch('/add-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
    }).then(response => response.json()).then(data => {
        // Add the expense to the table
        const table = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `<td>${date}</td><td>${category}</td><td>${amount}</td>`;
    });
});

window.onload = function() {
    fetch('/expenses')
        .then(response => response.json())
        .then(expenses => {
            const table = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
            expenses.forEach(expense => {
                const newRow = table.insertRow();
                newRow.innerHTML = `<td>${expense.date}</td><td>${expense.category}</td><td>${expense.amount}</td>`;
            });
        });
};
