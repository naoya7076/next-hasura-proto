import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Error from 'next/error';
import { Article } from '@/components/article';

import { useGetArticleQuery } from '@/generated/graphql';

import styles from './index.module.css';

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { articleId } = router.query;

  const { loading, error, data } = useGetArticleQuery({
    variables: {
      id: articleId as string,
    },
  });
  if (loading) {
    return <p>...loading</p>;
  }
  if (error) {
    return <p>{error.toString()}</p>;
  }
  if (!data || !data.articles_by_pk) {
    return <Error statusCode={404} />;
  }

  const { user, subject, content, published_at } = data.articles_by_pk;
  console.log(published_at);
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.subject}>{subject}</h1>
      <div className={styles.userContainer}>
        <div className={styles.userContainer}>
          <div>
            <img className={styles.userIcon} src="/profile.png" />
          </div>
        </div>
        <div className={styles.userText}>
          <div className={styles.userId}>{user.displayId}</div>
          <div className={styles.userName}>{user.displayName}</div>
        </div>
      </div>
      <Article content={content} />
    </div>
  );
};
export default ArticlePage;
