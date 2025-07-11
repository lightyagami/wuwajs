"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardBackpackData = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardBackpackGridData_1 = require("../Base/DockyardBackpackGridData");
const DockyardItemBlockData_1 = require("../Item/DockyardItemBlockData");
const DockyardQuicklySellData_1 = require("./DockyardQuicklySellData");
class DockyardBackpackData {
  constructor(a) {
    this.v$l = new Map();
    this.y$l = [];
    this.S$l = new Map();
    this.M$l = undefined;
    this.E$l = [];
    this.I$l(a);
    this.T$l();
    this.b$l();
  }
  I$l(a) {
    if (a && (a = ModelManager_1.ModelManager.DockyardModel.GetQuicklySellId()) > 0) {
      this.M$l = new DockyardQuicklySellData_1.DockyardQuicklySellData(a);
    }
  }
  T$l() {
    var a = ModelManager_1.ModelManager.DockyardModel.FishingCabinShape;
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(a);
    for (let e = 0; e < FishingDefine_1.BACKPACK_ROW_COUNT; e++) {
      this.y$l[e] = [];
      for (let a = 0; a < FishingDefine_1.BACKPACK_COL_COUNT; a++) {
        var i = {
          RowIndex: e,
          ColIndex: a
        };
        var r = new DockyardBackpackGridData_1.DockyardBackpackGridData(i);
        var s = this.M$l?.PosDataDoublyList[e][a] === 1;
        r?.SetIsQuicklySell(s);
        if (t.FillState[e].ArrayInt[a] === 1) {
          r?.SetGridType(1);
        } else {
          r?.SetGridType(0);
        }
        this.E$l.push(i);
        this.y$l[e].push(i);
        this.v$l.set(i, r);
      }
    }
  }
  _X_() {
    for (let e = 0; e < FishingDefine_1.BACKPACK_ROW_COUNT; e++) {
      for (let a = 0; a < FishingDefine_1.BACKPACK_COL_COUNT; a++) {
        this.v$l.get(this.y$l[e][a])?.SetItemBlockId(FishingDefine_1.UNVALID_ITEM_BLOCK_ID);
      }
    }
  }
  b$l() {
    this.S$l.clear();
    for (const e of ModelManager_1.ModelManager.DockyardModel.GetBackpackItemList()) {
      var a = new DockyardItemBlockData_1.DockyardItemBlockData(e);
      this.S$l.set(e.IncId, a);
      this.L$l(a);
    }
  }
  RefreshBackpackData() {
    this._X_();
    this.b$l();
  }
  L$l(t) {
    var i = t.PanelRange;
    for (let e = i.RowStartIndex; e <= i.RowEndIndex; e++) {
      for (let a = i.ColStartIndex; a <= i.ColEndIndex; a++) {
        if (!(e < 0) && !(e >= FishingDefine_1.BACKPACK_ROW_COUNT) && !(a < 0) && !(a >= FishingDefine_1.BACKPACK_COL_COUNT)) {
          this.v$l.get(this.y$l[e][a])?.SetItemBlockId(t.Data.IncId);
        }
      }
    }
  }
  TO_() {
    var a = this.M$l.PosDataDoublyList.length;
    for (let e = 0; e < a; e++) {
      var t = this.M$l.PosDataDoublyList[e].length;
      for (let a = 0; a < t; a++) {
        var i = this.M$l?.PosDataDoublyList[e][a] === 1;
        var r = this.y$l[e][a];
        this.v$l.get(r)?.SetIsQuicklySell(i);
      }
    }
  }
  bO_() {
    for (const a of this.v$l.values()) {
      a.SetIsQuicklySell(false);
    }
  }
  RefreshQuicklySellOpen(a) {
    if (a) {
      a = ModelManager_1.ModelManager.DockyardModel.GetQuicklySellId();
      this.M$l = new DockyardQuicklySellData_1.DockyardQuicklySellData(a);
      this.TO_();
    } else {
      this.bO_();
    }
  }
  GetBackpackDataList() {
    return this.E$l;
  }
  GetBackpackPosByPos(a, e) {
    return this.y$l[a][e];
  }
  GetBackpackItemList() {
    return Array.from(this.S$l.values());
  }
  GetBackpackItemMap() {
    return this.S$l;
  }
  GetBackpackGridData(a) {
    return this.v$l.get(a);
  }
  AddItemBlockData(a) {
    var e = new DockyardItemBlockData_1.DockyardItemBlockData(a);
    this.S$l.set(a.IncId, e);
    return e;
  }
  DeleteItemBlockData(a) {
    this.S$l.delete(a);
  }
  GetItemBlockData(a) {
    return this.S$l.get(a);
  }
}
exports.DockyardBackpackData = DockyardBackpackData;
//# sourceMappingURL=DockyardBackpackData.js.map