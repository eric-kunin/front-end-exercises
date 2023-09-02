var albums = [];

const handleData = () => {
  var customerData = new Object();
  // Album link
  customerData.albumLink = document.getElementById("albumLink").value;
  // Album title
  customerData.albumTitle = document.getElementById("albumTitle").value;
  // Album description
  customerData.albumDescription = document.getElementById("albumDescription").value;

  // מוסיפים למערך של מוצרים
  albums.push(customerData);
  // יוצרים טבלה
  makeTable();
};

function deleteButton(event) {
  const element = event.target;
  const deleteBtn = document.getElementById("deleteBtn");
}
 
const makeTable = () => {
  var tableData = document.getElementById("albumData");
  var data = ""; //string
  albums.map((item) => {
    // item.image...
    data +=
      `<div class="column">
      <figure>
        <img
          src="${item.albumLink}"
          alt="${item.albumTitle}"
          style="width: 50%;height:50%;"
          title="${item.albumTitle}" onmouseover="deleteButton(event)"
        />
        <figcaption>${item.albumDescription}</figcaption>
        <button id="deleteBtn" class="delete-btn">Delete</button>
      </figure>
    </div>`;
  });
  tableData.innerHTML = data;
};







