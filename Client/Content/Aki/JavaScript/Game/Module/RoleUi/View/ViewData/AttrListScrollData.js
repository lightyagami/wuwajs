"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttrListScrollData = undefined;
const ScrollViewDataBase_1 = require("../../../Util/ScrollView/ScrollViewDataBase");
class AttrListScrollData extends ScrollViewDataBase_1.ScrollViewDataBase {
  constructor(t, e, s, r, i, a) {
    super();
    this.IsRatio = false;
    this.IsUnknown = false;
    this.CombineNum = 0;
    this.NeedHighLight = false;
    this.Id = t;
    this.BaseValue = e;
    this.AddValue = s;
    this.Priority = r;
    this.IsRatio = i;
    this.AttributeType = a;
  }
  GetName() {
    return "";
  }
  GetIcon() {
    return "";
  }
  GetDesc() {
    return "";
  }
}
exports.AttrListScrollData = AttrListScrollData;
//# sourceMappingURL=AttrListScrollData.js.map