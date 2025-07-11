"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardBackpackOriginalData = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const StringBuilder_1 = require("../../../../../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardItemBlockOriginalData_1 = require("../Base/DockyardItemBlockOriginalData");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardBackpackOriginalData {
  constructor() {
    this.dgt = new Map();
    this.PosDataDoublyList = [];
    this.QuicklySellDataId = 0;
    this.QuicklySellRatio = 0;
  }
  Z5_() {
    if (ModelManager_1.ModelManager.DockyardModel.IsPrintLog) {
      var e = new StringBuilder_1.StringBuilder();
      for (const t of this.dgt.values()) {
        e.Append(t.IncId);
        e.Append(":");
        e.Append(t.ItemId);
        e.Append(",");
      }
      for (const r of this.PosDataDoublyList) {
        e.Append("\n");
        for (const a of r) {
          e.Append(a.toString().padStart(4, " "));
          e.Append(",");
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Dockyard", 10, "捕鱼背包数据", ["道具以及格子数据", e.ToString()]);
      }
    }
  }
  RefreshPosData() {
    this.PosDataDoublyList.length = 0;
    var e = ModelManager_1.ModelManager.DockyardModel.FishingCabinShape;
    var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(e);
    for (let t = 0; t < FishingDefine_1.BACKPACK_ROW_COUNT; t++) {
      this.PosDataDoublyList[t] = [];
      for (let e = 0; e < FishingDefine_1.BACKPACK_COL_COUNT; e++) {
        var a = r.FillState[t].ArrayInt;
        if (e >= a.length || a[e] === 0) {
          this.PosDataDoublyList[t].push(-1);
        } else {
          this.PosDataDoublyList[t].push(0);
        }
      }
    }
    for (const f of this.dgt.values()) {
      var i;
      var o;
      var n = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(f.PosDoublyList, f.Rotate);
      var s = n.length;
      var c = n[0].length;
      for (let t = 0; t < s; t++) {
        for (let e = 0; e < c; e++) {
          if (n[t][e] === 1) {
            i = t + f.GetServerData().l8n.rPs;
            o = e + f.GetServerData().l8n.iPs;
            this.PosDataDoublyList[i][o] = f.IncId;
          }
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshBackpackData);
    this.Z5_();
  }
  SetQuicklySellData(e, t) {
    this.QuicklySellDataId = e;
    this.QuicklySellRatio = t;
  }
  SetBackpackDataListFromServer(e) {
    this.dgt.clear();
    for (const r of e) {
      var t = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(r);
      this.dgt.set(r.b9n, t);
    }
  }
  GetBackpackItemList() {
    return Array.from(this.dgt.values());
  }
  GetBackpackItemData(e) {
    return this.dgt.get(e);
  }
  get BackpackUseSize() {
    let e = 0;
    for (const t of this.PosDataDoublyList) {
      for (const r of t) {
        if (r > 0) {
          e++;
        }
      }
    }
    return e;
  }
  get BackpackSize() {
    let e = 0;
    for (const t of this.PosDataDoublyList) {
      for (const r of t) {
        if (r > -1) {
          e++;
        }
      }
    }
    return e;
  }
  GetItemCountByItemId(e) {
    let t = 0;
    for (const r of this.dgt.values()) {
      if (r.ItemId === e) {
        t++;
      }
    }
    return t;
  }
  GetItemListByItemId(e) {
    var t = [];
    for (const r of this.dgt.values()) {
      if (r.ItemId === e) {
        t.push(r);
      }
    }
    return t;
  }
}
exports.DockyardBackpackOriginalData = DockyardBackpackOriginalData;
//# sourceMappingURL=DockyardBackpackOriginalData.js.map