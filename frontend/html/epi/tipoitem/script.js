    async function fetchColaboradores() {
        try {
            const response = await fetch('http://localhost:3003/tipos_item');
            const data = await response.json();
            console.log(data)
            const tabela = document.getElementById('tabela');
            console.log(tabela)
            tabela.innerHTML = ''; // Clear existing rows

            data.forEach(tipos_item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${tipos_item.name}</td>
                `;
                tabela.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data when the page loads
    document.addEventListener('DOMContentLoaded', fetchColaboradores);
