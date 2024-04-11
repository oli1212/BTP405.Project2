import { useRouter } from 'next/router';
import LoggedInLayout from '@/components/LoggedInLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // Perform logout logic here...
        // Redirect to the login page
        router.push('/');
    };

    return (
    <>
        <LoggedInLayout>
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className="my-4">Dashboard</h1>
                        </Col>
                    <Col xs={4} className="text-end">
                        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </Col>
                </Row>
                <Stack gap={3}>
                    <Row>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <Stack gap={3}>
                                        <Button variant="outline-secondary">Create Reservation</Button>
                                        <Button variant="outline-secondary">Modify Reservation</Button>
                                        <Button variant="outline-secondary">Cancel Reservation</Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <Stack gap={2}>
                                        <h5 className="card-title">Reservations</h5>
                                        <div className="faint-line"></div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Date</th>
                                                    <th>Customer Name</th>
                                                    <th>Reservation Number</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Form.Check aria-label="option 1" /></td>
                                                    <td>Today, 11:20 AM EST</td>
                                                    <td>John Doe</td>
                                                    <td>5</td>
                                                    <td>Booked</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Stack>
            </Container>
        </LoggedInLayout>
    </>
  );
}