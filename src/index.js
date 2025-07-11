import * as Colors from "./colors.js";
import fs from "fs";
import * as path from "path";

function convertHEXToRGBIntegerArray(hex) {
  return [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((a) =>
    parseInt(a, 16),
  );
}

for (const shade of ["fall", "spring", "winter", "summer"]) {
  const manifest = {
    manifest_version: 3,
    name: `Evergarden Chrome Theme - ${shade}`,
    description: "Cozy Evergarden theme for Chrome",
    version: "0.1",
    theme: {
      colors: {
        frame: Colors[shade].crust,
        frame_inactive: Colors[shade].crust,
        bookmark_text: Colors[shade].subtext1,
        tab_background: Colors[shade].mantle,
        tab_background_inactive: Colors[shade].crust,
        tab_background_text: Colors[shade].subtext0,
        tab_background_text_inactive: Colors[shade].subtext0,
        tab_text: Colors[shade].subtext1,
        toolbar: Colors[shade].base,
        toolbar_button_icon: Colors[shade].subtext0,
        omnibox_text: Colors[shade].text,
        omnibox_background: Colors[shade].mantle,
      },
    },
  };

  for (const name in manifest.theme.colors) {
    const color = manifest.theme.colors[name];
    manifest.theme.colors[name] = convertHEXToRGBIntegerArray(color);
  }

  fs.mkdirSync(path.join("dist", shade.toLowerCase()), { recursive: true });
  fs.writeFileSync(
    path.join("dist", shade.toLowerCase(), "manifest.json"),
    JSON.stringify(manifest, null, 4),
  );
}
