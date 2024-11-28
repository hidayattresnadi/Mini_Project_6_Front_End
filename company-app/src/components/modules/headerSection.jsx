import Container from '../elements/container';
// import Text from '../elements/text';
// import GreetingMessage from '../widgets/greetingsMessage';
import '../../header.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlices';

const Header = ({ setEditingEmployee, setEditingDepartment, setEditingProject, setEditingWorksOn, setErrors }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (path) => {
    navigate(path);
    setEditingEmployee(null);
    setEditingDepartment(null);
    setEditingProject(null);
    setEditingWorksOn(null);
    setErrors(null);
  }
  const { user: currentUser } = useSelector(state => state.auth);
  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    {
      label: 'Home', path: '/', visibleForAll: true
    },
    {
      label: 'Login', path: '/login', isAuthenticated: false
    },
    {
      label: 'Profile', path: '/profile',
    },
    {
      label: 'Logout'
    },
    {
      label: 'Register', path: '/register/user', visibleForRoles: ['Administrator']
    },
    {
      label: 'Roles', path: '/roles', visibleForRoles: ['Administrator']
    },
    {
      label: 'Users', path: '/users', visibleForRoles: ['Administrator']
    },
    {
      label: 'Employees', path: '/employees', visibleForRoles: ['Administrator', 'HR Manager']
    },
    {
      label: 'Departments', path: '/departments', visibleForRoles: ['Administrator', 'HR Manager']
    },
    {
      label: 'Projects', path: '/projects', visibleForRoles: ['Administrator', 'HR Manager']
    },
    {
      label: 'WorksOns', path: '/assignments', visibleForRoles: ['Administrator', 'HR Manager']
    },
    {
      label: 'Dependents', path: '/dependents', visibleForRoles: ['Administrator', 'HR Manager']
    },

  ];

  const isMenuVisible = (item) => {
    // Selalu tampilkan menu untuk semua user
    if (item.visibleForAll) return true;

    //jika user belum login, tampilkan menu yang isAuthenticated false
    if (item.isAuthenticated == false && !currentUser) {
      return true;
    }

    //jika user sudah login, tampilkan logout
    if (item.label == 'Logout' && currentUser) {
      return true;
    }

    //jika user sudah login, tampilkan logout
    if (item.label == 'Profile' && currentUser) {
      return true;
    }

    // Cek role untuk menu spesifik
    if (item.visibleForRoles && currentUser?.roles) {
      return item.visibleForRoles.some(role =>
        currentUser.roles.includes(role)
      );
    }

    return false;
  };


  return (
    <Container className="container-fluid d-flex flex-column align-items-center bg-header mb-5 position-relative">
      {/* Overlay for Background Image */}
      <div className="overlay"></div>

      {/* Navbar */}
      <nav className="navbar navbar-dark w-100 px-4">
        <div className="container-fluid">
          {/* Title */}
          <span className="navbar-brand text-white fs-1 fw-bold">Company App</span>

          {/* Navbar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4">
              {menuItems.filter(isMenuVisible).map((item, index) => (
                <li className="nav-item" key={index}>
                  <span
                    className="nav-link text-white fw-bold fs-5"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (item.label === 'Logout') {
                        handleLogout();
                      } else if (item.path) {
                        handleNavigation(item.path);
                      }
                    }}
                    
                  >
                    {item.label}
                  </span>
                </li>
              ))}
              {/* <li className="nav-item">
                <span onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Home</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/employees')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Employees</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/departments')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Departments</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/projects')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Projects</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/assignments')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">WorksOns</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/dependents')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Dependents</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/users')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Users</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/roles')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Roles</span>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Header;

