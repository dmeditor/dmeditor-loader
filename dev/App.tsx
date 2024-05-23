import * as React from "react";
import { DMEditor } from "dmeditor";
import { nanoid } from "nanoid";
import "./initDMEditor";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Store } from "../src/widget-store";

const App = () => {
  const [storeShown, setStoreShown] = useState(true);
  const editorRef = useRef(null);
  // const [editor] = useEditor()
  const data = [
    {
      id: `widget-${nanoid()}`,
      style: { _: "big-space" },
      data: {
        value: "This is a heading",
        level: 2,
        settings: {
          align: "left",
          // value: '',
        },
      },
      type: "heading",
    },
    {
      id: `widget-${nanoid()}`,
      style: { _: "big-space" },
      data: {
        value: "This is a heading 2",
        level: 2,
        settings: {
          align: "left",
        },
      },
      type: "heading:gradient",
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: "This is a heading 2",
        level: 2,
        settings: {
          align: "right",
          // value: '',
        },
      },
      type: "heading",
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        columns: 3,
      },
      type: "grid",
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: "This is a heading 1 ",
            level: 2,
          },
          type: "heading",
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: "This is a heading 2",
            level: 2,
          },
          type: "heading",
        },
        {
          id: `widget-${nanoid()}`,
          type: "list",
          data: {},
          children: [
            {
              id: `widget-${nanoid()}`,
              data: {
                value: "This is a heading 1 in List ",
                level: 2,
              },
              type: "heading",
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: "This is a heading 2 in List",
                level: 2,
              },
              type: "heading",
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: "This is a heading 3 in List",
                level: 2,
              },
              type: "heading",
            },
          ],
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: "This is a heading 3",
            level: 2,
          },
          type: "heading",
        },
      ],
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: "This is a heading 3",
        level: 2,
      },
      type: "heading:gradient",
    },
    {
      id: `widget-${nanoid()}`,
      type: "list",
      data: {
        direction: "horizontal",
      },
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: "This is a heading 1 in List ",
            level: 2,
          },
          type: "heading",
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: "This is a heading 2 in List",
            level: 2,
          },
          type: "heading",
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: "This is a heading 3 in List",
            level: 2,
          },
          type: "heading",
        },
      ],
    },
  ];

  useEffect(() => {
    // editorRef.current.setDesingerJson(jsonString(data))
    editorRef.current?.setEditorJson(data);
    editorRef.current?.setPageSettings([
      { identifier: "cover_image", name: "Cover image", type: "image" },
      { identifier: "summary", name: "Summary", type: "richtext" },
      { identifier: "meta_key", name: "Meta key", type: "text" },
      {
        identifier: "meta_description",
        name: "Meta description",
        type: "multitext",
      },
    ]);
    editorRef.current?.setPageData({
      title: "New page",
      theme: "red",
      meta_key: "test key",
    });
    editorRef.current?.onSave((data) => {
      window.alert("Saved");
    });
  }, []);

  // dmeServerSideLoad(data, null).then((d) => {
  //   console.log(d);
  // });

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: "30%",
          top: 0,
          zIndex: 1000,
          padding: 10,
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setStoreShown(true);
          }}
          style={{ color: "white", textDecoration: "none", padding: 5 }}
        >
          Store
        </a>
      </div>
      <Dialog open={storeShown} maxWidth="lg">
        <DialogTitle>DM Editor Store</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setStoreShown(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          X
        </IconButton>
        <DialogContent>
          <Store />
        </DialogContent>
      </Dialog>
      <DMEditor ref={editorRef} />
    </div>
  );
  // return <DMEditorView data={data} theme="blue" />;
};

export default App;
