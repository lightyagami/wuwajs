"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureAreaData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const FurnitureSceneSlotData_1 = require("./FurnitureSceneSlotData");
class FurnitureAreaData {
  constructor() {
    this.L9e = 0;
    this._Ui = 0;
    this.Atmosphere = 0;
    this.MaxAtmosphere = 0;
    this.SceneSlotDataMap = new Map();
    this.FurnitureUseCountMap = new Map();
    this.UsePreset = false;
  }
  DeepCopy(t) {
    this.L9e = t.L9e;
    this._Ui = t._Ui;
    this.Atmosphere = t.Atmosphere;
    this.MaxAtmosphere = t.MaxAtmosphere;
    this.SceneSlotDataMap.clear();
    for (var [e, r] of t.SceneSlotDataMap) {
      var i = new FurnitureSceneSlotData_1.FurnitureSceneSlotData();
      i.DeepCopy(r);
      this.SceneSlotDataMap.set(e, i);
    }
    this.FurnitureUseCountMap.clear();
    for (var [s, a] of t.FurnitureUseCountMap) {
      this.FurnitureUseCountMap.set(s, a);
    }
  }
  Compare(t) {
    if (this.L9e !== t.L9e) {
      return false;
    }
    if (this._Ui !== t._Ui) {
      return false;
    }
    if (this.Atmosphere !== t.Atmosphere) {
      return false;
    }
    if (this.MaxAtmosphere !== t.MaxAtmosphere) {
      return false;
    }
    if (this.SceneSlotDataMap.size !== t.SceneSlotDataMap.size) {
      return false;
    }
    for (var [e, r] of this.SceneSlotDataMap) {
      e = t.SceneSlotDataMap.get(e);
      if (!e) {
        return false;
      }
      if (!r.Compare(e)) {
        return false;
      }
    }
    if (this.FurnitureUseCountMap.size !== t.FurnitureUseCountMap.size) {
      return false;
    }
    for (var [i, s] of this.FurnitureUseCountMap) {
      i = t.FurnitureUseCountMap.get(i);
      if (i === undefined) {
        return false;
      }
      if (s !== i) {
        return false;
      }
    }
    return true;
  }
  SetAreaId(t) {
    this.L9e = t;
  }
  SetMapId(t) {
    this._Ui = t;
  }
  SetAtmosphere(t) {
    this.Atmosphere = t;
  }
  SetMaxAtmosphere(t) {
    this.MaxAtmosphere = t;
  }
  CreateSceneSlotData(t) {
    var e = new FurnitureSceneSlotData_1.FurnitureSceneSlotData();
    e.SetSceneSlotData(this._Ui, t);
    this.SceneSlotDataMap.set(t, e);
    return e;
  }
  SetSlotPlacedData(t, e, r) {
    t = this.SceneSlotDataMap.get(t);
    if (t) {
      if (e === -1) {
        this.VFg(t, r);
      } else {
        this.HFg(t, e, r);
      }
    }
  }
  ClearSlotPlacedData() {
    this.FurnitureUseCountMap.clear();
    for (const t of this.SceneSlotDataMap.values()) {
      t.UnPlaceFurniture();
    }
    this.Atmosphere = 0;
  }
  VFg(e, t) {
    for (let t = 0; t < e.GetSubSlotDataListLength(); t++) {
      var r = e.GetSubSlotData(t);
      if (r) {
        this.ReduceFurnitureCount(r.GetPlacedFurnitureConfigId());
      }
    }
    this.jFg(e);
    if (t > 0) {
      this.$Fg(e, t);
    }
  }
  HFg(t, e, r) {
    t = t.GetSubSlotData(e);
    if (t && (this.jFg(t), r > 0)) {
      this.$Fg(t, r);
    }
  }
  $Fg(t, e) {
    t.PlaceFurniture(e);
    this.AddFurnitureCount(e);
  }
  jFg(t) {
    this.ReduceFurnitureCount(t.GetPlacedFurnitureConfigId());
    t.UnPlaceFurniture();
  }
  AddFurnitureCount(t) {
    var e;
    if (!(t <= 0)) {
      e = this.FurnitureUseCountMap.get(t) ?? 0;
      this.FurnitureUseCountMap.set(t, e + 1);
    }
  }
  ReduceFurnitureCount(t) {
    var e;
    if (!(t <= 0)) {
      if (this.FurnitureUseCountMap.has(t)) {
        if ((e = (this.FurnitureUseCountMap.get(t) ?? 0) - 1) <= 0) {
          this.FurnitureUseCountMap.delete(t);
        } else {
          this.FurnitureUseCountMap.set(t, e);
        }
      }
    }
  }
  GetPlacedFurnitureConfigId(t, e) {
    return this.GetSlotData(t, e)?.GetPlacedFurnitureConfigId() ?? 0;
  }
  GetSceneSlotData(t) {
    return this.SceneSlotDataMap.get(t);
  }
  GetSlotData(t, e) {
    if (e === -1) {
      return this.GetSceneSlotData(t);
    } else {
      return this.GetSceneSlotData(t)?.GetSubSlotData(e);
    }
  }
  GetSceneSlotDataMap() {
    return this.SceneSlotDataMap;
  }
  GetAreaId() {
    return this.L9e;
  }
  GetMapId() {
    return this._Ui;
  }
  GetAtmosphere() {
    return this.Atmosphere;
  }
  GetMaxAtmosphere() {
    return this.MaxAtmosphere;
  }
  GetFurnitureUseCount(t) {
    return this.FurnitureUseCountMap.get(t) ?? 0;
  }
  GetPlacedSceneSlotCount() {
    let t = 0;
    for (const e of this.SceneSlotDataMap.values()) {
      if (e.IsPlaced()) {
        t++;
      }
    }
    return t;
  }
  GetPlacedSlotCount() {
    let t = 0;
    for (const e of this.SceneSlotDataMap.values()) {
      if (e.IsPlaced()) {
        t += 1 + this.GetPlacedSubSlotCount(e);
      }
    }
    return t;
  }
  GetPlacedSubSlotCount(t) {
    let e = 0;
    for (const r of t.GetSubSlotDataList()) {
      if (r.IsPlaced()) {
        e++;
      }
    }
    return e;
  }
  UpdateAtmosphere() {
    let t = 0;
    for (var [e, r] of this.FurnitureUseCountMap) {
      e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(e);
      if (e) {
        t += (e.Atmosphere ?? 0) * r;
      }
    }
    this.Atmosphere = t;
  }
}
exports.FurnitureAreaData = FurnitureAreaData;
//# sourceMappingURL=FurnitureAreaData.js.map