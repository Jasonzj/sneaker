const interfaceName = {
  stockx: 'stockx',
  goat: 'goat',
  dewu: 'dewu',
  db: 'db',
}

const defaultInterface = interfaceName.dewu

export default {
  title: 'Sneakers App',
  bannerText: 'Search for Shoes and Integration Price For All Size',
  openPages: ['/sign_in', '/sign_up'],
  homePage: '/trending/dewu',
  apiPrefix: '/api/v1',
  interfaceName,
  defaultInterface,
}
