import Listing from "../models/Listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    // console.log(req.body)

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);
    console.log(listing)
    if (!listing) return next(errorHandler(404, "Listing not found"));

    if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can only delete your own listing"))

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing Deleted Successfully")
    } catch (error) {
        next(error)
    }

}