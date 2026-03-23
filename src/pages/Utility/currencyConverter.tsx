import { useState, useMemo } from 'react';

type Rates = Record<string, Record<string, number>>;

export function CurrencyConverter() {
    const convRates: Rates = {
        EUR: { EUR: 1, GBP: 0.85, JPY: 170.5, USD: 1.09 },
        GBP: { EUR: 1.18, GBP: 1, JPY: 200.9, USD: 1.28 },
        JPY: { EUR: 0.0059, GBP: 0.0050, JPY: 1, USD: 0.0064 },
        USD: { EUR: 0.92, GBP: 0.78, JPY: 156.7, USD: 1 },
    };

    const [amount, setAmount] = useState<number>(1);
    const [from, setFrom] = useState<string>('USD');
    const [to, setTo] = useState<string>('EUR');

    const converted = useMemo(() => {
        const numericAmount = Number(amount) || 0;
        const rate = convRates[from]?.[to] ?? 1;
        return numericAmount * rate;
    }, [amount, from, to]);

    return (
        <div className="section">
            <h1>Currency converter</h1>

            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>

            <div className="form-group">
                <label htmlFor="from">From</label>
                <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
                    {Object.keys(convRates).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="to">To</label>
                <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
                    {Object.keys(convRates).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div className="converted">
                Converted amount: <span>{converted.toFixed(2)} {to}</span>
            </div>
        </div>
    );
}
export default CurrencyConverter;