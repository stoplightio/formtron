import "@stoplight/scripts/.storybook/config";

import { addDecorator } from "@storybook/react";
import * as themes from "@stoplight/ui-kit/storybook-addon/themes";
import { withThemes } from "@stoplight/ui-kit/storybook-addon/withThemes";

addDecorator(
  withThemes(themes, {
    formtron: ({ base }) => ({
      canvas:
        base === "dark"
          ? {
              bg: "#111",
              fg: "#fff",
              border: "#fff"
            }
          : {
              bg: "#fff",
              fg: "#111",
              border: "#111"
            }
    })
  })
);
