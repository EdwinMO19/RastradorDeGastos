document.addEventListener("DOMContentLoaded", function() {
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseList = document.getElementById("expenseList");
    const totalExpenses = document.getElementById("totalExpenses");
    const categoryFilter = document.getElementById("categoryFilter");
  
   
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  

    function renderExpenses() {
      expenseList.innerHTML = "";
      let total = 0;
      expenses.forEach(expense => {
        if (categoryFilter.value === "all" || expense.category === categoryFilter.value) {
          total += expense.amount;
          const expenseItem = document.createElement("div");
          expenseItem.classList.add("expense-item");
          expenseItem.innerHTML = `
            <p><span class="category">${expense.category}</span> - $${expense.amount.toFixed(2)}</p>
          `;
          expenseList.appendChild(expenseItem);
        }
      });
      totalExpenses.textContent = `Gastos totales: $${total.toFixed(2)}`;
    }
  
    function addExpense() {
      const amount = parseFloat(document.getElementById("expenseAmount").value);
      const category = document.getElementById("expenseCategory").value;
  
      if (isNaN(amount) || amount <= 0) {
        alert("Por favor ingrese una cantidad válida.");
        return;
      }
  
      const expense = {
        amount: amount,
        category: category
      };
  
      expenses.push(expense);
      saveExpenses();
      renderExpenses();
    }
  
  
    function saveExpenses() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    
    addExpenseBtn.addEventListener("click", addExpense);
  
  
    categoryFilter.addEventListener("change", renderExpenses);
  
  
    renderExpenses();
  });
  