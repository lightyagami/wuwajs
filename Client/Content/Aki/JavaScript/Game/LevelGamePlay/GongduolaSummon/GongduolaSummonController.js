"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaSummonController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class GongduolaSummonController extends ControllerBase_1.ControllerBase {
  static PlaySummonAnim(n) {
    ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp = n.GetComponent(1);
    ResourceSystem_1.ResourceSystem.LoadAsync(ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath, UE.AnimMontage, o => {
      if (o) {
        this.hvc();
        this.Plc = o;
        this.xlc = n.GetComponent(236);
        if (this.xlc) {
          this.Dlc = n.GetComponent(237);
          if (this.Dlc) {
            this.PIc = n.GetComponent(115);
            if (this.PIc) {
              this.Qd1 = n.GetComponent(206);
              if (this.Qd1) {
                this.xlc.StartForceDisableAnimOptimization(3, false);
                this.PIc.StartForceDisableAnimDelay(0);
                this.xlc.Play(this.Plc, this.Ulc);
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SummonGongdola", 31, "[CHTest] PlaySummonAnim");
                }
                if (!this.Qd1.HasTag(786205849)) {
                  this.Qd1.AddTag(786205849);
                }
                TimerSystem_1.TimerSystem.Delay(() => {
                  ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, true, "GongduolaSummonController.PlaySummonAnim", true);
                  this.Dlc.IsSummoningPerform = true;
                  this.Dlc?.EnableUeMovementTick("GongduolaSummonController.PlaySummonAnim");
                }, 100);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到BaseTagComponent");
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到UeSkeletalTickManageComponent");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleMoveComponent");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 加载召唤动画失败", ["Path", ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath]);
      }
    });
  }
  static PlayCancelSummonAnim(n, e, t, m) {
    ResourceSystem_1.ResourceSystem.LoadAsync(ModelManager_1.ModelManager.GongduolaSummonModel.CancelSummonAmPath, UE.AnimMontage, o => {
      if (o) {
        this.Blc = o;
        ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation = e;
        ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation = t;
        ModelManager_1.ModelManager.GongduolaSummonModel.SummonGravityDir = m;
        this.xlc = n.GetComponent(236);
        if (this.xlc) {
          this.Dlc = n.GetComponent(237);
          if (this.Dlc) {
            this.klc = n.GetComponent(1);
            if (this.klc) {
              this.PIc = n.GetComponent(115);
              if (this.PIc) {
                this.Qd1 = n.GetComponent(206);
                if (this.Qd1) {
                  this.Dlc.IsSummoningPerform = true;
                  this.PIc.StartForceDisableAnimDelay(0);
                  this.xlc.StartForceDisableAnimOptimization(3, false);
                  this.Dlc?.EnableUeMovementTick("GongduolaSummonController.PlaySummonAnim");
                  this.xlc.Play(this.Blc, this.qlc);
                  if (!this.Qd1.HasTag(786205849)) {
                    this.Qd1.AddTag(786205849);
                  }
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("SummonGongdola", 31, "[CHTest] PlayCancelSummonAnim");
                  }
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到BaseTagComponent");
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到UeSkeletalTickManageComponent");
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到BaseActorComponent");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleMoveComponent");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 加载召唤动画失败", ["Path", ModelManager_1.ModelManager.GongduolaSummonModel.SummonAmPath]);
      }
    });
  }
  static StopCancelSummonAnim(o) {
    o = o.GetComponent(236);
    if (o) {
      o.StopMontage();
      o.StopModelBuffer();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Item", 31, "[GongduolaSummonController.PlaySummonAnim] 未找到VehicleAnimationComponent");
    }
  }
  static Olc() {
    this.Dlc.IsSummoningPerform = false;
    this.PIc?.CancelForceDisableAnimDelay(0);
    this.xlc?.CancelForceDisableAnimOptimization(3);
  }
  static hvc() {
    const o = ModelManager_1.ModelManager.GongduolaSummonModel.SummonConfig;
    var n;
    if (o) {
      if ((n = ModelManager_1.ModelManager.GongduolaSummonModel.SummonedActorComp) && n.Valid) {
        if (o.BanInput && (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = true, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, ModelManager_1.ModelManager.GongduolaSummonModel.BanInputReason), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("SummonGongdola", 31, "[StartLookAtGongduola] StartLookAtGongduola BanInput");
        }
        (n = Vector_1.Vector.Create(n.ActorLocationProxy)).Set(n.X, n.Y, n.Z + o.OffsetZ);
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(n, o.FadeInTime, o.StayTime, o.FadeOutTime, o.LockCamera, undefined, undefined);
        n = o.FadeInTime + o.StayTime + o.FadeOutTime;
        TimerSystem_1.TimerSystem.Delay(() => {
          if (o.BanInput && (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false, ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("SummonGongdola", 31, "[StartLookAtGongduola] StartLookAtGongduola StopBanInput");
          }
        }, n * MathUtils_1.MathUtils.SecondToMillisecond);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SummonGongdola", 31, "[GongduolaSummonController.StartLookAtGongduola] 未找到GongduolaActorComp");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SummonGongdola", 31, "[GongduolaSummonController.StartLookAtGongduola] 未找到召唤配置");
    }
  }
}
exports.GongduolaSummonController = GongduolaSummonController;
(_a = GongduolaSummonController).Plc = undefined;
GongduolaSummonController.Blc = undefined;
GongduolaSummonController.klc = undefined;
GongduolaSummonController.xlc = undefined;
GongduolaSummonController.Dlc = undefined;
GongduolaSummonController.PIc = undefined;
GongduolaSummonController.Qd1 = undefined;
GongduolaSummonController.Ulc = (o, n) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Temp", 31, "[ChTest]OnSummonAnimEnd", ["Montage", o?.GetName()], ["interrupted", n]);
  }
  if (o === _a.Plc) {
    _a.xlc.RemoveOnMontageEnded(_a.Ulc);
    if (_a.Qd1?.HasTag(786205849)) {
      _a.Qd1?.RemoveTag(786205849);
    }
    _a.Olc();
  }
};
GongduolaSummonController.qlc = (o, n) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Temp", 31, "[ChTest]OnCancelSummonAnimEnd", ["Montage", o?.GetName()], ["interrupted", n]);
  }
  if (o === _a.Blc) {
    _a.xlc.RemoveOnMontageEnded(_a.qlc);
    _a.Olc();
  }
}; //# sourceMappingURL=GongduolaSummonController.js.map