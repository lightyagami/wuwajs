"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpUtil = exports.itemTipsFunctionList = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const TotalTopUpPreviewPersonalizedSubView_1 = require("./View/PreviewSubView/TotalTopUpPreviewPersonalizedSubView");
const TotalTopUpPreviewRoleSubView_1 = require("./View/PreviewSubView/TotalTopUpPreviewRoleSubView");
const TotalTopUpPreviewWeaponSubView_1 = require("./View/PreviewSubView/TotalTopUpPreviewWeaponSubView");
const subViewConstructorMap = new Map([[1, TotalTopUpPreviewRoleSubView_1.TotalTopUpPreviewRoleSubView], [2, TotalTopUpPreviewWeaponSubView_1.TotalTopUpPreviewWeaponSubView], [3, TotalTopUpPreviewPersonalizedSubView_1.TotalTopUpPreviewPersonalizedSubView]]);
const checkIsEquipBuffItem = (e, o) => {
  o = o?.Parameters.get(ItemDefines_1.EItemFunctionType.EquipBuffItem);
  return !!o && !!(o > 0);
};
const showEquipBuffItemTips = (e, o) => {
  ControllerHolder_1.ControllerHolder.SkinController.OpenEquipBuffItemShowView(e);
};
exports.itemTipsFunctionList = [[checkIsEquipBuffItem, showEquipBuffItemTips]];
class TotalTopUpUtil {
  static GetPreviewSubViewConstructor(e) {
    return subViewConstructorMap.get(e);
  }
  static Debug(e, ...o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityTotalTopUp", 95, e, ...o);
    }
  }
  static Error(e, ...o) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityTotalTopUp", 95, e, ...o);
    }
  }
}
exports.TotalTopUpUtil = TotalTopUpUtil;
//# sourceMappingURL=TotalTopUpDefine.js.map