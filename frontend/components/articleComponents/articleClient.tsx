'use client'

import { useState, useEffect } from "react"
import CategorySlider from "./category"
import ArticleHeader from "./header";


interface IArticle {
  id: number,
  title: string,
  slug: string,
  body: string,
  category: string,
}

interface ArticleClientProps {
  articles: IArticle[];
}

export default function ArticleClient({ articles: initialArticles }) {
  const [articles, setArticles] = useState(initialArticles)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      const url = selectedCategory
        ? `http://localhost:8000/article?category=${selectedCategory}`
        : `http://localhost:8000/article`

      const res = await fetch(url)
      const data = await res.json()
      setArticles(data)
    }

    fetchArticles()
  }, [selectedCategory])

  return (
    <>
      <ArticleHeader />

      <div className="flex items-center justify-center">
        <CategorySlider onSelect={setSelectedCategory} />
      </div>

      <section className="relative min-h-screen">
        <div className="grid gap-6 mt-16 md:grid-cols-3">
          {articles.map(article => (
            <div
              key={article.id}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl"
            >
              <h3>{article.title}</h3>
              
            </div>
          ))}
        </div>
      </section>
    </>
  )
}