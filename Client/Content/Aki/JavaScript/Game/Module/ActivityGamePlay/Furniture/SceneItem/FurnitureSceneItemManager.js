"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSceneItemManager = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FurnitureDefine_1 = require("../FurnitureDefine");
const FurnitureGroupEntityItem_1 = require("./FurnitureGroupEntityItem");
const FurnitureSingleEntityItem_1 = require("./FurnitureSingleEntityItem");
const FurnitureSingleLevelItem_1 = require("./FurnitureSingleLevelItem");
class FurnitureSceneItemManager {
  constructor() {
    this.aKf = new Map();
    this.Vwg = [];
  }
  GetSceneSlotItemInfo(e) {
    return this.aKf.get(e);
  }
  GetOrCreateSceneSlotItemInfo(e) {
    let t = this.GetSceneSlotItemInfo(e);
    if (!t) {
      t = {
        SlotEntityId: e,
        RootFurnitureSceneItem: undefined,
        SubFurnitureSceneItemMap: new Map()
      };
      this.aKf.set(e, t);
    }
    return t;
  }
  GetSceneSlotItemInfoMap() {
    return this.aKf;
  }
  wag(e) {
    switch (ModelManager_1.ModelManager.FurnitureModel.GetFurnitureSceneItemType(e)) {
      case 0:
        return new FurnitureSingleLevelItem_1.FurnitureSingleLevelItem(e);
      case 1:
        return new FurnitureSingleEntityItem_1.FurnitureSingleEntityItem(e);
      case 2:
        return new FurnitureGroupEntityItem_1.FurnitureGroupEntityItem(e);
    }
    return new FurnitureSingleLevelItem_1.FurnitureSingleLevelItem(e);
  }
  HasRootFurnitureSceneItem(e) {
    return this.GetSceneSlotItemInfo(e)?.RootFurnitureSceneItem !== undefined;
  }
  HasSubFurnitureSceneItem(e, t) {
    return this.GetSceneSlotItemInfo(e)?.SubFurnitureSceneItemMap.has(t) ?? false;
  }
  async LoadRootFurnitureSceneItemAsync(e, t, r, n) {
    return !(t <= 0) && !(e = this.GetOrCreateSceneSlotItemInfo(e)).RootFurnitureSceneItem && (t = this.wag(t), e.RootFurnitureSceneItem = t, n ? t.LoadAndShowAsync(r) : t.LoadAsync(r));
  }
  UnloadRootFurnitureSceneItem(e) {
    e = this.GetSceneSlotItemInfo(e);
    if (e) {
      this.rFg(e);
    }
  }
  rFg(e) {
    var t = e.RootFurnitureSceneItem;
    if (t) {
      t.Unload();
      e.RootFurnitureSceneItem = undefined;
    }
  }
  async LoadSubFurnitureSceneItemAsync(e, t, r, n, i) {
    return !(t <= 0) && !(e = this.GetOrCreateSceneSlotItemInfo(e)).SubFurnitureSceneItemMap.has(r) && (t = this.wag(t), e.SubFurnitureSceneItemMap.set(r, t), i ? t.LoadAndShowAsync(n) : t.LoadAsync(n));
  }
  ShowRootFurnitureSceneItem(e) {
    e = this.GetSceneSlotItemInfo(e);
    if (e) {
      e.RootFurnitureSceneItem?.Show();
    }
  }
  ShowSubFurnitureSceneItem(e, t) {
    e = this.GetSceneSlotItemInfo(e);
    if (e) {
      e.SubFurnitureSceneItemMap.get(t)?.Show();
    }
  }
  UnloadSubFurnitureSceneItem(e, t) {
    e = this.GetSceneSlotItemInfo(e);
    if (e) {
      this.oFg(e, t);
    }
  }
  oFg(e, t) {
    e = e.SubFurnitureSceneItemMap;
    if (e.has(t)) {
      e.get(t)?.Unload();
      e.delete(t);
    }
  }
  UnloadAllSubFurnitureSceneItem(e) {
    e = this.GetSceneSlotItemInfo(e);
    if (e) {
      e = e.SubFurnitureSceneItemMap;
      for (const t of e.values()) {
        t.Unload();
      }
      e.clear();
    }
  }
  UnloadAllFurnitureSceneItem() {
    if (this.aKf.size !== 0) {
      for (const e of this.aKf.values()) {
        e.RootFurnitureSceneItem?.Unload();
        for (const t of e.SubFurnitureSceneItemMap.values()) {
          t.Unload();
        }
      }
      this.DoUnloadNeedUnloadedSceneItem();
      this.aKf.clear();
      this.Vwg.length = 0;
    }
  }
  MarkFurnitureSceneItemAsNeedUnload(e, t) {
    e = this.GetOrCreateSceneSlotItemInfo(e);
    if (t === FurnitureDefine_1.FURNITURE_SCENE_SLOT_SUB_SLOT_INDEX) {
      if (e.RootFurnitureSceneItem) {
        this.Hwg(e.RootFurnitureSceneItem);
        e.RootFurnitureSceneItem = undefined;
      }
    } else if (e.SubFurnitureSceneItemMap.has(t)) {
      this.Hwg(e.SubFurnitureSceneItemMap.get(t));
      e.SubFurnitureSceneItemMap.delete(t);
    }
  }
  Hwg(e) {
    if (e && !this.Vwg.includes(e)) {
      e.MarkAsNeedUnload();
      this.Vwg.push(e);
    }
  }
  DoUnloadNeedUnloadedSceneItem() {
    if (this.Vwg.length !== 0) {
      for (const e of this.Vwg) {
        e.Unload();
      }
      this.Vwg.length = 0;
    }
  }
}
exports.FurnitureSceneItemManager = FurnitureSceneItemManager;
//# sourceMappingURL=FurnitureSceneItemManager.js.map