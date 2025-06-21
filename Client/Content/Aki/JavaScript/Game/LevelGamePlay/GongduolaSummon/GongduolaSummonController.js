"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GongduolaSummonController = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class GongduolaSummonController extends ControllerBase_1.ControllerBase {
  static PlaySummonAnim(n) {
    ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp = n.GetComponent(1), ResourceSystem_1.ResourceSystem.LoadAsync(ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath, UE.AnimMontage, o => {
      o ? (this.hvc(), this.Plc = o, this.xlc = n.GetComponent(235), this.xlc ? (this.Dlc = n.GetComponent(236), this.Dlc ? (this.PIc = n.GetComponent(114), this.PIc ? (this.Sd1 = n.GetComponent(205), this.Sd1 ? (this.xlc.StartForceDisableAnimOptimization(3, !1), this.PIc.StartForceDisableAnimDelay(0), this.xlc.Play(this.Plc, this.Ulc), Log_1.Log.CheckInfo() && Log_1.Log.Info("SummonGongdola", 31, "[CHTest] PlaySummonAnim"), this.Sd1.HasTag(786205849) || this.Sd1.AddTag(786205849), TimerSystem_1.TimerSystem.Delay(() => {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, !0, "GongduolaSummonController.PlaySummonAnim", !0), this.Dlc.IsSummoningPerform = !0, this.Dlc?.EnableUeMovementTick("GongduolaSummonController.PlaySummonAnim")
      }, 100)) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到BaseTagComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到UeSkeletalTickManageComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleMoveComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 加载召唤动画失败", ["Path", ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath])
    })
  }
  static PlayCancelSummonAnim(n, e, t, m) {
    ResourceSystem_1.ResourceSystem.LoadAsync(ModelManager_1.ModelManager.GongduolaSummonModel.CancelSummonAmPath, UE.AnimMontage, o => {
      o ? (this.Blc = o, ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation = e, ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation = t, ModelManager_1.ModelManager.GongduolaSummonModel.SummonGravityDir = m, this.xlc = n.GetComponent(235), this.xlc ? (this.Dlc = n.GetComponent(236), this.Dlc ? (this.klc = n.GetComponent(1), this.klc ? (this.PIc = n.GetComponent(114), this.PIc ? (this.Sd1 = n.GetComponent(205), this.Sd1 ? (this.Dlc.IsSummoningPerform = !0, this.PIc.StartForceDisableAnimDelay(0), this.xlc.StartForceDisableAnimOptimization(3, !1), this.Dlc?.EnableUeMovementTick("GongduolaSummonController.PlaySummonAnim"), this.xlc.Play(this.Blc, this.qlc), this.Sd1.HasTag(786205849) || this.Sd1.AddTag(786205849), Log_1.Log.CheckInfo() && Log_1.Log.Info("SummonGongdola", 31, "[CHTest] PlayCancelSummonAnim")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到BaseTagComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到UeSkeletalTickManageComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到BaseActorComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleMoveComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent")) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 加载召唤动画失败", ["Path", ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath])
    })
  }
  static StopCancelSummonAnim(o) {
    o = o.GetComponent(235);
    o ? (o.StopMontage(), o.StopModelBuffer()) : Log_1.Log.CheckError() && Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent")
  }
  static Olc() {
    this.Dlc.IsSummoningPerform = !1, this.PIc?.CancelForceDisableAnimDelay(0), this.xlc?.CancelForceDisableAnimOptimization(3)
  }
  static hvc() {
    const o = ModelManager_1.ModelManager.GongduolaSummonModel.SummonConfig;
    var n;
    o ? (n = ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp) && n.Valid ? (o.BanInput && (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, ModelManager_1.ModelManager.GongduolaSummonModel.BanInputReason), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(), Log_1.Log.CheckInfo()) && Log_1.Log.Info("SummonGongdola", 31, "[StartLookAtGongduola] StartLookAtGongduola BanInput"), (n = Vector_1.Vector.Create(n.ActorLocationProxy)).Set(n.X, n.Y, n.Z + o.OffsetZ), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(n, o.FadeInTime, o.StayTime, o.FadeOutTime, o.LockCamera, void 0, void 0), n = o.FadeInTime + o.StayTime + o.FadeOutTime, TimerSystem_1.TimerSystem.Delay(() => {
      o.BanInput && (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !1, ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(), Log_1.Log.CheckInfo()) && Log_1.Log.Info("SummonGongdola", 31, "[StartLookAtGongduola] StartLookAtGongduola StopBanInput")
    }, n * MathUtils_1.MathUtils.SecondToMillisecond)) : Log_1.Log.CheckError() && Log_1.Log.Error("SummonGongdola", 31, "[GongduolaSummonController.StartLookAtGongduola] 未找到GongduolaActorComp") : Log_1.Log.CheckError() && Log_1.Log.Error("SummonGongdola", 31, "[GongduolaSummonController.StartLookAtGongduola] 未找到召唤配置")
  }
}
exports.GongduolaSummonController = GongduolaSummonController, (_a = GongduolaSummonController).Plc = void 0, GongduolaSummonController.Blc = void 0, GongduolaSummonController.klc = void 0, GongduolaSummonController.xlc = void 0, GongduolaSummonController.Dlc = void 0, GongduolaSummonController.PIc = void 0, GongduolaSummonController.Sd1 = void 0, GongduolaSummonController.Ulc = (o, n) => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("Temp", 31, "[ChTest]OnSummonAnimEnd", ["Montage", o?.GetName()], ["interrupted", n]), o === _a.Plc && (_a.xlc.RemoveOnMontageEnded(_a.Ulc), _a.Sd1?.HasTag(786205849) && _a.Sd1?.RemoveTag(786205849), _a.Olc())
}, GongduolaSummonController.qlc = (o, n) => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("Temp", 31, "[ChTest]OnCancelSummonAnimEnd", ["Montage", o?.GetName()], ["interrupted", n]), o === _a.Blc && (_a.xlc.RemoveOnMontageEnded(_a.qlc), _a.Olc())
};
//# sourceMappingURL=GongduolaSummonController.js.map