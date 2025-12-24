"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PilotThrowTargetItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const CommonMarkItem_1 = require("../../../LevelGamePlay/Common/CommonMarkItem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/BigWorld/LHL/DA_Fx_Group_Sl2_LHL_Guangzhu_60M.DA_Fx_Group_Sl2_LHL_Guangzhu_60M";
const LineTraceColor = new UE.LinearColor(1, 0, 0, 1);
class PilotThrowTargetItem extends CommonMarkItem_1.CommonMarkItem {
  constructor(t) {
    super(Vector_1.Vector.Create(t.Position.X ?? 0, t.Position.Y ?? 0, t.Position.Z ?? 0).ToUeVector());
    this.Config = t;
    this.oXm = undefined;
    this.RootActorRotation = Rotator_1.Rotator.Create();
    this.IZd = Vector_1.Vector.Create();
    this.nXm = false;
    this.$pt = undefined;
    this.OnTargetInOutRange = undefined;
    this.i9f = 1;
    this.rvi = undefined;
    this.sXm = false;
    this.yct = t => {
      if (t === "Lock_Out_new") {
        this.oXm?.SetUIActive(false);
      } else if (t === "Close") {
        this.CloseMeAsync();
      }
    };
    this.IZd.Set(this.TargetPosition.X, this.TargetPosition.Y, this.TargetPosition.Z);
    this.nXm = t.VisualType === IComponent_1.EPilotThrowPointVisualType.MainStory;
    this.i9f = t.UiScale ?? ModelManager_1.ModelManager.PilotThrowModel.Setting.Ui缩放;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.RootActorRotation.FromUeRotator(this.RootActor.K2_GetActorRotation());
    this.oXm = this.GetItem(3);
    this.oXm?.SetUIActive(false);
    this.RootItem?.SetAsFirstHierarchy();
    this.GetItem(1)?.SetUIActive(!this.nXm);
    this.GetItem(2)?.SetUIActive(!!this.nXm);
    this.GetItem(4)?.SetUIActive(!!this.nXm);
    this.GetItem(6)?.SetUIActive(!this.nXm);
    this.GetItem(7)?.SetUIActive(!!this.nXm);
    this.GetItem(5)?.SetUIActive(false);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.yct);
    this.$pt?.PlayLevelSequenceByName("Start");
    this.RootItem?.SetRelativeScale3D(new UE.Vector(this.i9f, this.i9f, this.i9f));
    this.RootItem?.SetUIRelativeLocation(UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.TargetPosition));
    this.GetItem(0)?.SetUIActive(false);
    this.i3l();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PilotThrow", 31, "[PilotThrowTargetItem.OnStart] 初始化目标点", ["Id", ModelManager_1.ModelManager.PilotThrowModel.GetCurrentInteractHookPoint()]);
    }
  }
  i3l() {
    if (!PilotThrowTargetItem.uoe) {
      PilotThrowTargetItem.k7r();
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(PilotThrowTargetItem.uoe, this.TargetPosition);
    var t;
    var e = this.TargetPosition.op_Addition(new UE.VectorDouble(0, 0, -6000));
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(PilotThrowTargetItem.uoe, e);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(PilotThrowTargetItem.uoe, "PilotThrowTargetItem");
    if (e) {
      e = Vector_1.Vector.Create();
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(PilotThrowTargetItem.uoe.HitResult, 0, e);
      (t = new UE.TransformDouble(MathUtils_1.MathUtils.DefaultTransform)).SetLocation(e.ToUeVector());
      this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t, EFFECT_PATH, "PilotThrowTargetItem");
    }
  }
  static k7r() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = GlobalData_1.GlobalData.World;
    this.uoe.bIsSingle = false;
    this.uoe.bIgnoreSelf = true;
    this.uoe.bIsProfile = true;
    this.uoe.DrawTime = 0.5;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, LineTraceColor);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, new UE.LinearColor(0, 1, 0, 1));
  }
  Close() {
    this.$pt?.PlayLevelSequenceByName("Close");
    if (this.rvi) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "PilotThrowTargetItem", false);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PilotThrow", 31, "[PilotThrowTargetItem.Close] 关闭目标点", ["Id", ModelManager_1.ModelManager.PilotThrowModel.GetCurrentInteractHookPoint()]);
    }
  }
  OnTick(t) {
    this.UpdateRotation();
    var e = ModelManager_1.ModelManager.PilotThrowModel.IsInProjectileSplineLastPointRange(this.IZd);
    if (e !== this.sXm) {
      this.$pt?.StopPlayingSequence();
      if (e) {
        this.oXm?.SetUIActive(e);
      }
      this.$pt?.PlayLevelSequenceByName(e ? "Lock_In_new" : "Lock_Out_new");
      this.sXm = e;
      this.OnTargetInOutRange?.(e);
    }
  }
  UpdateRotation() {
    var t = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator;
    this.RootActorRotation.Yaw = t.Yaw + 90;
    this.RootActorRotation.Roll = t.Pitch - 90;
    this.RootActorRotation.Pitch = 0;
    this.RootItem.SetUIRelativeRotation(this.RootActorRotation.ToUeRotator());
  }
}
(exports.PilotThrowTargetItem = PilotThrowTargetItem).uoe = undefined;
//# sourceMappingURL=PilotThrowTargetItem.js.map