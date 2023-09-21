import logo from './logo.png';
import telegramLogo from './Telegram_logo.png';

import style from './style.module.scss';

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
        <div className={style.logo}>
          <img src={logo} alt="logo" />
          <div>BITCHANGE</div>
        </div>

        {['Privacy Policy', 'Guarantees', 'Faq', 'Partners', 'Support'].map((el) => (
          <Link key={el} label={el} />
        ))}
      </div>
      <SocialButton icon={telegramLogo} label="Telegram" />
    </nav>
  );
};

export default Header;
