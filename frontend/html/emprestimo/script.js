async function fetchColaboradores() {
    try {
        const response = await fetch('http://localhost:3003/emprestimos');
        const data = await response.json();
        console.log(data)
        const tabela = document.getElementById('tabela');
        console.log(tabela)
        tabela.innerHTML = ''; // Clear existing rows

        data.forEach(emprestimos => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emprestimos.pessoa.name}</td>
                <td>${emprestimos.usuario.username}</td>
                <td>${emprestimos.item.name}</td>
                <td>${emprestimos.dataEmprestimo}</td>
                <td>${emprestimos.dataDevolucao}</td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

    // Fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchColaboradores);
async function carregarTiposDeItem() {
    try {
        const response = await fetch('http://localhost:3003/pessoas');
        if (!response.ok) throw new Error('Erro ao carregar tipos de item');
    
        const tipos = await response.json();
        const tipoItemSelect = document.getElementById('usuario');
            
        // Limpar as opções anteriores e adicionar a opção padrão
        tipoItemSelect.innerHTML = '<option selected>Selecione o colaborador</option>';
        
        // Inserir cada tipo como uma opção no select
        tipos.forEach(colaborador => {
            const option = document.createElement('option');
            option.value = colaborador.id;
            option.textContent = colaborador.name;
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

document.addEventListener('DOMContentLoaded', fetchColaboradores);
async function carregarTiposDeItem() {
    try {
        const response = await fetch('http://localhost:3003/itens');
        if (!response.ok) throw new Error('Erro ao carregar tipos de item');
    
        const tipos = await response.json();
        const tipoItemSelect = document.getElementById('item');
            
        // Limpar as opções anteriores e adicionar a opção padrão
        tipoItemSelect.innerHTML = '<option selected>Selecione o EPI</option>';
        
        // Inserir cada tipo como uma opção no select
        tipos.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
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