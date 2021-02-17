require("PluginLoaded")("Holograms", () => {

    const Holograms = manager.loadExternal(manager.getPluginFile("Holograms")),
        getClass = id => java.lang.Class.forName(id, false, Holograms),
        plugin = org.bukkit.Bukkit.getPluginManager().getPlugin("Holograms"),
        hologramManager = getClass("com.sainttx.holograms.HologramPlugin").cast(plugin).getHologramManager(),
        Hologram = getClass("com.sainttx.holograms.api.Hologram").getDeclaredConstructors()[0],
        TextLineClass = getClass("com.sainttx.holograms.api.line.TextLine"),
        ItemLineClass = getClass("com.sainttx.holograms.api.line.ItemLine"),
        TextLine = TextLineClass.getConstructor(getClass("com.sainttx.holograms.api.Hologram"), java.lang.Class.forName("java.lang.String")),
        ItemLine = ItemLineClass.getConstructor(getClass("com.sainttx.holograms.api.Hologram"), java.lang.Class.forName("org.bukkit.inventory.ItemStack"));

    if(!ItemLine.isAccessible()) ItemLine.setAccessible(true);
    if(!TextLine.isAccessible()) TextLine.setAccessible(true);

    function getHologramManager(){
        return hologramManager;
    }

    function create(id, location, persistent = false){
        hologramManager.addActiveHologram(Hologram.newInstance(id, location, persistent));
        return hologramManager.getHologram(id);
    }

    function get(id){
        return hologramManager.getHologram(id);
    }

    function _delete(id){
        hologramManager.deleteHologram(id);
    }

    function move(hologram, location){
        hologram.teleport(location);
    }

    function hide(hologram){
        hologram.despawn();
        hologramManager.removeActiveHologram(hologram);
    }

    function show(hologram){
        hologram.spawn();
        hologramManager.addActiveHologram(hologram);
    }

    function isVisible(hologram){
        return hologramManager.getActiveHolograms().containsKey(hologram.getId());
    }

    function addLine(hologram, text){
        hologram.addLine(TextLine.newInstance(hologram, text));
    }

    function addItemLine(hologram, itemstack){
        hologram.addLine(ItemLine.newInstance(hologram, itemstack));
    }

    function removeLine(hologram, index, save = true){
        if(index >= 0 && index <= hologram.getLines().size() - 1){
            hologram.removeLine(hologram.getLine(index));
            if(hologram.getLines().size() === 0){
                hologramManager.deleteHologram(hologram);
            } else {
                if(save) hologramManager.saveHologram(hologram);
            }
        }
    }

    function setLine(hologram, index, text, save = true){
        if(index >= 0 && index <= hologram.getLines().size() - 1){
            const line = hologram.getLine(index);
            if(TextLineClass.isAssignableFrom(line.getClass())){
                line.setText(text);
            } else {
                hologram.removeLine(line);
                hologram.addLine(TextLine.newInstance(hologram, text), index);
            }
            if(save) hologramManager.saveHologram(hologram);
        }
    }

    function setItemLine(hologram, index, itemstack, save = true){
        if(index >= 0 && index <= hologram.getLines().size() - 1){
            const line = hologram.getLine(index);
            if(ItemLineClass.isAssignableFrom(line.getClass())){
                line.setItem(itemstack);
            } else {
                hologram.removeLine(line);
                hologram.addLine(ItemLine.newInstance(hologram, itemstack), index);
            }
            if(save) hologramManager.saveHologram(hologram);
        }
    }

    module.exports = {
        getHologramManager,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `getHologramManager` instead.
         */
        HologramManager: getHologramManager,

        create,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `create` instead.
         */
        Create: create,

        get,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `get` instead.
         */
        Get: get,

        delete: _delete,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `delete` instead.
         */
        Delete: _delete,

        move,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `move` instead.
         */
        Move: move,

        hide,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `hide` instead.
         */
        Hide: hide,

        show,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `show` instead.
         */
        Show: show,

        isVisible,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `isVisible` instead.
         */
        IsVisible: isVisible,

        addLine,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `addLine` instead.
         */
        AddLine: addLine,

        addItemLine,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `addItemLine` instead.
         */
        AddItemLine: addItemLine,

        removeLine,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `removeLine` instead.
         */
        RemoveLine: removeLine,

        setLine,

        /**
         * @deprecated Old method name, only kept for backwards compatibility with the original expansion. Use `setLine` instead.
         */
        SetLine: setLine,

        setItemLine
    }

});