import api from "@/utils/api";

import { Episode } from "@/types/episode";
import { Location } from "@/types/location";
export const getEpisodeById = async (id: number): Promise<Episode> => {
  const response = await api.get(`/episode/${id}`);
  return response.data;
};

export const getLocationById = async (id: number): Promise<Location> => {
  const response = await api.get(`/location/${id}`);
  return response.data;
};
