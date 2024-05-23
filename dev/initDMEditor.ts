import * as React from "react";
import {
  initLanguage,
  registerDefaultWidgets,
  setDMEditorConfig,
} from "dmeditor";
import { nanoid } from "nanoid";
import { RemoteLoaderPlugin } from "../src";
import * as dmeditor from "dmeditor";

initLanguage("nor-NO");
registerDefaultWidgets();

//load remote widget asynchronically
new RemoteLoaderPlugin(dmeditor, [
  {
    name: "remote2",
    url: "http://localhost:3002",
  },
])
  .loadWidgets()
  .then(() => {
    console.log("Remote widget loaded");
    // renderApp();
  });

setDMEditorConfig({
  general: {
    projectStyles: {
      default: `background: white`,
    },
    themes: [
      {
        identifier: "red",
        name: "Red",
        cssStyle: `
        --project-main-color: red;
        --project-main-bg-color: #fbadad;
    
        /*background: var(--project-main-bg-color);  */
    
        /*todo: use css variable*/
      `,
      },
      {
        identifier: "blue",
        name: "Blue",
        cssStyle: `
        --project-main-color: blue;
        --project-main-bg-color: #e0e0ff;
        /*background: var(--project-main-bg-color);  */
      `,
      },
    ],
  },
  widgets: {
    heading: { defaultStyle: { _: "big-space" } },
  },
});
