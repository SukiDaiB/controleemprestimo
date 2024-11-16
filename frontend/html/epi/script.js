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
