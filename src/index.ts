import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the frequency_visualizer extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'frequency-visualizer',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension frequency-visualizer is activated!!');
  }
};

export default extension;
