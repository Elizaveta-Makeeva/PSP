import {LikesService} from "../../services/likes-service.js";


export class BankComponent {
    constructor(parent, likesService) {
        this.parent = parent
        this.likesService = likesService;
        this.currentData = null;
        this.updateLikesBound = this.updateLikes.bind(this);
    }

    getHTML(data) {
        this.currentData = data;
        const likesCount = this.likesService.getLikes(data.id);
        return (
            `
            <style>
                .bank-header {
                    color: white;
                    padding: 2rem 0;
                    margin-bottom: 2rem;
                    ${data.headerStyle || 'background-color: #0a2e76;'}
                }
                ${data.toastStyle || ''}
            </style>
            
            <header class="bank-header text-center">
                <div class="container">
                    <img src="${data.src}" alt="${data.title}" style="height: 80px; margin-bottom: 1rem;">
                    <h1>${data.title}</h1>
                    <p class="lead">${data.description || 'Надежные финансовые решения'}</p>
                </div>
            </header>
    
            <!-- Toast-уведомление -->
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="bankToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="${data.src}" class="rounded me-2" alt="Логотип" style="height: 20px;">
                        <strong class="me-auto">${data.title}</strong>
                        <small>Только что</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                    <div class="toast-body">
                        Добро пожаловать в ${data.title}! ${data.welcomeMessage || 'Ваш надежный финансовый партнер.'}
                    </div>
                </div>
            </div>
    
            <div class="container mb-5">
                <div class="row">
                    <div class="col-md-8">
                        <h2>О банке</h2>
                        <p>${data.about || 'Информация о банке'}</p>
    
                        <h3 class="mt-4">Ключевые преимущества</h3>
                        <ul>
                            ${data.advantages ? data.advantages.map(adv => `<li>${adv}</li>`).join('') : '<li>Преимущества не указаны</li>'}
                        </ul>
                    </div>
    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h3>Контакты</h3>
                                <p><strong>Телефон:</strong> ${data.phone || 'Не указан'}</p>
                                <p><strong>Сайт:</strong> <a href="${data.website || '#'}" target="_blank">${data.website || 'Не указан'}</a></p>
                                <p><strong>Часы работы:</strong> ${data.hours || 'Не указаны'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <button class="btn btn-secondary" id="back-btn">← Вернуться на главную</button>
                    <button class="btn btn-outline-danger me-3" id="like-btn">♥ ${likesCount}</button>
            </div>
            `
        )
    }

    updateLikes(bankId) {
        if (this.currentData && bankId === this.currentData.id) {
            const likeBtn = document.getElementById('like-btn');
            if (likeBtn) {
                likeBtn.innerHTML = `❤️ ${this.likesService.getLikes(this.currentData.id)}`;
            }
        }
    }

    render(data, backCallback) {
        if (this.updateLikesBound) {
            this.likesService.removeListener(this.updateLikesBound);
        }
        
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const toastEl = document.getElementById('bankToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    
        const backBtn = document.getElementById('back-btn');
        if (backBtn && backCallback) {
            backBtn.addEventListener('click', backCallback);
        }
        
        const likeBtn = document.getElementById('like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                const newLikesCount = this.likesService.addLike(data.id);
                likeBtn.innerHTML = `вќ¤пёЏ ${newLikesCount}`;
            });
        }
        this.likesService.addListener(this.updateLikes.bind(this));
    }
}