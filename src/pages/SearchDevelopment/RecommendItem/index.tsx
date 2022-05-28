/* eslint-disable react/no-array-index-key */
import { GrSearch } from 'react-icons/gr';

import styles from './recommendItem.module.scss';

interface IRecommendItem {
  items: string[];
  search: string;
}

const RecommendItem = ({ items, search }: IRecommendItem) => {
  return (
    <li className={styles.item} key={`recommend_search_item_${items}`}>
      <GrSearch />
      <div className={styles.textWrap}>
        {items.map((item: string, index: number) =>
          item === search ? (
            <mark key={`search_highlighted_${index}`} className={styles.mark}>
              {item}
            </mark>
          ) : (
            <pre className={styles.text} key={`search_not_highlighted_${index}`}>
              {item}
            </pre>
          )
        )}
      </div>
    </li>
  );
};

export default RecommendItem;
