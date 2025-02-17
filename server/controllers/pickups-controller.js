import PickUpRequest from "../models/pickup_request.js";


export const pickupApprove = async (req, res) => {
    try {
        const { requestId } = req.body;
        const pickUpRequest = await PickUpRequest.findOneAndUpdate(
            { requestId },
            { requestStatus: 'approved' },
            { new: true }
          );
        res.status(200).json(pickUpRequest);
    } catch (error) {
        console.error("Error approving request:", error);
        res.status(500).json({ message: "Error approving request" });
    }
}


export const getPickupApprove= async(req,res)=>{
    try {
        const pickUpRequest = await PickUpRequest.find({requestStatus:'approved'});
        res.status(200).json(pickUpRequest);
    } catch (error) {
        console.error("Error fetching approved requests:", error);
        res.status(500).json({ message: "Error fetching approved requests" });
    }
}


export const pickupComplete = async (req, res) => {
    try {
        const { requestId } = req.body;
        const pickUpRequest = await PickUpRequest.findOneAndUpdate(
            { requestId },
            { requestStatus: 'completed' },
            { new: true }
          );
        res.status(200).json(pickUpRequest);
    } catch (error) {
        console.error("Error completing request:", error);
        res.status(500).json({ message: "Error completing request" });
    }

}

export const getPickupComplete= async(req,res)=>{
    try {
        const pickUpRequest = await PickUpRequest.find({requestStatus:'completed'});
        res.status(200).json(pickUpRequest);
    } catch (error) {
        console.error("Error fetching completed requests:", error);
        res.status(500).json({ message: "Error fetching completed requests" });
    }
}

export const getPickupPending= async(req,res)=>{
    try {
        const pickUpRequest = await PickUpRequest.find({requestStatus:'Pending'});
        res.status(200).json(pickUpRequest);
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        res.status(500).json({ message: "Error fetching pending requests" });
    }
}