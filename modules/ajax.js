class Ajax {
    /**
     * GET ������
     * @param {string} url - ����� �������
     * @return {Promise} response - ������ � ����������� �������
     */
    async get(url) {
        try {
            const response = await fetch(url);
            return this._handleResponse(response);
        }
        catch (e) {
            console.error('������ GET �������: ', e);
            throw e;
        }
    }

    /**
     * POST ������
     * @param {string} url - ����� �������
     * @param {object} data - ������ ��� ��������
     * @return {Promise} response - ������ � ����������� �������
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
            console.error('������ POST �������: ', e);
            throw e;
        }
    }

    /**
     * PATCH ������
     * @param {string} url - ����� �������
     * @param {object} data - ������ ��� ����������
     * @return {Promise} response - ������ � ����������� �������
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
            console.error('������ PATCH �������: ', e);
            throw e;
        }
    }

    /**
     * DELETE ������
     * @param {string} url - ����� �������
     * @return {Promise} response - ������ � ����������� �������
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            return this._handleResponse(response);
        }
        catch(e) {
            console.error('������ DELETE �������: ', e);
            throw e;
        }
    }

    /**
     * ���������� ������ (��������� �����)
     * @param {Response} response - ������ ������ fetch
     * @returns {Promise} ������ � ������� ������
     */
    async _handleResponse(response) {
        try {
            const data = await response.json();
            if (!response.ok) {
                throw new Error('${response.status}')
            }
            
        } catch (e) {
            console.error('������ ��������� ������:', e);
            throw e;
        }
    }
}

export const ajax = new Ajax();