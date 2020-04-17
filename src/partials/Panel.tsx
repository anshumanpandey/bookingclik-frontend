import React, { useState, useEffect } from 'react';

export const Panel: React.FC<{ buttonNode: React.ReactNode }> = ({ children, buttonNode }) => {

    const buttonId = `pane-${Math.random().toString(36).substring(7)}`
    const panelId = `pane-${Math.random().toString(36).substring(7)}`

    useEffect(() => {
        $(`#${buttonId}`).on("click", function () {
            $(`.hidden-panel#${panelId}`).slideToggle(500);
            $(this).find("span").toggleClass("mfilopact");
        });
    });
    return (
        <div>
            <span id={buttonId}>
                {buttonNode}
            </span>
            <div className="hidden-panel fl-wrap" id={panelId}>
                {children}
            </div>
        </div>
    )
}