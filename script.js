const form = document.querySelector("form");
const tbody = document.getElementById("tabelbody");
const User = document.getElementById("heading2");
const Phone = document.getElementById("phone");
const Email = document.getElementById("email");

if (form) {
    form.addEventListener("submit", (event) => {
        let name = event.target.fname.value;
        let phone = event.target.phone.value;
        let email = event.target.email.value;
        let location = event.target.location.value;
        // let hidden = event.target.hide.value;
        let hidden = Math.floor(Math.random() * 200);
        let userdata = JSON.parse(localStorage.getItem("profiledetail")) ?? {};
        let data = {
            [hidden]: {
                'name': name,
                'phone': phone,
                'email': email,
                'location': location
            }
        };
        Object.assign(userdata, data);
        localStorage.setItem("profiledetail", JSON.stringify(userdata));
    });
};

let displayrecord = () => {
    let userdata = JSON.parse(localStorage.getItem("profiledetail")) ?? [];
    let data = "";
    for (let key in userdata) {
        // console.log(userdata[key]);
        data += `
        <tr>
        <td>${userdata[key].name}</td>
        <td>${userdata[key].phone}</td>
        <td>${userdata[key].email}</td>
        <td>${userdata[key].location}</td>
        <td><a href="email.html?key=${key}"><img src="images/Frame 103.png" onclick="userdisplay()"></a></td>
        <td><a href="#"><img src="images/Delete.png" onclick="removedata(${key})"></a></td>
       </tr>`
    };
    if (tbody) {
        tbody.innerHTML = data;
    }

};

let removedata = (index) => {
    let userdata = JSON.parse(localStorage.getItem("profiledetail")) ?? {};
    delete userdata[index];
    localStorage.setItem("profiledetail", JSON.stringify(userdata));
    displayrecord();
};

displayrecord();

function searchparams() {
    const queryString = window.location.search;
    // console.log(new URLSearchParams(window.location.search));
    const urlParams = new URLSearchParams(queryString);
    const Key = urlParams.getAll("key");
    let singleUser = JSON.parse(localStorage.getItem("profiledetail")) ?? {};
    User.innerText = singleUser[Key].name;
    Phone.innerText = singleUser[Key].phone;
    Email.innerText = singleUser[Key].email;
    location.innerText = singleUser[Key].location;
};

function FilterFunction() {
    let inputfield = document.getElementById("Inputvalue").value.toUpperCase();
    let tabel = document.getElementById("Table-content");
    let tr = tabel.getElementsByTagName("tr");
    let selectvalue = document.getElementById("search-option").value;

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        let td1 = tr[i].getElementsByTagName("td")[1];
        let location = tr[i].getElementsByTagName("td")[3];
        if (td && td1 && location) {
            txtValue = td.innerText;
            txtValue1 = td1.innerText;
            locationValue = location.innerText;
            if (
                ((txtValue.toUpperCase().indexOf(inputfield) > -1)
                    || (txtValue1.toUpperCase().indexOf(inputfield) > -1)) &&
                (locationValue.toUpperCase() === selectvalue || selectvalue === "ALL")
            ) {
                tr[i].style.display = "";

            } else {
                tr[i].style.display = "none";
            }
        }
    };
};

function searchFunc() {
    let fieldValue = document.getElementById("searchByPhone").value;
    let tablebody = document.getElementById("Table-content");
    let tableRow = tablebody.getElementsByTagName("tr");
    for (let index = 1; index < tableRow.length; index++) {
        let storeitem = tableRow[index].getElementsByTagName("td")[1]
        if (storeitem) {
            product = storeitem.innerHTML;
            if (product.indexOf(fieldValue) > -1) {
                tableRow[index].style.display = "";
            }
            else {
                tableRow[index].style.display = "none"
            }
        }
    }


};

