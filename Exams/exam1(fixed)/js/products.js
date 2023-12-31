var products = [];
 
window.onload = function () {
  // בודק אם מערך הוא ריק או לא
  // כלומר הם מערך של מוצרים לא ריק אז אז אל תעשה כלום כי הוא טרוא כלומר אמת
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
  } else {
    // אם כן ריק אז תיצור לי מערך ריק
    products = [];
  }
  makeTable();
}
 
window.onbeforeunload = function () {
  // שומר את מערך ב לוקל סטוראז
  localStorage.setItem('products', JSON.stringify(products));
}
const handleData = () => {
  var customerData = new Object();
  // שם המוצר
  customerData.productName = document.getElementById("productName").value;
  // מחיר המוצר
  customerData.productPrice = +document.getElementById("productPrice").value;
  // סוג קטגורית המוצר
  customerData.productCategory = document.getElementById("productCategory").value;
  // קישור המוצר
  productLink = document.getElementById("productLink").value;
  customerData.image = productLink;
  customerData.id = Date.now();
 
  // מוסיפים למערך של מוצרים
  products.push(customerData);
  // Save the updated products array in LocalStorage
  localStorage.setItem('products', JSON.stringify(products));
  // יוצרים טבלה
  makeTable();
};
 
const makeTable = () => {
  var tableData = document.getElementById("productData");
  var data = ""; //string
  products.map((item) => {
    // item.image...
    data +=
      `<tr>
        <td>${item.productName}</td>
        <td>${item.productPrice}</td>
        <td>${item.productCategory}</td>
        <td><img src="${item.image}" width="60" height="60"/></td>
        <td>
          <button onclick="deleteItem(${item.id})">Delete</button>
        </td>
      </tr>`;
  });
  tableData.innerHTML = data;
};
 
const deleteItem = (id) => {
  products = products.filter((item) => item.id !== id);
  // Save the updated products array in LocalStorage
  localStorage.setItem('products', JSON.stringify(products));
  makeTable();
};