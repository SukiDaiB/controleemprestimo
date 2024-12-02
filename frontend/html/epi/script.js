    async function fetchColaboradores() {
        try {
            const response = await fetch('http://localhost:3003/itens');
            const data = await response.json();
            console.log(data)
            const tabela = document.getElementById('tabela');
            console.log(tabela)
            tabela.innerHTML = ''; // Clear existing rows

            data.forEach(itens => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${itens.name}</td>
                    <td>${itens.name}</td>
                    <td>${itens.itemType.name}</td>
                    <td>${itens.name}</td>
                `;
                tabela.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data when the page loads
    document.addEventListener('DOMContentLoaded', fetchColaboradores);

//Carrega os Tipos de Item
async function carregarTiposDeItem() {
    try {
        const response = await fetch('http://localhost:3003/tipos_item');
        if (!response.ok) throw new Error('Erro ao carregar tipos de item');

        const tipos = await response.json();
        const tipoItemSelect = document.getElementById('tipoitem');
        
        // Limpar as opções anteriores e adicionar a opção padrão
        tipoItemSelect.innerHTML = '<option selected>Selecione o tipo de item</option>';
        
        // Inserir cada tipo como uma opção no select
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.name;
            tipoItemSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Chama a função quando a página é carregada
window.onload = function(){
    carregarTiposDeItem();
}