"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSceneSlotData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FurnitureSlotDataBase_1 = require("./FurnitureSlotDataBase");
const FurnitureSubSlotData_1 = require("./FurnitureSubSlotData");
class FurnitureSceneSlotData extends FurnitureSlotDataBase_1.FurnitureSlotDataBase {
  constructor() {
    super(...arguments);
    this.SlotEntityId = 0;
    this.SubSlotDataList = [];
    this.MapId = 0;
  }
  GetSlotType() {
    return 0;
  }
  SetSceneSlotData(t, e) {
    this.MapId = t;
    this.SlotEntityId = e;
    t = ModelManager_1.ModelManager.FurnitureModel.GetSceneSlotEntitySlotInfo(t, e);
    if (t) {
      this.SlotTagId = t.FurnitureTag;
      this.ExcludedFurnitureIds = t.ExcludedFurnitureIds ?? [];
    }
  }
  DeepCopy(t) {
    super.DeepCopy(t);
    this.SlotEntityId = t.SlotEntityId;
    this.SubSlotDataList = t.SubSlotDataList.map(t => {
      var e = new FurnitureSubSlotData_1.FurnitureSubSlotData();
      e.DeepCopy(t);
      return e;
    });
    this.MapId = t.MapId;
  }
  Compare(e) {
    if (!super.Compare(e)) {
      return false;
    }
    if (this.MapId !== e.MapId) {
      return false;
    }
    if (this.SlotEntityId !== e.SlotEntityId) {
      return false;
    }
    if (this.SubSlotDataList.length !== e.SubSlotDataList.length) {
      return false;
    }
    for (let t = 0; t < this.SubSlotDataList.length; t++) {
      if (!this.SubSlotDataList[t].Compare(e.SubSlotDataList[t])) {
        return false;
      }
    }
    return true;
  }
  GetSceneSlotDiff(t) {
    let e = 0;
    let r = 0;
    if (this.PlacedFurnitureConfigId !== t.PlacedFurnitureConfigId) {
      e = this.PlacedFurnitureConfigId;
      r = t.PlacedFurnitureConfigId;
    }
    var i = this.GetSubSlotDataList();
    var u = t.GetSubSlotDataList();
    var a = new Array(i.length);
    var s = new Array(u.length);
    for (let t = 0; t < this.SubSlotDataList.length; t++) {
      var n;
      var o = this.SubSlotDataList[t].GetPlacedFurnitureConfigId();
      if (o <= 0) {
        a[t] = 0;
      } else if (t >= u.length) {
        a[t] = o;
      } else {
        n = u[t].GetPlacedFurnitureConfigId();
        a[t] = o !== n ? o : 0;
      }
    }
    for (let t = 0; t < u.length; t++) {
      var l;
      var h = u[t].GetPlacedFurnitureConfigId();
      if (h <= 0) {
        s[t] = 0;
      } else if (t >= i.length) {
        s[t] = h;
      } else {
        l = i[t].GetPlacedFurnitureConfigId();
        s[t] = l !== h ? h : 0;
      }
    }
    return {
      RootFurnitureToUnPlace: e,
      RootFurnitureToPlace: r,
      SubFurnitureListToUnPlace: a,
      SubFurnitureListToPlace: s
    };
  }
  PlaceFurniture(e) {
    this.PlacedFurnitureConfigId = e;
    this.ClearSubSlotDataList();
    var r = ModelManager_1.ModelManager.FurnitureModel.GetSubSlotInfos(e);
    if (r) {
      for (let t = 0; t < r.length; t++) {
        var i = r[t];
        var u = new FurnitureSubSlotData_1.FurnitureSubSlotData();
        u.SetSlotData(this.SlotEntityId, e, t, i.FurnitureTag, i.ExcludedFurnitureIds ?? []);
        this.SubSlotDataList.push(u);
      }
    }
  }
  UnPlaceFurniture() {
    this.PlacedFurnitureConfigId = 0;
    this.ClearSubSlotDataList();
  }
  ClearSubSlotDataList() {
    this.SubSlotDataList.length = 0;
  }
  GetSubSlotData(t) {
    return this.SubSlotDataList[t];
  }
  GetSubSlotDataListLength() {
    return this.SubSlotDataList.length;
  }
  GetSubSlotDataList() {
    return this.SubSlotDataList;
  }
  GetSlotEntityId() {
    return this.SlotEntityId;
  }
}
exports.FurnitureSceneSlotData = FurnitureSceneSlotData;
//# sourceMappingURL=FurnitureSceneSlotData.js.map