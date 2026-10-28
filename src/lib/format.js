function properName(value) {
  const clean = String(value || '').trim()
  if (!clean) return ''
  return clean.charAt(0).toLocaleUpperCase('pt-BR') + clean.slice(1).toLocaleLowerCase('pt-BR')
}

export function firstName(name) {
  return properName(String(name || '').trim().split(/\s+/)[0])
}

export function greeting(name) {
  const hour = new Date().getHours()
  const hello = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  return `${hello}, ${firstName(name)}`
}

export const DOC_STATUS = {
  pendente: 'Pendente',
  andamento: 'Em andamento',
  pronto: 'Pronto',
}
