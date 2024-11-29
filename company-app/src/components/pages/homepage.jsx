import { useEffect, useState } from 'react';
import '../../dashboard.css'
import Container from '../elements/container';
import Icon from '../elements/icon';
import Text from '../elements/text';
import axios from 'axios';
import LoadingSpinner from '../elements/loading';
import ProjectService from '../../services/projectService';
import EmployeeService from '../../services/employeeService';
import DependentService from '../../services/dependentService';
import DepartmentService from '../../services/departmentService';
function HomePage() {
    const [errorStatus,setErrorStatus] = useState()
    const [Loading, setLoading] = useState(true)
    const [projects,setProjects] = useState()
    const [employees, setEmployees] = useState()
    const [departements, setDepartments] = useState()

    useEffect(() => {
        const myFetch = async () => {
            try {
                const projectResponse = await ProjectService.getAll();
                setProjects(projectResponse.data);

                const employeeResponse = await EmployeeService.getAll();
                setEmployees(employeeResponse.data.data);

                const departmentResponse = await DepartmentService.getAll();
                setDepartments(departmentResponse.data.data);

            } catch (error) {
                setErrorStatus(true);
                console.log("Error:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        myFetch();
    }, []);

    if (Loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading home</p>;

    return (
        <>
        <Container className='dashboard-container'>
        <h1 className='text-center'>Company Dashboard</h1>
        <Container className='dashboard-grid'>
            <Container className='card'>
                <Icon className='fas fa-users fa-2x'></Icon>
                <h2>Total Employees</h2>
                <Text>{employees.length}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Departments</h2>
                <Text>{departements.length}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Projects</h2>
                <Text>{projects.length}</Text>
            </Container>
        </Container>
    </Container>
    </>
    )
}

export default HomePage;