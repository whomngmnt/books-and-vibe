export const deliveryKeys = {
  all: ['delivery'] as const,

  cities: (search: string) => [...deliveryKeys.all, 'cities', search] as const,

  warehouses: (cityRef: string, type: 'warehouse' | 'poshtomat') =>
    [...deliveryKeys.all, 'warehouses', cityRef, type] as const,
};
