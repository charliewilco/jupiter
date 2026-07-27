const Jupiter = require("./");
const assert = require("assert");

assert.equal(Jupiter.name, "Jupiter", "is Jupiter");
assert.equal(Jupiter.defaultVariant, "metis", "uses Metis as the default variant");
assert.equal(Jupiter.themes.dark.type, "dark", "has a default dark theme");
assert.equal(Jupiter.themes.light.type, "light", "has a default light theme");
assert.equal(Jupiter.colors.cyan, "#4ACDEB", "keeps dark Metis aliases as default");
assert.equal(Jupiter.themes.light.uiGroups.background, "#F7FAFC", "has refined light background");
assert.equal(Jupiter.definitions.palette.violet, "#9D69F2", "has refined Metis palette");
assert.equal(Jupiter.variants.ganymede.themes.dark.colors.cyan, "#00B7ED", "keeps archived Ganymede cyan");
assert.equal(Jupiter.variants.ganymede.themes.light.type, "light", "has a light Ganymede variant");
