import { getArticleData } from "@/lib/articles"

const Article = async ({params}: {params: {id: string}}) => {
    const { id }  = await params;
    const articleData = await getArticleData(id);

    return (
        <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between ">
                <p>{articleData.date.toString()}</p>
            </div>
            <article className="article" dangerouslySetInnerHTML={{__html: articleData.contentHTML}} />
        </section>
    )
}


export default Article;
