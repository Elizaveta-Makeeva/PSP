import {BankComponent} from "../../components/bank/index.js";


export class BankPage {
    constructor(parent, id, goBackCallback, likesService) {
        this.parent = parent
        this.id = id
        this.goBackCallback = goBackCallback
        this.likesService = likesService
    }

    getData() {
        const banksData = {
            1: {
                src: "../../static/img/vtb.png",
                title: "ВТБ",
                description: "Надежные финансовые решения для бизнеса и частных клиентов",
                about: "ВТБ — вторая по величине банковская группа в России, предоставляющая полный спектр финансовых услуг. Банк входит в число системно значимых кредитных организаций страны.",
                advantages: [
                    "Более 20 млн частных клиентов",
                    "Филиальная сеть по всей России",
                    "Высокий уровень надежности",
                    "Инновационные цифровые сервисы"
                ],
                phone: "8-800-100-24-24",
                website: "https://www.vtb.ru",
                hours: "24/7",
                headerStyle: "background-color: #0a2e76;"
            },
            2: {
                src: "../../static/img/sber.png",
                title: "Сбербанк",
                description: "Крупнейший банк России с полным спектром финансовых услуг",
                about: "Сбербанк — крупнейший банк России и один из ведущих мировых финансовых институтов. Банк занимает лидирующие позиции на рынке розничного, корпоративного и инвестиционного бизнеса.",
                advantages: [
                    "Более 100 млн клиентов",
                    "Самая широкая филиальная сеть в России",
                    "Передовые цифровые технологии",
                    "Высокий уровень надежности и стабильности"
                ],
                phone: "900 (для регионов) или 8-800-555-55-50",
                website: "https://www.sberbank.ru",
                hours: "Круглосуточно",
                headerStyle: "background-color: #047c3c;"
            },
            3: { 
                src: "../../static/img/tink.png",
                title: "Т-Банк",
                description: "Первый полностью цифровой банк России с инновационными решениями",
                about: "Т-Банк (Tinkoff) — первый в России полностью онлайн-банк, известный инновационными продуктами и высоким уровнем digital-сервиса. Лидер на рынке кредитных карт и мобильного банкинга.",
                advantages: [
                    "Более 20 млн клиентов",
                    "Полностью цифровой формат работы",
                    "Лучшее мобильное приложение среди банков",
                    "Инновационные финансовые продукты",
                    "Круглосуточная поддержка"
                ],
                phone: "8-800-755-00-07",
                website: "https://www.tinkoff.ru",
                hours: "Круглосуточно",
                headerStyle: "background: linear-gradient(135deg, #FFDD2D, #FFB72D);"
            },
            4: { 
                src: "../../static/img/alpha.png",
                title: "Альфа-Банк",
                description: "Премиальный банк с индивидуальным подходом к каждому клиенту",
                about: "Альфа-Банк — крупнейший частный банк России, ориентированный на премиальный сегмент. Известен высоким уровнем сервиса и гибкими условиями по финансовым продуктам.",
                advantages: [
                    "Более 15 млн клиентов",
                    "Премиальное обслуживание",
                    "Гибкие условия кредитования",
                    "Инновационные цифровые решения",
                    "Персональные финансовые решения"
                ],
                phone: "8-800-200-00-00",
                website: "https://www.alfabank.ru",
                hours: "Круглосуточно",
                headerStyle: "background: linear-gradient(135deg, #EF3124, #CC1F2D);"
            },
            5: { 
                src: "../../static/img/gazprom.png",
                title: "Газпромбанк",
                description: "Надежный партнер в корпоративном и инвестиционном банкинге",
                about: "Газпромбанк — один из крупнейших универсальных финансовых институтов России с государственным участием. Специализируется на корпоративном кредитовании и инвестиционных услугах.",
                advantages: [
                    "Входит в топ-5 крупнейших банков России",
                    "Эксперт в финансировании промышленных проектов",
                    "Широкая сеть отделений по всей стране",
                    "Высокий уровень надежности",
                    "Комплексные финансовые решения"
                ],
                phone: "8-800-100-07-01",
                website: "https://www.gazprombank.ru",
                hours: "Пн-Пт: 9:00-19:00",
                headerStyle: "background: linear-gradient(135deg, #00AEEF, #0077C8);"
            },
            6: {
                src: "../../static/img/rosselhoz.png",
                title: "Россельхозбанк",
                description: "Ваш надежный партнер в агробизнесе",
                about: "Россельхозбанк — системно значимый банк России, специализирующийся на финансировании агропромышленного комплекса и сельских территорий.",
                advantages: [
                    "Лидер кредитования АПК в России",
                    "Специальные программы для фермеров",
                    "Поддержка сельских территорий",
                    "Государственные гарантии",
                    "Развитая филиальная сеть в сельской местности"
                ],
                phone: "8-800-200-02-90",
                website: "https://www.rshb.ru",
                hours: "Пн-Пт: 9:00-18:00",
                headerStyle: "background: linear-gradient(135deg, #7AB800, #5A8F00);",
                toastStyle: `
                    .toast-header { background-color: #E8F5E9; color: #5A8F00; }
                    .toast-body { background-color: #F1F8E9; }
                `
            }
        }
    
        return banksData[this.id] || {
            src: "",
            title: "Банк не найден",
            about: "Информация о данном банке отсутствует",
            advantages: ["Информация отсутствует"],
            phone: "Не указан",
            website: "#",
            hours: "Не указаны"
        }
    }

    get pageRoot() {
        return document.getElementById('bank-page')
    }

    getHTML() {
        return (
            `
                <div id="bank-page"></div>
            `
        )
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        const data = this.getData();
        data.id = this.id; 
        const bank = new BankComponent(this.pageRoot, this.likesService);
        bank.render(data, () => {
            this.goBackCallback();
        });
    }
}