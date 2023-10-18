import { CurrencyObj } from './currency.js';
import { extractTextWithinParentheses, formatNumber} from './functions.js';
// the "DOMContentLoaded" event to occur before executing the provided function.
document.addEventListener("DOMContentLoaded", function () {
  var inputeStockChanceRiskRatio = document.getElementById("stockChanceRiskRatio");
  var inputeStockStopLose = document.getElementById("stockStopLose");
  var inputeStockQuantity = document.getElementById("stockQuantity");
  var inputeStockEnterTakeProfit = document.getElementById("stockEnterTakeProfit");
  var submitButton = document.getElementById("submitButton");
  function toggleSubmitButton() {
    var valueStockStopLose = inputeStockStopLose.value.trim();
    var valueStockChanceRiskRatio = inputeStockChanceRiskRatio.value.trim();

    if (valueStockStopLose === "") {
      inputeStockChanceRiskRatio.setAttribute("required", "required");
      inputeStockQuantity.setAttribute("required", "required");
      inputeStockEnterTakeProfit.setAttribute("required", "required");
      // submitButton.disabled = false;
    } else {
      inputeStockChanceRiskRatio.removeAttribute("required");
    }

    if (valueStockChanceRiskRatio === "") {
      inputeStockStopLose.setAttribute("required", "required");
      inputeStockQuantity.setAttribute("required", "required");
      inputeStockEnterTakeProfit.setAttribute("required", "required");
    } else {
      inputeStockStopLose.removeAttribute("required");
    }

    if (valueStockStopLose !== "" && valueStockChanceRiskRatio !== "") {
      inputeStockQuantity.removeAttribute("required");
      inputeStockEnterTakeProfit.removeAttribute("required");
    }
    
    // Enable or disable the submit button
    // submitButton.disabled = (inputeStockStopLose.value === "" || inputeStockChanceRiskRatio.value === "");
  }

  // Trigger the function on page load
  toggleSubmitButton();

  // Check the input fields every 1000 milliseconds (1 second)
  setInterval(toggleSubmitButton, 500);
  
  // Check the input fields when the page loads
  inputeStockChanceRiskRatio.addEventListener("input", toggleSubmitButton);
  inputeStockEnterTakeProfit.addEventListener("input", toggleSubmitButton);
  inputeStockQuantity.addEventListener("input", toggleSubmitButton);
});
// the "DOMContentLoaded" event to occur before executing the provided function.
document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form's submit button
    document.getElementById("stockForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from actually submitting
      // Get the values of the input fields
      let stockPrice = parseFloat(document.getElementById("stockPrice").value); // Stock price:
      let stockStopLose = parseFloat(document.getElementById("stockStopLose").value); // Stop lose:
      let stockRiskMoney = parseFloat(document.getElementById("stockRiskMoney").value); // Total amount of money to risk for shares: 50 (without $):
      let stockChanceRiskRatio = parseFloat(document.getElementById("stockChanceRiskRatio").value); // Chance risk ratio (R) per share:
      let stockCurrency = document.getElementById("stockCurrency").value; // Currency
      let stockFinancial = parseFloat(document.getElementById("stockFinancial").value); // 3000$
      let stockQuantity = document.getElementById("stockQuantity").value; // Enter the quantity you have:
      let checkbox = document.getElementById("switchCheckbox"); // checkbox: long or short
      // Get a reference to the input element by its ID
      let inputStockStopLose = document.getElementById("stockStopLose");
      let inputStockChanceRiskRatio = document.getElementById("stockChanceRiskRatio");
      // Get the values of the td from table
      // Get a reference to the table element
      let table = document.querySelector('table');
      // Get tbody element
      let tbody = document.querySelector('tbody');
      // Get all tr elements of tbody
      let trElements = tbody.querySelectorAll('tr');
      let TypePosition = document.getElementById("TypePosition");
      let Price = document.getElementById("Price");
      let StopLose = document.getElementById("StopLose");
      let Quantity = document.getElementById("Quantity");
      let TakeProfit = document.getElementById("TakeProfit");
      let ProfitEarn = document.getElementById("ProfitEarn");
      let RiskMoney = document.getElementById("RiskMoney");
      let Power = document.getElementById("Power");
      let isBelow = document.getElementById("isBelow");
      let Currency = document.getElementById("Currency");
      let TypeCurrency = document.getElementById("TypeCurrency");
      let RiskRecommended = document.getElementById("RiskRecommended");
      let RiskRatio = document.getElementById("RiskRatio");
      // Define variables for stock calculation
      // RangeBetween = 100 - 90 = 10
      let RangeBetween,Q;
      // Check if the checkbox is checked
      if(isNaN(stockStopLose)) {
        if(checkbox.checked) { // Checkbox is checked as long
          // This code will run if stockStopLose is NaN
          // stockStopLose = 100 - (50 / 5)
          // stockStopLose = 90
          stockStopLose = stockPrice - (stockRiskMoney / stockQuantity);
          // RangeBetween = 100 - 90
          // RangeBetween = 10
          RangeBetween = Math.abs(stockPrice - stockStopLose);
          // Q = 5
          Q = stockQuantity;
        } else { // Checkbox is not checked as sort
          // stockStopLose = 100 + (50 / 5)
          // stockStopLose = 110
          stockStopLose = stockPrice + (stockRiskMoney / stockQuantity);
          // RangeBetween = 100 - 110
          RangeBetween = Math.abs(stockPrice - stockStopLose);
          // Q = 5
          Q = stockQuantity;
        }
    } else {
        // This code will run if stockStopLose is a valid number
        // RangeBetween = 100 - 90 or 100 - 110
        RangeBetween = Math.abs(stockPrice - stockStopLose);
        // Q is Quantity. 50 / 10 = 5 stocks or Q
        Q = Math.round(stockRiskMoney / RangeBetween);
    }
      let stockTakeProfit; // calculate take profit 
      let stockTypePosition; // long or sort
      let temp_stockFinancial = stockFinancial; // temp variable
      let RR; // Risk ratio 
      let temp_stockTakeProfit = stockTakeProfit;

      // Attempt to get the stockEnterTakeProfit element by ID
      let stockEnterTakeProfitElement = document.getElementById("stockEnterTakeProfit");

      // Use the logical OR operator to assign temp_stockTakeProfit if stockEnterTakeProfitElement is null or its value is NaN
      let stockEnterTakeProfit = stockEnterTakeProfitElement ? parseFloat(stockEnterTakeProfitElement.value) : temp_stockTakeProfit;

      // stockFindRRR is take profile price to find RRR
      if (isNaN(stockChanceRiskRatio)){
        // RR = (115 - 100) / 10
        RR = Math.abs((stockEnterTakeProfit - stockPrice) / RangeBetween);
        // console.log(`Take profit: ${stockEnterTakeProfit} and stock price is ${stockPrice} and Range between is ${RangeBetween}`);
        stockChanceRiskRatio = RR;
      } 
      // stockEarnPerTrade = 50 * 1.5 = 75
      let stockEarnPerTrade = stockRiskMoney * stockChanceRiskRatio;

      if (stockPrice >= stockStopLose) {
        // stockTakeProfit = 100 + 10 * 1.5 = 115 as long
        stockTakeProfit = stockPrice + RangeBetween * stockChanceRiskRatio;
        stockTypePosition = "Long";
      } else {
        // stockTakeProfit = 100 - 10 * 1.5 = 85 as sort
        stockTakeProfit = stockPrice - RangeBetween * stockChanceRiskRatio;
        stockTypePosition = "Sort";
      }
      
      if (stockFinancial >= 100) {
        stockFinancial = stockFinancial / 100
      } else {
        stockFinancial = 20
      }

      // table js
      table.classList.remove('hide');
      // Check the value of stockTypePosition
      if (stockTypePosition === "Long") {
        // If stockTypePosition is "Long", set all <tr> elements to "table-success"
        for (let i = 0; i < trElements.length; i++) {
          trElements[i].className = 'table-success';
        }
      } else {
        // If stockTypePosition is not "Long", set all <tr> elements to "table-danger"
        for (let i = 0; i < trElements.length; i++) {
          trElements[i].className = 'table-danger';
        }
      }

      // Set the value of the input element
      inputStockStopLose.value = formatNumber(stockStopLose);
      inputStockChanceRiskRatio.value = formatNumber(stockChanceRiskRatio);

      let SymbolCurrency = CurrencyObj[stockCurrency];
      SymbolCurrency = extractTextWithinParentheses(SymbolCurrency); // "¥"
      TypePosition.textContent = stockTypePosition;
      Price.textContent = stockPrice + SymbolCurrency;
      StopLose.textContent = formatNumber(stockStopLose) + SymbolCurrency;
      Quantity.textContent = Q;
      TakeProfit.textContent = formatNumber(stockTakeProfit) + SymbolCurrency;
      ProfitEarn.textContent = formatNumber(stockEarnPerTrade) + SymbolCurrency;
      RiskMoney.textContent = stockRiskMoney + SymbolCurrency;
      // Power.textContent = 100 * 5
      Power.textContent = formatNumber(stockPrice * Q) + SymbolCurrency;
      isBelow.textContent = (stockPrice * Q <= temp_stockFinancial) ? "Yes" : "No";
      Currency.textContent = stockCurrency;
      TypeCurrency.textContent = CurrencyObj[stockCurrency];
      RiskRecommended.textContent = stockFinancial + SymbolCurrency;
      RiskRatio.textContent = "1:" + formatNumber(stockChanceRiskRatio);
    });
  });
