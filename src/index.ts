// import dotenv from 'dotenv'

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import {
  Widget
} from '@lumino/widgets';


/**
 * Initialization data for the frequency_visualizer extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'frequency-visualizer',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    // dotenv.config()
    console.log('JupyterLab extension frequency-visualizer is activated!!');
    const content = new Widget();
    const widget = new MainAreaWidget({content});
    widget.id = 'apod-jupyterlab';
    widget.title.label = 'Deezer Frequency Visualizer';
    widget.title.closable = true;

    const command: string = 'apod:open';
    app.commands.addCommand(command, {
      label: 'Deezer frequency-visualizer',
      execute: () => {
        if (!widget.isAttached) {
          app.shell.add(widget, 'main');
        }
        app.shell.activateById(widget.id);
      }
    });

    palette.addItem({command, category: 'Tutorial'});
  }
};

export default extension;
