import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { WidgetTracker } from "@jupyterlab/apputils";

import { ILauncher } from "@jupyterlab/launcher";

import { WebDSService, WebDSWidget } from "@webds/service";

import { wifiSetupIcon } from "./icons";

import { WifiSetupWidget } from "./widget_container";

namespace Attributes {
  export const command = "webds_wifi_setup:open";
  export const id = "webds_wifi_setup_widget";
  export const label = "Wi-Fi Setup";
  export const caption = "Wi-Fi Setup";
  export const category = "DSDK - Applications";
  export const rank = 50;
}

/**
 * Initialization data for the @webds/wifi_setup extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "@webds/wifi_setup:plugin",
  autoStart: true,
  requires: [ILauncher, ILayoutRestorer, WebDSService],
  activate: async (
    app: JupyterFrontEnd,
    launcher: ILauncher,
    restorer: ILayoutRestorer,
    service: WebDSService
  ) => {
    console.log("JupyterLab extension @webds/wifi_setup is activated!");

    let widget: WebDSWidget;
    const { commands, shell } = app;
    const command = Attributes.command;
    commands.addCommand(command, {
      label: Attributes.label,
      caption: Attributes.caption,
      icon: (args: { [x: string]: any }) => {
        return args["isLauncher"] ? wifiSetupIcon : undefined;
      },
      execute: () => {
        if (!widget || widget.isDisposed) {
          const content = new WifiSetupWidget(Attributes.id, service);
          widget = new WebDSWidget<WifiSetupWidget>({ content });
          widget.id = Attributes.id;
          widget.title.label = Attributes.label;
          widget.title.icon = wifiSetupIcon;
          widget.title.closable = true;
        }

        if (!tracker.has(widget)) tracker.add(widget);

        if (!widget.isAttached) shell.add(widget, "main");

        shell.activateById(widget.id);

        widget.setShadows();
      }
    });

    launcher.add({
      command,
      args: { isLauncher: true },
      category: Attributes.category,
      rank: Attributes.rank
    });

    let tracker = new WidgetTracker<WebDSWidget>({
      namespace: Attributes.id
    });
    restorer.restore(tracker, {
      command,
      name: () => Attributes.id
    });
  }
};

export default plugin;
