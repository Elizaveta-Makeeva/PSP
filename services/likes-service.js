export class LikesService {
    constructor() {
        this.STORAGE_KEY = 'bank_likes';
        this.likes = this.loadLikes();
        this.listeners = []; 
    }

    loadLikes() {
        const storedLikes = localStorage.getItem(this.STORAGE_KEY);
        return storedLikes ? JSON.parse(storedLikes) : {};
    }

    saveLikes() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.likes));
    }

    getLikes(bankId) {
        return this.likes[bankId] || 0;
    }

    addLike(bankId) {
        this.likes[bankId] = (this.likes[bankId] || 0) + 1;
        this.saveLikes();
        this.notifyListeners(bankId);
        return this.likes[bankId];
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    notifyListeners(bankId) {
        this.listeners.forEach(callback => callback(bankId));
    }
}