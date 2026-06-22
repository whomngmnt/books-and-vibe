export type DeliveryType = 'warehouse' | 'poshtomat';

export type DeliveryOption = {
  ref: string;
  name: string;
};

type CheckoutPayload = {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  total: number;
  delivery: {
    type: DeliveryType;
    cityRef: string;
    warehouse: string;
  };
};

type CheckoutResponse = {
  data: string;
  signature: string;
};

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json() as Promise<T>;
}

export const deliveryService = {
  getCities(search: string) {
    return requestJson<DeliveryOption[]>(
      `/api/delivery/cities?search=${encodeURIComponent(search)}`,
    );
  },

  getWarehouses(cityRef: string, type: DeliveryType) {
    return requestJson<DeliveryOption[]>(
      `/api/delivery/warehouses?cityRef=${cityRef}&type=${type}`,
    );
  },

  checkout(payload: CheckoutPayload) {
    return requestJson<CheckoutResponse>('/api/orders/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
};
