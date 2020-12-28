export const product_default = {
  success: true,
  // msg: 'Get dewu Trending Success',
  data: [
    {
      showName: 'Air Jordan 1 Mid Shattered Backboard 扣碎篮板 篮球鞋',
      brand: 'Jordan',
      silhoutte: '',
      styleID: '554724-058',
      image: 'https://cdn.poizon.com/temp/Fn20HZPjmCnQk_VCNJ9C2HRg0xP5',
      image2:
        'https://stockx.imgix.net/Air-Jordan-1-Mid-Shattered-Backboard-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1603481985',
      urlKey: 'air-jordan-1-mid-shattered-backboard',
      spuId: 32581,
      slug: 'air-jordan-1-mid-starfish-black-554724-058',
      lowestPrice: {
        stockx: 109,
        goat: 130,
        dewu: 191,
      },
      resellLinks: {
        stockX: 'https://stockx.com/air-jordan-1-mid-shattered-backboard',
        goat: 'https://www.goat.com/sneakers/air-jordan-1-mid-starfish-black-554724-058',
        dewu: '',
      },
      time: 1606313441025,
      $setOnInsert: {
        __v: 0,
      },
    },
  ],
  isDBSearch: false,
}

export const prices_default = {
  success: true,
  // msg: 'Get dewu Prices Success',
  data: {
    styleID: '554724-058',
    brand: 'Jordan',
    image: 'https://cdn.poizon.com/temp/Fn20HZPjmCnQk_VCNJ9C2HRg0xP5',
    image2:
      'https://stockx.imgix.net/Air-Jordan-1-Mid-Shattered-Backboard-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1603481985',
    lowestPrice: {
      stockx: 110,
      goat: 363,
      dewu: 196,
    },
    resellLinks: {
      stockX: 'https://stockx.com/air-jordan-1-mid-shattered-backboard',
      goat: 'https://www.goat.com/sneakers/air-jordan-1-mid-starfish-black-554724-058',
      dewu: '',
    },
    showName: 'Air Jordan 1 Mid Shattered Backboard 扣碎篮板 篮球鞋',
    silhoutte: '',
    slug: 'air-jordan-1-mid-starfish-black-554724-058',
    spuId: 32581,
    time: 1606156451307,
    urlKey: 'air-jordan-1-mid-shattered-backboard',
    baseProperties: [
      {
        key: '主货号',
        value: '554724-058',
      },
      {
        key: '发售价格',
        value: '¥969(仅供参考)',
      },
      {
        key: '发售日期',
        value: '2019.06.01',
      },
      {
        key: '鞋头款式',
        value: '圆头',
      },
      {
        key: '鞋跟类型',
        value: '平跟',
      },
      {
        key: '鞋帮高度',
        value: '中帮',
      },
      {
        key: '配色',
        value: '橙色',
      },
    ],
    images: [
      'https://cdn.poizon.com/temp/Fn20HZPjmCnQk_VCNJ9C2HRg0xP5',
      'https://cdn.poizon.com/temp/Fm7ryJAi0QLvkMGEMgs6hTgA6ls9',
      'https://cdn.poizon.com/temp/FitiPOAvctKmCdpsEoJh1yWNkLRl',
      'https://cdn.poizon.com/temp/FmBKlHVhMlpoeOEOfKAOFsAABhoH',
      'https://cdn.poizon.com/temp/FuXYtG1ellLzix-qxx1FWoTo9pBz',
      'https://cdn.poizon.com/temp/FpHUYkdc3AQdVWwqhI0ZdGvdJoj7',
    ],
    sizeImage:
      'https://cdn.poizon.com/node-common/Y2FwdHVyZTE1OTcyOTcyMzkzMjQ=.jpeg?x-oss-process=image/resize,w_1080',
    sizePrices: {
      dewu: {
        '40': 301,
        '41': 249,
        '42': 237,
        '43': 228,
        '44': 232,
        '45': 229,
        '46': 196,
        '47': 302,
        '40.5': 258,
        '42.5': 226,
        '44.5': 234,
        '45.5': 228,
        '47.5': 223,
        '49.5': 213,
      },
      stockx: {
        '7': 347,
        '8': 224,
        '9': 202,
        '10': 210,
        '11': 209,
        '12': 185,
        '13': 224,
        '14': 218,
        '15': 180,
        '17': 160,
        '18': 110,
        '7.5': 279,
        '8.5': 219,
        '9.5': 214,
        '10.5': 217,
        '11.5': 195,
        '12.5': 223,
      },
      goat: {
        '7': 370,
        '8': 220,
        '9': 209,
        '10': 238,
        '11': 247,
        '12': 223,
        '13': 212,
        '14': 249,
        '15': 295,
        '18': 250,
        '7.5': 322,
        '8.5': 222,
        '9.5': 230,
        '10.5': 222,
        '11.5': 194,
        '12.5': 120,
      },
    },
  },
}

export const product_error = {
  success: false,
  // msg: 'Get dewu Trending Fail',
  data: [],
}

export const prices_error = {
  success: false,
  data: {},
}

export const following_default = {
  success: true,
  data: ['554724-058'],
}

export const following_noAuth = {
  success: false,
  msg: 'Authentication Error',
  err: {
    message: 'Authentication Error',
  },
}

export const suggestions_error = {
  success: false,
  data: [],
}

export const login_default = {
  success: true,
  msg: 'Login Success',
  data: {
    username: 'admin2',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlkIjoiNWZjN2FmYjRhZmQ5N2M4ODllMjBjNGU0IiwiaWF0IjoxNjA2OTIyMjI1LCJleHAiOjE2MDc1MjcwMjV9.WT9Yzo0LKBPyzRSs1CF4KyPriUvVICoNgHXRXTiiGow',
  },
}

export const login_error = {
  success: false,
  msg: 'username or passwoad is wrong',
  err: {
    message: 'username or passwoad is wrong',
  },
}
