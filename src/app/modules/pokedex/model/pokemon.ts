export interface Pokemon {
  id: number;
  name: string;
  url: string;
  stats: [
    {
      base_stat: number;
      stat: {
        name: string
      }
    }
  ];
}
