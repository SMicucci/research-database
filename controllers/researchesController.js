import {
  allResearch,
  dropResearch,
  getResearch,
  insertResearch,
  paramExist} from '../models/researchesModel.js'

export const getResearches = async (req, res) => {
  const researches = await allResearch()
  res.render('research/index.ejs', {data: researches})
}

export const readResearch = async (req, res) => {
  const research = await getResearch(req.params.id)
  res.render('research/view.ejs', {r: research})
}

export const createResearch = async (req, res) => {
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
    pmid: research.pmid ? isNaN(research.pmid) ? false : await paramExist('pmid',research.pmid) : false,
    doi: research.doi ? await paramExist('doi',research.doi) : true,
    number: research.number ? isNaN(research.number) : true,
    summary: research.summary ? false : true,
  }

  // check errors
  if (!e.name && !e.pmid && !e.doi && !e.number && !e.summary) {
    // if no error create research
    const newResearch = await insertResearch(research)
    res.redirect(`/research/` + newResearch.id )
  } else {
    // if error reload and keep values
    console.log("research:",research)
    console.log("error:",e)
    res.render('research/edit.ejs', {e: e, r: research, path: req.baseUrl + req.path})
  }
  
}

export const patchResearch = async (req, res) => {
  console.log(req.body)
  res.redirect('/research')
}

export const updateResearch = async (req, res) => {
  console.log("\x1b[33m[updateResearch]\x1b[0m: Url:", req.baseUrl + req.path)
  const r= await getResearch(req.params.id)
  var e= {
    //r.name empty? error, else if exist error
    name: r.name ? await paramExist('name',r.name) : true,
    //r.pmid empty? ok, else if exist error
    pmid: r.pmid ? isNaN(r.pmid) ? true : await paramExist('pmid',r.pmid) : false,
    //r.doi empty? error, else id exist error
    doi: r.doi ? await paramExist('doi',r.doi) : true,
    //r.number empty? error, else check if is not a number
    number: r.number ? isNaN(r.number) : true,
    //r.summary empty? error
    summary: r.summary ? false : true,
  }
  res.render('research/edit.ejs', {e: e, r: r, path: req.baseUrl + req.params.id})
}

export const deleteResearch = async (req, res) => {
  const research = await dropResearch(req.params.id)
  console.log("\x1b[33m[dropResearch]\x1b[0m research:", research)
  res.status(204).end()
}

// load edit form
export const editResearch = async (req, res) => {
  console.log("\x1b[33m[editResearch]\x1b[0m: Url:", req.baseUrl + req.path)
  // check params
  if (req.params) {
    const research = await getResearch(req.params.id)
    res.render('research/edit.ejs', {e: {}, r: research, path: req.baseUrl + req.path})
  } else {
    res.render('research/edit.ejs', {e: {}, r:{}, path: req.baseUrl + req.path})
  }
}
