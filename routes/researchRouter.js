import { Router } from 'express'
import {
  getResearches,
  readResearch,
  createResearch,
  deleteResearch,
  errorResearch,
  editResearch,
  } from '../controllers/researchesController.js'

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
  .delete(deleteResearch)

// Path '/:id/edit'
/*
router.route('/:id/edit')
  .get(editResearch)
  .patch(patchResearch)
*/
router.all('*',errorResearch)

export default router
