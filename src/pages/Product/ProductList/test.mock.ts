export const props = {
  error: false,
  loading: false,
  shoeLists: [
    {
      urlKey: 'nike-m2k-tekno-linen',
      brand: 'Nike',
      image: '',
      image2: 'https://stockx.imgix.net/Nike-M2K-Tekno-Linen.png',
      lowestPrice: {
        stockx: 130,
        goat: 100,
        dewu: 123,
      },
      resellLinks: {
        stockX: 'https://stockx.com/nike-m2k-tekno-linen',
        goat: 'https://www.goat.com/sneakers/m2k-tekno-sp-wheat-bv0074-200',
        dewu: '',
      },
      showName: "M2K Tekno SP 'Linen'",
      silhoutte: 'M2K Tekno',
      slug: 'm2k-tekno-sp-wheat-bv0074-200',
      spuId: 25606,
      styleID: 'BV0074 200',
      time: 1601314772631,
    },
  ],
  onOpenHandle: jest.fn(),
}

export const props2 = {
  error: true,
  loading: false,
  shoeLists: [],
  onOpenHandle: jest.fn(),
}
