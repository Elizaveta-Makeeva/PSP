export class BankCardComponent {
    constructor(parent, likesService) {
        this.parent = parent;
        this.likesService = likesService;
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

    addListeners(data, clickListener) {
        const cardElement = document.getElementById(`click-card-${data.id}`);
        if (cardElement) {
            cardElement.addEventListener('click', clickListener);
        }
    }

    render(data, clickListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener);
    }
}