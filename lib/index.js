import { INotebookTracker } from '@jupyterlab/notebook';
import { CellPlayButton } from './widget';
/**
 * Initialization data for the jupyterlab-play-cell-button extension.
 */
const extension = {
    id: 'jupyterlab-play-cell-button',
    requires: [INotebookTracker],
    autoStart: true,
    activate: (app, nbTrack) => {
        nbTrack.currentChanged.connect(() => {
            const notebookPanel = nbTrack.currentWidget;
            const notebook = nbTrack.currentWidget.content;
            notebookPanel.context.ready.then(async () => {
                let currentCell = null;
                let currentCellPlayButton = null;
                // let currentCellPlayButton_2: CellPlayButton = null;
                nbTrack.activeCellChanged.connect(() => {
                    // Remove the existing play button from
                    // the previously active cell. This may
                    // well introduce bugs down the road and
                    // there is likely a better way to do this
                    if (currentCell) {
                        notebook.widgets.map((c) => {
                            const currentLayout = c.layout;
                            currentLayout.widgets.map(w => {
                                if (w === currentCellPlayButton) {
                                    currentLayout.removeWidget(w);
                                }
                            });
                        });
                    }
                    const cell = notebook.activeCell;
                    const newButton = new CellPlayButton(cell, notebookPanel.sessionContext);
                    // const newButton_2: CellPlayButton = new CellPlayButton(
                    //     cell, notebookPanel.sessionContext);
                    var generalReg = /#check features/;
                    if (generalReg.test(cell.inputArea.node.innerText)) {
                        cell.layout.addWidget(newButton);
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
        });
    }
};
export default extension;
