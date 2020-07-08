require("PluginLoaded")("Holograms", () => {

    const Holograms = manager.loadExternal(manager.getPluginFile("Holograms")),
        getClass = id => java.lang.Class.forName(id, false, Holograms),
        plugin = org.bukkit.Bukkit.getPluginManager().getPlugin("Holograms"),
        hologramManager = getClass("com.sainttx.holograms.HologramPlugin").cast(plugin).getHologramManager(),
        Hologram = getClass("com.sainttx.holograms.api.Hologram").getDeclaredConstructors()[0],
        TextLineClass = getClass("com.sainttx.holograms.api.line.TextLine"),
        ItemLineClass = getClass("com.sainttx.holograms.api.line.ItemLine"),
        TextLine = TextLineClass.getDeclaredConstructors()[0],
        ItemLine = ItemLineClass.getDeclaredConstructors()[0];

    function getHologramManager(){
        return hologramManager;
    }

    function create(id, location){
        hologramManager.addActiveHologram(Hologram.newInstance(id, location));
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
        if(!ItemLine.isAccessible()) ItemLine.setAccessible(true);
        const toRaw = ItemLineClass.getDeclaredMethod("itemstackToRaw", java.lang.Class.forName("org.bukkit.inventory.ItemStack"));
        if(!toRaw.isAccessible()) toRaw.setAccessible(true);
        hologram.addLine(ItemLine.newInstance(hologram, "item:" + toRaw.invoke(null, itemstack), itemstack));
    }

    function removeLine(hologram, index){
        if(index >= 0 && index <= hologram.getLines().size() - 1){
            hologram.removeLine(hologram.getLine(index));
            if(hologram.getLines().size() === 0){
                hologramManager.deleteHologram(hologram);
            } else {
                hologramManager.saveHologram(hologram);
            }
        }
    }

    function setLine(hologram, index, text){
        if(index >= 0 && index <= hologram.getLines().size() - 1){
            const line = hologram.getLine(index);
            if(TextLineClass.isAssignableFrom(line.getClass())){
                line.setText(text);
            } else {
                hologram.removeLine(line);
                hologram.addLine(TextLine.newInstance(hologram, text), index);
            }
            hologramManager.saveHologram(hologram);
        }
    }

    function setItemLine(hologram, index, itemstack){
        if(index >= 0 && index <= hologram.getLines().size() - 1){
            const line = hologram.getLine(index);
            if(!ItemLine.isAccessible()) ItemLine.setAccessible(true);
            if(ItemLineClass.isAssignableFrom(line.getClass())){
                line.setItem(itemstack);
            } else {
                hologram.removeLine(line);
                const toRaw = ItemLineClass.getDeclaredMethod("itemstackToRaw", java.lang.Class.forName("org.bukkit.inventory.ItemStack"));
                if(!toRaw.isAccessible()) toRaw.setAccessible(true);
                hologram.addLine(ItemLine.newInstance(hologram, "item:" + toRaw.invoke(null, itemstack), itemstack), index);
            }
            hologramManager.saveHologram(hologram);
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