import React from "react";
import { Box, Paper, Stack, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import PickUpList from "../components/PickUpList";
import CompletdPickUpList from "../components/CompletdPickUpList";
import ApprovedRequestList from "../components/ApprovedRequestList";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    paddingInline: "30px",
    textAlign: 'center',
    border:'1px solid black',
    color: theme.palette.text.secondary,
}));


const AllPickUps = () => {
    return (
        <Container sx={{ display: "flex", flexDirection:"column", alignItems:"center" }}>
            <Typography variant="h3">Scheduled Pickups</Typography>
            <Box sx={{display:"flex",}}>
            
                <PickUpList title={'Requests Pending'} />
                 <ApprovedRequestList   title={'Approved Requests'} />
                <CompletdPickUpList title={'Completed Requests'} />
            </Box>
            
        </Container>
    )
}

export default AllPickUps;