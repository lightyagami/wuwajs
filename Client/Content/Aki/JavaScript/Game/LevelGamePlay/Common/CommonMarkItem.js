"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonMarkItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const TrackDefine_1 = require("../../Module/Track/TrackDefine");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../Ui/UiLayer");
class CommonMarkItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e = Vector2D_1.Vector2D.Create(0, 0)) {
    super();
    this.TargetPosition = t;
    this.Center = e;
    this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
    this.ScreenPosition = Vector2D_1.Vector2D.Create();
    this.LastScreenPosition = Vector2D_1.Vector2D.Create();
    this.bZd = Vector2D_1.Vector2D.Create();
    this.PointTransport = Vector2D_1.Vector2D.Create(1, -1);
    this.MKm = false;
    this.InRange = false;
    this.y$e = 0;
    this.I$e = 0;
    t = UiLayer_1.UiLayer.UiRootItem;
    this.y$e = Math.min(TrackDefine_1.MAX_A, ((t?.GetWidth() ?? 0) - TrackDefine_1.MARGIN_A) / 2);
    this.I$e = Math.min(TrackDefine_1.MAX_B, ((t?.GetHeight() ?? 0) - TrackDefine_1.MARGIN_B) / 2);
  }
  GetScreenPositionWithoutClamp(t = undefined) {
    if (t) {
      t.DeepCopy(this.bZd);
      return t;
    } else {
      return this.bZd;
    }
  }
  IsInRange() {
    return this.InRange;
  }
  InRangeStateChanged(t) {}
  OnScreenPositionChanged(t) {}
  OnTick(t) {
    this.UpdatePositionAndRotation();
  }
  UpdatePositionAndRotation() {
    var t;
    var e;
    var i;
    var s;
    if (this.TargetPosition && (i = Global_1.Global.CharacterController)) {
      if (!(t = UE.GameplayStatics.D_ProjectWorldToScreen(i, this.TargetPosition, this.ScreenPositionRef))) {
        (e = (s = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(this.TargetPosition)).X = -e.X;
        s = s.TransformPositionNoScale(e);
        UE.GameplayStatics.D_ProjectWorldToScreen(i, s, this.ScreenPositionRef);
      }
      e = (0, puerts_1.$unref)(this.ScreenPositionRef);
      this.ScreenPosition.Set(e.X, e.Y);
      if (!this.LastScreenPosition.Equals(this.ScreenPosition, 1)) {
        this.LastScreenPosition.DeepCopy(this.ScreenPosition);
        i = ModelManager_1.ModelManager.BattleUiModel;
        this.ScreenPosition.MultiplyEqual(i.ScreenPositionScale).AdditionEqual(i.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
        this.bZd.DeepCopy(this.ScreenPosition);
        this.InRange = this.ClampToEllipse(this.ScreenPosition, t);
        if (this.InRange !== this.MKm) {
          this.InRangeStateChanged(this.InRange);
        }
        this.MKm = this.InRange;
        s = this.ScreenPosition.AdditionEqual(this.Center);
        this.RootItem.SetAnchorOffset(s.ToUeVector2D());
        this.OnScreenPositionChanged(this.InRange);
      }
    }
  }
  ClampToEllipse(t, e) {
    var i = t.X;
    var s = t.Y;
    var r = this.y$e;
    var h = this.I$e;
    return !!e && !!(i * i / (r * r) + s * s / (h * h) <= 1) || (e = r * h / Math.sqrt(h * h * i * i + r * r * s * s), t.MultiplyEqual(e), false);
  }
}
exports.CommonMarkItem = CommonMarkItem;
//# sourceMappingURL=CommonMarkItem.js.map