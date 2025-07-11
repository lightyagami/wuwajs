"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTagData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class FloroRanchTagData {
  constructor() {
    this.d6o = 0;
    this.iRu = undefined;
  }
  SetTagId(t) {
    if (t !== this.d6o) {
      this.d6o = t;
      this.iRu = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTagConfig(this.d6o);
    }
  }
  get TagId() {
    return this.d6o;
  }
  get Desc() {
    var t;
    if (this.iRu && (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.iRu.Name))) {
      return StringUtils_1.StringUtils.Format(t, ...this.iRu.NameParam);
    } else {
      return "";
    }
  }
}
exports.FloroRanchTagData = FloroRanchTagData;
//# sourceMappingURL=FloroRanchTagData.js.map