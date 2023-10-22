const mongoose = require("mongoose");
const Resource = require("../model/Resource");

const ResourceController = {
    addResource: async (req, res, next) => {
        console.log("here")
        if (!req.body.community ||!req.file.buffer || !req.body.uploader) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const newResource = new Resource({
            _id: new mongoose.Types.ObjectId,
            community: req.body.community,
            content:  req.file.buffer,
            uploadedDate: req.body.uploadedDate,
            uploader: req.body.uploader
        });
        console.log(newResource)

        try {
            await newResource.save();
        } catch (err) {
            next({
                success: false,
                message: "Resource upload failed.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            resource: newResource
        });
    }
}

module.exports = ResourceController;