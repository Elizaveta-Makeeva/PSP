import {BankCardComponent} from "../../components/bank-card/index.js";
import {BankPage} from "../bank/index.js";
import {LikesService} from "../../services/likes-service.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.likesService = new LikesService();
        this.bankCards = []; 
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div class="container py-4">
                    <h1 class="text-center mb-4">Лучшие банки России</h1>
                    <div class="row row-cols-3 g-4"></div>
                </div>
            `
        )
    }


    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        const bankPage = new BankPage(this.parent, cardId, () => {
            this.render()
        }, this.likesService)
        bankPage.render()
    }
    
    renderData(items) {
        const cardsContainer = this.parent.querySelector('.row');
        items.forEach((item) => {
            const bankCard = new BankCardComponent(cardsContainer, this.likesService);
            bankCard.render(item, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        this.getData()
    }
}