"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaveHoleMarkItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CaveHoleMarkItemView_1 = require("../MarkItemView/CaveHoleMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class CaveHoleMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, r, i, a, s = 1) {
    if (t.InstanceDungeonId !== 0) {
      super(e, t, r, i, a, 2);
    } else {
      super(e, t, r, i, a, s);
    }
  }
  OnInitialize() {
    this.uil();
    super.OnInitialize();
  }
  GetMarkItemViewType() {
    return 2;
  }
  CreateView() {
    return new CaveHoleMarkItemView_1.CaveHoleMarkItemView(this);
  }
  CheckCanShowView() {
    var e;
    var t;
    var r;
    var i;
    var a = super.CheckCanShowView();
    if (this.IsMultiMap()) {
      e = this.GetMultiMapId();
      t = this.GetConnectMultiMapIds();
      i = this.ConnectGround();
      r = ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId ?? 0;
      i = i || e === r || t.includes(r);
      return a && i;
    } else {
      return a;
    }
  }
  OnUpdate(e) {
    super.OnUpdate(e);
    if (this.MapType === 1) {
      this.uil();
    }
  }
  GetIsSelectThisFloor() {
    var e;
    var t;
    var r;
    if (this.IsMultiMap()) {
      e = this.GetMultiMapId();
      t = this.MarkConfig.MultiMapFloorId;
      if (this.MapType === 1) {
        return !!this.InMultiMapArea(e) || this.InMultiMapArea(t);
      } else {
        return (r = ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId ?? 0) === e || r === t;
      }
    } else {
      return this.LocateInGround();
    }
  }
  uil() {
    var e = this.IsSelectThisFloor;
    this.IsSelectThisFloor = this.GetIsSelectThisFloor();
    if (e !== this.IsSelectThisFloor) {
      this.UpdateViewIcon();
    }
  }
}
exports.CaveHoleMarkItem = CaveHoleMarkItem;
//# sourceMappingURL=CaveHoleMarkItem.js.map