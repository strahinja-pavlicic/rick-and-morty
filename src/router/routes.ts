import api from "@/utils/api";

import { Episode } from "@/types/episode";

export const getEpisodeById = async (id: number): Promise<Episode> => {
  const response = await api.get(`/episode/${id}`);
  return response.data;
};
