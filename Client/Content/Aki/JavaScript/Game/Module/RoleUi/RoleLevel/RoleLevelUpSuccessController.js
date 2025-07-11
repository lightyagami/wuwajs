"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevelUpSuccessController = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
class RoleLevelUpSuccessController extends UiControllerBase_1.UiControllerBase {
  static OpenSuccessAttributeView(e, r = undefined) {
    UiManager_1.UiManager.OpenView("RoleLevelUpSuccessAttributeView", e, r);
  }
  static OpenSuccessEffectView(e = undefined, r = undefined) {
    e = e ?? {};
    UiManager_1.UiManager.OpenView("RoleLevelUpSuccessEffectView", e, r);
  }
  static ConvertsAttrListScrollDataToAttributeInfo(e) {
    var r = {};
    var a = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e.Id);
    r.Name = a.Name;
    r.IconPath = a.Icon;
    r.ShowArrow = true;
    r.PreText = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, e.BaseValue, e.IsRatio);
    r.CurText = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, e.AddValue, e.IsRatio);
    return r;
  }
}
exports.RoleLevelUpSuccessController = RoleLevelUpSuccessController;
//# sourceMappingURL=RoleLevelUpSuccessController.js.map