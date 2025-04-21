class BioReactorChatbot {
    constructor() {
        this.biorreatores = {
            "Biorreator Piloto": {
                descricao: "Equipamento para cultivo de microrganismos (100L-500L) com controles automáticos de pH, temperatura e oxigênio dissolvido",
                aplicacao: "P&D, cultivo de microrganismos, produção de inóculo para biorreatores maiores",
                resumo: "Ideal para pesquisas e pequenas produções (100L-500L)",
                controles: ["pH", "temperature", "oxigênio dissolvido", "nível de espuma"],
                capacidades: ["100L", "250L", "500L"],
                link: "produtos.html#piloto",
                imagem: "assets/img/Biorreatores/piloto.jpg"
            },
            "Biorreator Industrial": {
                descricao: "Sistema para produção em larga escala (1.000L-5.000L) com automação completa",
                aplicacao: "Produção de biofármacos, vacinas e outros bioprodutos em escala industrial",
                resumo: "Produção eficiente em larga escala (1.000L-5.000L)",
                controles: ["pH", "temperature", "oxigênio dissolvido", "nível de espuma"],
                capacidades: ["1.000L", "2.000L", "5.000L"],
                link: "produtos.html#industrial",
                imagem: "assets/img/Biorreatores/industrial.jpg"
            },
            "Tanque de Mistura": {
                descricao: "Tanques para homogeneização de bioprodutos (500L-10.000L) com polimento sanitário",
                aplicacao: "Homogeneização de produtos biotecnológicos após o processo de fermentação",
                resumo: "Homogeneização eficiente (500L-10.000L)",
                capacidades: ["500L", "1.000L", "2.000L", "5.000L", "10.000L"],
                link: "produtos.html#mistura",
                imagem: "assets/img/biorreatores/tanque-mistura.jpg"
            },
            "Tanque de Armazenagem": {
                descricao: "Solução para armazenamento final (1.000L-20.000L) com padrão sanitário",
                aplicacao: "Armazenamento de produtos finais antes do envase",
                resumo: "Armazenamento seguro (1.000L-20.000L)",
                capacidades: ["1.000L", "2.000L", "5.000L", "10.000L", "15.000L", "20.000L"],
                link: "produtos.html#armazenagem",
                imagem: "assets/img/biorreatores/tanque-armazenagem.jpg"
            },
            "Projeto de Tubulações": {
                descricao: "Sistema completo de conexões sanitárias para integração de biofábricas",
                aplicacao: "Conexão entre equipamentos e utilidades em plantas biotecnológicas",
                resumo: "Solução completa de tubulações sanitárias",
                caracteristicas: ["Conexões triclamps", "Atendimento a normas sanitárias"],
                link: "produtos.html#tubulacoes",
                imagem: "assets/img/biorreatores/tubulacoes.jpg"
            }
        };

        this.commonQuestions = {
            "especificações técnicas": "Nossos biorreatores seguem normas internacionais (ANVISA, FDA, CE). Detalhes técnicos estão disponíveis em nosso <a href='produtos.html' target='_blank'>catálogo digital</a>.",
            "documentação regulatória": "Todos equipamentos possuem: <br>- Certificado de conformidade <br>- Manual de operação <br- Relatórios de qualificação",
            "manutenção": "Oferecemos: <br>🔧 Manutenção preventiva (planos anuais) <br>⚡ Suporte emergencial 24h <br>🔄 Atualizações de software",
            "contato comercial": "Nosso time comercial está disponível:<br>📞 (11) 98809-5596 (WhatsApp)<br>📧 comercial@rfcbioprocessos.com.br<br>🕒 Seg-Sex: 8h às 18h"
        };

        this.initChatbot();
        this.initWhatsAppButton();
    }

    initChatbot() {
        this.setupUI();
        this.showWelcomeMessage();
    }

    setupUI() {
        this.chatInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        this.chatMessages = document.getElementById('chatbot-messages');
        
        this.sendBtn.addEventListener('click', () => this.processInput());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.processInput();
        });
    }

    initWhatsAppButton() {
        // Verifica se o botão já existe para não criar duplicatas
        if (!document.querySelector('.whatsapp-float')) {
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = 'https://wa.me/5511988095596';
            whatsappBtn.className = 'whatsapp-float';
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
            whatsappBtn.title = 'Fale conosco no WhatsApp';
            whatsappBtn.target = '_blank';
            
            // Adiciona evento para analytics (opcional)
            whatsappBtn.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'WhatsApp',
                        'event_label': 'Botão Flutuante'
                    });
                }
            });

            document.body.appendChild(whatsappBtn);
        }
    }

    showWelcomeMessage() {
        this.clearChat();
        this.displayMessage("👋 Olá! Sou a *Bia*, assistente virtual da RFC BioProcessos. Posso te ajudar com:", 'bot');
        
        setTimeout(() => {
            const quickOptions = [
                "📋 Catálogo de produtos",
                "🛠️ Especificações técnicas",
                "📅 Agendar demonstração",
                "📞 Contato comercial"
            ];
            
            this.displayMessage(quickOptions.join("<br>"), 'bot');
            this.showMainOptions();
        }, 800);
    }

    showMainOptions() {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // Opções de biorreatores
        Object.keys(this.biorreatores).forEach(biorreator => {
            const option = document.createElement('div');
            option.className = 'chat-option';
            option.innerHTML = `<i class="fas fa-industry"></i> ${biorreator}`;
            option.addEventListener('click', () => {
                this.showBiorreatorDetails(biorreator);
            });
            optionsContainer.appendChild(option);
        });
        
        // Opções gerais
        const generalOptions = [
            { icon: "file-alt", text: "Documentação técnica" },
            { icon: "tools", text: "Suporte técnico" },
            { icon: "calendar-alt", text: "Visita técnica" },
            { icon: "phone-alt", text: "Falar com humano" }
        ];
        
        generalOptions.forEach(opt => {
            const option = document.createElement('div');
            option.className = 'chat-option';
            option.innerHTML = `<i class="fas fa-${opt.icon}"></i> ${opt.text}`;
            option.addEventListener('click', () => {
                this.handleGeneralOption(opt.text);
            });
            optionsContainer.appendChild(option);
        });
        
        this.chatMessages.appendChild(optionsContainer);
        this.scrollToBottom();
    }

    handleGeneralOption(option) {
        this.displayMessage(option, 'user');
        
        switch(option.toLowerCase()) {
            case "falar com humano":
                this.displayMessage(`Ótimo! Você pode conversar diretamente com nosso time:<br><br>
                    <a href="tel:+5511988095596" class="chat-link">📞 (11) 98809-5596</a><br>
                    <a href="mailto:contato@rfcbioprocessos.com.br" class="chat-link">📧 contato@rfcbioprocessos.com.br</a><br>
                    <a href="https://wa.me/5511988095596" class="chat-link whatsapp-link" target="_blank">💬 Abrir WhatsApp</a>`, 'bot');
                break;
                
            case "documentação técnica":
                this.displayMessage("Enviei um link para seu e-mail com:<br>- Manual do usuário<br- Certificados<br- Especificações técnicas<br><br>Confira também nosso <a href='documentos.html' class='chat-link'>portal de documentos</a>.", 'bot');
                break;
                
            default:
                const response = this.commonQuestions[option.toLowerCase()] || 
                                "Vou conectar você com nosso time especializado. Por favor, aguarde alguns instantes...";
                this.displayMessage(response, 'bot');
        }
        
        this.showBackOption();
    }

    showBiorreatorDetails(biorreatorName) {
        const biorreator = this.biorreatores[biorreatorName];
        this.displayMessage(`Sobre: ${biorreatorName}`, 'user');
        
        const detailDiv = document.createElement('div');
        detailDiv.className = 'biorreator-detail';
        
        // Imagem
        if (biorreator.imagem) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'biorreator-image-container';
            const img = document.createElement('img');
            img.src = biorreator.imagem;
            img.alt = biorreatorName;
            img.className = 'biorreator-image';
            imgContainer.appendChild(img);
            detailDiv.appendChild(imgContainer);
        }
        
        // Informações
        const infoDiv = document.createElement('div');
        infoDiv.className = 'biorreator-info';
        infoDiv.innerHTML = `
            <h4>${biorreatorName}</h4>
            <p class="biorreator-description">${biorreator.descricao}</p>
            <div class="biorreator-specs">
                <p><strong>🔧 Aplicação:</strong> ${biorreator.aplicacao}</p>
                ${biorreator.controles ? `<p><strong>🎛️ Controles:</strong> ${biorreator.controles.join(', ')}</p>` : ''}
                <p><strong>📦 Capacidades:</strong> ${biorreator.capacidades.join(', ')}</p>
            </div>
            <a href="${biorreator.link}" class="chat-link">Ver detalhes completos</a>
        `;
        
        detailDiv.appendChild(infoDiv);
        this.chatMessages.appendChild(detailDiv);
        this.scrollToBottom();
        this.showBackOption();
    }

    processInput() {
        const userMessage = this.chatInput.value.trim();
        if (!userMessage) return;
        
        this.displayMessage(userMessage, 'user');
        this.chatInput.value = '';
        
        // Reconhecimento de intenção
        const normalizedInput = userMessage.toLowerCase();
        let response = '';
        
        // Verifica biorreatores
        const biorreatorMatch = Object.keys(this.biorreatores).find(name => 
            normalizedInput.includes(name.toLowerCase().split(' ')[1]) ||
            name.toLowerCase().includes(normalizedInput)
        );
        
        // Verifica perguntas comuns
        const questionMatch = Object.keys(this.commonQuestions).find(question => 
            normalizedInput.includes(question)
        );
        
        // Fluxo de conversação
        if (biorreatorMatch) {
            this.showBiorreatorDetails(biorreatorMatch);
        } 
        else if (questionMatch) {
            response = this.commonQuestions[questionMatch];
            this.displayMessage(response, 'bot');
            this.showBackOption();
        }
        else if (/contato|falar|whatsapp|telefone|email/.test(normalizedInput)) {
            response = `Você pode falar diretamente com nosso time:<br><br>
                <a href="https://wa.me/5511988095596" class="chat-link whatsapp-link" target="_blank">
                    <i class="fab fa-whatsapp"></i> WhatsApp: (11) 98809-5596
                </a><br>
                <a href="mailto:contato@rfcbioprocessos.com.br" class="chat-link">
                    <i class="fas fa-envelope"></i> contato@rfcbioprocessos.com.br
                </a>`;
            this.displayMessage(response, 'bot');
        }
        else {
            response = "Desculpe, não entendi. Sobre qual desses assuntos você quer saber?";
            this.displayMessage(response, 'bot');
            this.showMainOptions();
        }
        
        this.scrollToBottom();
    }

    showBackOption() {
        const backOption = document.createElement('div');
        backOption.className = 'chat-option back-option';
        backOption.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar ao menu principal';
        backOption.addEventListener('click', () => {
            this.showWelcomeMessage();
        });
        this.chatMessages.appendChild(backOption);
        this.scrollToBottom();
    }

    displayMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    clearChat() {
        this.chatMessages.innerHTML = '';
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new BioReactorChatbot();
    
    // Botão de toggle do chatbot
    const chatbotTrigger = document.querySelector('.chatbot-trigger');
    const chatbotContainer = document.querySelector('.chatbot-container');
    
    if (chatbotTrigger && chatbotContainer) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
            // Removida a linha que esconde o botão
        });
        
        document.getElementById('close-chatbot').addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
            // Removida a linha que mostra o botão (não é mais necessário)
        });
    }
});