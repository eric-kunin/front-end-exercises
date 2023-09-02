var products = [];
const handleData = () => {
    var customerData = new Object();
    customerData.productName = document.getElementById("productName").value;
    // מחיר המוצר
    customerData.productPrice = +document.getElementById("productPrice").value;
    // סוג קטגורית המוצר
    customerData.productCategory = document.getElementById("productCategory").value;
    // קישור המוצר
    productLink = document.getElementById("productLink").value;
    customerData.image = productLink;
    
    // מוסיפים למערך של מוצרים
    products.push(customerData);
    // יוצרים טבלה
     makeTable();
  
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productLink").value = "";
  
    let obj = {
      author: customerData.productName,
      title: customerData.productPrice,
      genre: customerData.productCategory,
      review: productLink,
    };
  
  }

  const makeTable = () => {
    var tableData = document.getElementById("productData");
    let table = document.getElementById("productData");
  
    const row = table.insertRow(1);
  
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
  
    cell1.innerHTML = `${obj.author}`;
    cell2.innerHTML = `${obj.title}`;
    cell3.innerHTML = `${obj.genre}`;
    cell4.innerHTML = `${obj.review}<button onclick="this.closest('tr').remove()">Delete Book</button>`;
}