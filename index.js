function addToList() {
    var dishName = document.getElementById("dishName").value;
    var price = parseFloat(document.getElementById("price").value);
    var tableNumber = parseInt(document.getElementById("tableNumber").value);

    // Validate input
    if (dishName === "" || isNaN(price) || isNaN(tableNumber)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Create order object
    var order = {
        dishName: dishName,
        price: price,
        tableNumber: tableNumber
    };

    // Add order to list
    var ordersList = document.getElementById("orders");
    var listItem = document.createElement("li");
    listItem.textContent = `${order.dishName} - $${order.price} - Table ${order.tableNumber}`;
    ordersList.appendChild(listItem);

    // Clear input fields
    document.getElementById("dishName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("tableNumber").value = "";

    // Call function to save order to backend
    saveOrder(order);
}

function saveOrder(order) {
    // Send order data to backend
    fetch('https://crudcrud.com/api/550668e942a84ab38a5675cbc471148d/apointeData3/6654ac4e19f3e403e81e0ee5', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}