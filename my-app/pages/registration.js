import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Footer from '@/components/Footer';
import Nav from 'react-bootstrap/Nav';


export default function Registration() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    const router = useRouter(); // Access the router object

    // const yearArray = range(currentYear, currentYear - 100, -1);
    // const dayArray = range(1, 31, +1);

    // const optionsYear = yearArray.map((item) => {
    //     return (
    //       <option key={item} value={item}>
    //         {item}
    //       </option>
    //     )
    //   })

    // const optionsDays = dayArray.map((item) =>{
    //     return (
    //       <option key={item} value={item}>
    //         {item}
    //       </option>
    //     )
    // })

    // function getMonths(month){
    //     var months = [
    //         'January',
    //         'February',
    //         'March',
    //         'April',
    //         'May',
    //         'June',
    //         'July',
    //         'August',
    //         'September',
    //         'October',
    //         'November',
    //         'December'
    //       ];
    //     var monthNum = months.indexOf(month);
    //     return monthNum;
    // }

    const submitForm = async (data) => {

        var registrationForm = {}
        if (data.email === data.retypeEmail && data.customerPassword === data.retypeCustomerPassword) {
            registrationForm = {
                // Birthday: data.year + '-' + (String(getMonths(data.month) + 1).padStart(2, '0')) + '-' + data.day,
                Email: data.email,
                customerPassword: data.customerPassword
            };
        } else{
            // show error
        }

        try {
            const response = await fetch('http://localhost:8080/registration', { // Send POST request to "/registration" endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationForm), // Convert form data to JSON string
            });

            if (response.ok) {
                // Redirect to success page or perform any other action upon successful submission
                console.log(JSON.stringify(registrationForm));
                router.push('/dashboardUser');
            } else {
                // Handle error response
                const errorMessage = await response.text();
                setErrorMessage(errorMessage); // Set error message state
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while submitting the form.'); // Set error message state
        }
    }

    return (
      <>
        <Container>
            <br/><br/>
            <Row>
                <Col md={4}><Nav.Link href="/">My Restaurant</Nav.Link></Col>
            </Row>
            <br/><br/>
            <Row>
                <Col md={{ span: 15, offset: 1 }}><h1>Create Your Account</h1>
                <br />
                <br />
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Container className="forms">
                        <Form onSubmit={handleSubmit(submitForm)}>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register("email")} required />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label>Retype Email</Form.Label>
                            <Form.Control type="email" placeholder="Retype email" {...register("retypeEmail")} required />
                            </Form.Group>
                        </Row>
                        <br />
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="validationCustom06">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="Password" placeholder="Password" {...register("customerPassword")} required />
                            </Form.Group>
            
                            <Form.Group as={Col} className="mb-3" controlId="validationCustom07">
                                <Form.Label>Retype Password</Form.Label>
                                <Form.Control type="password" placeholder="Retype Password" {...register("retypeCustomerPassword")} required />
                            </Form.Group>
                        </Row>
            
                        {/* <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom08">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Select defaultValue="Choose..." {...register("month")} required >
                                <option>Month:</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </Form.Select>
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="validationCustom09">
                            <Form.Label>.</Form.Label>
                            <Form.Select defaultValue="Choose..." {...register("day")} required >
                                <option>Day:</option>
                                {optionsDays}
                            </Form.Select>
                            </Form.Group>
            
                            <Form.Group as={Col} controlId="validationCustom10">
                            <Form.Label>.</Form.Label>
                            <Form.Select defaultValue="Choose..." {...register("year")} required >
                                <option>Year...</option>
                                {optionsYear}
                            </Form.Select>
                            </Form.Group>
                        </Row> */}
                        <Stack>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Stack>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
        <Footer />
      </>
    );
  }
  