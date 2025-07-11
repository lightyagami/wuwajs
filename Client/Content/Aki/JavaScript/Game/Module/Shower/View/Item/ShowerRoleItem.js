"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowerRoleItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const HudUnitUtils_1 = require("../../../HudUnit/Utils/HudUnitUtils");
class ShowerRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LW1 = -1;
    this.wW1 = undefined;
    this.kqe = () => {
      if (this.wW1) {
        this.wW1(this.LW1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  RefreshRoleInfo(e, i) {
    var t;
    if (this.LW1 < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Shower", 78, "位置信息错误", ["pos", this.LW1]);
      }
    } else {
      t = i !== undefined;
      this.GetTexture(1)?.SetUIActive(!t);
      this.GetTexture(2)?.SetUIActive(false);
      if (t) {
        t = i.GetRoleSkinId();
        i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t).RoleHeadIconCircle;
        this.SetRoleSkinIcon(i, this.GetTexture(2), t, undefined, () => {
          this.GetTexture(2)?.SetUIActive(true);
        });
      }
      this.GetText(4)?.SetText((this.LW1 + 1).toString());
      if (this.LW1 === e) {
        this.GetExtendToggle(0).SetToggleState(1);
      } else {
        this.GetExtendToggle(0).SetToggleState(0);
      }
    }
  }
  SetPos(e, i) {
    if (!i) {
      return false;
    }
    this.LW1 = e;
    e = i.GetComponent(1).ActorLocation;
    i = new Vector2D_1.Vector2D();
    return !!HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e, i) && (this.RootItem.SetAnchorOffset(i.ToUeVector2D()), true);
  }
  BindPosChangeCallback(e) {
    this.wW1 = e;
  }
}
exports.ShowerRoleItem = ShowerRoleItem;
//# sourceMappingURL=ShowerRoleItem.js.map