import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { GrSearch } from 'react-icons/gr';
import { useQuery } from 'react-query';
import cx from 'classnames';

import { instance } from 'utils/http-client';
import { useDebounce } from 'hooks/useDebounce';
import { IDiseaseInfo } from 'types';

import RecommendItem from './RecommendItem';
import styles from './searchDevelopment.module.scss';

interface ISearchText {
  searchText: string;
}

const diseaseInfoUrl = '/B551182/diseaseInfoService/getDissNameCodeList';

async function getDiseaseInfoApi({ searchText }: ISearchText): Promise<IDiseaseInfo[]> {
  if (!searchText) {
    return [];
  }

  const res = await instance.get(diseaseInfoUrl, {
    params: {
      _type: 'json',
      ServiceKey: process.env.REACT_APP_DISEASE_INFO_API_KEY,
      searchText,
      pageNo: 1,
      numOfRows: 100,
      sickType: 1,
      medTp: 2,
      diseaseType: 'SICK_NM',
    },
  });

  if (res.data.response.body.items === '') {
    return [];
  }

  const result = res.data.response.body.items.item;
  return Array.isArray(result) ? result : [result];
}

const SearchDevelopment = () => {
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const debouncedSearch: string = useDebounce<string>(search, 500);

  const { data, isLoading } = useQuery<IDiseaseInfo[]>(
    [diseaseInfoUrl, debouncedSearch],
    () => getDiseaseInfoApi({ searchText: debouncedSearch }),
    {
      enabled: !!debouncedSearch,
    }
  );

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const sortedData = data
    ?.sort((a, b) => {
      return a.sickNm.replace(/(\s*)/g, '').length - b.sickNm.replace(/(\s*)/g, '').length;
    })
    .slice(0, 10);

  const arr = sortedData?.map((item) => item.sickNm.split(new RegExp(`(${search})`, 'gi')));

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <div className={styles.searchWrapper}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>국내 모든 임상시험 검색하고</span>
          <span>온라인으로 참여하기</span>
        </h2>

        <form className={styles.searchForm} onSubmit={handleFormSubmit}>
          <div className={styles.searchInputWrap}>
            <GrSearch />
            <label htmlFor='searchInput' className={styles.visuallyHidden}>
              검색
            </label>
            <input
              type='text'
              id='searchInput'
              value={search}
              placeholder='질환명을 입력해주세요.'
              onChange={handleSearchChange}
              className={styles.search}
              ref={searchRef}
            />
          </div>

          <button type='submit' className={styles.submitBtn}>
            검색
          </button>
        </form>
      </section>

      <ul className={cx(styles.recommendList, { [styles.hide]: !search })}>
        {data?.length ? <li className={styles.recommendListTitle}>추천 검색어</li> : ''}
        {data?.length === 0 ? <li className={styles.listItem}>검색 결과가 없습니다.</li> : ''}
        {!isLoading && data ? (
          arr?.map((items) => <RecommendItem key={`recommend_search_item_${items}`} items={items} search={search} />)
        ) : (
          <li className={styles.listItem}>검색중입니다...</li>
        )}
      </ul>
    </div>
  );
};

export default SearchDevelopment;
