const Metis = require("./");
const assert = require("assert");

assert.equal(Metis.name, "Metis", "is Metis");
assert.equal(Metis.themes.dark.type, "dark", "has a dark theme");
assert.equal(Metis.themes.light.type, "light", "has a light theme");
assert.equal(Metis.colors.cyan, "#43C7E8", "keeps dark aliases as default");
assert.equal(Metis.themes.light.uiGroups.background, "#F8FBFD", "has light background");
assert.equal(Metis.definitions.palette.violet, "#A774FF", "has expanded palette");
assert.equal(Metis.variants.ganymede.themes.dark.colors.cyan, "#00B7ED", "keeps archived Ganymede cyan");
assert.equal(Metis.variants.ganymede.themes.light.type, "light", "has a light Ganymede variant");
