function calculatePoints(receipt) {
    const { retailer, purchaseDate, purchaseTime, total, items } = receipt;
    let points = 0;
  
    const totalValue = parseFloat(total);
    const [year, month, day] = purchaseDate.split('-').map(Number);
    const [hh, mm] = purchaseTime.split(':').map(Number);
    const purchaseMinutes = hh * 60 + mm;
  
    // Alphanumeric chars in retailer
    points += (retailer.match(/[A-Za-z0-9]/g) || []).length;
  
    // Round dollar
    if (Number.isInteger(totalValue)) points += 50;
  
    // Multiple of $0.25
    if (Math.round(totalValue * 100) % 25 === 0) points += 25;
  
    // 5 points per 2 items
    points += Math.floor(items.length / 2) * 5;
  
    // 3-char items
    points += items.reduce((sum, { shortDescription, price }) => {
      const len = shortDescription.trim().length;
      if (len % 3 === 0) {
        sum += Math.ceil(parseFloat(price) * 0.2);
      }
      return sum;
    }, 0);
  
    // Odd purchase day
    if (day % 2 === 1) points += 6;
  
    // Purchase between 2:00pm and 4:00pm
    if (purchaseMinutes > 14 * 60 && purchaseMinutes < 16 * 60) {
      points += 10;
    }
  
    return points;
}

const example = {
    "retailer": "M&M Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
      {
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      }
    ],
    "total": "9.00"
  };
  
console.log(calculatePoints(example)); // 15

//localhost:3000/receipts/process
//localhost:3000/receipts/f8eb378d-e845-4643-927c-a571dbd7d89f/points