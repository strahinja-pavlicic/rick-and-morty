import { useQuery } from "@tanstack/react-query";
import { getEpisodeById } from "@/router/routes";
import { Episode } from "@/types/episode";

export const useEpisode = (id: number) => {
  return useQuery<Episode>({
    queryKey: ["episode", id],
    queryFn: () => getEpisodeById(id),
    enabled: !!id,
  });
};
