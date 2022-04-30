import React from 'react'

import {
    Box,
    Column,
    Container, FooterLink,
    Row,
} from '../FooterStyles'

function Footer() {
    return (
        <Box>
            <h1 style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: '-50px' 
            }}>
                ABBA: Attendance Buddy for the Board of Administration
            </h1>
            <Container>
                <Row>
                    <Column>
                        <FooterLink href="https://kea.dk">KEA&apos;s website</FooterLink>
                    </Column>
                    <Column>
                        <FooterLink href="https://keaplan.kea.dk/sws/prod2022F/default.aspx">
                            KEA&apos;s timetable
                        </FooterLink>
                    </Column>
                    <Column>
                        <FooterLink href="https://kea-fronter.itslearning.com/index.aspx">Fronter</FooterLink>
                    </Column>
                    <Column>
                        <FooterLink href="https://github.com/samlama111/semester1-roll-call">Github repo</FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    )
}
export default Footer
