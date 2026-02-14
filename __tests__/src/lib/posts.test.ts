import {getAllPosts, getPostBySlug, getPostSlugs, searchPosts} from '@/lib/posts';

describe('Posts Library', () => {
    describe('getPostSlugs', () => {
        it('should return an array of slugs', () => {
            const slugs = getPostSlugs();
            expect(Array.isArray(slugs)).toBe(true);
            expect(slugs.length).toBeGreaterThan(0);
        });

        it('should return slugs without date prefix', () => {
            const slugs = getPostSlugs();
            slugs.forEach((slug) => {
                expect(slug).not.toMatch(/^\d{4}-\d{2}-\d{2}-/);
            });
        });
    });

    describe('getAllPosts', () => {
        it('should return an array of posts', () => {
            const posts = getAllPosts();
            expect(Array.isArray(posts)).toBe(true);
            expect(posts.length).toBeGreaterThan(0);
        });

        it('should return posts sorted by date descending', () => {
            const posts = getAllPosts();
            if (posts.length > 1) {
                for (let i = 0; i < posts.length - 1; i++) {
                    const date1 = new Date(posts[i].date);
                    const date2 = new Date(posts[i + 1].date);
                    expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
                }
            }
        });

        it('should return posts with required properties', () => {
            const posts = getAllPosts();
            posts.forEach((post) => {
                expect(post).toHaveProperty('slug');
                expect(post).toHaveProperty('title');
                expect(post).toHaveProperty('date');
                expect(post).toHaveProperty('author');
                expect(post).toHaveProperty('tags');
                expect(post).toHaveProperty('description');
                expect(post).toHaveProperty('published');
            });
        });
    });

    describe('getPostBySlug', () => {
        it('should return a post for valid slug', () => {
            const slugs = getPostSlugs();
            if (slugs.length > 0) {
                const post = getPostBySlug(slugs[0]);
                expect(post).not.toBeNull();
                expect(post?.slug).toBe(slugs[0]);
            }
        });

        it('should return null for invalid slug', () => {
            const post = getPostBySlug('non-existent-slug');
            expect(post).toBeNull();
        });

        it('should return post with content', () => {
            const slugs = getPostSlugs();
            if (slugs.length > 0) {
                const post = getPostBySlug(slugs[0]);
                expect(post).not.toBeNull();
                expect(post?.content).toBeDefined();
                expect(typeof post?.content).toBe('string');
            }
        });
    });

    describe('searchPosts', () => {
        it('should return all posts when no query or tags provided', () => {
            const allPosts = getAllPosts();
            const searchResults = searchPosts();
            expect(searchResults.length).toBe(allPosts.length);
        });

        it('should filter posts by query string', () => {
            const allPosts = getAllPosts();
            if (allPosts.length > 0) {
                const firstPost = allPosts[0];
                const query = firstPost.title.substring(0, 5);
                const results = searchPosts(query);
                expect(results.length).toBeGreaterThan(0);
            }
        });

        it('should filter posts by tags', () => {
            const allPosts = getAllPosts();
            if (allPosts.length > 0 && allPosts[0].tags.length > 0) {
                const tag = allPosts[0].tags[0];
                const results = searchPosts(undefined, [tag]);
                expect(results.length).toBeGreaterThan(0);
                results.forEach((post) => {
                    expect(post.tags).toContain(tag);
                });
            }
        });

        it('should return empty array when no matches found', () => {
            const results = searchPosts('xyz123nonexistent456');
            expect(results).toEqual([]);
        });
    });
});
