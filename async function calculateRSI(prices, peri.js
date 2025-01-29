async function calculateRSI(prices, period = 14) {
    let gains = 0, losses = 0;
    for (let i = 1; i < period; i++) {
        const diff = prices[i] - prices[i - 1];
        if (diff > 0) gains += diff;
        else losses -= diff;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
}

async function getTradeSignal(prices) {
    const rsi = await calculateRSI(prices);
    if (rsi > 70) return "Sell";
    if (rsi < 30) return "Buy";
    return "Hold";
}
