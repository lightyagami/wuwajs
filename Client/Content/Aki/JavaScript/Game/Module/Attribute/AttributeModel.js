"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsDataTool = exports.AttributeModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const CommonComponentDefine_1 = require("../Common/CommonComponentDefine");
const AttributeDefine_1 = require("./AttributeDefine");
class AttributeModel extends ModelBase_1.ModelBase {
  GetFormatAttributeValueString(e, t, r = false) {
    var o = t;
    if (ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e).IsPercent) {
      return MathUtils_1.MathUtils.GetFloatPointFloorString(o / 100, 1) + "%";
    } else if (r) {
      return MathUtils_1.MathUtils.GetFloatPointFloorString(o * 100, 1) + "%";
    } else {
      return Math.floor(t).toString();
    }
  }
  GetFormatAttributeValueByAddType(e, t) {
    if (t === 1) {
      return "" + TipsDataTool.GetPropRatioValue(e, false).toString();
    } else if (t === 2) {
      return TipsDataTool.GetPropRatioValue(e, true).toString() + "%";
    } else if (t === 3) {
      return e.toString() + "s";
    } else {
      return e.toString();
    }
  }
}
exports.AttributeModel = AttributeModel;
class TipsDataTool {
  static GetCommonTipsAttributeData(e, t, r, o) {
    e = TipsDataTool.GetAttributeValue(e, t, r);
    return new CommonComponentDefine_1.TipsAttributeData(o, e, r);
  }
  static GetAttributeValue(e, t, r) {
    let o = 0;
    return o = r ? e / AttributeDefine_1.TEN_THOUSANDTH_RATIO * (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO) : e * (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO);
  }
  static GetPropRatioValue(e, t) {
    let r = 0;
    return r = t ? e / AttributeDefine_1.TEN_THOUSANDTH_RATIO : e;
  }
}
exports.TipsDataTool = TipsDataTool;
//# sourceMappingURL=AttributeModel.js.map