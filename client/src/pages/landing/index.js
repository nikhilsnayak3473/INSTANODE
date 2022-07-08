import logo from '../../icons/logo.svg';
import INSTANODE from '../../icons/INSTANODE.png';
import LoginForm from '../../components/loginform';
export default function Landing() {
  return (
    <main id='landing'>
      <div className='section1'>
        <img src={logo} alt='' />
        <h3 className='logoText'>
          INSTANODE helps you connect and share with the people in your life.
        </h3>
      </div>
      <div className='section2'>
        <img src={INSTANODE} alt='' />
        <LoginForm />
      </div>
    </main>
  );
}
