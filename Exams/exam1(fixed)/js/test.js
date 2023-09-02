function addBooks() {
    let info = document.getElementById("productName").value;
    let info2 = document.getElementById("productPrice").value;
    let info3 = document.getElementById("productCategory").value;
    let info4 = document.getElementById("productLink").value;
  
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productLink").value = "";
  
    let obj = {
      productName: info,
      productPrice: info2,
      productCategory: info3,
      productLink: info4,
    };
  
    let table = document.getElementById("productData");
  
    const row = table.insertRow(1);
  
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
  
    var deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete Book';
    deleteButton.addEventListener('click', (event) => {
      var row = deleteButton.parentNode.parentNode;
      row.parentNode.removeChild(row)
    })
    
    cell1.innerHTML = `${obj.productName}`;
    cell2.innerHTML = `${obj.productPrice}`;
    cell3.innerHTML = `${obj.productCategory}`;
    cell4.innerHTML = `${obj.productLink}`;
    cell4.appendChild(deleteButton);
   
  }