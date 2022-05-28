import styles from './header.module.scss';

const Header = () => {
  const title = 'api에서 보내준 퍼지 문자열 매칭 결과를 바탕으로 검색어 추천';
  const text = '초성 검색 가능 / 검색어와 일치하는 부분 볼드 처리';

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerText}>{text}</p>
    </header>
  );
};

export default Header;
