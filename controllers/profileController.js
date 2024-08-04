const User = require('../models/User'); // Import your Sequelize User model
const {
    handleReadAll,
    handleReadById,
    handleUpdateById,
    handleDeleteById
} = require('../utils/functions');

// Get all profiles
exports.getProfiles = async (req, res) => {
    try {
        const result = await handleReadAll(User)(req, res);
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', details: err.message });
    }
};

// Update a profile by ID
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, warehouseId, isActive } = req.body;

    try {
        const updatedProfile = await handleUpdateById(User)(req, res);
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', details: err.message });
    }
};

exports.deleteProfile = handleDeleteById(User);

// Delete a profile by ID
// exports.deleteProfile = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Retrieve the profile to check the role
//         const profile = await handleReadById(User)(id);
        
//         if (profile.role === '1') {
//             return res.status(400).json({ msg: 'Cannot delete master' });
//         }

//         await handleDeleteById(User)(id);
//         res.json({ msg: 'Profile deleted' });
//     } catch (err) {
//         // Ensure the error response is sent only once
//         if (!res.headersSent) {
//             res.status(500).json({ msg: 'Server error', details: err.message });
//         }
//     }
// };

