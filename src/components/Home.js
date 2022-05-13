import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Homewrap = styled.div``
const Container = styled.div`width:1050px; margin:0 auto;`
const Row = styled.div``

const Postli = styled.li`padding:5px 10px; border-bottom:1px solid #dbdbdb`
const Home = () => {
    return (
        <Homewrap>
            <Container>
                <Row>
                    <ul>
                        <Link to=''><Postli>1111</Postli></Link>
                        <Link to=''><Postli>2222</Postli></Link>
                        <Link to=''><Postli>3333</Postli></Link>
                    </ul>
                </Row>
            </Container>
        </Homewrap>
    )
}

export default Home;

