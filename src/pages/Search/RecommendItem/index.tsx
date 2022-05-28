/* eslint-disable react/no-array-index-key */
import dompurify from 'dompurify';
import { GrSearch } from 'react-icons/gr';

import { IDiseaseInfo } from 'types';
import { createFuzzyMatcher } from 'utils/fuzzy-matcher';

import styles from './recommendItem.module.scss';

interface IRecommendItem {
  item: IDiseaseInfo;
  search: string;
}

const RecommendItem = ({ item, search }: IRecommendItem) => {
  const sanitizer = dompurify.sanitize;

  const regex = createFuzzyMatcher(search);
  const markedSearch = item.sickNm.replace(regex, (match, ...groups) => {
    const letters = groups.slice(0, search.length);
    let lastIndex = 0;
    const highlighted: string[] = [];

    letters.forEach((letter) => {
      const index = match.indexOf(letter, lastIndex);
      highlighted.push(match.substring(lastIndex, index));
      highlighted.push(`<mark>${letter}</mark>`);

      lastIndex = index + 1;
    });

    return highlighted.join('');
  });

  return (
    <li className={styles.item} key={`recommend_search_item_${item.sickCd}`}>
      <GrSearch />
      <pre className={styles.textWrap} dangerouslySetInnerHTML={{ __html: sanitizer(markedSearch) }} />
    </li>
  );
};

export default RecommendItem;
