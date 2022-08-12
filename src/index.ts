import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the @webds/wifi_setup extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@webds/wifi_setup:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension @webds/wifi_setup is activated!');
  }
};

export default plugin;
