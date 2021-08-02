/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { Cell } from '@jupyterlab/cells';
import { LabIcon } from '@jupyterlab/ui-components';
import { ISessionContext } from '@jupyterlab/apputils';
export declare const selfLabIcon_1: LabIcon;
export declare const selfLabIcon_2: LabIcon;
export declare class CellPlayButton extends ReactWidget {
    /**
     * Constructs a new CellPlayButton widget.
     *
     * Note: Depending on the type of cell encountered
     * tries to render an appropriate play button
     * component.
     */
    cell: Cell;
    session: ISessionContext;
    constructor(cell: Cell, session: ISessionContext);
    render(): JSX.Element;
}
