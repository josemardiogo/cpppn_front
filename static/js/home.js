template = 'home'

$(document).ready(function () {

    const ctx = document.getElementById('stockChart').getContext('2d');
    const stockChart = new Chart(ctx, {
        type: 'line', // Tipo do gráfico: 'line' para linha
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'], // Rótulos do eixo X
            datasets: [{
                label: 'Preço das Ações (KZ)',
                data: [100, 105, 102, 108, 110], // Dados de variação de preços
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false // Não preencher a área abaixo da linha
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false // Começa o eixo Y em um valor apropriado
                }
            },
            plugins: {
                legend: {
                    display: true, // Mostrar legenda
                }
            }
        }
    });


    const ctxl = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctxl, {
        type: 'bar',
        data: {
            labels: [
                'Janeiro', 'Fevereiro', 'Março', 
                'Abril', 'Maio', 'Junho', 
                'Julho', 'Agosto', 'Setembro', 
                'Outubro', 'Novembro', 'Dezembro'
            ],
            datasets: [{
                label: 'Vendas',
                data: [150, 200, 300, 250, 400, 350, 450, 300, 500, 600, 550, 700], // Dados para cada mês
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)', // Janeiro
                    'rgba(255, 204, 0, 0.6)', // Fevereiro
                    'rgba(0, 0, 0, 0.6)', // Março
                    'rgba(255, 0, 0, 0.6)', // Abril
                    'rgba(255, 204, 0, 0.6)', // Maio
                    'rgba(0, 0, 0, 0.6)', // Junho
                    'rgba(255, 0, 0, 0.6)', // Julho
                    'rgba(255, 204, 0, 0.6)', // Agosto
                    'rgba(0, 0, 0, 0.6)', // Setembro
                    'rgba(255, 0, 0, 0.6)', // Outubro
                    'rgba(255, 204, 0, 0.6)', // Novembro
                    'rgba(0, 0, 0, 0.6)'  // Dezembro
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 204, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 204, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 204, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 204, 0, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 204, 0, 0.8)',
                hoverBorderColor: 'rgba(0, 0, 0, 1)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Vendas: ${tooltipItem.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });

})