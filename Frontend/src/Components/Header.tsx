import { useNavigate } from 'react-router-dom'


const Header = () => {
    const navigate = useNavigate();
  return (
    <div><button
    className="absolute top-4 right-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
    onClick={() => (navigate("/"))}
  >
    Home
  </button></div>
  )
}

export default Header