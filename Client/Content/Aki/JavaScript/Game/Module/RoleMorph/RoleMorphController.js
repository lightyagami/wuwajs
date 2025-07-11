"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMorphController = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const RoleMorphGuYingXiongKaiHandle_1 = require("./handle/RoleMorphGuYingXiongKaiHandle");
const RoleMorphLiuLiDaoLingHandle_1 = require("./handle/RoleMorphLiuLiDaoLingHandle");
const RoleMorphPaoTaiHandle_1 = require("./handle/RoleMorphPaoTaiHandle");
class RoleMorphController extends UiControllerBase_1.UiControllerBase {
  static OnLeaveLevel() {
    if (this.klo) {
      this.klo.EndMorph();
      this.klo = undefined;
    }
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
  }
  static EndMorph() {
    if (this.klo) {
      this.klo.EndMorph();
      this.klo = undefined;
    }
  }
}
(exports.RoleMorphController = RoleMorphController).A6 = new Map([[5012, RoleMorphPaoTaiHandle_1.RoleMorphPaoTaiHandle], [5020, RoleMorphLiuLiDaoLingHandle_1.RoleMorphLiuLiDaoLingHandle], [5021, RoleMorphGuYingXiongKaiHandle_1.RoleMorphGuYingXiongKaiHandle]]);
RoleMorphController.klo = undefined;
RoleMorphController.xie = () => {
  RoleMorphController.EndMorph();
  var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
  if ((e &&= e.RoleConfig?.Id) && (e = RoleMorphController.A6.get(e))) {
    RoleMorphController.klo = new e();
    RoleMorphController.klo.BeginMorph();
  }
}; //# sourceMappingURL=RoleMorphController.js.map