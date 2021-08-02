// IMPORTANT: THIS IS THE WHOLE VERSION, INCLUDING THE READING OF CELL INPUT INOUT OUTPUT AREA
import { ReactWidget } from '@jupyterlab/apputils';
import { runIcon, stopIcon, LabIcon } from '@jupyterlab/ui-components';
// import React, {useEffect, useState} from 'react';
import React from 'react';
// import myButton from 'widget.css';
// import $ from "jquery";
// import d3 from "d3";
// import Myhtml from './tableBarNew.html';
// import Mytable from './tableBar.html';
import stopSVG from './vector.svg';
import runSVG from './table-grid.svg';
import Myhtml_2 from './tree8_1/tree.html';
import Mytable_2 from './table8_1/overview.html';
// var indexList;
// var Myhtml = require('/Users/cinder/Desktop/jupyterlab-play-cell-button-master/src/tableBar.html')
// import 
// import { OurPlot } from "./trailPrintChart.js";
// document.write("<script type='text/javascript' src='./trailPrintChart.js'></script>");
// let plot = new OurPlot();
// may need to download the svg and import the downloaded svg in this typescript file
// below is the code to plot the chart via js
var myButton = document.createElement('style');
myButton.type = 'widget/css';
myButton.innerHTML = '.myButton { color: #F00; }';
export const selfLabIcon_1 = new LabIcon({
    name: 'selfLabIcon_1',
    svgstr: stopSVG // svgstr import from aboved
    // svgstr:'./ghost.svg'
});
export const selfLabIcon_2 = new LabIcon({
    name: 'selfLabIcon_2',
    svgstr: runSVG // svgstr import from aboved
});
const PlayButton = ({ icon, onClick, }) => (React.createElement("button", { type: "button", onClick: () => onClick(), className: "cellPlayButton" },
    React.createElement(LabIcon.resolveReact, { icon: selfLabIcon_1, 
        // iconClass = "cellPlayButton-icon"
        className: "cellPlayButton-icon", tag: "span", width: "20px", height: "20px" })));
const PlayButton_2 = ({ icon, onClick, }) => (React.createElement("button", { type: "button", onClick: () => onClick(), className: "cellPlayButton_2" },
    React.createElement(LabIcon.resolveReact, { icon: selfLabIcon_2, 
        // iconClass = "myButton"
        className: "cellPlayButton-icon_2", tag: "span", width: "20px", height: "20px" })));
