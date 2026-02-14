export interface PostMetadata {
    title: string;
    date: string;
    author: string;
    tags: string[];
    description: string;
    image?: string;
    published: boolean;
}

export interface Post extends PostMetadata {
    slug: string;
    content: string;
}

export interface PostPreview extends PostMetadata {
    slug: string;
}
