import { Container, Row } from "react-bootstrap"
export default function Main({content}){
    return (
        <Container>
            <Row>
                {content}
            </Row>
        </Container>
    )
}