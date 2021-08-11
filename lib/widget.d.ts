/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { Cell } from '@jupyterlab/cells';
import { LabIcon } from '@jupyterlab/ui-components';
export declare const selfLabIcon: LabIcon;
export declare class CellPlayButton extends ReactWidget {
    /**
     * Constructs a new CellPlayButton widget.
     */
    cell: Cell;
    constructor(cell: Cell);
    render(): JSX.Element;
}
