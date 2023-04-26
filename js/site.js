/// GET VALUES FROM USER?! ID?! HTML?!
/// TERMS = MONTHS
function getValues() {
  let loanAmount = document.getElementById("loanA").value;
  let loanTerm = document.getElementById("loanT").value;
  let loanRate = document.getElementById("loanR").value;

  /// TURN INPUT / VALUES TO NUMBERS?!
  loanAmount = Number(loanAmount);
  loanTerm = parseInt(loanTerm);
  loanRate = parseInt(loanRate);
  loanRate = calcRate(loanRate);

  /// CALCULATE PAYMENT?!
  let paymentCost = calcPayment(loanAmount, loanRate, loanTerm);

  /// RETURN PAYMENT LIST
  let payments = getPayments(loanAmount, loanRate, loanTerm, paymentCost);

  /// DISPLAY
  displayData(payments, loanAmount, paymentCost);
}

//-----------------------------------------------

/// CALCULATE PAYMENT FOR LOAN?!
function calcPayment(amount, rate, term) {
  return (amount * rate) / (1 - Math.pow(1 + rate, -term));
}

//-----------------------------------------------

/// CALCULATE INTEREST OF CURRENT BALANCE
function calcInterest(balance, rate) {
  return balance * rate;
}

//-----------------------------------------------

// Convert Rate to Monthly Interest Rate?!
function calcRate(rate) {
  return rate / 1200;
}

//-----------------------------------------------

/// Calculated the Stuff First?!
/// Setting Payments in Array?!
/// Do Math?! Etc.?!

function getPayments(amount, rate, term, monthlyPayment) {
  let payments = [];
  let balance = amount;
  let totalInterest = 0;
  let monthlyPrincipal = 0;
  let monthlyInterest = 0;

  /// Start; End; Increment?!
  for (let month = 1; month <= term; month++) {
    monthlyInterest = calcInterest(balance, rate);
    totalInterest += monthlyInterest;
    monthlyPrincipal = monthlyPayment - monthlyInterest;
    balance = Math.abs(balance - monthlyPrincipal);

    // Add Details of Table?! Data?! Etc.?!
    // Object?! Properties / Property?! Etc.?!
    let currentPayment = {
      month: month,
      monthlyPayment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      totalInterest: totalInterest,
      balance: balance,
    };

    payments.push(currentPayment);
  }

  return payments;
}

//-----------------------------------------------

// DISPLAY DATA?! TABLE / TABLE DATA?!
function displayData(payments, loanAmount, payment) {
  let tableBody = document.getElementById("tableBody");

  let template = document.getElementById("tableTemplate");

  // Clears Table of Previous Data?!
  tableBody.innerHTML = "";

  // Start; End; Incrementation?!
  for (let index = 0; index < payments.length; index++) {
    /// MY TABLE
    let payRow = template.content.cloneNode(true);

    let payCols = payRow.querySelectorAll("td");

    // Table Month # Number?!
    payCols[0].textContent = payments[index].month;

    // Table Payment?!
    payCols[1].textContent = payment.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    // Table Principal?!
    payCols[2].textContent = payments[index].principal.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    // Table Interest?!
    payCols[3].textContent = payments[index].interest.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    // Table Total Interest?!
    payCols[4].textContent = payments[index].totalInterest.toLocaleString(
      "en-us",
      {
        style: "currency",
        currency: "USD",
      }
    );

    // Table Balance?!
    payCols[5].textContent = payments[index].balance.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    // Returns Node?! For Table?! Etc.?!
    tableBody.appendChild(payRow);
  }

  // OVERALL DISPLAY AT TOP RIGHT OF PAGE?!

  let totalInterestBold = payments[payments.length - 1].totalInterest;

  /// Calculate Total Cost?!
  let totalCostBold = Number(loanAmount) + totalInterestBold;

  // Total Principal is Loan Amount
  let totalPrincipalBold = Number(loanAmount);

  // Display Total Principal Bold?!
  let labelPrincipalBold = document.getElementById("totalPrincipalBold");
  labelPrincipalBold.innerHTML = totalPrincipalBold.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Display Total Interest Bold?!
  let labelInterest = document.getElementById("totalInterestBold");
  labelInterest.innerHTML = Number(totalInterestBold).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Display Payment Bold?! "Your Monthly Payments:"?!
  let labelPaymentBold = document.getElementById("paymentBold");
  labelPaymentBold.innerHTML = Number(payment).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Display Total Cost Bold?!
  let labelTotalCostBold = document.getElementById("totalCostBold");
  labelTotalCostBold.innerHTML = Number(totalCostBold).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
