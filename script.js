//Home

// Função para formatar números como moeda
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para converter string para número
function parseCurrency(value) {
    return parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.').trim());
}

// Atualiza o saldo disponível
function updateAvailableBalance() {
    const salary = parseCurrency(localStorage.getItem('salary') || 'R$ 0,00');
    const savings = parseCurrency(localStorage.getItem('savings') || 'R$ 0,00');
    const expenses = parseCurrency(localStorage.getItem('expenses') || 'R$ 0,00');

    const availableBalance = salary - savings - expenses;
    document.querySelector('#available-balance').textContent = formatCurrency(availableBalance);
}

// Alterna a exibição da caixa de edição
function toggleEdit(id) {
    const editForm = document.querySelector(`#edit-${id}`);
    const isVisible = editForm.style.display === 'block';

    // Fecha todos os outros formulários
    document.querySelectorAll('.edit-form').forEach(form => {
        form.style.display = 'none';
    });

    // Alterna o formulário clicado
    if (isVisible) {
        editForm.style.display = 'none';
    } else {
        editForm.style.display = 'block';
    }
}

// Salva o valor editado somando ou subtraindo do valor anterior
function saveEdit(id) {
    const editForm = document.querySelector(`#edit-${id}`);
    const input = editForm.querySelector('input:not(#expense-description)'); // Pega o campo de valor
    const descriptionInput = editForm.querySelector('#expense-description'); // Pega o campo de descrição
    const saldoBox = document.querySelector(`#${id}`);

    const currentValue = parseCurrency(localStorage.getItem(id) || 'R$ 0,00');
    const editValue = parseCurrency(input.value);

    // Se o valor digitado for positivo, soma. Se for negativo, subtrai.
    const newValue = currentValue + editValue;

    // Atualiza o valor exibido na caixa
    saldoBox.textContent = formatCurrency(newValue);

    // Atualiza o valor no localStorage
    localStorage.setItem(id, formatCurrency(newValue));

    // Oculta o formulário de edição
    editForm.style.display = 'none';

    // Limpa o campo de input e descrição após salvar
    input.value = '';
    descriptionInput.value = '';

    // Atualiza o saldo disponível
    updateAvailableBalance();
}

// Lida com a tecla "Enter" para salvar diretamente
function handleKeyPress(event, id) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão do Enter
        saveEdit(id);
    }
}

function clearPlaceholder(input) {
    if (input.value === input.placeholder) {
        input.value = '';
    }
}

function restorePlaceholder(input, placeholder) {
    if (input.value === '') {
        input.value = placeholder;
    }
}

// Inicializa os valores na página
function initializeValues() {
    const ids = ['salary', 'savings', 'expenses'];
    ids.forEach(id => {
        const storedValue = localStorage.getItem(id) || 'R$ 0,00';
        document.querySelector(`#${id}`).textContent = storedValue;
    });

    updateAvailableBalance();
}

// Chama a função de inicialização quando a página é carregada
window.onload = initializeValues;


// Função para reiniciar o mês
function restartMonth() {
    // Confirmação do usuário
    if (confirm('Tem certeza de que deseja reiniciar os valores para o novo mês?')) {
        // Limpa os valores do localStorage
        localStorage.removeItem('salary');
        localStorage.removeItem('savings');
        localStorage.removeItem('expenses');

        // Redefine os valores na página
        document.querySelector('#salary').textContent = 'R$ 0,00';
        document.querySelector('#savings').textContent = 'R$ 0,00';
        document.querySelector('#expenses').textContent = 'R$ 0,00';

        // Atualiza o saldo disponível
        updateAvailableBalance();
    }
}


//Login

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const firstAccessButton = document.querySelector('.first-access-button');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário
        window.location.href = 'home.html'; // Redireciona para a página inicial
    });

    firstAccessButton.addEventListener('click', function() {
        window.location.href = 'cadastro.html'; // Redireciona para a página de cadastro
    });
});

