class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @return {Promise} response - Промис с результатом запроса
     */
    async get(url) {
        try {
            const response = await fetch(url);
            return this._handleResponse(response);
        }
        catch (e) {
            console.error('Ошибка GET запроса: ', e);
            throw e;
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @return {Promise} response - Промис с результатом запроса
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return this._handleResponse(response);
        }
        catch(e) {
            console.error('Ошибка POST запроса: ', e);
            throw e;
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @return {Promise} response - Промис с результатом запроса
     */
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return this._handleResponse(response);
        }
        catch(e) {
            console.error('Ошибка PATCH запроса: ', e);
            throw e;
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @return {Promise} response - Промис с результатом запроса
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            return this._handleResponse(response);
        }
        catch(e) {
            console.error('Ошибка DELETE запроса: ', e);
            throw e;
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {Response} response - Объект ответа fetch
     * @returns {Promise} Промис с данными ответа
     */
    async _handleResponse(response) {
        try {
            const data = await response.json();
            if (!response.ok) {
                throw new Error('${response.status}')
            }
            
        } catch (e) {
            console.error('Ошибка обработки ответа:', e);
            throw e;
        }
    }
}

export const ajax = new Ajax();