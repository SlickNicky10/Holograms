"skip babel";
"use strict";

require("PluginLoaded")("Holograms", function () {
  var Holograms = manager.loadExternal(manager.getPluginFile("Holograms")),
      getClass = function getClass(id) {
    return java.lang.Class.forName(id, false, Holograms);
  },
      plugin = org.bukkit.Bukkit.getPluginManager().getPlugin("Holograms"),
      hologramManager = getClass("com.sainttx.holograms.HologramPlugin").cast(plugin).getHologramManager(),
      Hologram = getClass("com.sainttx.holograms.api.Hologram").getConstructor(java.lang.Class.forName("java.lang.String"), java.lang.Class.forName("org.bukkit.Location"), java.lang.Boolean.TYPE),
      TextLineClass = getClass("com.sainttx.holograms.api.line.TextLine"),
      ItemLineClass = getClass("com.sainttx.holograms.api.line.ItemLine"),
      TextLine = TextLineClass.getConstructor(getClass("com.sainttx.holograms.api.Hologram"), java.lang.Class.forName("java.lang.String")),
      ItemLine = ItemLineClass.getConstructor(getClass("com.sainttx.holograms.api.Hologram"), java.lang.Class.forName("org.bukkit.inventory.ItemStack"));

  if (!ItemLine.isAccessible()) ItemLine.setAccessible(true);
  if (!TextLine.isAccessible()) TextLine.setAccessible(true);

  function getHologramManager() {
    return hologramManager;
  }

  function create(id, location) {
    var persistent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    hologramManager.addActiveHologram(Hologram.newInstance(id, location, persistent));
    return hologramManager.getHologram(id);
  }

  function get(id) {
    return hologramManager.getHologram(id);
  }

  function _delete(id) {
    hologramManager.deleteHologram(id);
  }

  function move(hologram, location) {
    hologram.teleport(location);
  }

  function hide(hologram) {
    hologram.despawn();
    hologramManager.removeActiveHologram(hologram);
  }

  function show(hologram) {
    hologram.spawn();
    hologramManager.addActiveHologram(hologram);
  }

  function isVisible(hologram) {
    return hologramManager.getActiveHolograms().containsKey(hologram.getId());
  }

  function addLine(hologram, text) {
    hologram.addLine(TextLine.newInstance(hologram, text));
  }

  function addItemLine(hologram, itemstack) {
    hologram.addLine(ItemLine.newInstance(hologram, itemstack));
  }

  function removeLine(hologram, index) {
    var save = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (index >= 0 && index <= hologram.getLines().size() - 1) {
      hologram.removeLine(hologram.getLine(index));

      if (hologram.getLines().size() === 0) {
        hologramManager.deleteHologram(hologram);
      } else {
        if (save) hologramManager.saveHologram(hologram);
      }
    }
  }

  function setLine(hologram, index, text) {
    var save = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (index >= 0 && index <= hologram.getLines().size() - 1) {
      var line = hologram.getLine(index);

      if (TextLineClass.isAssignableFrom(line.getClass())) {
        line.setText(text);
      } else {
        hologram.removeLine(line);
        hologram.addLine(TextLine.newInstance(hologram, text), index);
      }

      if (save) hologramManager.saveHologram(hologram);
    }
  }

  function setItemLine(hologram, index, itemstack) {
    var save = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (index >= 0 && index <= hologram.getLines().size() - 1) {
      var line = hologram.getLine(index);

      if (ItemLineClass.isAssignableFrom(line.getClass())) {
        line.setItem(itemstack);
      } else {
        hologram.removeLine(line);
        hologram.addLine(ItemLine.newInstance(hologram, itemstack), index);
      }

      if (save) hologramManager.saveHologram(hologram);
    }
  }

  module.exports = {
    getHologramManager: getHologramManager,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `getHologramManager` instead.
     */
    HologramManager: getHologramManager,
    create: create,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `create` instead.
     */
    Create: create,
    get: get,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `get` instead.
     */
    Get: get,
    delete: _delete,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `delete` instead.
     */
    Delete: _delete,
    move: move,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `move` instead.
     */
    Move: move,
    hide: hide,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `hide` instead.
     */
    Hide: hide,
    show: show,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `show` instead.
     */
    Show: show,
    isVisible: isVisible,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `isVisible` instead.
     */
    IsVisible: isVisible,
    addLine: addLine,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `addLine` instead.
     */
    AddLine: addLine,
    addItemLine: addItemLine,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `addItemLine` instead.
     */
    AddItemLine: addItemLine,
    removeLine: removeLine,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `removeLine` instead.
     */
    RemoveLine: removeLine,
    setLine: setLine,

    /**
     * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `setLine` instead.
     */
    SetLine: setLine,
    setItemLine: setItemLine
  };
});