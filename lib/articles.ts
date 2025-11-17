import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";

import type { ArticleItem } from "@/types";

const articlesDirectory = path.join(process.cwd(), "articles")

export const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map(filename => {
        const id = filename.replace(/\.md$/, "");
        console.log(`id: ${id}`);

        const fullPath = path.join(articlesDirectory, filename);

        const fileContent = fs.readFileSync(fullPath, "utf-8");

        const matterResult = matter(fileContent);

        return {
            id,
            title: matterResult.data.title,
            category: matterResult.data.category,
            date: matterResult.data.date
        }
    })

    return allArticlesData.sort((a, b) => {
        const format = "DD-MM-YYYY";
        const dateOne = moment(a.date, format);
        const dateTwo = moment(b.date, format);

        if (dateOne.isBefore(dateTwo)) {
            return -1;
        }
        return 0;
    })
}


export const getCategorisedArticles = (): Record<string, ArticleItem[]> => {
    const sortedArticles = getSortedArticles();

    const categorisedArticles: Record<string, ArticleItem[]> = {}

    sortedArticles.forEach(article => {
        if (!categorisedArticles[article.category]) {
            categorisedArticles[article.category] = [];
        }
        categorisedArticles[article.category].push(article)
    })
    return categorisedArticles;
}


export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);

    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContent);


    const processedContent = await remark().use(html).process(matterResult.content);

    const contentHTML = processedContent.toString();

    return {
        id, 
        contentHTML,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: moment(matterResult.data.date, "DD-MM-YYYY").format("D MMM YYYY")
    }
}