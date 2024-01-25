type IPartnersConfig = {
  id: number;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
};

export const PartnersConfig: IPartnersConfig[] = [
  {
    id: 0,
    images: [
      {
        id: 0,
        src: "/images/usaid.png",
        alt: "usaid logo",
      },
      {
        id: 1,
        src: "/images/space.png",
        alt: "space logo",
      },
      {
        id: 2,
        src: "/images/t-net.png",
        alt: "t-net logo",
      },
    ],
  },
  {
    id: 1,
    images: [
      {
        id: 3,
        src: "/images/tegeta.png",
        alt: "tegeta logo",
      },
      {
        id: 4,
        src: "/images/spectre.png",
        alt: "spectre logo",
      },
      {
        id: 5,
        src: "/images/tbc-leasing.png",
        alt: "tbc-leasing logo",
      },
    ],
  },
  {
    id: 2,
    images: [
      {
        id: 6,
        src: "/images/ufc.png",
        alt: "ufc logo",
      },
    ],
  },
];
