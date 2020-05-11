import React, { useEffect } from 'react';

export const Panel: React.FC<{ buttonNode: React.ReactNode, defaultOpen?: boolean }> = ({ defaultOpen, children, buttonNode }) => {

    const buttonId = `pane-${Math.random().toString(36).substring(7)}`
    const panelId = `pane-${Math.random().toString(36).substring(7)}`

    useEffect(() => {
        if (defaultOpen == true) $(`.hidden-panel#${panelId}`).slideToggle(500);
        $(`#${buttonId}`).find("span").toggleClass("mfilopact");
    }, []);
    return (
        <div>
            <span id={buttonId} onClick={function () {
                $(`.hidden-panel#${panelId}`).slideToggle(500);
                // @ts-ignore
                $(this).find("span").toggleClass("mfilopact");
            }}>
                {buttonNode}
            </span>
            <div className="hidden-panel fl-wrap" id={panelId}>
                {children}
            </div>
        </div>
    )
}