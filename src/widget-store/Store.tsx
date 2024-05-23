import { Box, Button, ButtonGroup, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Widgets } from "./Widgets";

const repos = [
  { name: "DM Editor", identifier: "_", url: "http://localhost:3002" },
  { name: "Forte digital", identifier: "forte-digital", url: "" },
];

export const Store = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [repo, setRepo] = useState("_");

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Box sx={{ textAlign: "right" }}>
        <ButtonGroup>
          {repos.map((item) => (
            <Button
              variant={repo === item.identifier ? "contained" : "outlined"}
              onClick={() => setRepo(item.identifier)}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Tabs
          value={tabIndex}
          onChange={(e, v) => setTabIndex(v)}
          aria-label="basic tabs example"
        >
          <Tab label="Widget" value={0} />
          <Tab label="Style" value={1} />
          <Tab label="Block" value={2} />
        </Tabs>
        <Box sx={{ pt: 1 }}>
          <Widgets repo={repos.find((item) => item.identifier === repo)} />
        </Box>
      </Box>
    </div>
  );
};
