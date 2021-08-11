import { ReactWidget } from '@jupyterlab/apputils';

import { Cell, CodeCell } from '@jupyterlab/cells';

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



/**
 * PlayButton
 * '@param'provides the name, type, and description of a function parameter.
 * Note: A react component rendering a simple button with a jupyterlab icon
 * @param icon - The subclass of LabIcon to show.
 * @param onClick - Method to call when the button is clicked.
 */
interface ButtonComponent { // explicitly describe this object’s shape using an ‘interface’ declaration
  icon: LabIcon; // all of the icons in JupyterLab core can be reused via LabIcon
  onClick: () => void;
}



const Button = ({
  icon,
  onClick,
}: ButtonComponent) => (
  <button
      type="button"
      onClick={() => onClick()}
      className="cellButton"

      >
    <LabIcon.resolveReact
        icon={selfLabIcon}  // here needs to pass an icon
        className="cellButton-icon"
        tag="span"
        width="20px"
        height="20px"
        // the width and height here controls the size of icon in jupyter 
    />
  </button>
  
);

/**
 * CodeCellButtonComponent
 *
 * @param cell - The CodeCell parent.
 */
interface ICodeCellButtonComponent {
  cell: CodeCell;
  // session: ISessionContext; // represent the session of a cell
}

const CodeCellButtonComponent = ({
  cell,
  // session,
}: ICodeCellButtonComponent): JSX.Element => {
  
// to control the hide & appear of iframe window
  var count = 0;
  cell.outputArea.hide()
// below is the part to create the iframe in output area
  const Mynode = document.createElement("div");
  var ifra_1 = document.createElement('iframe');
  ifra_1.id = 'Myifra_1';
  cell.outputArea.node.append(Mynode);

// function to hide the iframe window
  const clearCell = async ()=>{
    count +=1;
    Mynode.removeChild(ifra_1)
    cell.outputArea.hide()
  }
  
// function to show the iframe visualization graph  
  const executeCell = async () => {

    Mynode.appendChild(ifra_1);
    cell.outputArea.show()
    count +=1;
    ifra_1.setAttribute('src',Mytable);
    ifra_1.height = document.documentElement.clientHeight.toString();
    ifra_1.width = '100%';
    

    
  };

  
  return (
    // need to wrapping the component with one single tag if return multiple buttons
    <>
    <Button
    icon = {stopIcon}
    onClick = {() =>(count%2 == 1 ? clearCell:executeCell)()}
    
  />
  </>
    
  );

};





export class CellPlayButton extends ReactWidget {
  /**
   * Constructs a new CellPlayButton widget.
   */
  cell: Cell = null;
  constructor(cell: Cell,) {
    super();
    this.cell = cell;
    this.addClass('jp-CellButton');
  }

  render(): JSX.Element {
    switch (this.cell.model.type) {
      // if the cell belongs to a code cell type, add a button to it
      case 'code':
        return <CodeCellButtonComponent
            cell={this.cell as CodeCell} />;
      default:
        break;
    }
  }
}
