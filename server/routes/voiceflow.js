const express = require('express');
const router = express.Router();

// Get data for voiceflow to use
router.get('user_info/:id', async (req, res) => {
    const result = await UserInfo.findOne({user_id: "674b45265042945210d096fe"});
    res.json(result);
});

// Send data to voiceflow to update
router.post('user_info/push', async (req, res) => {
    const { field, value } = req.body;
    const filter = {user_id: "674b45265042945210d096fe"};
    // Parameter to be updated
    // const updateDoc = {
    //     $set: {
    //       field: value
    //     },
    //   };
    // const result = await 
});

module.exports = router;