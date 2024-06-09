let select1 = document.querySelector('.fromBox select')
let select2 = document.querySelector('.toBox select');
let fromcurr = select1.value;
let tocurr = select2.value;
let result = document.querySelector(".result")
result.innerText = "Fetching Rate......."
let selectAll = document.querySelectorAll(".select")

let btn = document.querySelector(".btn")

for (let select of selectAll) {
    for (code in countryList) {
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        
        if (select.name === "from" && code === "USD") {
            option.selected = "Selected"
        }
        else if (select.name === "to" && code === "INR") {
            option.selected = "selected";
        }
        select.append(option)
        
        
    }  
    select.addEventListener("change", (value,) => {
        
        updateFlag(value.target)
        
    })
}

function updateFlag(elem) {
    
    let Currcode = elem.value;
    console.log(Currcode)
    
    let countryCode = countryList[Currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    
    let img = elem.parentElement.querySelector(".img");
    img.src = newSrc;

}





let i = document.querySelector(".containor i")
i.addEventListener("click",()=>{
        console.log("Clicked")
    let exchange = select1.value;
    select1.value = select2.value;
    select2.value = exchange;
    
    console.log(select1.value)
    console.log(select2.value)

    let img1 = select1.parentElement.querySelector(".img");
    console.log(img1)
    let select1img = `https://flagsapi.com/${countryList[select1.value]}/flat/64.png`;
    img1.src = select1img;
    let img2 = select2.parentElement.querySelector(".img");
    console.log(img2)
    let select2img = `https://flagsapi.com/${countryList[select2.value]}/flat/64.png`;
    img2.src = select2img;
    updateCurrencyRate()
  
})    

window.addEventListener("load",()=>{
    updateCurrencyRate()
})

let updateCurrencyRate = async () => {
    let amount = document.querySelector(".input input")
    let amtval = amount.value;
  
    let url = `https://open.er-api.com/v6/latest/${select1.value}`;
    if (amtval == "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }    
    
    let response = await fetch(url);
    
    let data = await response.json();
    
    data.rates[select1.value] = amtval;
    let inptamt = data.rates[select1.value];
    let ttlamt = inptamt * data.rates[select2.value];
    let result = document.querySelector(".result")
    result.innerText = `${inptamt} ${select1.value} = ${ttlamt} ${select2.value}`
    select1.value.style.fontWeight = "900";
    
}    


btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    updateCurrencyRate();
})    






