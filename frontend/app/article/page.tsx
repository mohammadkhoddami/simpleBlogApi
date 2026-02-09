import ArticleClient from "@/components/articleComponents/articleClient";

async function Article() {
  const res = await fetch("http://localhost:8000/article/", {
    cache: "no-store",
  });

  const data = await res.json();

  return <ArticleClient articles={data} />;
}

export default Article;
