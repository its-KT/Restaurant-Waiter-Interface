document.addEventListener('DOMContentLoaded', (event) => {
    loadOrders();
});

function addToList() {
    var dishName = document.getElementById("dishName").value;
    var price = parseFloat(document.getElementById("price").value);
    var tableNumber = parseInt(document.getElementById("tableNumber").value);

    if (dishName === "" || isNaN(price) || isNaN(tableNumber)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    var order = {
        dishName: dishName,
        price: price,
        tableNumber: tableNumber
    };

    appendOrderToList(order);

    document.getElementById("dishName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("tableNumber").value = "1"; 
    saveOrder(order);
}

function appendOrderToList(order) {
    var ordersList = document.getElementById(`table${order.tableNumber}`);
    var listItem = document.createElement("li");
    listItem.textContent = `${order.dishName} - $${order.price.toFixed(2)} - Table ${order.tableNumber}`;
    
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        ordersList.removeChild(listItem);
        deleteOrder(order);
    };

    listItem.appendChild(deleteButton);
    ordersList.appendChild(listItem);
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => {
        appendOrderToList(order);
    });
}

function deleteOrder(orderToDelete) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.dishName !== orderToDelete.dishName || 
                                      order.price !== orderToDelete.price || 
                                      order.tableNumber !== orderToDelete.tableNumber);
    localStorage.setItem('orders', JSON.stringify(orders));
}
