import {BankComponent} from "../../components/bank/index.js";
import {stockUrls} from "../../modules/stockUrls.js";


export class BankPage {
    constructor(parent, id, goBackCallback, likesService) {
        this.parent = parent
        this.id = id
        this.goBackCallback = goBackCallback
        this.likesService = likesService
    }

    async getData() {
        try {
            const response = await fetch(stockUrls.getStockById(this.id));
            const data = await response.json();
            this.renderData(data);
        }
        catch (error) {
            console.error(error);
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

    renderData(item) {
        item.id = this.id; 
        const bankComponent = new BankComponent(this.pageRoot, this.likesService);
        bankComponent.render(item, this.goBackCallback);
      }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData()
    }
}