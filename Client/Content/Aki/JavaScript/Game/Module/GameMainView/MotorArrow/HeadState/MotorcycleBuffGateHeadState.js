"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleBuffGateHeadState = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleBuffGateHeadState extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Q3g = undefined;
    this.UAe = undefined;
  }
  GetResourceId() {
    return "UiItem_WorldPosBuff2";
  }
  CreateHeadStateView(e, t) {
    var a = this.GetResourceId();
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a);
    this.CreateThenShowByPathAsync(a, e, true);
    this.Q3g = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e;
    await super.OnBeforeStartAsync();
    this.RefreshHeadStateRotation();
    if (this.Q3g && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Q3g.Desc[0], ...this.Q3g.Desc[1]), e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffGateConfigById(this.Q3g.BuffGateId), e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightQuality(e.Quality), this.SetTextureByPath(e.DoorBuffGateBg, this.GetTexture(0)), this.UAe)) {
      this.kCg(this.UAe);
    }
  }
  UpdateByHeadInfo(e) {
    this.kCg(e.Location);
  }
  kCg(e) {
    var t;
    if (this.RootItem) {
      (t = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(e);
      this.RootItem?.SetUIRelativeLocation(t.ToUeVectorOld());
    } else {
      this.UAe = e;
    }
  }
  RefreshHeadStateRotation() {
    var e = CameraController_1.CameraController.CameraRotator;
    var t = MathUtils_1.MathUtils.CommonTempRotator;
    t.Yaw = e.Yaw + 90;
    t.Roll = e.Pitch - 90;
    t.Pitch = 0;
    this.RootItem.SetUIRelativeRotation(t.ToUeRotator());
  }
}
exports.MotorcycleBuffGateHeadState = MotorcycleBuffGateHeadState;
//# sourceMappingURL=MotorcycleBuffGateHeadState.js.map