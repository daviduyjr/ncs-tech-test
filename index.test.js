const amaySimShoppingCart = require('./index')

describe('Tech Test', () => {
	let cart;

	beforeEach(() => {
		cart = new amaySimShoppingCart({
      "Unlimited 1GB": {
        price: 24.9,
        promoCodes: [],
        promoDiscount: 0,
      },
			"Unlimited 2GB": {
        price: 29.90,
        promoCodes: [],
        promoDiscount: 0,
      },
      "Unlimited 5GB": {
        price: 44.9,
        promoCodes: [],
        promoDiscount: 39.90,
      },
      "1 GB Data-pack": {
        price: 9.90,
        promoCodes: [],
        promoDiscount: 0,
      },
    });
	})
	test('scenario 1', () => {
		cart.add("Unlimited 1GB");
    cart.add("Unlimited 1GB");
    cart.add("Unlimited 1GB");
    cart.add("Unlimited 5GB");

		const { totalPrice } = cart.total();
		const { items } = cart.itemsList();
		const unlimited1GBCount = items.filter(a => a.item === 'Unlimited 1GB').length;
		const unlimited5GBCount = items.filter(a => a.item === 'Unlimited 5GB').length;
		expect(unlimited1GBCount).toBe(3);
		expect(unlimited5GBCount).toBe(1);
		expect(totalPrice).toBe("94.70");
	})

	test('scenario 2', () => {
		cart.add("Unlimited 1GB");
    cart.add("Unlimited 1GB");
    cart.add("Unlimited 5GB");
    cart.add("Unlimited 5GB");
    cart.add("Unlimited 5GB");
    cart.add("Unlimited 5GB");

		const { totalPrice } = cart.total();
		const { items } = cart.itemsList();
		const unlimited1GBCount = items.filter(a => a.item === 'Unlimited 1GB').length;
		const unlimited5GBCount = items.filter(a => a.item === 'Unlimited 5GB').length;
		expect(unlimited1GBCount).toBe(2);
		expect(unlimited5GBCount).toBe(4);
		expect(totalPrice).toBe("209.40");
	})

	test('scenario 3', () => {
		cart.add("Unlimited 1GB");
    cart.add("Unlimited 2GB");
    cart.add("Unlimited 2GB");

		const { totalPrice } = cart.total();
		const { items } = cart.itemsList();
		const unlimited1GBCount = items.filter(a => a.item === 'Unlimited 1GB').length;
		const unlimited2GBCount = items.filter(a => a.item === 'Unlimited 2GB').length;
		const dataPackCount = items.filter(a => a.item === '1 GB Data-pack').length;
		
		expect(unlimited1GBCount).toBe(1);
		expect(unlimited2GBCount).toBe(2);
		expect(dataPackCount).toBe(2)
		expect(totalPrice).toBe("84.70");
	})

	test('scenario 4', () => {
		cart.add("Unlimited 1GB", "I<3AMAYSIM");
    cart.add("1 GB Data-pack", "I<3AMAYSIM");
		const { totalPrice } = cart.total();
		const { items } = cart.itemsList();
		const unlimited1GBCount = items.filter(item => item.item === 'Unlimited 1GB').length
		const dataPackCount = items.filter(a => a.item === '1 GB Data-pack').length;
		
		expect(unlimited1GBCount).toBe(1);
		expect(dataPackCount).toBe(1);
		expect(totalPrice).toBe("31.32");
	})
})
