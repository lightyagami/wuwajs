"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTerrainData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const FloroRanchTagData_1 = require("./FloroRanchTagData");
class FloroRanchTerrainData {
  constructor(t) {
    this.Lo = undefined;
    this.TagData = new FloroRanchTagData_1.FloroRanchTagData();
    this.Lo = t;
    this.TagData.SetTagId(this.Lo.Tag);
  }
  get Name() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Lo.Name);
  }
  get Desc() {
    return this.TagData.Desc;
  }
  get Icon() {
    return this.Lo.Pic;
  }
}
exports.FloroRanchTerrainData = FloroRanchTerrainData;
//# sourceMappingURL=FloroRanchTerrainData.js.map