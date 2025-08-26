"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformRideVehicleState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformRideVehicleState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this._Ul = new Map();
    this.uUl = false;
    this.uKl = false;
    this.dKl = false;
    this.Qer = undefined;
    this.mKl = (t, e) => {
      this.uUl = false;
      this.dKl = false;
      this.Qer = undefined;
    };
    this.OnLoopMontageEndForTurning = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[NpcPerformRideVehicleState.OnLoopMontageEndForTurning][交互转身] Montage播放完毕", ["PbDataID", this.ConfigId]);
      }
      this.AnimComp?.MainAnimInstance?.OnAllMontageInstancesEnded.Remove(this.OnLoopMontageEndForTurning);
      if (this.Owner.Entity.GetComponent(188)?.GetCurrentState() !== 9) {
        this.TurnActionController.TurnToInteractTarget();
      }
    };
  }
  OnCreate(t) {
    super.OnCreate(t);
    if (t?.ShowOnRideInVehicle?.length) {
      for (const e of t.ShowOnRideInVehicle) {
        this._Ul.set(e.Type, e.Montage);
      }
    }
  }
  OnEnter(t) {
    if (!this.PerformComp?.IsBaseRoleNpc) {
      this.CKl();
    }
  }
  OnExit(t) {
    if (t !== 9 && !this.PerformComp?.IsBaseRoleNpc) {
      this.vtr();
    }
  }
  OnUpdate(t) {
    if (!this.PerformComp?.IsBaseRoleNpc && !this.PerformComp?.IsInPlot && !this.InteractRequestWaiting && !this.TurnActionController.NeedTurn) {
      this.CKl();
    }
  }
  CKl() {
    if (!this.uKl && !this.uUl) {
      const e = this.Owner?.Entity?.GetComponent(230);
      var t;
      if (e?.VehicleType) {
        if (t = this._Ul.get(e.VehicleType)) {
          this.uKl = true;
          ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, t => {
            this.uKl = false;
            if (t?.IsValid() && e.IsOnVehicle && this.PerformComp?.GetCurrentState() === 8) {
              this.PlayMontage({
                MontageAsset: t,
                OnEndCallback: this.mKl
              });
              this.uUl = true;
              this.Qer = t;
            }
          });
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("NPC", 50, "获取NPC乘坐载具Montage失败", ["PbDataId", this.ConfigId], ["VehicleType", e.VehicleType]);
        }
      }
    }
  }
  vtr(t = 0) {
    if ((!!this.uUl || !!this.uUl) && !this.dKl) {
      this.dKl = true;
      this.StopMontage({
        Method: 2
      });
    }
  }
  OnPlayerInteractTurnActionStart() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 50, "[NpcPerformRideVehicleState.OnPlayerInteractTurnActionStart] 开始执行交互转身", ["PbDataID", this.ConfigId]);
    }
    this.InteractRequestWaiting = true;
    var t = this.Owner?.Entity?.GetComponent(44);
    if (t?.MainAnimInstance?.IsAnyMontagePlaying() && this.TurnActionController.NeedTurn) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[NpcPerformRideVehicleState.OnPlayerInteractTurnActionStart][交互转身] 停止播放Montage", ["PbDataID", this.ConfigId], ["CurrentMontage", t?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName()]);
      }
      this.AnimComp?.MainAnimInstance?.OnAllMontageInstancesEnded.Add(this.OnLoopMontageEndForTurning);
      this.Utr();
    } else {
      this.TurnActionController.TurnToInteractTarget();
    }
  }
  OnPlayerInteractTurnActionEnd() {
    var t = this.Owner.Entity.GetComponent(44);
    if (t.MainAnimInstance.IsAnyMontagePlaying() && this.TurnActionController.NeedTurn) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[NpcPerformRideVehicleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage", ["PbDataID", this.ConfigId], ["CurrentMontage", t?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName()]);
      }
      this.Utr();
    }
    const e = this.Owner.Entity.GetComponent(230);
    if (e?.GetSeatTransform(this.TmpTrans)) {
      this.TmpTrans.GetRotation().GetForwardVector(this.TmpVector);
      this.TurnActionController.UpdateDefaultDirect(this.TmpVector);
      this.TurnActionController.OnTurnToDefaultForwardEndHandle = () => {
        if (this?.Owner?.Valid) {
          this.TurnActionController.NeedTurn = false;
          e?.AttachAndSetPassengerTransform();
        }
      };
      this.TurnActionController.TurnToDefaultForward();
      this.InteractRequestWaiting = false;
    }
  }
  Utr() {
    this.dKl = true;
    this.StopMontage({
      Method: 0,
      BlendOutTime: 0.5,
      Montage: this.Qer
    });
  }
}
exports.NpcPerformRideVehicleState = NpcPerformRideVehicleState;
//# sourceMappingURL=NpcPerformRideVehicleState.js.map