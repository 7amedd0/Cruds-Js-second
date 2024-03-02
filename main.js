let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'creat';
let tmp;
// get total
function getTotal(){
if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value) 
    - +discount.value ;
    total.innerHTML = result;
    total.style.background = 'green';
}
else{
    total.innerHTML = '';
    total.style.background = 'red';
}
}
// creat product
let dataproduct;
if(localStorage.product != null){
    dataproduct = JSON.parse(localStorage.product)
}else{
    dataproduct = [''];
}
submit.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(mood==='creat'){
        if(newProduct.count > 1){
            for(i =0 ; i < newProduct.count ; i++){
                dataproduct.push(newProduct);
            }
        }else{
            dataproduct.push(newProduct);
        }
    }else{
        dataproduct[tmp] = newProduct;
mood = 'creat';
submit.innerHTML = 'Create';
count.style.display ='block';
    }
    dataproduct.push(newProduct);
    // save localstorage
    localStorage.setItem('product',JSON.stringify(dataproduct));
    clearData()
     showData()
   // clear inputs
   function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
   }
   // read
   function showData(){
    getTotal();
    let table ='';
    for(i = 0 ; i < dataproduct.length ; i++){
        table += `
        <tr>
                        <td>${i}</td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].taxes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
                }
                document.getElementById('tbody').innerHTML = table;
                let btnDelete = document.getElementById('delAll');
                if(dataproduct.length > 0){
                    delAll.innerHTML = 
                    `<button onclick="deleteall()">Delete All</button>`;
                }
                else{
                    btnDelete.innerHTML = '';
                }
            }
            showData();
        }
        // delete
function deleteData (i)
{
dataproduct.splice(i,1);
localStorage.product = JSON.stringify(dataproduct);
showData()
}
function deleteall(){
    localStorage.clear()
    dataproduct.splice(0)
    showData()
}
 //count
 
 
 
 
 
 
 // update

function updateData(i){
    title.value =  dataproduct[i].title;
    price.value =  dataproduct[i].price;
    taxes.value =  dataproduct[i].taxes;
    ads.value =  dataproduct[i].ads;
    discount.value =  dataproduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value =  dataproduct[i].category;
    submit.innerHTML=('update');
mood ='update';
tmp = i;
scroll({
    top:0,
    behavior:'smooth'
})
};
// search 
let searchmood = 'title' ;
function getSearchMood(id) {
    let search =document.getElementById('search');
    if(id == 'searchtitle'){
searchmood ='title';
search.placeholder ='Search By Title';

    }else{
       searchmood = 'category';
        search.placeholder = 'Search By category';
    }
search.focus()
}
function searchData(value) {
    if(searchmood == 'title'){
        for(let i=0 ; i <dataproduct.length;i++){
            if(dataproduct[i].title.includes(value)){
                console.log(i)
            }
            
        }

    }

}