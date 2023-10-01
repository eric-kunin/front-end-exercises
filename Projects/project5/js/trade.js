document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form's submit button
    document.getElementById("stockForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from actually submitting
  
      // Get the values of the input fields
      var stockPrice = parseFloat(document.getElementById("stockPrice").value);
      var stockStopLose = parseFloat(document.getElementById("stockStopLose").value);
      var stockRiskMoney = parseFloat(document.getElementById("stockRiskMoney").value);
      var stockRisk = parseFloat(document.getElementById("stockRisk").value);
      var stockCurrency = document.getElementById("stockCurrency").value;
      var stockFinancial = document.getElementById("stockFinancial").value;
    });
  });
  