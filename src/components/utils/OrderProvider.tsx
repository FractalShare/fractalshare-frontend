export function saveOrder(data: {
  amount: number;
  sharePrice: number;
  estimatedShares: number;
  address: string;
}) {
  sessionStorage.setItem('orderData', JSON.stringify(data));
}

export function loadOrder() {
  const json = sessionStorage.getItem('orderData');
  return json ? JSON.parse(json) : null;
}

export function saveSell(data: {
  shares: number;
  name: string;
  sharePrice: number;
}) {
  sessionStorage.setItem('sellData', JSON.stringify(data));
}

export function loadSell() {
  const json = sessionStorage.getItem('sellData');
  return json ? JSON.parse(json) : null;
}
