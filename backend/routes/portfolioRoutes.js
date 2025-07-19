const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.post('/', portfolioController.createPortfolio);
router.get('/', portfolioController.getAllPortfolios);
router.get('/:id', portfolioController.getPortfolioById);
router.put('/:id', portfolioController.updatePortfolio);
router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;
