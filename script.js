var totalAmount = document.getElementById("totalAmount");
var productName = document.getElementById("productName");
var productCost = document.getElementById("productCost");
var totalBudget = document.getElementById("totalBudget");
var expense = document.getElementById("expense");
var balance = document.getElementById("balance");
var Data = document.getElementById("Data");

setBudget = () => {
  if (totalAmount.value === "" || totalAmount.value <= 0) {
    alert("Please enter a valid amount!");
    return;
  } else {
    totalBudget.innerText = totalAmount.value;
    balance.innerText = totalAmount.value;
    totalAmount.value = "";
  }
};
checkAmount = () => {
  if (totalBudget.innerText === "0") {
    alert("Please set the budget first!");
    productName.value = "";
    productCost.value = "";
  } else if (
    productName.value === "" ||
    productCost.value === "" ||
    productCost.value <= 0
  ) {
    alert("Please enter valid product name and cost!");
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
  Delete(event);
};
Delete = (event) => {
  var li = event.target.closest("li");
  var pcost = li.querySelector(".pcost");
  balance.innerText =
    parseFloat(balance.innerText) + parseFloat(pcost.innerText);
  expense.innerText =
    parseFloat(expense.innerText) - parseFloat(pcost.innerText);
  li.remove();
  if (expense.innerText === "0") {
    Data.className = "noData";
    var ul = document.querySelector("ul");
    ul.className = "expenseList";
  }
};
