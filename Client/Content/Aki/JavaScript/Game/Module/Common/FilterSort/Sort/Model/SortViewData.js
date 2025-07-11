"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortResultData = exports.SortViewData = undefined;
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class SortViewData {
  constructor(t, e) {
    this.ConfigId = t;
    this.ConfirmFunction = e;
  }
}
exports.SortViewData = SortViewData;
class SortResultData {
  constructor() {
    this.Mne = 0;
    this.gUt = undefined;
    this.fUt = undefined;
    this.pUt = false;
  }
  SetConfigId(t) {
    this.Mne = t;
  }
  SetSelectBaseSort(t) {
    this.gUt = t;
  }
  SetSelectAttributeSort(t) {
    this.fUt = t;
  }
  GetSelectBaseSort() {
    return this.gUt;
  }
  GetSelectAttributeSort() {
    return this.fUt;
  }
  SetIsAscending(t) {
    this.pUt = t;
  }
  GetIsAscending() {
    return this.pUt;
  }
  GetAllSelectRuleSet() {
    var t = new Set();
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    for (const r of e.FrontSortList) {
      t.add(r);
    }
    t.add(this.gUt[0]);
    if (this.fUt) {
      for (const s of this.fUt.keys()) {
        t.add(s);
      }
    }
    for (const i of e.LastSortList) {
      t.add(i);
    }
    return t;
  }
  ShowAllSortContent() {
    var t = new StringBuilder_1.StringBuilder();
    t.Append(this.gUt[1]);
    t.Append(",");
    if (this.fUt) {
      for (const e of this.fUt.values()) {
        t.Append(e);
        t.Append(",");
      }
    }
    t.RemoveLast(1);
    return t.ToString();
  }
  ConvertToStorageData() {
    var t = {
      ConfigId: this.Mne,
      IsAscending: this.pUt
    };
    var e = this.GetSelectBaseSort();
    if (e) {
      t.SelectBaseSort = e[0];
    }
    var e = this.GetSelectAttributeSort();
    if (e) {
      e = Array.from(e.keys());
      t.SelectAttributeSort = e;
    }
    return t;
  }
}
exports.SortResultData = SortResultData;
//# sourceMappingURL=SortViewData.js.map