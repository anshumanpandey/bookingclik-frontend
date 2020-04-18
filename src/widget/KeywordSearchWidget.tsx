import React, { useState, useEffect } from 'react';

type Props = {
    options: string[]
    category: string
}
export const KeywordSearchWidget: React.FC<Props> = ({ options, category }) => {
    const optionSelected = useState<string[]>([]);

    return (
        <div className=" fl-wrap filter-tags">
            <h4>Filter by Tags</h4>
            {options.map(o => {
                return (
                    <>
                        <input id="check-aa" type="checkbox" name="check" onChange={() => {
                            
                        }} />
                        <label htmlFor="check-aa">{o}</label>
                    </>
                );
            })}
        </div>
    );
}