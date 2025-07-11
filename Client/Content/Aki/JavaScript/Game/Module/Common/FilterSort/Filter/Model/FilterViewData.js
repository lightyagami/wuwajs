"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterResultData = exports.FilterViewData = undefined;
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
class FilterViewData {
  constructor(t, e) {
    this.ConfigId = t;
    this.ConfirmFunction = e;
  }
}
exports.FilterViewData = FilterViewData;
class FilterResultData {
  constructor() {
    this.ConfigId = 0;
    this.aDt = new Map();
  }
  SetConfigId(t) {
    this.ConfigId = t;
  }
  AddSingleRuleData(t, e, r) {
    let s = this.aDt.get(t);
    (s = s || new Map()).set(e, r);
    this.aDt.set(t, s);
  }
  SetSelectRuleData(t, e) {
    this.aDt.set(t, e);
  }
  SetRuleData(t) {
    this.aDt = t;
  }
  GetSelectRuleDataById(t) {
    return this.aDt.get(t);
  }
  GetSelectRuleData() {
    return this.aDt;
  }
  ClearSelectRuleData() {
    this.aDt.clear();
  }
  ShowAllFilterContent() {
    var t = new StringBuilder_1.StringBuilder();
    for (const e of this.aDt.values()) {
      for (const r of e.values()) {
        t.Append(r);
        t.Append(",");
      }
    }
    t.RemoveLast(1);
    return t.ToString();
  }
  ConvertToStorageData() {
    const s = new Map();
    this.aDt.forEach((t, e) => {
      const r = [];
      t.forEach((t, e) => {
        r.push(e);
      });
      s.set(e, r);
    });
    return {
      ConfigId: this.ConfigId,
      SelectRuleMap: s
    };
  }
}
exports.FilterResultData = FilterResultData;
//# sourceMappingURL=FilterViewData.js.map