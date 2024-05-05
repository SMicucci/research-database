import { Router } from 'express'
import {
  getResearches, readResearch, createResearch, updateResearch, deleteResearch,
  editResearch
} from '../controllers/researchesController.js'

const router = new Router()

// GET /
router.get('/', (req, res) => {
  getResearches(req, res)
})
// GET /new
router.get('/new', (req, res) => {
  editResearch(req, res)
})
// GET /:id
router.get('/:id', (req, res) => {
  readResearch(req, res)
})
// GET /:id/edit
router.get('/:id/edit', (req, res) => {
  readResearch(req, res)
})
// POST /
router.post('/new', (req, res) => {
  createResearch(req, res)
})
// UPDATE /:id
router.post('/:id', (req, res) => {
  updateResearch(req, res)
})
// DELETE /:id
router.post('/:id', (req, res) => {
  deleteResearch(req, res)
})


export default router
