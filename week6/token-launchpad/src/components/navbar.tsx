import Wallet from './wallet'

const Navbar = () => {
  return (
      <div className=' bg-blue-700 h-20 '>
          <div className='flex justify-between items-center '>
          <div className='text-2xl p-4  text-white'>Launchpad</div>
          <div><Wallet/></div>
              
          </div>
        
      </div>
  )
}

export default Navbar