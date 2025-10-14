const noodleTypes = ["醤油", "味噌", "塩", "特製味噌", "辛味噌", "限定・スペシャル"];

const variations = {
  "醤油": ["醤油ラーメン", "醤油つけ麺", "醤油ネギラーメン", "醤油ピリ辛ネギラーメン", "醤油チャーシュー麺", "醤油ネギチャーシュー麺"],
  "味噌": ["味噌ラーメン", "味噌つけ麺", "味噌ネギラーメン", "味噌ピリ辛ネギラーメン", "味噌チャーシュー麺", "味噌ネギチャーシュー麺"],
  "塩": ["塩ラーメン", "塩ネギラーメン", "塩ピリ辛ネギラーメン", "塩チャーシュー麺", "塩ネギチャーシュー麺"],
  "特製味噌": ["特製味噌ラーメン", "特製味噌ネギラーメン", "特製味噌チャーシュー麺", "特製味噌ネギチャーシュー麺"],
  "辛味噌": ["辛味噌ラーメン", "辛味噌つけ麺", "辛味噌ネギラーメン", "辛味噌チャーシュー麺", "辛味噌ネギチャーシュー麺"],
  "限定・スペシャル": ["期間限定ラーメン", "プレミアム醤油とんこつ", "プレミアム塩とんこつ", "ウルトラ激辛ラーメン"]
};

let firmnessStr = ["硬め", "普通", "柔らかめ"];
let fatStr = ["多め", "普通", "少なめ"];
let flavorStr = ["濃いめ", "普通", "薄め"];

let selectedType = null;
let selectedVariation = null;
let selectedFirmness = null;
let selectedFat = null;
let selectedFlavor = null;

function getEarlyDeathFeature() {
  return document.getElementById('earlyDeathToggle').checked;
}

function selectMode(mode) {
  if (mode === 'random') {
    generateRandomOrder();
  } else {
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('manualOrder').classList.remove('hidden');
    displayTypeOptions();
  }
}

function displayTypeOptions() {
  const container = document.getElementById('typeOptions');
  container.innerHTML = '';
  noodleTypes.forEach((type, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = type;
    btn.onclick = () => selectType(index);
    container.appendChild(btn);
  });
}

function selectType(index) {
  selectedType = noodleTypes[index];
  document.querySelectorAll('#typeOptions .option-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });
  document.getElementById('variationSection').classList.remove('hidden');
  displayVariationOptions(selectedType);
}

function displayVariationOptions(type) {
  const container = document.getElementById('variationOptions');
  container.innerHTML = '';
  variations[type].forEach((variation, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = variation;
    btn.onclick = () => selectVariation(variation, index);
    container.appendChild(btn);
  });
}

function selectVariation(variation, index) {
  selectedVariation = variation;
  document.querySelectorAll('#variationOptions .option-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });
  document.getElementById('customSection').classList.remove('hidden');
  displayCustomOptions();
}

function displayCustomOptions() {
  if (getEarlyDeathFeature()) {
    firmnessStr = ["バリカタ", "バリカタ", "バリカタ"];
    fatStr = ["かなり多め", "かなり多め", "かなり多め"];
    flavorStr = ["かなり濃いめ", "かなり濃いめ", "かなり濃いめ"];
  } else {
    firmnessStr = ["硬め", "普通", "柔らかめ"];
    fatStr = ["多め", "普通", "少なめ"];
    flavorStr = ["濃いめ", "普通", "薄め"];
  }

  displayOptions('firmnessOptions', firmnessStr, (i) => { selectedFirmness = i; });
  displayOptions('fatOptions', fatStr, (i) => { selectedFat = i; });
  displayOptions('flavorOptions', flavorStr, (i) => { selectedFlavor = i; });
}

function displayOptions(containerId, options, callback) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn level-btn';
    btn.textContent = option;
    btn.onclick = () => {
      callback(index);
      document.querySelectorAll(`#${containerId} .option-btn`).forEach((b, i) => {
        b.classList.toggle('selected', i === index);
      });
    };
    container.appendChild(btn);
  });
}

function confirmOrder() {
  if (selectedVariation === null || selectedFirmness === null || selectedFat === null || selectedFlavor === null) {
    alert('全ての項目を選択してください');
    return;
  }

  if (getEarlyDeathFeature()) {
    selectedFirmness = 0;
    selectedFat = 0;
    selectedFlavor = 0;
  }

  displayResult();
}

function generateRandomOrder() {
  const typeIndex = Math.floor(Math.random() * noodleTypes.length);
  selectedType = noodleTypes[typeIndex];

  const variationList = variations[selectedType];
  const variationIndex = Math.floor(Math.random() * variationList.length);
  selectedVariation = variationList[variationIndex];

  selectedFirmness = Math.floor(Math.random() * 3);
  selectedFat = Math.floor(Math.random() * 3);
  selectedFlavor = Math.floor(Math.random() * 3);

  if (getEarlyDeathFeature()) {
    selectedFirmness = 0;
    selectedFat = 0;
    selectedFlavor = 0;
  }

  displayResult();
}

function resetOrder() {
  selectedType = null;
  selectedVariation = null;
  selectedFirmness = null;
  selectedFat = null;
  selectedFlavor = null;

  document.getElementById('result').classList.remove('show');
  document.getElementById('modeSelection').style.display = 'block';
  document.getElementById('manualOrder').classList.add('hidden');
  document.getElementById('variationSection').classList.add('hidden');
  document.getElementById('customSection').classList.add('hidden');
}

function displayResult() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2 style="margin-bottom: 20px; font-size: 24px;">お待たせいたしました！</h2>
    <p style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">${selectedVariation}</p>
    <p>麺の硬さ: ${firmnessStr[selectedFirmness]}</p>
    <p>脂の量: ${fatStr[selectedFat]}</p>
    <p>味の濃さ: ${flavorStr[selectedFlavor]}</p>
    <p style="margin-top: 20px; font-size: 22px;">ごゆっくりどうぞ！</p>
    <button class="reset-btn" onclick="resetOrder()" style="width: 100%;">最初に戻る</button>
  `;
  resultDiv.classList.add('show');
  document.getElementById('modeSelection').style.display = 'none';
  document.getElementById('manualOrder').classList.add('hidden');
}
