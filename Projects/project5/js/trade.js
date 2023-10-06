const CurrencyObj = {
  "United States Dollar": "USD ($)",
  "Euro": "EUR (€)",
  "Japanese Yen": "JPY (¥)",
  "British Pound Sterling": "GBP (£)",
  "Swiss Franc": "CHF (Fr)",
  "Canadian Dollar": "CAD (C$)",
  "Australian Dollar": "AUD (A$)",
  "New Zealand Dollar": "NZD (NZ$)",
  "Chinese Yuan": "CNY (¥)",
  "Indian Rupee": "INR (₹)",
  "South African Rand": "ZAR (R)",
  "Brazilian Real": "BRL (R$)",
  "Mexican Peso": "MXN (Mex$)",
  "Singapore Dollar": "SGD (S$)",
  "Hong Kong Dollar": "HKD (HK$)",
  "Israeli New Shekel": "ILS (₪)"
};   

// Function to extract text within parentheses
function extractTextWithinParentheses(inputString) {
  // Use a regular expression to match text within parentheses
  const matches = inputString.match(/\(([^)]+)\)/);
  
  // Check if there is a match
  if (matches && matches.length > 1) {
    // Return the text within parentheses (group 1 of the match)
    return matches[1];
  }
  
  // If no match is found, return an empty string or any default value you prefer
  return "";
}

function formatNumber(number) {
  // Round the number to two decimal places and convert it to a string
  let formattedNumber = number.toFixed(2);

  // Convert the string back to a number to remove leading zeros
  return parseFloat(formattedNumber);
}

// the "DOMContentLoaded" event to occur before executing the provided function.
document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form's submit button
    document.getElementById("stockForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from actually submitting
      // Get the values of the input fields
      let stockPrice = parseFloat(document.getElementById("stockPrice").value);
      let stockStopLose = parseFloat(document.getElementById("stockStopLose").value);
      let stockRiskMoney = parseFloat(document.getElementById("stockRiskMoney").value);
      let stockRisk = parseFloat(document.getElementById("stockRisk").value);
      let stockCurrency = document.getElementById("stockCurrency").value;
      let stockFinancial = parseFloat(document.getElementById("stockFinancial").value);
      let stockQuantity = document.getElementById("stockQuantity").value;
      let checkbox = document.getElementById("switchCheckbox");
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
      // SL = 100 - 90 = 10
      let SL,Q;
      // Check if the checkbox is checked
      if (isNaN(stockStopLose)) {
        if (checkbox.checked) {
          // Checkbox is checked as long
          // This code will run if stockStopLose is NaN
          stockStopLose = stockPrice - (stockRiskMoney / stockQuantity);
          SL = Math.abs(stockPrice - stockStopLose);
          Q = stockQuantity;
        } else {
          // Checkbox is not checked as sort
          stockStopLose = stockPrice + (stockRiskMoney / stockQuantity);
          SL = Math.abs(stockPrice - stockStopLose);
          Q = stockQuantity;
        }
    } else {
        // This code will run if stockStopLose is a valid number
        SL = Math.abs(stockPrice - stockStopLose);
        // Q is Quantity. 50 / 10 = 5 stocks or Q
        Q = Math.round(stockRiskMoney / SL);
    }
      // stockEarnPerTrade = 50 * 1.5 = 75
      let stockEarnPerTrade = stockRiskMoney * stockRisk;
      let stockTakeProfit; // Declare the variable outside of the if-else blocks
      let stockTypePosition;
      let temp_stockFinancial = stockFinancial;
      if (stockPrice >= stockStopLose) {
        // stockTakeProfit = 100 + 10 * 1.5 = 115 as long
        stockTakeProfit = stockPrice + SL * stockRisk;
        stockTypePosition = "Long";
      } else {
        // stockTakeProfit = 100 - 10 * 1.5 = 85 as sort
        stockTakeProfit = stockPrice - SL * stockRisk;
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

      // Get a reference to the input element by its ID
      let inputStockStopLose = document.getElementById("stockStopLose");
      // Set the value of the input element
      inputStockStopLose.value = stockStopLose;

      let SymbolCurrency = CurrencyObj[stockCurrency];
      SymbolCurrency = extractTextWithinParentheses(SymbolCurrency); // "¥"
      TypePosition.textContent = stockTypePosition;
      Price.textContent = stockPrice + SymbolCurrency;
      StopLose.textContent = formatNumber(stockStopLose) + SymbolCurrency;
      Quantity.textContent = Q;
      TakeProfit.textContent = formatNumber(stockTakeProfit) + SymbolCurrency;
      ProfitEarn.textContent = stockEarnPerTrade + SymbolCurrency;
      RiskMoney.textContent = stockRiskMoney + SymbolCurrency;
      Power.textContent = formatNumber(stockPrice * Q) + SymbolCurrency;
      isBelow.textContent = (stockPrice * Q <= temp_stockFinancial) ? "Yes" : "No";
      Currency.textContent = stockCurrency;
      TypeCurrency.textContent = CurrencyObj[stockCurrency];
      RiskRecommended.textContent = stockFinancial + SymbolCurrency;
      RiskRatio.textContent = "1:" + stockRisk;
    });
  });
