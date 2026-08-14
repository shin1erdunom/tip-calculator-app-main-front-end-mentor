const billInput = document.querySelector('#bills');
const customInput = document.querySelector('#custom');
const peopleInput = document.querySelector('#people');
const buttons = document.querySelectorAll('.tips button');
const resetBtn = document.querySelector('.reset-btn');
const span = document.querySelector('span');

let currentTip = 0;

function messageError(){
    const numpeople = parseInt(peopleInput.value);
    if(peopleInput.value === '' || numpeople === 0){
        span.style.display = 'block';
        peopleInput.classList.add('disactive');
    }else{
        span.style.display = 'none';
        peopleInput.classList.remove('disactive');
    }
}

function verifierReset() {
  if (billInput.value === '' && customInput.value === '' && peopleInput.value === '') {
    resetBtn.classList.remove('active');
    resetBtn.disable = false;
  } else {
    resetBtn.classList.add('active');
  }
}

resetBtn.addEventListener('click', function() {
  billInput.value = '';
  customInput.value = '';
  peopleInput.value = '';

  document.querySelector('.tip-amount-person').textContent = '0.00';
  document.querySelector('.total-person').textContent = '0.00';

  currentTip = 0;
  buttons.forEach(b => b.classList.remove('active'));

  verifierReset();
});

function calculerTip(tip) {
  currentTip = tip;
  const bill = parseFloat(billInput.value);
  const numpeople = parseInt(peopleInput.value);

  if (isNaN(bill) || isNaN(tip) || isNaN(numpeople) || numpeople <= 0) {
    return;
  }

  const tipAmount = (bill * tip) / 100;
  const tipAmountPerson = tipAmount / numpeople;
  const total = bill / numpeople;
  const totalperson = total + tipAmountPerson;

  document.querySelector('.tip-amount-person').textContent = tipAmountPerson.toFixed(2);
  document.querySelector('.total-person').textContent = totalperson.toFixed(2);
}

buttons.forEach(btn => {
  btn.addEventListener('click', function() {
    calculerTip(parseFloat(this.value));
    verifierReset();
    messageError();
  });
});

customInput.addEventListener('input', function() {
  calculerTip(parseFloat(this.value));
  verifierReset();
  messageError();
});
peopleInput.addEventListener('input', function() {
  verifierReset();
  messageError();
});

billInput.addEventListener('input', verifierReset);
