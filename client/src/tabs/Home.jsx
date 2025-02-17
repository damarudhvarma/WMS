import { Box, Typography, Button, Container } from '@mui/material'; 
import React from "react";

const Home = () => {
    return (
        <Box sx={{ pl: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "80vh", overflowY: "hidden" }}>
            <Container sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                    Waste Management System
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, color: "#55555" }}>
                    Efficient and eco-friendly waste collection and recycling services for a cleaner planet.
                </Typography>
               
            </Container>
        </Box>
    )
}

export default Home;
