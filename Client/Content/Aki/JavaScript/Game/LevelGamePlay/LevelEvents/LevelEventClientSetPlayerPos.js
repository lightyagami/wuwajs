"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientSetPlayerPos = undefined;
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
    this._pl = e => {
      var t;
      var r;
      var o;
      var i;
      var l;
      var a;
      var s;
      if (this.OPt && Global_1.Global.BaseCharacter?.IsValid() && (a = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.OPt.TelePortConfig.SourcePosEntityId), r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.OPt.TelePortConfig.TargetPosEntityId), a) && r && (o = Global_1.Global.BaseCharacter.CharacterActorComponent, (l = Rotator_1.Rotator.Create()).Set(a.Transform?.Rot?.Y ?? 0, a.Transform?.Rot?.Z ?? 0, a.Transform?.Rot?.X ?? 0), (i = Vector_1.Vector.Create()).FromConfigVector(a.Transform?.Pos ?? Vector_1.Vector.ZeroVector), (a = Rotator_1.Rotator.Create()).Set(r.Transform?.Rot?.Y ?? 0, r.Transform?.Rot?.Z ?? 0, r.Transform?.Rot?.X ?? 0), (t = Vector_1.Vector.Create()).FromConfigVector(r.Transform?.Pos ?? Vector_1.Vector.ZeroVector), r = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(r), l.Quaternion().Inverse(MathUtils_1.MathUtils.CommonTempQuat), l = Quat_1.Quat.Create(), MathUtils_1.MathUtils.CommonTempQuat.Multiply(o.ActorQuatProxy, l), s = Vector_1.Vector.Create(), o.ActorLocationProxy.Subtraction(i, s), MathUtils_1.MathUtils.CommonTempQuat.RotateVector(s, s), o = Quat_1.Quat.Create(), a.Quaternion().Multiply(l, o), i = Vector_1.Vector.Create(), a.Quaternion().RotateVector(s, i), i.AdditionEqual(t), l = r.Multiply(-1, Vector_1.Vector.Create()), o.GetForwardVector(MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, l, o), (a = Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(72)) && (a.CollectSampleAndSend(true), s = a.GetEnableMovementSync(), this.hpl = s) && a.SetEnableMovementSync(false), this.upl(i, o.Rotator(), e))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 50, "开始客户端传送", ["开始位置", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorLocationProxy], ["目标位置", i], ["开始旋转", Global_1.Global.BaseCharacter.CharacterActorComponent?.ActorRotationProxy], ["目标旋转", o.Rotator()], ["原因", "ClientSetPlayerPos"]);
        }
        (ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(i.ToUeVector()) ? ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
          ClientReason: "LevelEventClientSetPlayerPos",
          TargetPosition: i.ToUeVector(),
          TargetRotation: o.Rotator(),
          TargetGravityDirect: r,
          TeleportMode: 1
        }) : ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
          ClientReason: "LevelEventClientSetPlayerPos",
          TargetPosition: i.ToUeVector(),
          TargetRotation: o.Rotator(),
          TargetGravityDirect: r,
          TeleportMode: 0,
          ServerReason: Protocol_1.Aki.Protocol.v4s.Xvs,
          NeedRequestToServer: false
        })).finally(this.cpl);
      } else {
        this.cpl();
        this.FinishExecute(false);
      }
    };
    this.cpl = () => {
      this.FinishExecute(true);
      if (Global_1.Global.BaseCharacter?.IsValid() && this.hpl) {
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(72)?.SetEnableMovementSync(true);
        this.hpl = false;
      }
    };
  }
  ExecuteNew(e, t) {
    this.OPt = e;
    if (this.OPt && this.OPt.TelePortConfig.Type === IAction_1.EClientTeleportType.RelativeEntityPos && t instanceof LevelGeneralContextDefine_1.TriggerContext && Global_1.Global.BaseCharacter?.IsValid()) {
      if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Teleport", 79, "当前正处于传送过程中，无法进行客户端先行传送", ["TriggerId", t.TriggerEntityId], ["ActionId", this.ActionIndex]);
        }
        this.FinishExecute(false);
      } else {
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
    const i = o.GetPbDataId();
    o = o.GetCreatureDataId();
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestClientTeleportByClientTrigger(o, i, t, r, this.ActionIndex, e.TriggerType === 1, e => {
      if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "客户端传送请求失败", ["TriggerId", i], ["ActionId", this.ActionIndex], ["Location", t], ["Rotation", r]);
        }
      }
    });
    return true;
  }
}
exports.LevelEventClientSetPlayerPos = LevelEventClientSetPlayerPos;
//# sourceMappingURL=LevelEventClientSetPlayerPos.js.map