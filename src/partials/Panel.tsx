import React, { useState, useEffect } from 'react';

export const DateInput: React.FC<{ buttonNode: React.ReactNode }> = ({ children, buttonNode }) => {

    const buttonId = Math.random().toString(36).substring(7)
    const panelId = Math.random().toString(36).substring(7)

    useEffect(() => {
        $(".more-filter-option").on("click", function () {
            $(".hidden-listing-filter").slideToggle(500);
            $(this).find("span").toggleClass("mfilopact");
        });
    }, []);
    return (
        <div>
            <div className="fl-wrap" id={panelId}>
                {children}
            </div>

            <span id={buttonId}>
                {buttonNode}
            </span>
        </div>
    )
}