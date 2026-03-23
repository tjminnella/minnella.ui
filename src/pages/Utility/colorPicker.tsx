import { useState } from 'react';
import type { ChangeEvent, JSX } from 'react';

export function ColorPicker(): JSX.Element {
    const [color, setColor] = useState<string>('#ffffff');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setColor(e.target.value);
    };

    return (
        <div id="color-picker-container" style={{ backgroundColor: color }}>
            <label htmlFor="color-input">Choose a color using the color input below</label>
            <p />
            <input
                type="color"
                id="color-input"
                value={color}
                onChange={handleChange}
                aria-label="Choose color"
            />
        </div>
    );
}