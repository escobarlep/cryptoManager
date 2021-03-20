export default (key?: string): string => {
  const languageSymbol = process.env.SYSTEM_LANGUAGE || 'pt'
  return stringList[key || 'default']?.[languageSymbol]
}

const stringList = {
  'default': {
    en: 'Ops! Sorry... A general Error occured.',
    pt: 'Ops! Desculpa... Ocorreu um erro.'
  },
  'no_admin_privileges': {
    en: 'Bot needs admin privileges',
    pt: 'Bot precisa de diretos de admin'
  }
}
