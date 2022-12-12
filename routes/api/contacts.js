const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { addSchema, addStatusSchema } = require('../../schemas/contacts');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', validateBody(addSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', validateBody(addStatusSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
