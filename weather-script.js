// Weather Dashboard API
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Elementos do DOM
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const content = document.getElementById('content');

// Inicializar com a cidade padrão
window.addEventListener('DOMContentLoaded', function() {
    buscarCidade();
    
    // Permitir busca com Enter
    if (cityInput) {
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarCidade();
            }
        });
    }
});

// Buscar cidade pelo input
function buscarCidade() {
    const city = cityInput.value.trim();
    if (city) {
        obterDadosClima(city);
    }
}

// Buscar cidade rápida
function buscarCidadeRapida(city) {
    cityInput.value = city;
    obterDadosClima(city);
}

// Obter dados de clima da API
function obterDadosClima(city) {
    mostrarLoading(true);
    esconderErro();

    // URL da API
    const url = `${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })
        .then(data => {
            preencherDadosAtual(data);
            obterPrevisao(data.coord.lat, data.coord.lon);
            mostrarLoading(false);
            mostrarConteudo(true);
        })
        .catch(err => {
            mostrarErro('Erro ao buscar dados: ' + err.message);
            mostrarLoading(false);
            mostrarConteudo(false);
        });
}

// Preencher dados de clima atual
function preencherDadosAtual(data) {
    // Cidade e descrição
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    
    // Temperatura
    document.getElementById('temp').textContent = Math.round(data.main.temp) + '°C';
    document.getElementById('feels-like').textContent = `(Sensação térmica: ${Math.round(data.main.feels_like)}°C)`;
    
    // Detalhes
    document.getElementById('humidity').textContent = data.main.humidity + '%';
    document.getElementById('windSpeed').textContent = Math.round(data.wind.speed * 3.6) + ' km/h';
    document.getElementById('windDegree').textContent = data.wind.deg + '°';
    document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
    document.getElementById('visibility').textContent = (data.visibility / 1000).toFixed(1) + ' km';
    document.getElementById('clouds').textContent = data.clouds.all + '%';
    
    // Temperaturas Min/Max
    document.getElementById('minTemp').textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
    document.getElementById('maxTemp').textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
    
    // Calcular percentual para a barra de temperatura
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const range = maxTemp - minTemp || 1;
    
    const minTempBar = document.getElementById('minTempBar');
    const maxTempBar = document.getElementById('maxTempBar');
    
    if (minTempBar) minTempBar.style.width = ((minTemp - minTemp) / range) * 100 + '%';
    if (maxTempBar) maxTempBar.style.width = ((maxTemp - minTemp) / range) * 100 + '%';
    
    // Nascer e Pôr do Sol
    document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Coordenadas
    document.getElementById('coordinates').textContent = `Lat: ${data.coord.lat.toFixed(2)}, Lon: ${data.coord.lon.toFixed(2)}`;
    
    // Fuso horário
    document.getElementById('timezone').textContent = `UTC${data.timezone > 0 ? '+' : ''}${Math.round(data.timezone / 3600)}`;
    
    // Ícone do clima
    atualizarIconeClima(data.weather[0].main);
}

// Atualizar ícone do clima
function atualizarIconeClima(main) {
    let icon = 'SUN';
    switch(main.toLowerCase()) {
        case 'clear':
            icon = 'SUNNY';
            break;
        case 'clouds':
            icon = 'CLOUDY';
            break;
        case 'rain':
            icon = 'RAINY';
            break;
        case 'drizzle':
            icon = 'DRIZZLE';
            break;
        case 'thunderstorm':
            icon = 'THUNDER';
            break;
        case 'snow':
            icon = 'SNOW';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            icon = 'FOG';
            break;
    }
    const weatherIcon = document.getElementById('weatherIcon');
    if (weatherIcon) weatherIcon.textContent = icon;
}

// Obter previsão de 5 dias
function obterPrevisao(lat, lon) {
    const url = `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            preencherPrevisao(data.list);
        })
        .catch(err => console.error('Erro ao buscar previsão:', err));
}

// Preencher previsão
function preencherPrevisao(forecastList) {
    const forecastGrid = document.getElementById('forecastGrid');
    if (!forecastGrid) return;
    
    forecastGrid.innerHTML = '';
    
    // Obter uma previsão por dia (a cada 8 períodos = 24 horas)
    const previsaoPorDia = {};
    
    forecastList.forEach(item => {
        const data = new Date(item.dt * 1000);
        const dia = data.toLocaleDateString('pt-BR');
        
        // Pegar apenas uma previsão por dia (a do meio-dia)
        if (!previsaoPorDia[dia] || data.getHours() === 12) {
            previsaoPorDia[dia] = item;
        }
    });
    
    // Exibir apenas 5 dias
    Object.values(previsaoPorDia).slice(0, 5).forEach(item => {
        const data = new Date(item.dt * 1000);
        const diaAtual = new Date();
        const ehHoje = data.toDateString() === diaAtual.toDateString();
        const diaSemana = ehHoje ? 'Hoje' : data.toLocaleDateString('pt-BR', { weekday: 'short' });
        
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast-item';
        forecastDiv.innerHTML = `
            <div class="forecast-day">${diaSemana}</div>
            <div class="forecast-icon">${getEmoji(item.weather[0].main)}</div>
            <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            <div class="forecast-desc">${item.weather[0].description}</div>
        `;
        forecastGrid.appendChild(forecastDiv);
    });
}

// Obter emoji para o tipo de clima
function getEmoji(main) {
    switch(main.toLowerCase()) {
        case 'clear':
            return 'SUN';
        case 'clouds':
            return 'CLOUD';
        case 'rain':
            return 'RAIN';
        case 'drizzle':
            return 'DRIZZLE';
        case 'thunderstorm':
            return 'THUNDER';
        case 'snow':
            return 'SNOW';
        default:
            return 'FOG';
    }
}

// Mostrar/Esconder Loading
function mostrarLoading(show) {
    if (loading) loading.style.display = show ? 'block' : 'none';
}

// Mostrar/Esconder Conteúdo
function mostrarConteudo(show) {
    if (content) content.style.display = show ? 'block' : 'none';
}

// Mostrar Erro
function mostrarErro(mensagem) {
    if (error) {
        error.textContent = mensagem;
        error.style.display = 'block';
    }
}

// Esconder Erro
function esconderErro() {
    if (error) error.style.display = 'none';
}