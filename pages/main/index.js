import {BankCardComponent} from "../../components/bank-card/index.js";
import {BankPage} from "../bank/index.js";
import {LikesService} from "../../services/likes-service.js";


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
        return [
            {
                id: 1,
                src: "../../static/img/vtb.png",
                title: "ВТБ",
                text: "Вторая по величине банковская группа в России. Специализируется на корпоративном банкинге, но также предлагает качественные продукты для частных клиентов."
            },
            {
                id: 2,
                src: "../../static/img/sber.png",
                title: "Сбербанк",
                text: "Крупнейший банк России с самой развитой филиальной сетью. Предлагает полный спектр банковских услуг для частных и корпоративных клиентов."
            },
            {
                id: 3,
                src: "../../static/img/tink.png",
                title: "Т-Банк",
                text: "Первый в России полностью онлайн-банк, известный инновационными продуктами и высоким уровнем digital-сервиса. Лидер на рынке кредитных карт."
            },
            {
                id: 4,
                src: "../../static/img/alpha.png",
                title: "Альфа-Банк",
                text: "Крупный частный банк с ориентацией на премиальный сегмент. Известен качественным сервисом и гибкими условиями по кредитным продуктам."
            },
            {
                id: 5,
                src: "../../static/img/gazprom.png",
                title: "Газпромбанк",
                text: "Универсальный банк с государственным участием. Лидер в финансировании промышленных проектов. Сильные стороны: корпоративное кредитование и инвестиционные услуги."
            },
            {
                id: 6,
                src: "../../static/img/rosselhoz.png",
                title: "Россельхозбанк",
                text: "Системно значимый банк России с широкой линейкой продуктов. Особенно силен в инвестиционных продуктах и услугах для малого бизнеса."
            }
        ]
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        const bankPage = new BankPage(this.parent, cardId, () => {
            this.render()
        }, this.likesService)
        bankPage.render()
    }
        
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const cardsContainer = this.parent.querySelector('.row');
        this.bankCards = [];

        const data = this.getData();
        data.forEach((item) => {
            const bankCard = new BankCardComponent(cardsContainer, this.likesService);
            bankCard.render(item, this.clickCard.bind(this));
            this.bankCards.push(bankCard);
        });
    }
}