"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePlayerMarkView = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const TrapDefenseMarkView_1 = require("./TrapDefenseMarkView");
const PLAYER_ROTATE_UPDATE_THRESHOLD = 10;
class TrapDefensePlayerMarkView extends TrapDefenseMarkView_1.TrapDefenseMarkView {
  constructor(e, r) {
    super(e);
    this.jzu = r;
    this.aN_ = new UE.Rotator(0, 0, 0);
    this.hN_ = new UE.Rotator(0, 0, 0);
    this.NeedUpdatePositionInner = true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  UpdatePosition(e, r) {
    var t;
    var a;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid && (i = i.Entity.GetComponent(3)) && (a = this.GetMarkData()) !== undefined) {
      a = a.UiPosition;
      a = Vector2D_1.Vector2D.Create(a.X, a.Y);
      t = Vector2D_1.Vector2D.Create();
      a.Multiply(e, t).Subtraction(r, t);
      this.SetAnchorOffset(t, [this.jzu]);
      a = this.GetItem(0);
      e = -(i.ActorRotationProxy.Yaw + 90);
      if (Math.abs(this.hN_.Yaw - e) > PLAYER_ROTATE_UPDATE_THRESHOLD) {
        this.hN_.Yaw = e;
        a.SetUIRelativeRotation(this.hN_);
      }
      r = ModelManager_1.ModelManager.CameraModel.CameraRotator.Yaw;
      this.aN_.Yaw = this.lN_(-(r + 90));
      this.jzu.SetUIRelativeRotation(this.aN_);
    }
  }
  lN_(e) {
    if (ModelManager_1.ModelManager.CameraModel.CameraMode === 0 && ModelManager_1.ModelManager.CameraModel.FightCamera && ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent) {
      var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CurrentCamera;
      var t = r.YawLimitMin;
      var t = (r.YawLimitMax - t) % 360;
      if (MathUtils_1.MathUtils.IsNearlyZero(t) || MathUtils_1.MathUtils.IsNearlyEqual(t, 360)) {
        return MathUtils_1.MathUtils.Clamp(MathUtils_1.MathUtils.WrapAngle(e), r.WorldYawMin, r.WorldYawMax);
      }
    }
    return e;
  }
}
exports.TrapDefensePlayerMarkView = TrapDefensePlayerMarkView;
//# sourceMappingURL=TrapDefenseMarkPlayerMarkView.js.map