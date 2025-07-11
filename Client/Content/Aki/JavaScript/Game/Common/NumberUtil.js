"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberUtil = undefined;
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../Manager/ConfigManager");
class NumberUtil {
  static GetNumberLocalText(e) {
    let t = "";
    if (e === 1) {
      t = "One";
    } else if (e === 2) {
      t = "Two";
    } else if (e === 3) {
      t = "Three";
    } else if (e === 4) {
      t = "Four";
    } else if (e === 5) {
      t = "Five";
    } else if (e === 6) {
      t = "Six";
    } else if (e === 7) {
      t = "Seven";
    } else if (e === 8) {
      t = "Eight";
    } else if (e === 9) {
      t = "Nine";
    } else if (e === 10) {
      t = "Ten";
    }
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
}
exports.NumberUtil = NumberUtil;
//# sourceMappingURL=NumberUtil.js.map