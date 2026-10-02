
import Hero from '../components/home/Hero/Hero';
import Modernization from '../components/home/modernization/Modernization';
import Services from '../components/home/service/Services';

function Home() {
  return (
    <div className='w-full '>
        <Hero />
        <Services />
        <Modernization />
    </div>
  )
}

export default Home