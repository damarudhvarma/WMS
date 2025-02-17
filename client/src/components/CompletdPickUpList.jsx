import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, CardContent, styled, Paper, Stack, Button, DialogTitle, Dialog } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    paddingInline: "30px",
    textAlign: 'center',
    border: '1px solid black',
    color: theme.palette.text.secondary,
}));

const timeSlots = {
    1: "6am-9am",
    2: "9am-12pm",
    3: "12pm-3pm",
    4: "3pm-6pm",
    5: "6pm-9pm"
};

const PickUpDetail = ({ onClose, selectedValue, open, data }) => {
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Pick-up Request Details</DialogTitle>
            <Box sx={{ m: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                        style={{ width: "100px", height: "100px" }}
                        src="https://as2.ftcdn.net/v2/jpg/00/32/52/65/1000_F_32526547_ejjKQfFEEEceGt9EqagrZ6BLlzsoVJc0.jpg"
                        alt="trash img"
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: "250px" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" component="div">
                            <b>Date</b>: {data.createdAt.split('T')[0]}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            <b>Slot</b>: {timeSlots[data.timeSlotNo] || "Unknown"}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            <b>Type</b>: {data.garbageType}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            <b>Weight</b>: {data.approxGarbageWeight} kg
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            <b>Address</b>: {data.pickUpAddress}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            <b>Status</b>: {data.requestStatus}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Dialog>
    );
};

PickUpDetail.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default function CompletedPickUpList({ title }) {
    const [dataList, setDataList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);

    React.useEffect(() => {
        const fetchCompletedPickUps = async () => {
            try {
                const res = await fetch('http://localhost:8000/pickupComplete');
                const data = await res.json();
                setDataList(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchCompletedPickUps();
    }, []);

    const handleClickOpen = (data) => {
        setSelectedData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Paper sx={{ m: 4, backgroundColor: "rgba(255, 255, 255, 0.52)", p: 3, display: "flex", flexDirection: "column", alignItems: "center", height: "auto" }}>
                <Typography variant="h5">{title}</Typography>
                <Stack sx={{ m: 1 }} spacing={2}>
                    {dataList.map((data, index) => (
                        <Button key={index} onClick={() => handleClickOpen(data)}>
                            <Item>{data.createdAt.split('T')[0]}</Item>
                        </Button>
                    ))}
                </Stack>
            </Paper>
            {selectedData && (
                <PickUpDetail
                    selectedValue={selectedData.requestId}
                    open={open}
                    onClose={handleClose}
                    data={selectedData}
                />
            )}
        </div>
    );
}
