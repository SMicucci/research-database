import {
  allResearch,
  dropResearch,
  getResearch,
  insertResearch,
  paramExist,
  updateValue} from '../models/researchesModel.js'

export const getResearches = async (req, res) => {
  const researches = await allResearch()
  res.render('research/index', {data: researches})
}

export const readResearch = async (req, res) => {
  const research = await getResearch(req.params.id)
  res.render('research/view', {r: research})
}

export const createResearch = async (req, res) => {
  console.log("\x1b[33m[createResearch]\x1b[0m")
  // parse research object
  var research = {
    name: req.body.name,
    pmid: req.body.pmid,
    doi: req.body.doi,
    number: req.body.number,
    single: req.body.single,
    summary: req.body.summary,
  }
  // fix checkbox params
  if (Array.isArray(research.single)) {
    research.single = req.body.single[0]
    console.log(req.body.single[0])
  }
  // error logic
  var e = {
    name: research.name ? await paramExist('name',research.name) : true,
    pmid: research.pmid ? isNaN(research.pmid) ? true : await paramExist('pmid',research.pmid) : false,
    doi: research.doi ? await paramExist('doi',research.doi) : true,
    number: research.number ? isNaN(research.number) : true,
    summary: research.summary ? false : true,
  }

  // check errors
  if (!e.name && !e.pmid && !e.doi && !e.number && !e.summary) {
    // if no error create research
    const newResearch = await insertResearch(research)
    res.statusMessage = "new research created"
    res.status(201).redirect(`/research/` + newResearch.id )
  } else {
    // if error reload and keep values
    console.log("research:",research)
    console.log("error:",e)
    res.statusMessage = "constrains not respected"
    res.status(406).render('research/edit', {r: research, e: e})
  }
}

export const patchResearch = async (req, res) => {
  const old_r = await getResearch(req.params.id)
  const new_r = req.body
  console.log("old research:",old_r,"\nnew research:",new_r)
  for (const [old_k, old_v] of Object.entries(old_r)) {
    for (const [new_k, new_v] of Object.entries(new_r)) {
      if (old_k === new_k) {
        if (old_v != new_v) {
          await updateValue(req.params.id, new_k, new_v)
        } else {
          break
        }
      } else {
        continue
      }
    }
  }
  res.status(200)
}

export const deleteResearch = async (req, res) => {
  const research = await dropResearch(req.params.id)
  console.log("\x1b[33m[dropResearch]\x1b[0m research:", research)
  res.status(204).end()
}

// load edit form
export const editResearch = async (req, res) => {
  console.log("\x1b[33m[editResearch]\x1b[0m")
  // check params
  if (req.params && req.params.id) {
    const research = await getResearch(req.params.id)
    res.render('research/edit', {e: {}, r: research})
  } else {
    res.render('research/edit', {e: {}, r:{}})
  }
}
