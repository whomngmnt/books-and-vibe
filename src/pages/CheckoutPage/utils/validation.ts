export const validateCardNumber = (num: string): boolean => {
  const sanitized = num.replace(/\s+/g, '');
  if (!/^\d{16}$/.test(sanitized)) return false;

  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    let intVal = parseInt(sanitized[i], 10);
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) intVal -= 9;
    }
    sum += intVal;
  }
  return sum % 10 === 0;
};

export interface CheckoutValidationValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedCityRef: string;
  selectedWarehouse: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

export const validateCheckoutForm = (values: CheckoutValidationValues) => {
  const newErrors: Record<string, string> = {};

  if (!values.firstName.trim())
    newErrors.firstName = 'checkout.error.firstNameRequired';
  else if (values.firstName.trim().length < 2)
    newErrors.firstName = 'checkout.error.firstNameShort';

  if (!values.lastName.trim())
    newErrors.lastName = 'checkout.error.lastNameRequired';
  else if (values.lastName.trim().length < 2)
    newErrors.lastName = 'checkout.error.lastNameShort';

  const phoneDigits = values.phoneNumber.replace(/\D/g, '');
  if (!values.phoneNumber.trim()) {
    newErrors.phoneNumber = 'checkout.error.phoneRequired';
  } else if (!(phoneDigits.length === 10 || phoneDigits.length === 12)) {
    newErrors.phoneNumber = 'checkout.error.phoneInvalid';
  }

  if (!values.selectedCityRef)
    newErrors.searchCity = 'checkout.error.cityRequired';
  if (!values.selectedWarehouse)
    newErrors.selectedWarehouse = 'checkout.error.warehouseRequired';

  if (!values.cardNumber)
    newErrors.cardNumber = 'checkout.error.cardNumberRequired';
  else if (!validateCardNumber(values.cardNumber))
    newErrors.cardNumber = 'checkout.error.cardNumberInvalid';

  if (!values.cardName.trim())
    newErrors.cardName = 'checkout.error.cardNameRequired';

  if (!values.cardExpiry || !/^\d{2}\/\d{2}$/.test(values.cardExpiry)) {
    newErrors.cardExpiry = 'checkout.error.cardExpiryInvalid';
  } else {
    const [month, year] = values.cardExpiry
      .split('/')
      .map((num) => parseInt(num, 10));
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = parseInt(
      now.getFullYear().toString().substring(2, 4),
      10,
    );

    if (month < 1 || month > 12) {
      newErrors.cardExpiry = 'checkout.error.cardExpiryInvalid';
    } else if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      newErrors.cardExpiry = 'checkout.error.cardExpiryExpired';
    }
  }

  if (!values.cardCvc) newErrors.cardCvc = 'checkout.error.cardCvcRequired';
  else if (!/^\d{3}$/.test(values.cardCvc)) {
    newErrors.cardCvc = 'checkout.error.cardCvcInvalid';
  }

  return newErrors;
};
