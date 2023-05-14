import Head from 'next/head';
import { getPostBySlug } from 'lib/posts';

export default function PostRedirect({ post }) {
  const featuredImage = post.featuredImage || {}; // Get the featured image object

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:title" content={post.metaTitle || post.title} />
      <meta property="og:description" content={post.og?.description || post.description} />
      <meta property="og:image" content={featuredImage.sourceUrl} /> {/* Use the sourceUrl of the featured image */}
    </Head>
  );
}

export async function getServerSideProps({ params, res }) {
  const { post } = await getPostBySlug(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  res.setHeader('Location', `https://markmystories.com/${post.slug}`);
  res.statusCode = 301;
  res.end();

  return {
    props: {},
  };
}
