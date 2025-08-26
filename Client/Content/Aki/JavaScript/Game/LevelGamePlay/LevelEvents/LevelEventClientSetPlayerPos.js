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
const TeleportDefine_1 = require("../../Module/Teleport/TeleportDefine");
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
      var s;
      if (this.OPt && Global_1.Global.BaseCharacter?.IsValid() && (i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.OPt.TelePortConfig.SourcePosEntityId), t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.OPt.TelePortConfig.TargetPosEntityId), i) && t && (r = Global_1.Global.BaseCharacter.CharacterActorComponent, (l = Rotator_1.Rotator.Create()).Set(i.Transform.Rot?.X ?? 0, i.Transform.Rot?.Y ?? 0, i.Transform.Rot?.Z ?? 0), (o = Vector_1.Vector.Create()).Set(i.Transform.Pos.X, i.Transform.Pos.Y, i.Transform.Pos.Z), (i = Rotator_1.Rotator.Create()).Set(t.Transform.Rot?.X ?? 0, t.Transform.Rot?.Y ?? 0, t.Transform.Rot?.Z ?? 0), (s = Vector_1.Vector.Create()).Set(t.Transform.Pos.X, t.Transform.Pos.Y, t.Transform.Pos.Z), t = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(t), l.Quaternion().Inverse(MathUtils_1.MathUtils.CommonTempQuat), l = Quat_1.Quat.Create(), MathUtils_1.MathUtils.CommonTempQuat.Multiply(r.ActorQuatProxy, l), a = Vector_1.Vector.Create(), r.ActorLocationProxy.Subtraction(o, a), MathUtils_1.MathUtils.CommonTempQuat.RotateVector(a, a), r = Quat_1.Quat.Create(), i.Quaternion().Multiply(l, r), o = Vector_1.Vector.Create(), i.Quaternion().RotateVector(a, o), o.AdditionEqual(s), l = t.Multiply(-1, Vector_1.Vector.Create()), r.GetForwardVector(MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, l, r), (i = Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(67)) && (i.CollectSampleAndSend(true), a = i.GetEnableMovementSync(), this.hpl = a) && i.SetEnableMovementSync(false), this.upl(o, r.Rotator(), e))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 50, "开始客户端传送", ["开始位置", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy], ["目标位置", o], ["开始旋转", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy], ["目标旋转", r.Rotator()], ["原因", "ClientSetPlayerPos"]);
        }
        if (ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(o.ToUeVector())) {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4;
          ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionWithGravityNoLoading(o.ToUeVector(), r.Rotator(), t, "ClientSetPlayerPos").finally(this.cpl);
        } else {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
          s = new TeleportDefine_1.TeleportContext(Protocol_1.Aki.Protocol.v4s.Xvs, undefined, undefined, undefined, undefined);
          ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionNoSync(o.ToUeVector(), r.Rotator(), t, "ClientSetPlayerPos", s).finally(this.cpl);
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