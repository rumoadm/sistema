import { eua } from './eua'
import { italia } from './italia'
import { paraguai } from './paraguai'
import { portugal } from './portugal'

export const countries = [portugal, eua, italia, paraguai]

export function countryOf(code) {
  return countries.find((country) => country.code === code) || null
}

export function pathOf(plan) {
  const country = countryOf(plan?.countryCode)
  if (!country) return null
  return country.paths.find((path) => path.id === plan.pathId) || country.paths[0]
}

export function createPlan(countryCode, pathId) {
  const country = countryOf(countryCode)
  const path = country?.paths.find((item) => item.id === pathId)
  if (!country || !path) return null
  return {
    countryCode: country.code,
    pathId: path.id,
    tasks: path.tasks.map((task) => ({ id: task.id, done: false })),
    documents: path.documents.map((document) => ({ id: document.id, status: 'pendente' })),
  }
}
