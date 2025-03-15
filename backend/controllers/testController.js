// testController.js

// Test function to handle GET /api/test route
const testController = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Test API is working!"
    });
};

const test2 = (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Test API is working! new"
    });
}

module.exports = {
    testController,test2
};