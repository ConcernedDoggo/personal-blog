import {MetadataRoute} from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = 'https://harshalchavan.com';

    const blogDirectory = path.join(process.cwd(), '/articles');
    const fileNames = fs.readdirSync(blogDirectory);

    const blogPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/,'');

        return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }
    })

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
    ];
    return [...routes, ...blogPosts];
}