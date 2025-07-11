"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardItemBlockOriginalData = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
class DockyardItemBlockOriginalData {
  constructor(t) {
    this.SXl = undefined;
    this.PosDoublyList = [];
    this.ValidDoublyList = [];
    this.PosDataList = [];
    this.ValidStartPos = {
      RowIndex: -1,
      ColIndex: -1
    };
    this.SXl = t;
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(this.SXl.L8n);
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(t.Shap).FillState;
    let s = -1;
    let n = -1;
    let a = -1;
    let o = -1;
    for (let r = 0, t = i.length; r < t; r++) {
      this.PosDoublyList[r] = [];
      for (let t = 0, e = i[r].ArrayInt.length; t < e; t++) {
        var h = i[r].ArrayInt[t];
        this.PosDoublyList[r].push(h);
        this.PosDataList.push({
          RowIndex: r,
          ColIndex: t
        });
        if (h === 1) {
          s = s === -1 ? r : Math.min(s, r);
          n = n === -1 ? r : Math.max(n, r);
          a = a === -1 ? t : Math.min(a, t);
          o = o === -1 ? t : Math.max(o, t);
        }
      }
    }
    this.ValidStartPos = {
      RowIndex: s,
      ColIndex: a
    };
    for (let e = 0; e < n - s + 1; e++) {
      this.ValidDoublyList[e] = [];
      for (let t = 0; t < o - a + 1; t++) {
        this.ValidDoublyList[e].push(this.PosDoublyList[e + s][t + a]);
      }
    }
  }
  get IncId() {
    return this.SXl.b9n;
  }
  get ItemId() {
    return this.SXl.L8n;
  }
  get Quality() {
    return this.SXl.ATs;
  }
  get Size() {
    return this.SXl.M8n;
  }
  get Price() {
    return this.SXl.MBs;
  }
  get Cup() {
    return this.SXl.MXl;
  }
  get Rotate() {
    return this.SXl.EXl;
  }
  get PosX() {
    return this.SXl.l8n.iPs;
  }
  get PosY() {
    return this.SXl.l8n.rPs;
  }
  get IsCanSell() {
    return this.SXl.MBs > 0;
  }
  GetServerData() {
    return this.SXl;
  }
}
exports.DockyardItemBlockOriginalData = DockyardItemBlockOriginalData;
//# sourceMappingURL=DockyardItemBlockOriginalData.js.map