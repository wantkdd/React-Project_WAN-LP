import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLp } from '../../../apis/lp-detail';
import { UpdateLpRequest } from '../../../types/lp-detail';

export const useUpdateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lpId,
      payload,
    }: {
      lpId: number;
      payload: UpdateLpRequest;
    }) => updateLp({ lpId, payload }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['lpDetail', variables.lpId],
      });
    },
  });
};
