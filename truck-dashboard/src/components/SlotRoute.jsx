import * as React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TruckTimeline from './TruckTimeLine';
import { Box } from '@mui/system';
import axios from 'axios';
import { Button } from '@mui/material';


export default function SlotRoute() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks when the component is mounted
        console.log("mounted");
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/pickupApprove');
                const fetchedTasks = response.data.map(task => {
                    let timeSlotNo = 0;
                    // Set timeSlotNo based on the slot
                    switch (task.timeSlotNo) {
                        case 1:
                            timeSlotNo = '6 am - 9 am';
                            break;
                        case 2:
                            timeSlotNo = '10 am - 1 pm';
                            break;
                        case 3:
                            timeSlotNo = '2 pm - 5 pm';
                            break;
                        case 4:
                            timeSlotNo = '6 pm - 9 pm';
                            break;
                        default:
                            break;
                    }

                    return {
                        ...task,
                        timeSlotNo
                    };
                });
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        
        fetchTasks();
    }, []);

    const handleComplete = async (requestId) => {
        try {
            await axios.post('http://localhost:8000/pickupComplete', { requestId });
            // Update the task to be completed in the UI
            setTasks(prevTasks => 
                prevTasks.map(task =>
                    task.requestId === requestId ? { ...task, requestStatus: 'accomplished' } : task
                )
            );
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <Box sx={{ width: "400px" }}>
            {tasks.map((task, index) => (
                <Accordion key={task._id} sx={{ m: 2, backgroundColor: task.requestStatus === 'approved' ? "rgba(255, 255, 255, 0.63)" : "lightgray" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography sx={{ color: task.requestStatus === 'approved' ? "orange" : "green" }}>
                            {task.requestStatus === 'approved' ? `Task ${index + 1}` : 'Task Accomplished!'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ height: "300px", overflow: "scroll" }}>
                        
                        <Typography><strong>Request ID:</strong> {task.requestId}</Typography>
                        <Typography><strong>Pick Up Address:</strong> {task.pickUpAddress}</Typography>
                        <Typography><strong>Garbage Type:</strong> {task.garbageType}</Typography>
                        <Typography><strong>Approx. Garbage Weight:</strong> {task.approxGarbageWeight} kg</Typography>
                        <Typography><strong>Time Slot No:</strong> {task.timeSlotNo}</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => handleComplete(task.requestId)}
                            disabled={task.requestStatus === 'accomplished'}
                        >
                            Complete
                        </Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
