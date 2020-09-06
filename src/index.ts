import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import FrequencyVisulizerWidget from './frequency_visualizer_widget'

/**
 * Initialization data for the frequency_visualizer extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'frequency-visualizer',
  autoStart: true,
  requires: [ICommandPalette],
  activate: async (app: JupyterFrontEnd, palette: ICommandPalette) => {

    const visualizer = new FrequencyVisulizerWidget();
    const widget = new MainAreaWidget({content: visualizer});
    widget.id = 'apod-jupyterlab';
    widget.title.label = 'Deezer Frequency Visualizer';
    widget.title.closable = true;

    const command: string = 'apod:open';
    app.commands.addCommand(command, {
      label: 'Deezer frequency-visualizer',
      execute: async () => {
        if (!widget.isAttached) {
          app.shell.add(widget, 'main');
        }
        app.shell.activateById(widget.id);
      }
    });

    palette.addItem({command, category: 'Fun'});
  }
};

export default extension;
