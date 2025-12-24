"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
class HonamiStoryBackpackData {
  constructor() {
    this.Width = 0;
    this.Capacity = 0;
    this.h0m = 0;
    this.SelfBackpackType = undefined;
    this.SelfBackpackId = -1;
    this.ItemList = [];
    this.AQ = new Map();
    this.ItemPosMap = new Map();
    this.EmptyGridSet = new Set();
  }
  Init(t) {
    this.Width = t.jmd;
    this.Capacity = t.rrm;
    this.ClearBackpack();
    this.SelfBackpackId = t.Vmd;
    this.SelfBackpackType = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBackPack(t.Vmd).Type;
    this.Fq(t.k$d);
  }
  Fq(t) {
    for (const e of t) {
      this.Sfd(e);
    }
    this.RefreshOverflowCapacity();
  }
  Update(t) {
    for (const e of t) {
      this.Sfd(e)?.SetNewInBackpack(true);
    }
    this.RefreshOverflowCapacity();
  }
  Sfd(t) {
    let e = this.AQ.get(t.x$d.b9n);
    if (e) {
      for (const i of e.GetGridFillPositionList()) {
        this.ItemPosMap.delete(i);
        this.EmptyGridSet.add(i);
      }
      e.Init(t.x$d);
      e.UpdatePositionInfo(t.B$d);
    } else {
      e = ModelManager_1.ModelManager.HonamiStoryModel.CreateHonamiStoryItemData(t.x$d, t.B$d);
    }
    e.SetBackpackWidth(this.Width);
    this.RefreshItemMapByAddItem(e);
    return e;
  }
  RefreshItemMapByAddItem(t) {
    for (const e of t.GetGridFillPositionList()) {
      this.ItemPosMap.set(e, t);
      this.EmptyGridSet.delete(e);
    }
    this.ItemList.push(t);
    this.AQ.set(t.GetIncId(), t);
  }
  UpdateByContext(t) {
    for (const e of t) {
      if (e.h5n !== 0) {
        this.Mfd(e);
      }
    }
    for (const i of t) {
      if (i.h5n !== 2) {
        this.AddItemData(i);
      }
    }
  }
  AddItemData(t) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(t.Xmd);
    e.UpdatePositionInfo(t.B$d);
    e.SetBackpackWidth(this.Width);
    this.RefreshItemMapByAddItem(e);
  }
  Mfd(t) {
    var e = this.GetItemDataByInstanceId(t.Xmd);
    for (const i of e.GetGridFillPositionByPosition(t.F$d.l9_, t.F$d.Gmd)) {
      this.ItemPosMap.delete(i);
      this.EmptyGridSet.add(i);
    }
    this.ItemList.splice(this.ItemList.indexOf(e), 1);
    this.AQ.delete(e.GetIncId());
  }
  PushItemData(t) {
    return false;
  }
  ClearBackpack() {
    for (const t of this.AQ) {
      ModelManager_1.ModelManager.HonamiStoryModel.RemoveItemData(t[0]);
    }
    this.EmptyGridSet.clear();
    for (let t = 0; t < this.GetCapacity(); t++) {
      this.EmptyGridSet.add(t);
    }
    this.h0m = 0;
    this.ItemList.length = 0;
    this.AQ.clear();
    this.ItemPosMap.clear();
  }
  get BackpackId() {
    return this.SelfBackpackId;
  }
  get BackpackType() {
    return this.SelfBackpackType;
  }
  GetItemDataList() {
    return this.ItemList;
  }
  GetItemDataByInstanceId(t, e = true) {
    var i = this.AQ.get(t);
    if (i) {
      return i;
    }
    if (e && Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "ItemDataMap not found instanceId: " + t);
    }
  }
  GetItemDataByPosition(t) {
    return this.ItemPosMap.get(t);
  }
  GetWidthCount() {
    return this.Width;
  }
  GetHeightCount(t = false) {
    t = t ? this.GetCapacity() + this.h0m : this.GetCapacity();
    return Math.floor(t / this.GetWidthCount());
  }
  GetCellWidth() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_WIDTH_MOBILE;
    } else {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_WIDTH;
    }
  }
  GetCellHeight() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HEIGHT_MOBILE;
    } else {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HEIGHT;
    }
  }
  GetCellHorizontalInterval() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL_MOBILE;
    } else {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL;
    }
  }
  GetCellVerticalInterval() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_VERTICAL_INTERVAL_MOBILE;
    } else {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_VERTICAL_INTERVAL;
    }
  }
  SetCapacity(t) {
    this.Capacity = t;
  }
  GetCapacity() {
    return this.Capacity;
  }
  GetOverflowCapacity() {
    return this.h0m;
  }
  RefreshOverflowCapacity() {
    if (this.BackpackType !== 0) {
      return this.h0m = 0;
    }
    var t = this.Capacity / this.Width;
    var e = this.h0m;
    let i = 0;
    var r = new Set();
    for (const s of this.ItemList) {
      var o = s.GetPosition();
      var o = Math.floor(o / this.Width);
      if (o + s.GetGridHeight() > t) {
        i = Math.max(i, o + s.GetGridHeight() - t);
        for (const n of s.GetGridFillPositionList()) {
          if (n >= this.Capacity) {
            r.add(n);
          }
        }
      }
    }
    this.h0m = i * this.Width;
    var a = this.GetCapacity();
    if (e > this.h0m) {
      for (let t = this.h0m; t < e; t++) {
        this.EmptyGridSet.delete(a + t);
      }
    } else {
      for (let t = e; t < this.h0m; t++) {
        if (!r.has(a + t)) {
          this.EmptyGridSet.add(a + t);
        }
      }
    }
    return this.h0m;
  }
  GetOccupy() {
    let t = 0;
    for (const e of this.ItemList) {
      t += e.GetGridHeight() * e.GetGridWidth();
    }
    return t;
  }
  GetTotalValue() {
    let t = 0;
    for (const e of this.ItemList) {
      t += e.GetSellPrice();
    }
    return t;
  }
  CheckIsNewInBackpack() {
    for (const t of this.ItemList) {
      if (t.GetNewInBackpack()) {
        return true;
      }
    }
    return false;
  }
  ClearNewInBackpack() {
    for (const t of this.ItemList) {
      if (t.GetNewInBackpack()) {
        t.SetNewInBackpack(false);
      }
    }
  }
  GetEmptyGridSet() {
    return this.EmptyGridSet;
  }
}
exports.HonamiStoryBackpackData = HonamiStoryBackpackData;
//# sourceMappingURL=HonamiStoryBackpackData.js.map