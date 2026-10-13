import AboutHero from "../components/about-us/aboutHero"
import EngineeringTeam from "../components/about-us/EngineeringTeam"
import OfficeLocation from "../components/about-us/OfficeLocation"
import TurnkeyDelivery from "../components/about-us/TurnkeyDelivery"
import VisionNmission from "../components/about-us/VisionNmission"
import WhyUs from "../components/about-us/WhyUs"



function Aboutus() {
  return (
    <div className="w-full">
        <AboutHero />
        <TurnkeyDelivery />
        <VisionNmission />
        <EngineeringTeam />
        <WhyUs />
        <OfficeLocation />
    </div>
  )
}

export default Aboutus