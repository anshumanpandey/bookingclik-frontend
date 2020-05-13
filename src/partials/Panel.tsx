import React, { useEffect } from 'react';
import useDidMountEffect from '../utils/useDidMountEffect';

export const Panel: React.FC<{ buttonNode?: React.ReactNode, defaultOpen?: boolean, open?: boolean }> = ({ defaultOpen, children, buttonNode, ...props }) => {

    const buttonId = `pane-${Math.random().toString(36).substring(7)}`
    const panelId = `pane-${Math.random().toString(36).substring(7)}`

    useEffect(() => {
        console.log(panelId)
        if (defaultOpen == true) $(`.hidden-panel#${panelId}`).slideToggle(500);
        $(`#${buttonId}`).find("span").toggleClass("mfilopact");
    }, []);

    console.log(props.open)

    useEffect(() => {
        console.log(panelId)
        if (props.open == true) $(`.hidden-panel#${panelId}`).slideDown(500);
        if (props.open == false) $(`.hidden-panel#${panelId}`).slideUp(500);
    }, [props.open]);

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