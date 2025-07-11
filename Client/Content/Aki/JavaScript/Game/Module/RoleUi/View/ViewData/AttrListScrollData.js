"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttrListScrollData = undefined;
const ScrollViewDataBase_1 = require("../../../Util/ScrollView/ScrollViewDataBase");
class AttrListScrollData extends ScrollViewDataBase_1.ScrollViewDataBase {
  constructor(t, s, e, i, r, l) {
    super();
    this.IsRatio = false;
    this.IsUnknown = false;
    this.CombineNum = 0;
    this.NeedHighLight = false;
    this.Id = t;
    this.BaseValue = s;
    this.AddValue = e;
    this.Priority = i;
    this.IsRatio = r;
    this.AttributeType = l;
  }
}
exports.AttrListScrollData = AttrListScrollData;
//# sourceMappingURL=AttrListScrollData.js.map