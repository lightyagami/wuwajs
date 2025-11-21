"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueBossTrackedMarker = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiActorPool_1 = require("../../../../Ui/UiActorPool");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MAX_A = 1176;
const MARGIN_A = 1008;
const MAX_B = 712.5;
const MARGIN_B = 495;
const RAD_2_DEG = 180 / Math.PI;
class SurvivorsRogueBossTrackedMarker extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.DirectionArrow = undefined;
    this.MarkerActor = undefined;
    this.ResourceId = undefined;
    this.AnimSequencePlayer = undefined;
    this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
    this.TrackedEntityId = undefined;
    this.TrackedEntity = undefined;
    this.ScreenPosition = undefined;
    this.LastScreenPosition = undefined;
    this.PointTransport = Vector2D_1.Vector2D.Create(1, -1);
    this.InRange = false;
    this.TempRotator = undefined;
    this.LimitA = 0;
    this.LimitB = 0;
    this.TickEnabled = false;
    this.TrackedEntityId = e;
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetSubModel(1);
    this.TrackedEntity = t.KscEntities.get(e);
    this.ScreenPosition = Vector2D_1.Vector2D.Create();
    this.LastScreenPosition = Vector2D_1.Vector2D.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    var t = UiLayer_1.UiLayer.UiRootItem;
    this.LimitA = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2);
    this.LimitB = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.DirectionArrow = this.GetItem(0);
    this.AnimSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.AnimSequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.Recycle();
      }
    });
  }
  OnAfterShow() {
    super.OnAfterShow();
    if (this.AnimSequencePlayer.IsPlayingSequence("Close")) {
      this.AnimSequencePlayer.StopSequenceByKey("Close");
    }
    this.AnimSequencePlayer.PlayOrReplaySequenceByName("Start");
  }
  OnBeforeShow() {
    this.TickEnabled = true;
  }
  OnBeforeHide() {
    this.TickEnabled = false;
  }
  async CreateByPoolResourceIdAsync(e, t) {
    await this.Bh_(e, t);
    if (!this.IsDestroyOrDestroying && !this.WaitToDestroy) {
      await this.CreateByActorAsync(this.MarkerActor.Actor, t);
    }
  }
  async Bh_(e, t) {
    this.ResourceId = e;
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.MarkerActor = await UiActorPool_1.UiActorPool.GetAsync(e);
    if (t !== undefined) {
      this.MarkerActor.UiItem.SetUIParent(t);
    }
  }
  Recycle() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 79, "SurvivorsRogueBossTrackedMarker.Recycle");
    }
    UiActorPool_1.UiActorPool.RecycleAsync(this.MarkerActor, this.ResourceId);
  }
  DelayRecycle() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 79, "SurvivorsRogueBossTrackedMarker.DelayRecycle");
    }
    if (this.AnimSequencePlayer.IsPlayingSequence("Start")) {
      this.AnimSequencePlayer.StopSequenceByKey("Start");
    } else if (this.AnimSequencePlayer.IsPlayingSequence("Close")) {
      return;
    }
    this.AnimSequencePlayer.PlayOrReplaySequenceByName("Close");
  }
  OnTick(e) {
    var t;
    if (this.TickEnabled && Global_1.Global.CharacterController && this.TrackedEntity && (t = this.TrackedEntity.KscEntity)) {
      this.UpdateTargetPosition(t.D_K2_GetActorLocation());
    }
  }
  UpdateTargetPosition(e) {
    var t;
    var i = Global_1.Global.CharacterController;
    var s = UE.GameplayStatics.D_ProjectWorldToScreen(i, e, this.ScreenPositionRef);
    if (!s) {
      (e = (t = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(e)).X = -e.X;
      t = t.TransformPositionNoScale(e);
      UE.GameplayStatics.D_ProjectWorldToScreen(i, t, this.ScreenPositionRef);
    }
    var e = (0, puerts_1.$unref)(this.ScreenPositionRef);
    this.ScreenPosition.Set(e.X, e.Y);
    if (!this.LastScreenPosition.Equals(this.ScreenPosition, 1)) {
      this.LastScreenPosition.DeepCopy(this.ScreenPosition);
      i = ModelManager_1.ModelManager.BattleUiModel;
      this.ScreenPosition.MultiplyEqual(i.ScreenPositionScale).AdditionEqual(i.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
      this.InRange = this.ClampToEllipse(this.ScreenPosition, s);
      this.RootItem.SetAnchorOffset(this.ScreenPosition.ToUeVector2D());
      if (this.InRange) {
        this.SetUiActive(false);
      } else {
        this.TempRotator.Reset();
        this.TempRotator.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * RAD_2_DEG;
        this.DirectionArrow.SetUIRelativeRotation(this.TempRotator.ToUeRotator());
        this.SetUiActive(true);
      }
    }
  }
  ClampToEllipse(e, t) {
    var i = e.X;
    var s = e.Y;
    var r = this.LimitA;
    var o = this.LimitB;
    return !!t && !!(i * i / (r * r) + s * s / (o * o) <= 1) || (t = r * o / Math.sqrt(o * o * i * i + r * r * s * s), e.MultiplyEqual(t), false);
  }
}
exports.SurvivorsRogueBossTrackedMarker = SurvivorsRogueBossTrackedMarker;
//# sourceMappingURL=SurvivorsRogueBossTrackedMarker.js.map