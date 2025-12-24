"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotTrackMark = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const AutoPilotDefine_1 = require("../../AutoPilot/AutoPilotDefine");
const MapDefine_1 = require("../../Map/MapDefine");
const TrackDefine_1 = require("../../Track/TrackDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AutoPilotTrackMark extends UiPanelBase_1.UiPanelBase {
  constructor() {
    var t;
    super();
    this.y$e = 0;
    this.I$e = 0;
    this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
    this.PointTransport = Vector2D_1.Vector2D.Create(1, -1);
    this.SCt = undefined;
    this.ScreenPosition = Vector2D_1.Vector2D.Create();
    this.LastScreenPosition = Vector2D_1.Vector2D.Create();
    this.InRange = false;
    this.TempRotator = Rotator_1.Rotator.Create();
    this.DCt = -1;
    this.xCt = undefined;
    this.DirectionComp = undefined;
    this.xst = undefined;
    this.G6m = false;
    if (GlobalData_1.GlobalData.World) {
      t = UiLayer_1.UiLayer.UiRootItem;
      this.y$e = Math.min(TrackDefine_1.MAX_A, ((t?.GetWidth() ?? 0) - TrackDefine_1.MARGIN_A) / 2);
      this.I$e = Math.min(TrackDefine_1.MAX_B, ((t?.GetHeight() ?? 0) - TrackDefine_1.MARGIN_B) / 2);
    }
  }
  Initialize(t) {
    this.CreateThenShowByResourceIdAsync("UiItem_Mark_Prefab", t, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UINiagara], [6, UE.UIItem]];
  }
  OnStart() {
    this.xCt = this.GetItem(4);
    this.DirectionComp = this.GetItem(2);
    this.OnUiShow();
  }
  OnBeforeDestroy() {
    this.PointTransport = undefined;
    if (TimerSystem_1.TimerSystem.Has(this.SCt)) {
      TimerSystem_1.TimerSystem.Remove(this.SCt);
    }
  }
  OnUiShow() {
    this.RootItem?.SetRelativeScale3D(new UE.Vector(1, 1, 1));
  }
  OnUiHide() {}
  ehi() {
    if (this.G6m) {
      this.TrySetSpriteByPath(this.xst, this.GetSprite(0), false);
      this.G6m = false;
    }
  }
  F6m() {
    var t;
    var i = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (i) {
      t = i.PlayerPoint;
      i = i.GetTrackingPoint();
      if (this.InRange && i) {
        t = Vector_1.Vector.Distance(t, i) * MapDefine_1.FLOAT_0_01;
        i = Math.round(t);
        if (this.DCt !== i) {
          this.DCt = i;
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_Meter_Text", this.DCt.toString());
        }
        this.xCt?.SetUIActive(true);
      } else {
        this.xCt?.SetUIActive(false);
      }
    }
  }
  Update(t) {
    if (GlobalData_1.GlobalData.World && UiLayer_1.UiLayer.UiRootItem && this.RootItem) {
      if (this.tgt()) {
        this.hj1(true);
        this.UpdatePositionAndRotation(t);
        this.F6m();
        this.ehi();
      } else {
        this.hj1(false);
      }
    }
  }
  UpdatePositionAndRotation(t) {
    var i;
    var e;
    var s;
    var r = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult()?.GetTrackingPoint();
    if (r) {
      e = Global_1.Global.CharacterController;
      r = r.ToUeVector();
      if (!(i = UE.GameplayStatics.D_ProjectWorldToScreen(e, r, this.ScreenPositionRef))) {
        (r = (s = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(r)).X = -r.X;
        s = s.TransformPositionNoScale(r);
        UE.GameplayStatics.D_ProjectWorldToScreen(e, s, this.ScreenPositionRef);
      }
      r = (0, puerts_1.$unref)(this.ScreenPositionRef);
      this.ScreenPosition.Set(r.X, r.Y);
      if (!this.LastScreenPosition.Equals(this.ScreenPosition, 1)) {
        this.LastScreenPosition.DeepCopy(this.ScreenPosition);
        e = ModelManager_1.ModelManager.BattleUiModel;
        this.ScreenPosition.MultiplyEqual(e.ScreenPositionScale).AdditionEqual(e.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
        this.InRange = this.ClampToEllipse(this.ScreenPosition, i);
        s = this.ScreenPosition.AdditionEqual(TrackDefine_1.center);
        this.RootItem.SetAnchorOffset(s.ToUeVector2D());
        if (this.InRange) {
          this.DirectionComp.SetUIActive(false);
        } else {
          this.TempRotator.Reset();
          this.TempRotator.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * TrackDefine_1.RAD_2_DEG;
          this.DirectionComp.SetUIRelativeRotation(this.TempRotator.ToUeRotator());
          this.DirectionComp.SetUIActive(true);
        }
      }
    }
  }
  tgt() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    return !!t && t.MapId === ModelManager_1.ModelManager.MapModel?.CurrentWorldMapConfigId && !!t.GetTrackingPoint() && !(t = t.GetIsShowStartPoint() ? AutoPilotDefine_1.STARTPOPINT_ICONPATH : AutoPilotDefine_1.ENDPOINT_ICONPATH, this.xst !== t && (this.xst = t, this.G6m = true), 0);
  }
  ClampToEllipse(t, i) {
    var e = t.X;
    var s = t.Y;
    var r = this.y$e;
    var a = this.I$e;
    return !!i && !!(e * e / (r * r) + s * s / (a * a) <= 1) || (i = r * a / Math.sqrt(a * a * e * e + r * r * s * s), t.MultiplyEqual(i), false);
  }
  hj1(t) {
    if (this.RootItem && this.RootItem.IsUIActiveSelf() !== t) {
      this.RootItem.SetUIActive(t);
    }
  }
}
exports.AutoPilotTrackMark = AutoPilotTrackMark;
//# sourceMappingURL=AutoPilotTrackMark.js.map