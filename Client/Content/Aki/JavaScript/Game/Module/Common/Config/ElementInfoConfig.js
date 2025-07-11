"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementInfoConfig = undefined;
const ElementInfoById_1 = require("../../../../Core/Define/ConfigQuery/ElementInfoById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ElementInfoConfig extends ConfigBase_1.ConfigBase {
  GetConfigList(e) {
    var n = new Array();
    for (const o of e) {
      var t = ElementInfoById_1.configElementInfoById.GetConfig(o);
      n.push(t);
    }
    n.sort((e, n) => e.Id - n.Id);
    return n;
  }
  GetElementInfo(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e);
  }
  GetElementInfoLocalName(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetElementInfoNameByElementId(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.GetElementInfo(e).Name);
  }
}
exports.ElementInfoConfig = ElementInfoConfig;
//# sourceMappingURL=ElementInfoConfig.js.map