import { useMutation, useQuery } from '@tanstack/react-query';

import { deliveryKeys } from '../services/delivery/delivery.keys';
import {
  deliveryService,
  type DeliveryType,
} from '../services/delivery/delivery.service';

export const useDeliveryCities = (search: string) => {
  return useQuery({
    queryKey: deliveryKeys.cities(search),
    queryFn: () => deliveryService.getCities(search),
    enabled: search.length >= 2,
    staleTime: 1000 * 60 * 10,
  });
};

export const useDeliveryWarehouses = (cityRef: string, type: DeliveryType) => {
  return useQuery({
    queryKey: deliveryKeys.warehouses(cityRef, type),
    queryFn: () => deliveryService.getWarehouses(cityRef, type),
    enabled: Boolean(cityRef),
    staleTime: 1000 * 60 * 10,
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: deliveryService.checkout,
  });
};
