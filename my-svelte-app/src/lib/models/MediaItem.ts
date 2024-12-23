export class MediaItem {
    title: string;
    imageUrl: string;
    createdAt: string;
    storage: string;
    latitude: number;
    longitude: number;

    constructor(title: string, imageUrl: string, createdAt: string, storage: string, latitude: number, longitude: number) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.storage = storage;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
