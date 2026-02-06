"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterController = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ObjectSystem_1 = require("../../../Core/Object/ObjectSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WorldEntity_1 = require("./WorldEntity");
class CharacterController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.Uqn = new Date();
    return true;
  }
  static OnTick(t) {
    if (!CharacterController.dKo()) {
      CharacterController.CKo();
    }
    if (Net_1.Net.IsFinishLogin()) {
      this.Rqn();
    }
  }
  static async Rqn() {
    var t;
    var e = new Date();
    if ((e.getTime() - this.Uqn.getTime()) / 1000 / 60 >= 3 && (this.Uqn = e, (e = cpp_1.FuncOpenLibrary.GetEBuffer()).byteLength > 0)) {
      t = new Uint8Array(e);
      t = new Uint8Array(t);
      cpp_1.FuncOpenLibrary.FreeArrayBuffer(e);
      (e = new Protocol_1.Aki.Protocol.CombatMessage.Hfs()).Ujn = t;
      t = await Net_1.Net.CallAsync(22564, e);
      cpp_1.FuncOpenLibrary.SetIsCheckEncrypt(t?.JLs ?? "");
    }
  }
  static InitData(t, e, r) {
    return !!EntitySystem_1.EntitySystem.InitData(e, r) || (ModelManager_1.ModelManager.CharacterModel.ClearHandle(t), false);
  }
  static Respawn(t, e, r = 0, a) {
    return !!EntitySystem_1.EntitySystem.Respawn(e, true, r, a) || (ModelManager_1.ModelManager.CharacterModel.ClearHandle(t), false);
  }
  static AddEntityToAwakeQueue(t, e) {
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 进入唤醒队列", ["EntityId", t.Id], ["CreatureDataId", t.CreatureDataId], ["PbDataId", t.PbDataId], ["Priority", t.Priority]);
    }
    let r = false;
    ModelManager_1.ModelManager.CharacterModel.PushAwakeHandler(t, () => this.InitEntity(t) ? r = true : (e(false), false), () => !!r && (this.StartEntity(t) ? (e(true), true) : (e(false), false)));
  }
  static InitEntity(t) {
    var e;
    var r;
    return !!t.Valid && !(r = (e = t.Entity).GetComponent(0)).GetRemoveState() && !(EntitySystem_1.EntitySystem.Init(e) ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 实体执行Init成功", ["CreatureDataId", t.CreatureDataId], ["EntityId", t.Id], ["PbDataId", r.GetPbDataId()]), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] 实体执行Init失败，创建实体失败。", ["CreatureDataId", t.CreatureDataId], ["EntityId", t.Id], ["PbDataId", r.GetPbDataId()]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateEntityFail, t.CreatureDataId), 1));
  }
  static StartEntity(t) {
    var e;
    var r;
    return !!t.Valid && !(e = t.Entity.GetComponent(0)).GetRemoveState() && !(r = t.Entity, EntitySystem_1.EntitySystem.Start(r) ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 实体执行Start成功", ["CreatureDataId", t.CreatureDataId], ["EntityId", t.Id], ["PbDataId", e.GetPbDataId()]), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] 实体执行Start失败，创建实体失败。", ["CreatureDataId", t.CreatureDataId], ["EntityId", t.Id], ["PbDataId", e.GetPbDataId()]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateEntityFail, t.CreatureDataId), 1));
  }
  static ActivateEntity(t) {
    if (t.Valid) {
      t = t.Entity;
      EntitySystem_1.EntitySystem.Activate(t);
      t.SetTimeDilation(Time_1.Time.TimeDilation);
    }
  }
  static Destroy(t) {
    if (!t?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 1, "Destroy的entity无效，可能的原因有:1、创建失败 2、实体重复销毁", ["Id", t?.Id]);
      }
      return false;
    }
    ModelManager_1.ModelManager.CharacterModel.ClearHandle(t);
    var e = t.Entity;
    t.Entity = undefined;
    ModelManager_1.ModelManager.CharacterModel.EntityPool.RemoveExternal(e);
    return EntitySystem_1.EntitySystem.Destroy(e);
  }
  static DestroyToLru(t) {
    if (!t?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "Destroy的entity无效，可能的原因有:1、创建失败 2、实体重复销毁", ["Id", t?.Id]);
      }
      return false;
    }
    var e = t.Entity;
    if (!t.IsInit) {
      return this.Destroy(t);
    }
    ModelManager_1.ModelManager.CharacterModel.ClearHandle(t);
    const r = t.Entity;
    t.Entity = undefined;
    if (EntitySystem_1.EntitySystem.DeSpawn(e)) {
      TimerSystem_1.TimerSystem.Next(() => {
        TimerSystem_1.TimerSystem.Next(() => {
          ModelManager_1.ModelManager.CharacterModel.EntityPool.Put(r);
        });
      });
      return true;
    } else {
      ModelManager_1.ModelManager.CharacterModel.EntityPool.RemoveExternal(r);
      return false;
    }
  }
  static CreateEntity(t, e) {
    t = ModelManager_1.ModelManager.CharacterModel.EntityPool.Create(t);
    if (EntitySystem_1.EntitySystem.CreateExternal(WorldEntity_1.WorldEntity, t, e.Priority, e)) {
      return ModelManager_1.ModelManager.CharacterModel.CreateHandle(t);
    }
  }
  static SpawnEntity(t) {
    t = ModelManager_1.ModelManager.CharacterModel.EntityPool.Get(t);
    if (t && ObjectSystem_1.ObjectSystem.CreateExternal(t)) {
      return ModelManager_1.ModelManager.CharacterModel.CreateHandle(t);
    }
  }
  static GetCharacterActorComponent(t) {
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t.Valid && t.Actor) {
        return t;
      }
    }
  }
  static GetCharacterActorComponentById(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      t = t.GetComponent(3);
      if (t?.Valid) {
        return t;
      }
    }
  }
  static GetCharacter(t) {
    if (t?.Valid && (t = t.GetComponent(3))?.Valid && t.Actor) {
      return t.Actor;
    } else {
      return undefined;
    }
  }
  static GetActor(t) {
    if (t?.Valid && (t = this.GetActorComponent(t))) {
      return t.Owner;
    } else {
      return undefined;
    }
  }
  static GetActorByEntity(t) {
    if (t?.Valid && (t = t.GetComponent(1))) {
      return t.Owner;
    } else {
      return undefined;
    }
  }
  static GetActorComponent(t) {
    let e = t.Entity.GetComponent(214);
    return e = (e = e || t.Entity.GetComponent(2)) || t.Entity.GetComponent(247);
  }
  static GetTsBaseCharacterByEntity(t) {
    return t.Entity.GetComponent(3)?.Actor;
  }
  static GetUeTsBaseCharacterByEntity(t) {
    t = t.GetComponent(3);
    if (t) {
      return t.Actor;
    }
  }
  static GetEntityByUeTsBaseCharacter(t) {
    return t.CharacterActorComponent.Entity;
  }
  static SetTimeDilation(t) {
    var e = ModelManager_1.ModelManager.CreatureModel;
    for (const r of e.GetAllEntities()) {
      if (r.IsInit) {
        r.Entity.SetTimeDilation(t);
      }
    }
    for (const a of e.DelayRemoveContainer.GetAllEntities()) {
      if (a.IsInit) {
        a.Entity.SetTimeDilation(t);
      }
    }
  }
  static CN() {
    return !this.gKo && ModelManager_1.ModelManager.CharacterModel.AwakeQueue.Size === 0;
  }
  static AwakeEntity() {
    var t = ModelManager_1.ModelManager.CharacterModel;
    if (this.gKo) {
      var e = this.gKo[2];
      this.gKo = undefined;
      if (e()) {
        return;
      }
    }
    if (t.AwakeQueue.Size) {
      for (var r; r = t.PopAwakeHandler();) {
        if ((0, r[1])()) {
          this.gKo = r;
          return;
        }
      }
    }
  }
  static SortItem(t) {
    if (!!t?.Valid && !(t.Entity.Flag & 2) && !t.Entity.GetComponent(0).GetRemoveState()) {
      ModelManager_1.ModelManager.CharacterModel.SortItem(t);
    }
  }
  static OnChangeMode() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        t.Entity.GetComponent(50)?.SwitchControl(true);
      }
    }
    return true;
  }
  static EnterSelfCenteredMode(t, e, r = -1) {
    ModelManager_1.ModelManager.CharacterModel?.EnterSelfCenteredMode(t, e, r);
  }
  static ExitSelfCenteredMode(t) {
    ModelManager_1.ModelManager.CharacterModel?.ExitSelfCenteredMode(t);
  }
  static ExitSkillSelfCenteredMode() {
    ModelManager_1.ModelManager.CharacterModel?.ExitSkillSelfCenteredMode();
  }
  static ExitAllSelfCenteredMode() {
    ModelManager_1.ModelManager.CharacterModel?.ExitAllSelfCenteredMode();
  }
  static IsSelfCenteredModeEnabled(t) {
    return ModelManager_1.ModelManager.CharacterModel?.IsSelfCenteredModeEnabled(t) ?? false;
  }
}
(exports.CharacterController = CharacterController).IsTickEvenPausedInternal = true;
CharacterController.gKo = undefined;
CharacterController.Uqn = undefined;
CharacterController.dKo = () => CharacterController.CN();
CharacterController.CKo = () => {
  CharacterController.AwakeEntity();
}; //# sourceMappingURL=CharacterController.js.map