'use client';

export const fetchGithubStats = async (login: string): Promise<string> => {
  const fetchOption: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'image/svg+xml',
    },
  };

  try {
    const res: Response = await fetch(
      `/api/github-stats-advanced?login=${login}`,
      fetchOption,
    );

    if (res.status === 200) {
      return res.text();
    }

    throw new Error(
      JSON.stringify({
        status: res.status,
        statusText: res.statusText,
      }),
    );
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error(err);
  }
};

type ResultAttr = {
  id: string;
  name: string;
  description: string;
};

export type StatsInfo = {
  earth: ResultAttr;
  fire: ResultAttr;
  gold: ResultAttr;
  people: ResultAttr;
  tree: ResultAttr;
  water: ResultAttr;
};
