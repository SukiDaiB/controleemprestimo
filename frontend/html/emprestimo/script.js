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
