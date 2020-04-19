import React, { useState, useEffect } from 'react';

type Props = {
    options: string[]
    category: string
}
export const TagSearchWidget: React.FC<Props> = ({ options, category }) => {
    const [optionsSelected, setOptions] = useState<string[]>([]);

    return (
        <div className=" fl-wrap filter-tags">
            <h4>Filter by Tags</h4>
            {options.map(o => {
                const option = o.replace(/\s/g, '-');
                return (
                    <>
                        <input key={option} type="checkbox" name={`tag-search-${option}`} checked={optionsSelected.find(selectedOption => selectedOption === option) !== undefined} onChange={() => {
                            const found = optionsSelected.find(selectedOption => selectedOption === option);

                            setOptions(prev => {
                                if (found) {
                                    return prev.filter(o => o !== found)
                                }

                                return [ ...prev, option];
                            })
                        }} />
                        <label htmlFor="check-aa">{o}</label>
                    </>
                );
            })}
        </div>
    );
}