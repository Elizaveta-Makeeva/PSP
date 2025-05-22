import {BankCardComponent} from "../../components/bank-card/index.js";
import {BankPage} from "../bank/index.js";
import {LikesService} from "../../services/likes-service.js";
import {stockUrls} from "../../modules/stockUrls.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.likesService = new LikesService();
        this.lastRequest = null;
    }

    getHTML() {
        return `
            <div class="container py-4">
                <h1 class="text-center mb-4">Лучшие банки России</h1>
                <div class="mb-4">
                    <input type="text" id="bank-search" class="form-control" 
                           placeholder="Поиск по названию банка...">
                </div>
                <div class="row row-cols-3 g-4" id="banks-container"></div>
            </div>
        `;
    }

    async loadBanks(searchTerm = '') {
        try {
            const url = searchTerm 
                ? `${stockUrls.getStocks()}?title=${encodeURIComponent(searchTerm)}`
                : stockUrls.getStocks();
            
            const response = await fetch(url);
            const banks = await response.json();
            this.renderBanks(banks);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }

    renderBanks(banks) {
        const container = this.parent.querySelector('#banks-container');
        container.innerHTML = '';
        
        banks.forEach(bank => {
            const card = new BankCardComponent(container, this.likesService);
            card.render(bank, (e) => this.handleCardClick(e));
        });
    }

    handleCardClick(e) {
        const cardId = parseInt(e.target.dataset.id);
        const bankPage = new BankPage(this.parent, cardId, () => {
            this.render();
        }, this.likesService);
        bankPage.render();
    }

    setupSearch() {
        const searchInput = this.parent.querySelector('#bank-search');
        let timeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.loadBanks(e.target.value.trim());
            }, 300);
        });
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.setupSearch();
        this.loadBanks();
    }
}