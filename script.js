upgradeBox = document.getElementById("upgradeBox");
chemPointsElem = document.getElementById("chemPoints");
cpsElem = document.getElementById("cps");
clickable = document.getElementById("clickable");
chemPoints = 100
clickValue = 1
cps = 0

// templates
upgrades = [
  {
    "name":"Beaker",
    "price":15,
    "cps":.1,
    "clickModifier":1,
    "owned":0,
    "asset":"https://placehold.co/256x256/png"
  },
  {
    "name":"Petri Dish",
    "price":100,
    "cps":10,
    "owned":0,
    "asset":"https://placehold.co/256x256/png"
  }
]

for (upgrade of upgrades) {
  upgradeBox.innerHTML += `
  <div class="upgrade">
    <img src="https://placehold.co/256x256/png" class="upgradeImg"> 
    <div class="upgradeText"> 
      <span class="upgradeTitle">${upgrade["name"]}</span>
      <br>
      <span class="upgradeCost">${upgrade["price"]}cp</span>
      <br>
      <span class="upgradeCPS">${upgrade["cps"]}CPS</span>
      <br>
      <span class="upgradeCPS">${upgrade["clickModifier"]}CPS</span>
    </div> 
  </div>`
}

document.querySelectorAll("#upgradeBox > *").forEach((upg) => upg.onclick = function(){
  index = [...upgradeBox.children].indexOf(upg)
  if (chemPoints >= upgrades[index]["price"]) {
    chemPoints -= upgrades[index]["price"]
    clickValue += typeof upgrades[index]["clickModifier"] != "undefined" ? upgrades[index]["clickModifier"] : 0
    upgrades[index]["price"] = Math.floor(upgrades[index]["price"] * 1.5)
    document.getElementsByClassName("upgradeCost")[index].innerText = `${upgrades[index]["price"]}cp`
    cps += upgrades[index]["cps"]
    cps = Math.round(cps*10)/10
  }
  cpsElem.innerText = cps
})

function gameStep() {
  chemPoints += cps/100
  chemPointsElem.innerText = Math.floor(chemPoints)
}

setInterval(gameStep, 10)

function handleClickableClick(e) {
  chemPoints += clickValue
}

clickable.onclick = handleClickableClick