import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker
} from '@jupyterlab/notebook';

import { Cell } from '@jupyterlab/cells';

import { PanelLayout } from '@lumino/widgets';

import {
  CellPlayButton
} from './widget'

/**
 * Initialization data for the jupyterlab-play-cell-button extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-play-cell-button',
  requires: [INotebookTracker],
  autoStart: true,
  activate: (
      app: JupyterFrontEnd,
      nbTrack: INotebookTracker,
  ) => {
    nbTrack.currentChanged.connect(() => {

      const notebookPanel = nbTrack.currentWidget;
      const notebook = nbTrack.currentWidget.content;

      notebookPanel.context.ready.then(async () => {

        let currentCell: Cell = null;
        let currentCellPlayButton: CellPlayButton = null;
        // let currentCellPlayButton_2: CellPlayButton = null;

        nbTrack.activeCellChanged.connect(() => {

          // Remove the existing play button from
          // the previously active cell. This may
          // well introduce bugs down the road and
          // there is likely a better way to do this
          if (currentCell) {
            notebook.widgets.map((c: Cell) => {
              const currentLayout = c.layout as PanelLayout;
              currentLayout.widgets.map(w => {
                if (w === currentCellPlayButton) {
                  currentLayout.removeWidget(w)
                }
              })
            });
          }


          const cell: Cell = notebook.activeCell;
          const newButton: CellPlayButton = new CellPlayButton(
              cell, notebookPanel.sessionContext);
          // const newButton_2: CellPlayButton = new CellPlayButton(
          //     cell, notebookPanel.sessionContext);
          var generalReg = /#check features/;
          if (generalReg.test(cell.inputArea.node.innerText)){
            (cell.layout as PanelLayout).addWidget(newButton);
          }
          // (cell.layout as PanelLayout).addWidget(newButton_2);
        //   const newButton_2: CellPlayButton = new CellPlayButton(
        //     cell, notebookPanel.sessionContext);
        // (cell.layout as PanelLayout).addWidget(newButton_1);

          // Set the current cell and button for future
          // reference
          currentCell = cell;
          currentCellPlayButton = newButton;
          // currentCellPlayButton_2 = newButton;
        });

      });

    })
  }
};

export default extension;
