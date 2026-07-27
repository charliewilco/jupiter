const Jupiter = require("./");
const assert = require("assert");

assert.equal(Jupiter.name, "Jupiter", "is Jupiter");
assert.equal(Jupiter.defaultVariant, "metis", "uses Metis as the default variant");
assert.equal(Jupiter.themes.dark.type, "dark", "has a default dark theme");
assert.equal(Jupiter.themes.light.type, "light", "has a default light theme");
assert.equal(Jupiter.colors.cyan, "#38C2E6", "keeps dark Metis aliases as default");
assert.equal(Jupiter.themes.light.uiGroups.background, "#F7FCFE", "has refined light background");
assert.equal(Jupiter.definitions.palette.violet, "#746FBB", "has refined Metis palette");
assert.equal(Jupiter.variants.ganymede.themes.dark.colors.cyan, "#00B7ED", "keeps archived Ganymede cyan");
assert.equal(Jupiter.variants.ganymede.themes.light.type, "light", "has a light Ganymede variant");
assert.equal(Jupiter.variants.callisto.themes.dark.uiGroups.background, "#070B12", "has a darker Callisto background");
assert.equal(Jupiter.variants.callisto.themes.dark.colors.cyan, "#1BD7FF", "has a sharper Callisto cyan");
assert.equal(Jupiter.variants.callisto.themes.light.type, "light", "has a light Callisto variant");
assert.equal(Jupiter.variants.europa.themes.dark.uiGroups.background, "#0D1A24", "has an icy Europa background");
assert.equal(Jupiter.variants.europa.themes.dark.colors.orange, "#E69554", "has Europa fracture accents");
assert.equal(Jupiter.variants.europa.themes.light.type, "light", "has a light Europa variant");
