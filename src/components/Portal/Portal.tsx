import React, {FC, JSXElementConstructor, ReactElement} from 'react';
import ReactDOM from 'react-dom'
import cn from 'classnames';

const overlays = document.getElementById('overlays')

interface IPortalProps{
    className:string;
    element?: keyof JSX.IntrinsicElements;
    children: ReactElement<any,string|JSXElementConstructor<any>>;
}

const Portal: FC<IPortalProps> = (props) => {
    const {
        className,
        children,
        element: Element="div",
    } = props

    return overlays ? ReactDOM.createPortal(
        <Element className={cn("Portal",className)}>{children}</Element>,
        overlays
    ) : null;
};

export default Portal;
