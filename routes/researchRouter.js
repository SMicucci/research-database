import { Router } from 'express'
import {
  getResearches,
  readResearch,
  createResearch,
  updateResearch,
  deleteResearch,
  editResearch,
  patchResearch} from '../controllers/researchesController.js'

const router = new Router()

// Path: '/'
router.route('/')
  .get(getResearches)

// Path: '/new'
router.route('/new')
  .get(editResearch)
  .post(createResearch)

// Path: '/:id'
router.route('/:id')
  .get(readResearch)
  .patch(patchResearch)
  .delete(deleteResearch)

// Path '/:id/edit'
router.route('/:id/edit')
  .get(updateResearch)

export default router
