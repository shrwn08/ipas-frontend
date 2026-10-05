
import Hero from '../components/home/Hero/Hero';
import Milestones from '../components/home/milestones/Milestones';
import Modernization from '../components/home/modernization/Modernization';
import Services from '../components/home/service/Services';
import IndustriesSection from '../components/IndustriesSection/IndustriesSection';

function Home() {
  return (
    <div className='w-full '>
        <Hero />
        <Services />
        <Modernization />
        <Milestones />
        <IndustriesSection />
    </div>
  )
}

export default Home