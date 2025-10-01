interface JsonLdProps {
  data: any;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Website structured data
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Operativ Media",
  "url": "https://operativmedia.az",
  "description": "Azərbaycanın ən etibarlı xəbər portalı",
  "inLanguage": "az-AZ",
  "publisher": {
    "@type": "Organization",
    "name": "Operativ Media",
    "url": "https://operativmedia.az",
    "logo": {
      "@type": "ImageObject",
      "url": "https://operativmedia.az/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://operativmedia.az/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// News article structured data
export const newsArticleJsonLd = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": article.title,
  "description": article.subTitle || article.content?.substring(0, 160),
  "image": article.imageUrl ? [article.imageUrl] : [],
  "datePublished": article.publishedDate,
  "dateModified": article.publishedDate,
  "author": {
    "@type": "Person",
    "name": article.author || "Operativ Media"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Operativ Media",
    "url": "https://operativmedia.az",
    "logo": {
      "@type": "ImageObject",
      "url": "https://operativmedia.az/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://operativmedia.az/post/${article.id}/${article.slug}`
  },
  "inLanguage": "az-AZ"
});

// Breadcrumb structured data
export const breadcrumbJsonLd = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
