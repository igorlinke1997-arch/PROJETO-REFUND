
const form = document.querySelector("#expense-form");
const expenseInput = document.querySelector("#expense");
const categoryInput = document.querySelector("#category");
const amountInput = document.querySelector("#amount");

const expenseList = document.querySelector("#expense-list");
const expenseCount = document.querySelector("#expense-count");
const totalAmount = document.querySelector("#total-amount");

const categories = {
  food: "Alimentação",
  accommodation: "Hospedagem",
  services: "Serviços",
  transport: "Transporte",
  others: "Outros"
};

// Despesas de exemplo do curso
let expenses = [
  {
    id: 1,
    name: "Almoço",
    category: "food",
    amount: 87.50
  },
  {
    id: 2,
    name: "Uber",
    category: "transport",
    amount: 25.60
  },
  {
    id: 3,
    name: "Salgadinho",
    category: "food",
    amount: 10.00
  }
];

let nextId = 4;

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Exibir despesas na tela
function renderExpenses() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;

    const item = document.createElement("li");
    item.classList.add("expense");

    // Ícone da categoria
    const icon = document.createElement("img");

    icon.src = `./imagens/${expense.category}.svg`;
    icon.alt = "Ícone da categoria";

    const info = document.createElement("div");
    info.classList.add("expense-info");

    const name = document.createElement("strong");
    name.textContent = expense.name;

    const category = document.createElement("span");
    category.textContent = categories[expense.category];

    info.append(name, category);

    // Valor da despesa
    const amount = document.createElement("span");
    amount.classList.add("expense-amount");

    const currency = document.createElement("small");
    currency.textContent = "R$";

    amount.append(
      currency,
      document.createTextNode(formatCurrency(expense.amount))
    );

    // Botão remover
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("aria-label", "Remover despesa");

    const removeIcon = document.createElement("img");

    removeIcon.src = "./imagens/remove.svg";
    removeIcon.alt = "";
    removeIcon.classList.add("remove-icon");

    removeButton.appendChild(removeIcon);

    removeButton.addEventListener("click", () => {
      expenses = expenses.filter(
        (item) => item.id !== expense.id
      );

      renderExpenses();
    });

    item.append(icon, info, amount, removeButton);
    expenseList.appendChild(item);
  });

  // Atualizar contador
  const count = expenses.length;

  expenseCount.textContent =
    `${count} ${count === 1 ? "despesa" : "despesas"}`;

  // Atualizar total
  totalAmount.innerHTML =
    `<small>R$</small> ${formatCurrency(total)}`;
}

// Converter valor digitado
function parseAmount(value) {
  let cleaned = value.trim().replace(/\s/g, "");

  if (cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  }

  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    return NaN;
  }

  return Number(cleaned);
}

// Adicionar nova despesa
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = expenseInput.value.trim();
  const category = categoryInput.value;
  const amount = parseAmount(amountInput.value);

  if (
    !name ||
    !categories[category] ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const newExpense = {
    id: nextId++,
    name,
    category,
    amount
  };

  expenses.push(newExpense);

  renderExpenses();

  form.reset();
  expenseInput.focus();
});

// Carregar despesas iniciais
renderExpenses();
