import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/location";
import { getLocationById } from "@/router/routes";

export const useLocation = (id: number) => {
  return useQuery<Location>({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id),
    enabled: !!id,
  });
};
