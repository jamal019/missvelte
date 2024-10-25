export class MediaItem {
    title: string;
    imageUrl: string;
    createdAt: string;

    constructor(title: string, imageUrl: string, createdAt: string) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }
}
