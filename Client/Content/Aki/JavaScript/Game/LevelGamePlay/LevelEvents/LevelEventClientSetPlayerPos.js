"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientSetPlayerPos = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
class LevelEventClientSetPlayerPos extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.hpl = false;
    this.yJi = 0;
    this._pl = e => {
      var t;
      var r;
      var o;
      var l;
      var i;
      var a;
      var n;
      if (this.OPt && Global_1.Global.BaseCharacter?.IsValid() && (a = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.OPt.TelePortConfig.SourcePosEntityId), r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.OPt.TelePortConfig.TargetPosEntityId), a) && r && (o = Global_1.Global.BaseCharacter.CharacterActorComponent, (i = Rotator_1.Rotator.Create()).Set(a.Transform.Rot?.Y ?? 0, a.Transform.Rot?.Z ?? 0, a.Transform.Rot?.X ?? 0), (l = Vector_1.Vector.Create()).Set(a.Transform.Pos.X, a.Transform.Pos.Y, a.Transform.Pos.Z), (a = Rotator_1.Rotator.Create()).Set(r.Transform.Rot?.Y ?? 0, r.Transform.Rot?.Z ?? 0, r.Transform.Rot?.X ?? 0), (t = Vector_1.Vector.Create()).Set(r.Transform.Pos.X, r.Transform.Pos.Y, r.Transform.Pos.Z), r = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(r), i.Quaternion().Inverse(MathUtils_1.MathUtils.CommonTempQuat), i = Quat_1.Quat.Create(), MathUtils_1.MathUtils.CommonTempQuat.Multiply(o.ActorQuatProxy, i), n = Vector_1.Vector.Create(), o.ActorLocationProxy.Subtraction(l, n), MathUtils_1.MathUtils.CommonTempQuat.RotateVector(n, n), o = Quat_1.Quat.Create(), a.Quaternion().Multiply(i, o), l = Vector_1.Vector.Create(), a.Quaternion().RotateVector(n, l), l.AdditionEqual(t), i = r.Multiply(-1, Vector_1.Vector.Create()), o.GetForwardVector(MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, i, o), (a = Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(67)) && (a.CollectSampleAndSend(true), n = a.GetEnableMovementSync(), this.hpl = n) && a.SetEnableMovementSync(false), this.upl(l, o.Rotator(), e))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 50, "开始客户端传送", ["开始位置", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy], ["目标位置", l], ["开始旋转", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy], ["目标旋转", o.Rotator()], ["原因", "ClientSetPlayerPos"]);
        }
        if (ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(l.ToUeVector())) {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4;
          ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionWithGravityNoLoading(l.ToUeVector(), o.Rotator(), r, "ClientSetPlayerPos").finally(this.cpl);
        } else {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
          ModelManager_1.ModelManager.TeleportModel.TeleportReason = Protocol_1.Aki.Protocol.v4s.Xvs;
          (ControllerHolder_1.ControllerHolder.TeleportController.UseNewTeleport ? (ModelManager_1.ModelManager.TeleportModel.WaitServerResponse = false, ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayer("LevenEvent.ClientSetPlayerPos", l.ToUeVector(), o.Rotator(), r, 0)) : ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionNoSync(l.ToUeVector(), o.Rotator(), r, "ClientSetPlayerPos")).finally(this.cpl);
          ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
        }
      } else {
        this.cpl();
        this.FinishExecute(false);
      }
    };
    this.cpl = () => {
      this.FinishExecute(true);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount " + this.yJi);
      if (Global_1.Global.BaseCharacter?.IsValid() && this.hpl) {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(67)?.SetEnableMovementSync(true);
        this.hpl = false;
      }
    };
  }
  ExecuteNew(e, t) {
    this.OPt = e;
    if (this.OPt && this.OPt.TelePortConfig.Type === IAction_1.EClientTeleportType.RelativeEntityPos && t instanceof LevelGeneralContextDefine_1.TriggerContext && Global_1.Global.BaseCharacter?.IsValid()) {
      if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Teleport", 50, "当前正处于传送过程中，无法进行客户端先行传送", ["TriggerId", t.TriggerEntityId], ["ActionId", this.ActionIndex]);
        }
        this.FinishExecute(false);
      } else {
        this.yJi = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.MotionBlur.Amount");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.InvalidSeveralFrameOcculusion 30");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount 0");
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this._pl(t);
        }, 100);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  upl(t, r, e) {
    if (!e.TriggerEntityId) {
      return false;
    }
    var o = EntitySystem_1.EntitySystem.Get(e.TriggerEntityId);
    if (!o) {
      return false;
    }
    o = o.GetComponent(0);
    const l = o.GetPbDataId();
    o = o.GetCreatureDataId();
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestClientTeleportByClientTrigger(o, l, t, r, this.ActionIndex, e.TriggerType === 1, e => {
      if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "客户端传送请求失败", ["TriggerId", l], ["ActionId", this.ActionIndex], ["Location", t], ["Rotation", r]);
        }
      }
    });
    return true;
  }
}
exports.LevelEventClientSetPlayerPos = LevelEventClientSetPlayerPos;
//# sourceMappingURL=LevelEventClientSetPlayerPos.js.map