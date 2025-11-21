"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterResultData = exports.FilterViewData = undefined;
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const FilterSortDefine_1 = require("../../FilterSortDefine");
class FilterViewData {
  constructor(t, e) {
    this.UniqueId = t;
    this.ConfirmFunction = e;
  }
}
exports.FilterViewData = FilterViewData;
class FilterResultData {
  constructor() {
    this.B0h = 0;
    this.aDt = new Map();
    this.UniqueId = FilterSortDefine_1.FILTER_SORT_UNVALUE_UNIQUE_ID;
    this.UniqueId = ++FilterResultData.Npd;
  }
  get ConfigId() {
    return this.B0h;
  }
  SetConfigId(t) {
    this.B0h = t;
  }
  AddSingleRuleData(t, e, r) {
    let i = this.aDt.get(t);
    (i = i || new Map()).set(e, r);
    this.aDt.set(t, i);
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
    const i = new Map();
    this.aDt.forEach((t, e) => {
      const r = [];
      t.forEach((t, e) => {
        r.push(e);
      });
      i.set(e, r);
    });
    return {
      ConfigId: this.ConfigId,
      SelectRuleMap: i
    };
  }
}
(exports.FilterResultData = FilterResultData).Npd = 0;
//# sourceMappingURL=FilterViewData.js.map