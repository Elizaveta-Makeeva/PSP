import {BankComponent} from "../../components/bank/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";


export class BankPage {
    constructor(parent, id, goBackCallback, likesService) {
        this.parent = parent
        this.id = id
        this.goBackCallback = goBackCallback
        this.likesService = likesService
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        })
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