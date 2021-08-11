import { ReactWidget } from '@jupyterlab/apputils';
import { stopIcon, LabIcon } from '@jupyterlab/ui-components';
import React from 'react';
// import the button logo & html visualization as modules
import buttonSVG from '../style/table-grid.svg';
import Mytable from '../style/study2.html';
var myButton = document.createElement('style');
myButton.type = 'widget/css';
myButton.innerHTML = '.myButton { color: #F00; }';
// utilize the LabIcon component from Jupyter UI
export const selfLabIcon = new LabIcon({
    name: 'selfLabIcon',
    svgstr: buttonSVG
});
const Button = ({ icon, onClick, }) => (React.createElement("button", { type: "button", onClick: () => onClick(), className: "cellButton" },
    React.createElement(LabIcon.resolveReact, { icon: selfLabIcon, className: "cellButton-icon", tag: "span", width: "20px", height: "20px" })));
const CodeCellButtonComponent = ({ cell, }) => {
    // to control the hide & appear of iframe window
    var count = 0;
    cell.outputArea.hide();
    // below is the part to create the iframe in output area
    const Mynode = document.createElement("div");
    var ifra_1 = document.createElement('iframe');
    ifra_1.id = 'Myifra_1';
    cell.outputArea.node.append(Mynode);
    // function to hide the iframe window
    const clearCell = async () => {
        count += 1;
        Mynode.removeChild(ifra_1);
        cell.outputArea.hide();
    };
    // function to show the iframe visualization graph  
    const executeCell = async () => {
        Mynode.appendChild(ifra_1);
        cell.outputArea.show();
        count += 1;
        ifra_1.setAttribute('src', Mytable);
        ifra_1.height = document.documentElement.clientHeight.toString();
        ifra_1.width = '100%';
    };
    return (
    // need to wrapping the component with one single tag if return multiple buttons
    React.createElement(React.Fragment, null,
        React.createElement(Button, { icon: stopIcon, onClick: () => (count % 2 == 1 ? clearCell : executeCell)() })));
};
export class CellPlayButton extends ReactWidget {
    constructor(cell) {
        super();
        /**
         * Constructs a new CellPlayButton widget.
         */
        this.cell = null;
        this.cell = cell;
        this.addClass('jp-CellButton');
    }
    render() {
        switch (this.cell.model.type) {
            // if the cell belongs to a code cell type, add a button to it
            case 'code':
                return React.createElement(CodeCellButtonComponent, { cell: this.cell });
            default:
                break;
        }
    }
}
