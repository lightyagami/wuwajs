"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDropBuffGateHeadState = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleDropBuffGateHeadState extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Q3g = undefined;
    this.UAe = undefined;
    this.O7g = undefined;
  }
  GetResourceId() {
    return "UiItem_WorldPosBuff1";
  }
  CreateHeadStateView(t, e, i) {
    var a = this.GetResourceId();
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a);
    this.CreateThenShowByPathAsync(a, t, true);
    this.Q3g = e;
    this.O7g = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var t;
    var e;
    await super.OnBeforeStartAsync();
    this.RefreshHeadStateRotation();
    if (this.Q3g && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Q3g.Desc[0], ...this.Q3g.Desc[1]), t = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffGateConfigById(this.Q3g.BuffGateId), e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightQuality(t.Quality), this.SetTextureByPath(e.DropBuffGateBg, this.GetTexture(0)), e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetCollectionTypeConfigById(t.Type), this.SetTextureByPath(e.DropBuffGateIcon, this.GetTexture(1)), this.UAe)) {
      this.kCg(this.UAe);
    }
  }
  UpdateByHeadInfo(t) {
    this.kCg(t.Location);
  }
  kCg(t) {
    var e;
    if (this.RootItem) {
      (e = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(t);
      this.RootItem?.SetUIRelativeLocation(e.ToUeVectorOld());
      e = this.G7g(e);
      this.RootItem.SetUIItemScale(new UE.Vector(e, e, e));
    } else {
      this.UAe = t;
    }
  }
  G7g(t) {
    var e = CameraController_1.CameraController.CameraLocation;
    var e = Vector_1.Vector.DistSquared(e, t);
    if (this.O7g) {
      return this.O7g.GetFloatValue(e);
    } else {
      return 1;
    }
  }
  RefreshHeadStateRotation() {
    var t = CameraController_1.CameraController.CameraRotator;
    var e = MathUtils_1.MathUtils.CommonTempRotator;
    e.Yaw = t.Yaw + 90;
    e.Roll = t.Pitch - 90;
    e.Pitch = 0;
    this.RootItem.SetUIRelativeRotation(e.ToUeRotator());
  }
}
exports.MotorcycleDropBuffGateHeadState = MotorcycleDropBuffGateHeadState;
//# sourceMappingURL=MotorcycleDropBuffGateHeadState.js.map