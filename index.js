class amaySimShoppingCart {
	constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.items = [];
  }
	
	add(item, promoCode) {
		if (item === 'Unlimited 1GB') {
			const simCount = this.items.filter(a => a.item === 'Unlimited 1GB').length;
			const price = simCount % 3 === 2 ? 0 : this.pricingRules[item].price;
      this.items.push({ item, price, promoCode });
			return
		} 
		if (item === 'Unlimited 2GB') {
			this.items.push({ item, price: this.pricingRules[item].price, promoCode });
			this.items.push({ item: '1 GB Data-pack', price: this.pricingRules['1 GB Data-pack'].promoDiscount, promoCode });
			return
		}
		this.items.push({ item, price: this.pricingRules[item].price, promoCode });
  }

  total() {
    let totalPrice = 0;
    let totalDiscount = 0;
    let itemCounts = {};
    for (const { item } of this.items) {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    }
		if(itemCounts['Unlimited 5GB'] > 3) {
			this.items = this.items.map(item => {
				if(item.item === 'Unlimited 5GB') return {...item, price: 39.90}
				return item
			})
		}

		this.items = this.items.map(item => {
			return this.items = item.promoCode === 'I<3AMAYSIM' ? {...item, price: item.price * 0.9} : item
		})

		for (const { item, price, promoCode } of this.items) {
      totalPrice += price;
    }

		let finalPrice = totalPrice - totalDiscount
    return {
      totalPrice: finalPrice.toFixed(2),
      itemsInCart: this.items,
    };
  }

	itemsList() {
		return {
			items: this.items
		}
	}
}

module.exports = amaySimShoppingCart