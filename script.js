var totalAmount = document.getElementById("totalAmount");
var productName = document.getElementById("productName");
var productCost = document.getElementById("productCost");
var totalBudget = document.getElementById("totalBudget");
var expense = document.getElementById("expense");
var balance = document.getElementById("balance");
var Data = document.getElementById("Data");
var editLi = null;

setBudget = () => {
  if (totalAmount.value === "" || totalAmount.value <= 0) {
    toastr.error("Please enter a valid amount!");
    return;
  } else {
    totalBudget.innerText = totalAmount.value;
    balance.innerText = parseFloat(totalBudget.innerText) - parseFloat(expense.innerText);
    totalAmount.value = "";
    toastr.success("Budget set successfully!");
  }
};
checkAmount = () => {
  if (totalBudget.innerText === "0") {
    toastr.error("Please set the budget first!");
  } else if (
    productName.value === "" ||
    productCost.value === "" ||
    productCost.value <= 0
  ) {
    toastr.error("Please enter valid product name and cost!");
  } else {
    if (editLi) {
      var oldCost = parseFloat(editLi.querySelector(".pcost").innerText);
      editLi.querySelector(".pname").innerText = productName.value;
      editLi.querySelector(".pcost").innerText = productCost.value;

      var newCost = parseFloat(productCost.value);
      var costDifference = newCost - oldCost;

      expense.innerText = parseFloat(expense.innerText) + costDifference;
      balance.innerText = parseFloat(balance.innerText) - costDifference;

      toastr.success("Expense updated successfully!");
      editLi = null;
    } else {
      balance.innerText =
        parseFloat(totalBudget.innerText) -
        parseFloat(expense.innerText) -
        parseFloat(productCost.value);
      expense.innerText =
        parseFloat(expense.innerText) + parseFloat(productCost.value);

      Data.className = "data";

      var ul = document.querySelector("ul");

      ul.innerHTML += `      
        <li>
            <span class='pname'>${productName.value}</span>
            <span class='pcost'>${productCost.value}</span>
            <div>
                <i
                onclick="edit(event)"
                class="fa-solid fa-pen-to-square"
                style="color: #587ef1">
                </i>
                <i
                onclick="Delete(event)"
                class="fa-solid fa-trash-can"
                style="color: #587ef1">
                </i>
            </div>
        </li>`;
      toastr.success("Expense added successfully!");
    }

    productName.value = "";
    productCost.value = "";
  }
};
edit = (event) => {
  var li = event.target.closest("li");
  var pname = li.querySelector(".pname");
  var pcost = li.querySelector(".pcost");
  productName.value = pname.innerText;
  productCost.value = pcost.innerText;
  editLi = li;
  toastr.info("Click 'Check Amount' to save your changes!");
};
Delete = (event) => {
  var li = event.target.closest("li");
  var pcost = li.querySelector(".pcost");
  balance.innerText =
    parseFloat(balance.innerText) + parseFloat(pcost.innerText);
  expense.innerText =
    parseFloat(expense.innerText) - parseFloat(pcost.innerText);
  li.remove();
  toastr.info("Expense deleted!");
  if (expense.innerText === "0") {
    Data.className = "noData";
    var ul = document.querySelector("ul");
    ul.className = "expenseList";
  }
};
