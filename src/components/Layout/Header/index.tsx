import logo from './logo.png';
import telegramLogo from './Telegram_logo.png';

import style from './style.module.scss';

const headerLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Guarantees', path: '/guarantees' },
  { label: 'Faq', path: '/faq' },
  { label: 'Partners', path: '/partners' },
  { label: 'Support', path: '/support' },
];

const SocialButton = ({ icon = '', label = '' }) => {
  return (
    <button className={style.socialButton}>
      <img src={icon} alt="socialLogo" />
      <mark>{label}</mark>
    </button>
  );
};

const Link = ({ label = '', src = '/' }) => {
  return <a href={src}>{label}</a>;
};

const Header = () => {
  return (
    <nav className={style.header}>
      <div className={style.links}>
        <a className={style.logo} href="/">
          <img src={logo} alt="logo" />
          <div>BITCHANGE</div>
        </a>

        {headerLinks.map((el) => (
          <Link key={el.path} label={el.label} src={el.path} />
        ))}
      </div>
      <SocialButton icon={telegramLogo} label="Telegram" />
    </nav>
  );
};

export default Header;
