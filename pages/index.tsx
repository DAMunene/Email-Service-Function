import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1>Welcome to Your Next.js App</h1>
      <p>Your application is now running successfully!</p>
    </div>
  );
};

export default Home; 