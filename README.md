# Holograms
Interact with the Holograms API with Drupi!

## Requirements
* [Holograms](https://www.spigotmc.org/resources/holograms.4924/)
* [PluginLoaded](https://github.com/Hundeklemmen/PluginLoaded)

## Notes
This module will run out-of-the-box without issues on servers with Babel disabled. That being said, `PluginLoaded`, a dependency of this module, does not. You can either manually compile PluginLoaded, or leave Babel enabled on your server (Holograms will still load quickly!)

## Usage
To get access to the `holograms` object, just require the module.

```js
const holograms = require("Holograms");
```

From here, you have full access to the API.

`getHologramManager()` *(HologramManager)* - returns the raw HologramManager that the Holograms module is using.

`create(String id, Location location)` *(Hologram)* - creates a new hologram at the given location with the given ID, and then returns it.

`get(String id)` *(Hologram)* - gets a hologram given its ID.

`delete(String id)` - deletes a hologram given its ID.

`move(Hologram hologram, Location location)` - moves a hologram to another location.

`hide(Hologram hologram)` - hides the given hologram. Note that hidden holograms cannot be accessed using `holograms.get`.

`show(Hologram hologram)` - reveals the given hidden hologram.

`isVisible(Hologram hologram)` *(Boolean)* - gets whether a hologram is currently hidden or visible.

`addLine(Hologram hologram, String text)` - adds a text line to the given hologram.

`addItemLine(Hologram hologram, ItemStack itemstack)` - adds an item line to the given hologram.

`removeLine(Hologram hologram, Integer index)` - deletes a line from the given hologram.

`setLine(Hologram hologram, Integer index, String text)` - replaces an existing text or item line on the given hologram with a new text line.

`setItemLine(Hologram hologram, Integer index, ItemStack itemstack)` - replaces an existing text or item line on the given hologram with a new item line.


### Backwards compatibility with the legacy Holograms expansion
For those of you already using Holograms in your scripts via the legacy Holograms expansion built-in to Drupi, you won't have to update your scripts, as the older method names are natively supported in Holograms. However, these old method names are **deprecated**, so you are still advised to update your scripts to use the modern method names.