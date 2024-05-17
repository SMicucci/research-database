import fs from 'fs'
import {
  allResearch,
  dropResearch,
  getResearch,
  insertResearch,
  paramExist,
  } from '../models/researchesModel.js'

export const getResearches = async (req, res) => {
  console.log("\x1b[33m[getResearches]\x1b[0m")
  const researches = await allResearch()
  res.render('research/index', {data: researches})
}

export const readResearch = async (req, res) => {
  console.log("\x1b[33m[readResearch]\x1b[0m")
  if (isNaN(req.params.id)) {
    errorResearch(req, res)
  } else {
    const research = await getResearch(req.params.id)
    if (research) {
      res.render('research/view', {r: research})
    } else {
      errorResearch(req, res)
    }
  }
}

export const createResearch = async (req, res) => {
  console.log("\x1b[33m[createResearch]\x1b[0m")
  // RESEARCH OBJECT
  var research = {
    name: req.body.name,
    pmid: req.body.pmid,
    doi: req.body.doi,
  }
  // FILE OBJECT
  const pdf = req.files.pdf

  // CREATE AND REDIRECT
  const newResearch = await insertResearch(research)
  const path = './db/research/' + newResearch.id + '.pdf'
  pdf.mv(path, (err) =>{
      if (err)
        return res.status(500).send(err)
    })
  res.redirect(req.baseUrl + '/' + newResearch.id)
}

export const deleteResearch = async (req, res) => {
  console.log("\x1b[33m[dropResearch]\x1b[0m")
  const dropped = dropResearch(req.params.id)
  const path = './db/research/' + req.params.id + '.pdf'
  fs.unlink(path, (err) => {
    if (err) throw err
    console.log('file deleted: ',path)
  })
  await dropped
  res.status(204).end()
}

// load edit form
export const editResearch = async (req, res) => {
  console.log("\x1b[33m[editResearch]\x1b[0m \x1b[35m" + req.originalUrl + "\x1b[0m")
  console.log('-- QUERY => ', req.query)
  // check query
  if (Object.keys(req.query)!=0) {
    var valid = {}
    if (req.query.name)
      valid.name = await paramExist('name', req.query.name)
    if (req.query.pmid)
      valid.pmid = await paramExist('pmid', req.query.pmid)
    if (req.query.doi)
      valid.doi = await paramExist('doi', req.query.doi)
    console.log(JSON.stringify(valid))
    res.status(200).json(valid)
  } else {
    res.render('research/edit')
  }
}

export const errorResearch = (req, res) => {
  res.status(404).render('research/404')
}
