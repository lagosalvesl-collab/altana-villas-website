// Scroll para seção de Reservas
function scrollToReserva() {
    const element = document.getElementById('reserva');
    element.scrollIntoView({ behavior: 'smooth' });
}

// Abrir modal de galeria
function abrirGaleria(element) {
    const modal = document.getElementById('galeraModal');
    const image = element.querySelector('.galeria-image').textContent;
    const caption = element.querySelector('p').textContent;
    
    document.getElementById('modalImage').textContent = image;
    document.getElementById('modalCaption').textContent = caption;
    
    modal.style.display = 'block';
}

// Fechar modal de galeria
function fecharGaleria() {
    const modal = document.getElementById('galeraModal');
    modal.style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('galeraModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Abrir formulário de reserva com tipo de quarto pré-selecionado
function abrirReserva(tipoQuarto) {
    document.getElementById('tipo-quarto').value = tipoQuarto;
    scrollToReserva();
}

// Enviar formulário de reserva
function enviarReserva(event) {
    event.preventDefault();
    
    // Coletar dados do formulário
    const tipoQuarto = document.getElementById('tipo-quarto').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const adultos = document.getElementById('adultos').value;
    const criancas = document.getElementById('criancas').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const pais = document.getElementById('pais').value;
    const observacoes = document.getElementById('observacoes').value;
    
    // Validação básica
    if (!tipoQuarto || !checkin || !checkout || !nome || !email || !telefone) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Validar datas
    const dataCheckin = new Date(checkin);
    const dataCheckout = new Date(checkout);
    
    if (dataCheckout <= dataCheckin) {
        alert('A data de checkout deve ser posterior à data de check-in!');
        return;
    }
    
    // Calcular noites
    const umDia = 24 * 60 * 60 * 1000;
    const noites = Math.round((dataCheckout - dataCheckin) / umDia);
    
    // Preparar mensagem
    const mensagem = `
    ===== NOVA RESERVA ALTANA CLIFFSIDE VILLAS =====
    
    TIPO DE QUARTO: ${tipoQuarto}
    
    CHECK-IN: ${new Date(checkin).toLocaleDateString('pt-BR')}
    CHECK-OUT: ${new Date(checkout).toLocaleDateString('pt-BR')}
    NOITES: ${noites}
    
    HOSPEDES:
    - Adultos: ${adultos}
    - Crianças: ${criancas}
    
    DADOS PESSOAIS:
    - Nome: ${nome}
    - Email: ${email}
    - Telefone: ${telefone}
    - País: ${pais}
    
    OBSERVACOES:
    ${observacoes || 'Nenhuma observação'}
    
    ================================================
    `;
    
    // Simular envio (em produção, isso seria enviado para um servidor)
    console.log(mensagem);
    
    // Mostrar confirmação
    alert(`Reserva submetida com sucesso!\n\nTipo de Quarto: ${tipoQuarto}\nNoites: ${noites}\n\nEm breve você receberá um email de confirmação em ${email}`);
    
    // Limpar formulário
    document.querySelector('.reserva-form').reset();
    
    // Aqui você poderia fazer um fetch para um servidor:
    // fetch('/api/reservas', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         tipoQuarto,
    //         checkin,
    //         checkout,
    //         adultos,
    //         criancas,
    //         nome,
    //         email,
    //         telefone,
    //         pais,
    //         observacoes
    //     })
    // }).then(response => response.json())
    //   .then(data => console.log('Sucesso:', data))
    //   .catch(error => console.error('Erro:', error));
}

// Definir data mínima de check-in como hoje
window.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').min = hoje;
    document.getElementById('checkout').min = hoje;
    
    // Atualizar data mínima de checkout quando check-in mudar
    document.getElementById('checkin').addEventListener('change', function() {
        document.getElementById('checkout').min = this.value;
    });
});

// Navegação suave ao rolar a página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});