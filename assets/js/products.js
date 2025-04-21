document.addEventListener('DOMContentLoaded', function () {
    // Filtro de Produtos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Ativa o botão clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filtra os produtos
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal de Cotação
    const quoteButtons = document.querySelectorAll('.request-quote');
    const modal = document.getElementById('quoteModal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductName = document.getElementById('modalProductName');

    quoteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            modalProductName.textContent = productName;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Formulário de Cotação
    const quoteForm = document.getElementById('quoteForm');

    quoteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const now = new Date();
        const dataHora = now.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour12: false
        });

        const contactMethod = this.querySelector('input[name="contactMethod"]:checked').value;

        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            phone: this.querySelector('#phone').value,
            contactMethod: contactMethod,
            message: this.querySelector('#message').value,
            product: modalProductName.textContent,
            datetime: dataHora
        };
        

        const telegramMessage = `
        🚀 *Nova Solicitação de Cotação*
        📦 *Produto:* ${formData.product}
        👤 *Nome:* ${formData.name}
        📧 *Email:* ${formData.email}
        📞 *Telefone:* ${formData.phone}
        💬 *Preferência de Contato:* ${formData.contactMethod}
        📝 *Mensagem:* ${formData.message}
        📅 *Data/Hora:* ${formData.datetime}
        `;
        

        const telegramBotToken = '7475227542:AAFTYUijexMcu7U0K9jmlrOCm2MzmctQVfA';
        const telegramChatId = '7915265915';

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: telegramMessage,
                parse_mode: 'Markdown'
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Solicitação para ${formData.product} enviada com sucesso! Em breve entraremos em contato.`);
            quoteForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = '';
        })
        .catch(error => {
            console.error('Erro ao enviar para o Telegram:', error);
            alert('Erro ao enviar a solicitação. Tente novamente mais tarde.');
        });
    });

    // Efeito de aparecimento suave dos produtos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
