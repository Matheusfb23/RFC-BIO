document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o mapa
    function initMap() {
        const location = { lat: -23.4568, lng: -46.5319 }; // Coordenadas de Guarulhos (substitua pelas reais)
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: location,
            styles: [
                {
                    featureType: "poi",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        new google.maps.Marker({
            position: location,
            map: map,
            title: "RFC BioProcessos"
        });
    }
    
    window.initMap = initMap;

    // Formulário para Telegram
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const now = new Date();
        const dataHora = now.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour12: false
        });

        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            phone: this.querySelector('#phone').value,
            subject: this.querySelector('#subject').value,
            message: this.querySelector('#message').value,
            contactMethod: this.querySelector('input[name="contactMethod"]:checked').value,
            datetime: dataHora
        };

        const telegramMessage = `
        📬 *Nova Mensagem de Contato*
        👤 *Nome:* ${formData.name}
        📧 *Email:* ${formData.email}
        📞 *Telefone:* ${formData.phone}
        📌 *Assunto:* ${formData.subject}
        💬 *Mensagem:* ${formData.message}
        📱 *Prefere contato por:* ${formData.contactMethod}
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
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde ou nos contate por telefone.');
        });
    });
});