function sorting() {
    let x, y, switching, i;
    let table = document.getElementById("Table-content");
    let rows = table.rows;
    let conditon = true;
    while (conditon) {
        conditon = false;
        for (i = 1; i < rows.length - 1; i++) {
            switching = false;
            x = rows[i].getElementsByTagName("td")[1];
            y = rows[i + 1].getElementsByTagName("td")[1];

            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                switching = true;
                break;
            }
        }
        if (switching) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            conditon = true;
        }
    }
};

function SortinDescending() {
    let x, y, switching, i;
    let table = document.getElementById("Table-content");
    let rows = table.rows;
    let conditon = true;
    while (conditon) {
        conditon = false;
        for (i = 1; i < rows.length - 1; i++) {
            switching = false;
            x = rows[i].getElementsByTagName("td")[1];
            y = rows[i + 1].getElementsByTagName("td")[1];

            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                z = true;
                break;
            }
        }
        if (z) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            conditon = true;
        }
    }
};


let pageUl = document.querySelector(".pagination");
let itemShow = document.querySelector("#itemperpage");
let tr = document.getElementsByTagName("tr");
let emptyBox = [];
let index = 1;
let itemPerPage = 5;

for (let i = 0; i < tr.length; i++) { emptyBox.push(tr[i]); }

itemShow.onchange = giveTrPerPage;
function giveTrPerPage() {
    itemPerPage = Number(this.value);
    // console.log(itemPerPage);
    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);
}

function displayPage(limit) {
    tbody.innerHTML = '';
    for (let i = 0; i < limit; i++) {
        tbody.appendChild(emptyBox[i]);

    }
    const pageNum = pageUl.querySelectorAll('.list');
    pageNum.forEach(n => n.remove());
}
displayPage(itemPerPage);

function pageGenerator(getem) {
    const num_of_tr = emptyBox.length;
    if (num_of_tr <= getem) {
        pageUl.style.display = 'none';
    } else {
        pageUl.style.display = 'flex';
        const num_Of_Page = Math.ceil(num_of_tr / getem);
        for (i = 1; i <= num_Of_Page; i++) {
            const li = document.createElement('li'); li.className = 'list';
            const a = document.createElement('a'); a.href = '#'; a.innerText = i;
            a.setAttribute('data-page', i);
            li.appendChild(a);
            pageUl.insertBefore(li, pageUl.querySelector('.next'));
        }
    }
}
pageGenerator(itemPerPage);
let pageLink = pageUl.querySelectorAll("a");
let lastPage = pageLink.length - 2;

function pageRunner(page, items, lastPage, active) {
    for (button of page) {
        button.onclick = e => {
            const page_num = e.target.getAttribute('data-page');
            const page_mover = e.target.getAttribute('id');
            if (page_num != null) {
                index = page_num;

            } else {
                if (page_mover === "next") {
                    index++;
                    if (index >= lastPage) {
                        index = lastPage;
                    }
                } else {
                    index--;
                    if (index <= 1) {
                        index = 1;
                    }
                }
            }
            pageMaker(index, items, active);
        }
    }

}
var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
pageRunner(pageLink, itemPerPage, lastPage, pageLi);

function getpagElement(val) {
    let pagelink = pageUl.querySelectorAll("a");
    let lastpage = pagelink.length - 2;
    let pageli = pageUl.querySelectorAll('.list');
    pageli[0].classList.add("active");
    pageRunner(pagelink, val, lastpage, pageli);

}

function pageMaker(index, item_per_page, activePage) {
    const start = item_per_page * index;
    const end = start + item_per_page;
    const current_page = emptyBox.slice((start - item_per_page), (end - item_per_page));
    tbody.innerHTML = "";
    for (let j = 0; j < current_page.length; j++) {
        let item = current_page[j];
        tbody.appendChild(item);
    }
    Array.from(activePage).forEach((e) => { e.classList.remove("active"); });
    activePage[index - 1].classList.add("active");
}

// https://www.sitepoint.com/simple-pagination-html-css-javascript/