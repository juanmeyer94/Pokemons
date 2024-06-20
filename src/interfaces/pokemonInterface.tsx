export type Pokemon = {
  name: string;
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
  base_experience: number;
  height: number;
  weight: number;
  id: number;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
};

