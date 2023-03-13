// change more references and functions to users, thoughts. 
const router = require('express').Router();
const { getAllThoughts, 
    createThought, 
    getThoughtById, 
    updateThought, 
    deleteThought, 
    createReaction, 
    deleteReaction 
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts);

// /api/thoughts/userId
// in JSON EXAMPLE {"thoughtText": "Here are my thoughts for the day..","username": "Riley","userId": "640bd747b86fb218850e490d"}
router.route('/:userId').post(createThought);

// /api/thoughts/userId
router.route('/:thoughtId').get(getThoughtById).put(updateThought);

// /api/thoughts/thoughtId
router.route('/:userId/:thoughtId').delete(deleteThought);

// /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/:reactions').post(createReaction);
// /api/thoughts/thoughtId
router.route('/:thoughtId/:reactions/:reactionId').delete(deleteReaction);

module.exports = router;