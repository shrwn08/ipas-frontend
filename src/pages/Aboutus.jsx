import AboutHero from "../components/about-us/aboutHero"
import EngineeringTeam from "../components/about-us/EngineeringTeam"
import TurnkeyDelivery from "../components/about-us/TurnkeyDelivery"
import VisionNmission from "../components/about-us/VisionNmission"



function Aboutus() {
  return (
    <div className="w-full">
        <AboutHero />
        <TurnkeyDelivery />
        <VisionNmission />
        <EngineeringTeam />
    </div>
  )
}

export default Aboutus