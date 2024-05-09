import {query} from 'express'
import {allResearch, getId, getResearch, insertResearch, paramExist} from '../models/researchesModel.js'

export const getResearches = async (req, res) => {
  const researches = await allResearch()
  //console.log('researches:\t',researches)
  res.render('research/index.ejs', {data: researches})
}

export const readResearch = async (req, res) => {
  const research = await getResearch(req.params.id)
  res.render('research/view.ejs', {r: research})
}

export const createResearch = async (req, res) => {
  var r= req.body
  if (Array.isArray(r.single)) {
    r.single = req.body.single[0]
    console.log( req.body.single[0])
  }
  var e= {
    name: r.name ? await paramExist('name',r.name) : true, //r.name empty? error, else if exist error
    pmid: r.pmid ? isNaN(r.pmid) ? true : await paramExist('pmid',r.pmid) : false, //r.pmid empty? ok, else if exist error
    doi: r.doi ? await paramExist('doi',r.doi) : true, //r.doi empty? error, else id exist error
    number: r.number ? isNaN(r.number) : true, //r.number empty? error, else check if is not a number
    summary: r.summary ? false : true, //r.summary empty? error
  }

  if (!e.name && !e.pmid && !e.doi && !e.number && !e.summary) {
    //branch for no error spotted
    await insertResearch(r)
    const id = await getId(r.name, r.doi, r.pmid)
    res.redirect(`/research/`+id)
  } else {
    console.log("research:",r)
    console.log("error:",e)
    res.render('research/edit.ejs', {e: e, r: r, path: req.originalURL})
  }
  
}

export const updateResearch = async (req, res) => {
  const research = await getResearch(req.params.id)
  var e= {
    name: r.name ? await paramExist('name',r.name) : true, //r.name empty? error, else if exist error
    pmid: r.pmid ? isNaN(r.pmid) ? true : await paramExist('pmid',r.pmid) : false, //r.pmid empty? ok, else if exist error
    doi: r.doi ? await paramExist('doi',r.doi) : true, //r.doi empty? error, else id exist error
    number: r.number ? isNaN(r.number) : true, //r.number empty? error, else check if is not a number
    summary: r.summary ? false : true, //r.summary empty? error
  }
  res.render('research/edit.ejs', {e: e, r: research, path: originalURL})
}

export const deleteResearch = async (req, res) => {

}

export const editResearch = async (req, res) => {
  console.log(req.originalURL)
  res.render('research/edit.ejs', {e: {}, r:{}, path: req.originalURL})
}
