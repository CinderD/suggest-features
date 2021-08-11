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
                    const newButton = new CellPlayButton(cell);
                    // regular expression to check if users add '#check features' command in the cell's input area
                    // if so, add our button & corresponding visualzation to this particular cell
                    var generalReg = /#check features/;
                    if (generalReg.test(cell.inputArea.node.innerText)) {
                        cell.layout.addWidget(newButton);
                    }
                    currentCell = cell;
                    currentCellPlayButton = newButton;
                });
            });
        });
    }
};
export default extension;
