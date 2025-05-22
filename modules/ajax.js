class Ajax {
    /**
     * GET ������
     * @param {string} url - ����� �������
     * @param {function} callback - ������� ��������� ������ (data, status)
     */
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * POST ������
     * @param {string} url - ����� �������
     * @param {object} data - ������ ��� ��������
     * @param {function} callback - ������� ��������� ������ (data, status)
     */
    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * PATCH ������
     * @param {string} url - ����� �������
     * @param {object} data - ������ ��� ����������
     * @param {function} callback - ������� ��������� ������ (data, status)
     */
    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * DELETE ������
     * @param {string} url - ����� �������
     * @param {function} callback - ������� ��������� ������ (data, status)
     */
    delete(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * ���������� ������ (��������� �����)
     * @param {XMLHttpRequest} xhr - ������ �������
     * @param {function} callback - ������� ��������� ������
     */
    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('������ �������� JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();