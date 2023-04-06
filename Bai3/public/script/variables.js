let users = [];
let userUpdate = {};
let url = `http://localhost:3001`;
let table = document.getElementById("storeList").getElementsByTagName("tbody");
let loader = document.getElementById("loader");
let pageNumbers = document.getElementById("page_numbers");
let currentPage = 1;
let currentRow = 5;