const CodeCellPlayButtonComponent = ({ cell, session, }) => {
    // A hacky way to find out if we're currently running
    // anything, but doesn't matter greatly because the status
    // will soon be updated by the returned kernel future promise
    // const [isRunning, setIsRunning] = useState(
    //     !!(cell.promptNode.textContent === '[*]:'));
    var count = 0;
    // let initialCheck : Number; 
    // var generalReg = /#check features/;
    // if (generalReg.test(cell.inputArea.node.innerText)){
    //   $("cellPlayButton_2").hide()
    // }
    // var tableReg = /list/;
    // var overviewReg = /overview/;
    cell.outputArea.hide();
    // below is the part to create the iframe in output area
    const para = document.createElement("div");
    var ifra_1 = document.createElement('iframe');
    ifra_1.id = 'Myifra_1';
    // para.appendChild(ifra_1);
    cell.outputArea.node.append(para);
    // const table = document.createElement("div");
    // table.id ='table_1';
    // const content = document.createElement('p');
    const clearCell = async () => {
        count += 1;
        para.removeChild(ifra_1);
        cell.outputArea.hide();
    };
    const executeCell = async () => {
        // const trail = new ReactWidget();
        //Regular Expression definition for Table
        para.appendChild(ifra_1);
        cell.outputArea.show();
        count += 1;
        // console.log(count);
        // CodeCell.execute(cell, session);
        // setIsRunning(true);
        // If inputArea = null: show Overview, otherwise shou table
        // console.log(cell.inputArea.node.innerText === '');
        // console.log(cell.inputArea.node.innerText === null);
        // assign value to initialCheck for different cell cases
        // if(overviewReg.test(cell.inputArea.node.innerText)){
        //   initialCheck = 1;
        // }else if(tableReg.test(cell.inputArea.node.innerText)){
        //   initialCheck = 2;
        // }else{
        //   initialCheck = 0;
        // }
        // // initialCheck = tableReg.test(cell.inputArea.node.innerText);
        // console.log(initialCheck);
        ifra_1.setAttribute('src', Myhtml_2);
        ifra_1.height = document.documentElement.clientHeight.toString();
        ifra_1.width = document.documentElement.clientWidth.toString();
        // switch(initialCheck){
        //   case 0:
        //     cell.outputArea.hide()
        //     count +=1;
        //     alert('Please input the right command!');
        //     // console.log('case 0');
        //     break;
        //   case 1:
        //     // if initially no input in inputArea => identified as "Overview Cell"
        //     // Start to add and run html file inside the outputArea of each cell
        //     // cell.outputArea._clear() 
        //     // const para = document.createElement("div");
        //     // para.id = 'para_1';
        //     // para.className="CssStyle";
        //     // para.style.border="0.5px solid #DBEAF9"; 
        //     // ifra_1.
        //     ifra_1.setAttribute('src',Myhtml);
        //     // ifra_1.id = 'Myifra_1';
        //     ifra_1.height = document.documentElement.clientHeight.toString();
        //     ifra_1.width = document.documentElement.clientWidth.toString();
        //     // para.appendChild(ifra_1);
        //     // cell.outputArea.node.append(para);
        //     // end of outputArea modification
        //     // console.log('case 1');
        //     break;
        //   case 2:
        //     // if initially has input in inputArea => identified as "Table Cell"
        //     // Start to read the input in the cell and pass it to a list
        //     // inputString is a string storing the input in cell's input area
        //     var inputString = cell.inputArea.node.textContent; 
        //     // indexList = parseInt(inputString);
        //     // const table = document.createElement("div");
        //     // table.id ='table_1';
        //     // const content = document.createElement('p');
        //     ///// next line is useful for reading the input of cell
        //     // content.innerHTML = inputString;
        //     /////
        //     // content.innerHTML = indexList;
        //     // var ifra_2 = document.createElement('iframe');
        //     ifra_1.setAttribute('src',Mytable);
        //     // ifra_1.id = 'Myifra_2';
        //     ifra_1.height = document.documentElement.clientHeight.toString();
        //     ifra_1.width = document.documentElement.clientWidth.toString();
        //     // table.appendChild(content);
        //     // table.appendChild(ifra_1);
        //     // // table.appendChild(content);
        //     // cell.outputArea.node.append(table);
        //     console.log(inputString);
        //     // cell.inputArea.showEditor(); 
        //     // console.log('case 2');
        //     break;
        // }
    };
    const executeCell_2 = async () => {
        // const trail = new ReactWidget();
        //Regular Expression definition for Table
        para.appendChild(ifra_1);
        cell.outputArea.show();
        count += 1;
        // console.log(count);
        // CodeCell.execute(cell, session);
        // setIsRunning(true);
        // If inputArea = null: show Overview, otherwise shou table
        // console.log(cell.inputArea.node.innerText === '');
        // console.log(cell.inputArea.node.innerText === null);
        ifra_1.setAttribute('src', Mytable_2);
        ifra_1.height = document.documentElement.clientHeight.toString();
        ifra_1.width = document.documentElement.clientWidth.toString();
        // assign value to initialCheck for different cell cases
        // if(overviewReg.test(cell.inputArea.node.innerText)){
        //   initialCheck = 1;
        // }else if(tableReg.test(cell.inputArea.node.innerText)){
        //   initialCheck = 2;
        // }else{
        //   initialCheck = 0;
        // }
        // // initialCheck = tableReg.test(cell.inputArea.node.innerText);
        // console.log(initialCheck);
        // switch(initialCheck){
        //   case 0:
        //     cell.outputArea.hide()
        //     count +=1;
        //     alert('Please input the right command!');
        //     // console.log('case 0');
        //     break;
        //   case 1:
        //     // if initially no input in inputArea => identified as "Overview Cell"
        //     // Start to add and run html file inside the outputArea of each cell
        //     // cell.outputArea._clear() 
        //     // const para = document.createElement("div");
        //     // para.id = 'para_1';
        //     // para.className="CssStyle";
        //     // para.style.border="0.5px solid #DBEAF9"; 
        //     // ifra_1.
        //     ifra_1.setAttribute('src',Myhtml_2);
        //     // ifra_1.id = 'Myifra_1';
        //     ifra_1.height = document.documentElement.clientHeight.toString();
        //     ifra_1.width = document.documentElement.clientWidth.toString();
        //     // para.appendChild(ifra_1);
        //     // cell.outputArea.node.append(para);
        //     // end of outputArea modification
        //     // console.log('case 1');
        //     break;
        //   case 2:
        //     // if initially has input in inputArea => identified as "Table Cell"
        //     // Start to read the input in the cell and pass it to a list
        //     // inputString is a string storing the input in cell's input area
        //     var inputString = cell.inputArea.node.textContent; 
        //     // indexList = parseInt(inputString);
        //     // const table = document.createElement("div");
        //     // table.id ='table_1';
        //     // const content = document.createElement('p');
        //     // content.innerHTML = inputString;
        //     // var ifra_2 = document.createElement('iframe');
        //     ifra_1.setAttribute('src',Mytable_2);
        //     // ifra_1.id = 'Myifra_2';
        //     ifra_1.height = document.documentElement.clientHeight.toString();
        //     ifra_1.width = document.documentElement.clientWidth.toString();
        //     // table.appendChild(content);
        //     // table.appendChild(ifra_1);
        //     // // table.appendChild(content);
        //     // cell.outputArea.node.append(table);
        //     console.log(inputString);
        //     // cell.inputArea.showEditor(); 
        //     // console.log('case 2');
        //     break;
        // }
    };
    // const interruptKernel = () => {
    //   void session.session?.kernel?.interrupt();
    // };
    // useEffect(() => {
    //   const codeCellFuture = cell.outputArea.future;
    //   if (!codeCellFuture) {
    //     return
    //   }
    //   const {promise, cancel} = makeCancelable(codeCellFuture.done);
    //   promise.then(() => {
    //     setIsRunning(false);
    //   });
    //   return () => {
    //     cancel()
    //   }
    // }, [isRunning]);
    // if (generalReg.test(cell.inputArea.node.innerText)){
    return (
    // need to wrapping the component with one single tag
    React.createElement(React.Fragment, null,
        React.createElement(PlayButton
        // icon={isRunning ? stopIcon : runIcon}
        , { 
            // icon={isRunning ? stopIcon : runIcon}
            icon: stopIcon, 
            // onClick={() => (isRunning ? interruptKernel : executeCell)()}
            onClick: () => (count % 2 == 1 ? clearCell : executeCell)() }),
        React.createElement(PlayButton_2
        // icon={isRunning ? stopIcon : runIcon}
        , { 
            // icon={isRunning ? stopIcon : runIcon}
            icon: stopIcon, 
            // onClick={() => (isRunning ? interruptKernel : executeCell)()}
            onClick: () => (count % 2 == 1 ? clearCell : executeCell_2)() })));
    // }else{
    //   return null;
    // }
};
const MarkdownCellPlayButtonComponent = ({ cell }) => {
    const executeCell = () => {
        cell.rendered = true;
    };
    // if (generalReg.test(cell.inputArea.node.innerText)){
    return (React.createElement(PlayButton, { icon: runIcon, onClick: () => executeCell() }));
    // }
};
export class CellPlayButton extends ReactWidget {
    constructor(cell, session) {
        super();
        /**
         * Constructs a new CellPlayButton widget.
         *
         * Note: Depending on the type of cell encountered
         * tries to render an appropriate play button
         * component.
         */
        this.cell = null;
        this.session = null;
        this.cell = cell;
        this.session = session;
        this.addClass('jp-CellPlayButton');
    }
    render() {
        switch (this.cell.model.type) {
            case 'markdown':
                return React.createElement(MarkdownCellPlayButtonComponent, { cell: this.cell });
            case 'code':
                return React.createElement(CodeCellPlayButtonComponent, { cell: this.cell, session: this.session });
            default:
                break;
        }
    }
}
