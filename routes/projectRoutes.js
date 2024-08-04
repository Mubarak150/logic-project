const express = require('express');
const {protect} = require('../middleware/auth')
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require('../controllers/projectController');

router.post('/', protect, createProject);
router.get('/', protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.patch('/:id', protect, updateProjectById);
router.delete('/:id', protect, deleteProjectById);

module.exports = router;
