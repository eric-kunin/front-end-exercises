var drones = [];
let numberOfDrones = 0;
let numberOfRepairedDrones = 0;
let numberOfVIP = 0;
let numberOfDronesInCare = 0;
const handleData = () => {
    var customerData = new Object();
    // שם הלקוח
    customerData.userName = document.getElementById("userName").value;
    // מספר טלפון של הלקוח
    customerData.userPhone = document.getElementById("userPhone").value;
    // כתובת הלקוח
    customerData.userAddress = document.getElementById("userAddress").value;
    // אם הלקוח הוא ויפ
    const userType = document.getElementById("userType").checked;
    // שם החברה
    customerData.droneCompany = document.getElementById("droneCompany").value;
    // סוג הדרון
    droneModels = document.getElementsByName("droneModel");
    // תיאור הבעיה
    customerData.describeProblem = document.getElementById("describeProblem").value;
    // אחריות
    const warrantyType = document.getElementById("warrantyType").value;
    customerData.warrantyType = warrantyType;
    var droneModel = "";
    droneModels.forEach((item) => {
    if (item.checked) {
        droneModel = item.value;
        customerData.droneModel = droneModel;}
    });
    
    const deliveryDate = new Date();
  // Check the userType and warrantyType to set the delivery date
  if (userType) {
    deliveryDate.setDate(deliveryDate.getDate() + 7);
  } else if (warrantyType === "extendedWarranty") {
    deliveryDate.setDate(deliveryDate.getDate() + 14);
  } else if (warrantyType === "normalWarranty") {
    deliveryDate.setDate(deliveryDate.getDate() + 21);
  } else {
    deliveryDate.setDate(deliveryDate.getDate() + 30);
  }
  customerData.dateReceived = new Date().toDateString();
  // Expected delivery
  customerData.expectedDelivery = deliveryDate.toDateString()
  // Number of days left
  //                                   5 - 20 = -15 , after Math.abs(-15) ==> +15 days
  customerData.numberDays = Math.abs(new Date() - deliveryDate) / (24 * 60 * 60 * 1000);
  // customerData.numberDays = Math.abs(new Date() - deliveryDate) / 86400000 

    drones.push(customerData);
    // Increment the counters
  numberOfDrones++;
  if (userType) {
    numberOfVIP++;
  }
  if (customerData.expectedDelivery < new Date().toDateString()) {
    numberOfRepairedDrones++;
  }
  numberOfDronesInCare = numberOfDrones - numberOfRepairedDrones;
  // Create a table
    // יוצרים טבלה
     makeTable();
}

const makeTable = () => {
    var tableData = document.getElementById("userData");
    var data = ""; //string
    drones.map((item) => {
        data += `
                <tr>
                    <td>${item.dateReceived}</td>
                    <td>${item.expectedDelivery}</td>
                    <td>${Math.round(item.numberDays)} day/days left</td>
                    <td>${item.userName}</td>
                    <td>${item.userPhone}</td>
                    <td>${item.describeProblem}</td>
                </tr>
            `;
      });
      tableData.innerHTML = data;
      // Display the information at the bottom of the page
  const info = `
  Number of drones to repair: ${numberOfDrones}<br>
  Number of repaired drones: ${numberOfRepairedDrones}<br>
  Number of VIP customers: ${numberOfVIP}<br>
  Number of drones in care: ${numberOfDronesInCare}
`;
document.getElementById("info").innerHTML = info;
}
