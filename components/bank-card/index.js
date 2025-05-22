import {LikesService} from "../../services/likes-service.js";

export class BankCardComponent {
    constructor(parent, likesService) {
        this.parent = parent;
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
                    .bank-img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                    }       
                </style>
                <div class="col">
                    <div class="card h-100">
                        <img src="${data.src}" class="bank-img card-img-top">
                        <div class="card-body">
                            <h2 class="card-title h5">${data.title}</h2>
                            <p class="card-text">${data.text}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                                <small class="text-muted">❤️ ${likesCount}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    updateLikes(bankId) {
        if (this.currentData && bankId === this.currentData.id) {
            const likesElement = this.parent.querySelector(`#click-card-${this.currentData.id}`).nextElementSibling;
            if (likesElement) {
                const newCount = this.likesService.getLikes(this.currentData.id);
                likesElement.textContent = `❤️ ${newCount}`; 
            }
        }
    }
    
    render(data, listener) {
        if (this.updateLikesBound) {
            this.likesService.removeListener(this.updateLikesBound);
        }

        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
        this.likesService.addListener(this.updateLikesBound);
    }
}