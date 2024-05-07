import {allResearch, getResearch, insertResearch} from '../models/researchesModel.js'

export const getResearches = async (req, res) => {
  const researches = await allResearch()
  //console.log('researches:\t',researches)
  res.render('research/index.ejs', {data: researches})
}

export const readResearch = async (req, res) => {
  const research = await getResearch(req.params.id)
  //console.log('r:\t',research)
  res.render('research/view.ejs', {r: research})
}

export const createResearch = async (req, res) => {
  const research = req.body

  const ret = await insertResearch(req.body)
}

export const updateResearch = async (req, res) => {

}

export const deleteResearch = async (req, res) => {

}

export const editResearch = async (req, res) => {
  res.render('research/edit.ejs')
}
