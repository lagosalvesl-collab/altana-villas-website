# Altana Cliffside Villas - Website Completo

Um site profissional e responsivo para a villa de luxo Altana Cliffside Villas em Santorini, Grécia.

## Arquivos do Projeto

### 1. **index.html** - Site Principal da Villa
- Página inicial com hero section
- Seção de localização com mapa integrado
- Catálogo completo de tipos de quartos/villas
- Galeria de fotos interativa
- Lista de comodidades principais
- Avaliações de hóspedes com nota 9.9/10
- Formulário de reserva com validação
- Footer com informações de contato

### 2. **style.css** - Estilos do Site Principal
- Design responsivo e moderno
- Cores e temas coordenados
- Animações suaves
- Layout grid e flexbox
- Media queries para mobile

### 3. **script.js** - Funcionalidades do Site
- Gestão de modal de galeria
- Navegação suave entre seções
- Validação de formulário de reserva
- Cálculo de noites de hospedagem
- Armazenamento de dados de reserva

### 4. **weather-dashboard.html** - Dashboard de Clima
- Interface de busca de cidades
- Exibição de clima atual
- Detalhes meteorológicos (umidade, vento, pressão, etc)
- Gráfico de temperatura mín/máx
- Previsão de 5 dias
- Informações de nascer/pôr do sol
- Coordenadas geográficas e fuso horário

### 5. **weather-style.css** - Estilos do Dashboard
- Design moderno com gradientes
- Cards informativos
- Animações de loading
- Layout responsivo

### 6. **weather-script.js** - Funcionalidades do Dashboard
- Integração com OpenWeatherMap API
- Busca de cidades
- Tratamento de erros
- Formatação de dados climáticos

## Como Usar

### 1. Site Principal (Altana Villas)

Abra `index.html` em seu navegador. O site inclui:
- Navegação completa entre seções
- Busca rápida de tipos de quartos
- Modal de galeria interativa
- Formulário de reserva funcional

### 2. Weather Dashboard

Abra `weather-dashboard.html` e:
1. Substitua `YOUR_OPENWEATHERMAP_API_KEY` pela sua chave da API
2. Digite o nome de uma cidade e clique em "BUSCAR"
3. Ou use os botões de cidades rápidas

## Recursos Principais

### Site Principal
✓ Responsivo em mobile e desktop
✓ Galeria de fotos com modal
✓ Reservas com validação de datas
✓ Navegação suave
✓ Design profissional
✓ Avaliações de clientes
✓ Mapa integrado do Google Maps

### Weather Dashboard
✓ Dados em tempo real
✓ 5 dias de previsão
✓ Múltiplos detalhes meteorológicos
✓ Interface intuitiva
✓ Tratamento de erros
✓ Design moderno

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados e responsivos
- **JavaScript Vanilla** - Interatividade
- **Google Maps API** - Mapa de localização
- **OpenWeatherMap API** - Dados meteorológicos

## Customizações Necessárias

1. **Weather Dashboard**: 
   - Obtenha uma chave em: https://openweathermap.org/api
   - Substitua `YOUR_OPENWEATHERMAP_API_KEY` no arquivo

2. **Google Maps**:
   - A URL do iframe já está configurada para Imerovigli, Santorini
   - Customize conforme necessário

3. **Email de Reservas**:
   - O formulário usa alert() por padrão
   - Configure um endpoint de backend para enviar emails

## Estrutura de Diretórios

```
altana-villas-website/
├── index.html
├── style.css
├── script.js
├── weather-dashboard.html
├── weather-style.css
├── weather-script.js
└── README.md
```

## Suporte à Reserva

O formulário de reserva coleta:
- Tipo de quarto
- Datas (check-in e check-out)
- Número de hóspedes
- Dados pessoais
- Observações especiais

Os dados podem ser enviados para um backend via:
```javascript
fetch('/api/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
})
```

## Autor

Criado com foco em experiência do usuário e design responsivo.

## Licença

Uso livre para o projeto Altana Cliffside Villas.
