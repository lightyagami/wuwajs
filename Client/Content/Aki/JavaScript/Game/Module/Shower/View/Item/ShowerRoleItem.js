"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShowerRoleItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  HudUnitUtils_1 = require("../../../HudUnit/Utils/HudUnitUtils");
class ShowerRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.$$1 = -1, this.W$1 = void 0, this.kqe = () => {
      this.W$1 && this.W$1(this.$$1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.kqe]
    ]
  }
  RefreshRoleInfo(e, i) {
    var t;
    this.$$1 < 0 ? Log_1.Log.CheckError() && Log_1.Log.Error("Shower", 78, "位置信息错误", ["pos", this.$$1]) : (t = void 0 !== i, this.GetTexture(1)?.SetUIActive(!t), this.GetTexture(2)?.SetUIActive(!1), t && (t = i.GetRoleSkinId(), i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t).RoleHeadIconCircle, this.SetRoleSkinIcon(i, this.GetTexture(2), t, void 0, () => {
      this.GetTexture(2)?.SetUIActive(!0)
    })), this.GetText(4)?.SetText((this.$$1 + 1).toString()), this.$$1 === e ? this.GetExtendToggle(0).SetToggleState(1) : this.GetExtendToggle(0).SetToggleState(0))
  }
  SetPos(e, i) {
    if (!i) return !1;
    this.$$1 = e;
    e = i.GetComponent(1).ActorLocation, i = new Vector2D_1.Vector2D;
    return !!HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e, i) && (this.RootItem.SetAnchorOffset(i.ToUeVector2D()), !0)
  }
  BindPosChangeCallback(e) {
    this.W$1 = e
  }
}
exports.ShowerRoleItem = ShowerRoleItem;
//# sourceMappingURL=ShowerRoleItem.js.map