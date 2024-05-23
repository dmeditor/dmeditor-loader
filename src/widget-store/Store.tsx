import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Widgets } from "./Widgets";

export const Store = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div style={{ fontFamily: "Arial" }}>
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
          <Widgets />
        </Box>
      </Box>
    </div>
  );
};
