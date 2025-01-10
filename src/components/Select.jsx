import React from 'react';

export default function Select(props) {
    const data = props.answers;

    // Обработчик изменения значения в select
    const handleChange = (event) => {
        if (props.onChange) {
            props.onChange(event.target.value); // Передаем выбранное значение в родительский компонент
        }
    };

    return (
        <select
            className={"Select " + props.selectClass}
            onChange={handleChange} // Привязываем обработчик
            defaultValue="" // Устанавливаем значение по умолчанию
        >
            <option value="" disabled>
                {props.text}
            </option>
            {Object.entries(data).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
            ))}
        </select>
    );
}