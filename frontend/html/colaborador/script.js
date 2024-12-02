    async function fetchColaboradores() {
        try {
            const response = await fetch('http://localhost:3003/pessoas');
            const data = await response.json();
            console.log(data)
            const tabela = document.getElementById('tabela');
            console.log(tabela)
            tabela.innerHTML = ''; // Clear existing rows

            data.forEach(pessoas => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pessoas.name}</td>
                    <td>${pessoas.document}</td>
                    <td><button class="btn btn-warning me-2">Editar</button>
                    <button class="btn btn-danger">Excluir</button></td>
                `;
                tabela.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data when the page loads
    document.addEventListener('DOMContentLoaded', fetchColaboradores);
