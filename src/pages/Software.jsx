
import SoftwareHero from '../components/software/SoftwareHero'
import PLCController from '../components/software/PLCController'
import SCADAHMI from '../components/software/SCADAHMI'

function Software() {
  return (
    <div className="w-full">
     <SoftwareHero />
     <PLCController />
     <SCADAHMI />
    </div>
  )
}

export default Software