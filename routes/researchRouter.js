import { Router } from 'express'
import {
  getResearches,
  readResearch,
  createResearch,
  deleteResearch,
  errorResearch,
  editResearch,
  readResearchFile,
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

router.route('/:id/file')
  .get(readResearchFile)

router.all('*',errorResearch)

export default router
