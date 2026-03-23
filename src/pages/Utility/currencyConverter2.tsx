import { useState, useMemo } from 'react';

type Rates = Record<string, number>;

export function CurrencyConverter() {
    const [amount, setAmount] = useState<number>(1);
    const [startCurrency, setStartCurrency] = useState<string>("USD");
    const [endCurrency, setEndCurrency] = useState<string>("EUR");

    const exchangeRates: Rates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110
    }

    const convertedAmounts = useMemo(() => {
        const converted: Record<string, string> = {};
        Object.keys(exchangeRates).forEach((curr) => {
            converted[curr] = ((amount / exchangeRates[startCurrency]) * exchangeRates[curr]).toFixed(2);
        });
        return converted;
    }, [amount, startCurrency]);

    return (
        <main>
            <h1>Currency Converter</h1>
            <p className="conversion-display">{startCurrency} to {endCurrency} Conversion</p>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <label>
                Start Currency:
                <select value={startCurrency} onChange={(e) => setStartCurrency(e.target.value)}>
                    {Object.keys(exchangeRates).map((curr) => (
                        <option key={curr} value={curr}>
                            {curr}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Target Currency:
                <select value={endCurrency} onChange={(e) => setEndCurrency(e.target.value)}>
                    {Object.keys(exchangeRates).map((curr) => (
                        <option key={curr} value={curr}>
                            {curr}
                        </option>
                    ))}
                </select>
            </label>
            <p>Converted Amount: <span>{convertedAmounts[endCurrency]}</span> {endCurrency}</p>
        </main>
    );
}