// script.js

// Função para adicionar um item ao slot
function addItem(slot) {
    document.getElementById(`file-${slot}`).click();
}

// Função para exibir a imagem selecionada
function displayImage(input, slot) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById(`img-${slot}`).src = e.target.result;
        document.getElementById(`desc-${slot}`).textContent = 'Examinar Item';
    };

    reader.readAsDataURL(file);
}

// Função para editar a descrição do item
function editDescription(slot) {
    const description = prompt('Examine o item:');
    if (description !== null) {
        document.getElementById(`desc-${slot}`).textContent = description;
    }
}

// Função para mostrar detalhes do item
function showItemDetails(slot) {
    const description = document.getElementById(`desc-${slot}`).textContent;
    document.getElementById('item-details').textContent = description;
}

// Função para exibir a imagem do personagem
function displayCharacterImage(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('character-image').src = e.target.result;
    };

    reader.readAsDataURL(file);
}

// Função para atualizar a saúde do personagem
function updateHealth() {
    const healthValue = document.getElementById('health-value').value;
    const healthBar = document.getElementById('health-bar');
    healthBar.style.width = `${healthValue * 10}px`;

    if (healthValue >= 7) {
        healthBar.style.backgroundColor = 'green';
    } else if (healthValue >= 3) {
        healthBar.style.backgroundColor = 'orange';
    } else {
        healthBar.style.backgroundColor = 'red';
    }
}

// Função para calcular e atualizar os pontos de vida
function updateHP() {
    const con = parseInt(document.getElementById('con').value) || 0;
    const tam = parseInt(document.getElementById('tam').value) || 0;
    const totalHP = Math.ceil((con + tam) / 2);
    document.getElementById('total-hp').value = totalHP;
    document.getElementById('health-value').value = totalHP;
    updateHealth();
}

// Adicione event listeners para mostrar detalhes ao clicar em um slot
document.querySelectorAll('.item-slot').forEach(slot => {
    slot.addEventListener('click', (event) => {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {  // Evitar ação ao clicar no campo de munição ou textarea
            const slotId = slot.querySelector('input[type="file"]').id.replace('file-', '');
            showItemDetails(slotId);
        }
    });
});
