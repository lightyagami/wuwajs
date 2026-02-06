"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        s = (r < 3 ? n(s) : r > 3 ? n(t, i, s) : n(t, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterVisionComponent = exports.visionTriggerTag = undefined;
const SummonCfgById_1 = require("../../../../../../Core/Define/ConfigQuery/SummonCfgById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const InputController_1 = require("../../../../../Input/InputController");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const BaseAbilityComponent_1 = require("../Abilities/BaseAbilityComponent");
const GameplayAbilityVisionBossRush_1 = require("./GA/GameplayAbilityVisionBossRush");
const GameplayAbilityVisionControl_1 = require("./GA/GameplayAbilityVisionControl");
const GameplayAbilityVisionMorph_1 = require("./GA/GameplayAbilityVisionMorph");
const GameplayAbilityVisionPresent_1 = require("./GA/GameplayAbilityVisionPresent");
const GameplayAbilityVisionShow_1 = require("./GA/GameplayAbilityVisionShow");
const GameplayAbilityVisionShowNew_1 = require("./GA/GameplayAbilityVisionShowNew");
const GameplayAbilityVisionSummon_1 = require("./GA/GameplayAbilityVisionSummon");
exports.visionTriggerTag = -579527112;
const visionTypes = {
  [0]: GameplayAbilityVisionSummon_1.GameplayAbilityVisionSummon,
  1: GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph,
  2: GameplayAbilityVisionShow_1.GameplayAbilityVisionShow,
  3: GameplayAbilityVisionControl_1.GameplayAbilityVisionControl,
  4: GameplayAbilityVisionPresent_1.GameplayAbilityVisionPresent,
  5: GameplayAbilityVisionBossRush_1.GameplayAbilityVisionBossRush,
  6: GameplayAbilityVisionShowNew_1.GameplayAbilityVisionShowNew
};
let CharacterVisionComponent = class CharacterVisionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.VJm = undefined;
    this.aen = new Map();
    this.HJm = [];
    this.Bhh = undefined;
    this.YTc = undefined;
    this.cC = 0;
    this.bpr = e => {
      for (const t of this.aen.values()) {
        t.TeleportStart();
      }
      if (e) {
        this.VJm?.forEach(e => {
          e = e.Z5n;
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e));
          if (e?.Valid) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, false, "OnTeleportStart.SetVisionEnable");
          }
        });
      }
    };
    this.Ilt = () => {
      this.VJm?.forEach(e => {
        var t = e.r5n;
        var t = PhantomUtil_1.PhantomUtil.GetVisionData(t);
        if (t && t.类型 === 4 && (t = e.Z5n, (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t)))?.Valid) && (t = e?.Entity?.GetComponent(0)) && SummonCfgById_1.configSummonCfgById.GetConfig(t.SummonCfgId)?.InitVisiable) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, true, "OnTeleportComplete.SetVisionEnable");
        }
      });
    };
    this.Nca = (e, t) => {
      var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity?.GetComponent(43);
      if (i?.Valid) {
        i.SkillTarget = e;
        i.SkillTargetSocket = t;
      }
    };
  }
  OnStart() {
    var e = this.Entity.GetComponent(0).ComponentDataMap.get("uys")?.uys?.CIs;
    this.VJm ||= e ? [...e] : [];
    this.jJm();
    var e = this.Entity.GetComponent(217);
    if (e) {
      this.YTc = e.ListenForTagAnyCountChanged(exports.visionTriggerTag, (e, t, i, o) => {
        if (o < e) {
          SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.ActivateAbilityVision, i);
        }
      });
    }
    for (const i of Object.keys(visionTypes)) {
      var t = Number(i);
      if (t !== 7) {
        this.aen.set(t, visionTypes[t].Spawn(this));
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharSkillTargetChanged, this.Nca);
    this.Fhh();
    return true;
  }
  OnEnd() {
    for (const e of this.aen.values()) {
      e.Destroy();
    }
    if (this.YTc) {
      this.YTc.EndTask();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharSkillTargetChanged, this.Nca);
    this.khh();
    return true;
  }
  OnTick(e) {
    for (const t of this.aen.values()) {
      t.Tick(e);
    }
  }
  SetVisionData(e) {
    this.VJm = [...e.CIs];
    this.jJm();
  }
  GetVisionLevel() {
    return this.VJm?.[this.GetCurrentPosition()]?.ATs ?? 0;
  }
  GetVisionLevelByBuffId(e) {
    for (const t of this.VJm ?? []) {
      if (t.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillBuffIds(t.r5n).includes(e)) {
          return t.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(e) {
    for (const t of this.VJm ?? []) {
      if (t.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(t.r5n).includes(e)) {
          return t.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(e) {
    if (this.HJm.includes(e)) {
      return PhantomUtil_1.PhantomUtil.GetVisionData(e);
    }
  }
  ActivateAbilityVision(e) {
    var t = this.aen.get(e)?.ActivateAbility() ?? false;
    if (t && [0, 1, 4].includes(e)) {
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.ActivateAbilityVision, this.GetVisionId(0));
      this.fmm(this.GetVisionId(0));
    }
    return t;
  }
  EndAbilityVision(e) {
    return this.aen.get(e)?.EndAbility() ?? false;
  }
  GetVisionId(e) {
    return this.HJm[e ?? this.GetCurrentPosition()] || 0;
  }
  HandlePress(e, t) {
    for (const i of this.aen.values()) {
      if (i.HandlePress(e, t)) {
        return true;
      }
    }
    return false;
  }
  SetCurrentPosition(e) {
    if (this.cC !== e) {
      this.cC = e;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.EntityVisionPosChanged, e);
    }
  }
  GetCurrentPosition() {
    return this.cC;
  }
  GetVisionCreatureDataId() {
    return MathUtils_1.MathUtils.LongToNumber(this.VJm?.[this.GetCurrentPosition()]?.Z5n ?? 0);
  }
  jJm() {
    let t = undefined;
    let i = -1;
    if (this.VJm) {
      for (let e = 0; e < this.VJm.length; e++) {
        var o = this.VJm[e];
        if (o.c5n === 0) {
          t = o;
          i = e;
          break;
        }
      }
      this.HJm = this.VJm.map(e => e.r5n);
    } else {
      this.HJm = [];
    }
    if (t) {
      this.SetCurrentPosition(i);
      this.Entity.GetComponent(220)?.ModifyCdInfo(PhantomUtil_1.PhantomUtil.GetSkillGroupId(t.r5n), PhantomUtil_1.PhantomUtil.GetSkillCd(t.r5n));
    } else {
      this.SetCurrentPosition(-1);
    }
  }
  Fhh() {
    var e;
    this.Bhh = InputController_1.InputController.CreateInputLayer(3);
    if (this.Bhh && (e = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity))) {
      this.Bhh.Init(e);
      InputController_1.InputController.AddInputLayer(this.Entity.Id, this.Bhh);
    }
  }
  khh() {
    if (this.Bhh) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
  }
  fmm(e) {
    var t = Protocol_1.Aki.Protocol.Ddm.create();
    t.Udm = e;
    CombatMessage_1.CombatNet.Send(19848, this.Entity, t);
  }
  static VisionTriggerNotify(e, t) {
    if (e) {
      t = MathUtils_1.MathUtils.LongToNumber(t.Udm);
      SceneTeamController_1.SceneTeamController.EmitEvent(e, EventDefine_1.EEventName.ActivateAbilityVision, t);
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("Adm", true)], CharacterVisionComponent, "VisionTriggerNotify", null);
CharacterVisionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(46)], CharacterVisionComponent);
exports.CharacterVisionComponent = CharacterVisionComponent; //# sourceMappingURL=CharacterVisionComponent.js.map