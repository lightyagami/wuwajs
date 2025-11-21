"use strict";

var __decorate = this && this.__decorate || function (i, t, e, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(i, t, e, o);
  } else {
    for (var a = i.length - 1; a >= 0; a--) {
      if (n = i[a]) {
        r = (s < 3 ? n(r) : s > 3 ? n(t, e, r) : n(t, e)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterVisionComponent = undefined;
const UE = require("ue");
const SummonCfgById_1 = require("../../../../../../Core/Define/ConfigQuery/SummonCfgById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const InputController_1 = require("../../../../../Input/InputController");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const BaseAbilityComponent_1 = require("../Abilities/BaseAbilityComponent");
const GameplayAbilityVisionBossRush_1 = require("./GA/GameplayAbilityVisionBossRush");
const GameplayAbilityVisionControl_1 = require("./GA/GameplayAbilityVisionControl");
const GameplayAbilityVisionExplore_1 = require("./GA/GameplayAbilityVisionExplore");
const GameplayAbilityVisionMorph_1 = require("./GA/GameplayAbilityVisionMorph");
const GameplayAbilityVisionPresent_1 = require("./GA/GameplayAbilityVisionPresent");
const GameplayAbilityVisionSummon_1 = require("./GA/GameplayAbilityVisionSummon");
const visionTriggerTag = -579527112;
const visionTypes = {
  [0]: GameplayAbilityVisionSummon_1.GameplayAbilityVisionSummon,
  1: GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph,
  2: GameplayAbilityVisionExplore_1.GameplayAbilityVisionExplore,
  3: GameplayAbilityVisionControl_1.GameplayAbilityVisionControl,
  4: GameplayAbilityVisionPresent_1.GameplayAbilityVisionPresent,
  5: GameplayAbilityVisionBossRush_1.GameplayAbilityVisionBossRush
};
let CharacterVisionComponent = class CharacterVisionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.sen = new Map();
    this.aen = new Map();
    this.hen = 0;
    this.len = 0;
    this._en = undefined;
    this.rXt = false;
    this.Bhh = undefined;
    this.YTc = undefined;
    this.bpr = i => {
      for (const t of this.aen.values()) {
        t.TeleportStart();
      }
      if (i) {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, false, "OnTeleportStart.SetVisionEnable", false);
      }
    };
    this.Ilt = () => {
      var i = PhantomUtil_1.PhantomUtil.GetVisionData(this.GetVisionId());
      if (i && i.类型 === 4 && (i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity?.GetComponent(0)) && SummonCfgById_1.configSummonCfgById.GetConfig(i.SummonCfgId)?.InitVisiable) {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, true, "OnTeleportComplete.SetVisionEnable", false);
      }
    };
    this.Nca = (i, t) => {
      var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity?.GetComponent(40);
      if (e?.Valid) {
        e.SkillTarget = i;
        e.SkillTargetSocket = t;
      }
    };
  }
  OnStart() {
    var i = this.Entity.GetComponent(0);
    this.len = i.VisionSkillServerEntityId;
    if (this._en) {
      this.uen(this._en);
      this._en = undefined;
    } else if (i = i.ComponentDataMap.get("uys")?.uys?.CIs) {
      this.uen(i);
    }
    var i = this.Entity.GetComponent(209);
    if (i) {
      this.YTc = i.ListenForTagAnyCountChanged(visionTriggerTag, (i, t, e, o) => {
        if (o < i) {
          SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.ActivateAbilityVision, e);
        }
      });
    }
    for (const e of Object.keys(visionTypes)) {
      var t = Number(e);
      if (t !== 6) {
        this.aen.set(t, visionTypes[t].Spawn(this));
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharSkillTargetChanged, this.Nca);
    this.Fhh();
    return this.rXt = true;
  }
  OnEnd() {
    for (const i of this.aen.values()) {
      i.Destroy();
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
  OnTick(i) {
    for (const t of this.aen.values()) {
      t.Tick(i);
    }
  }
  SetVisionSkillInformationList(i, t) {
    var e = this.len;
    this.len = t;
    if (this.rXt) {
      this.uen(i);
      if (this.len !== e) {
        for (const o of this.aen.values()) {
          o.ChangeVision();
        }
      }
    } else {
      this._en = i;
    }
  }
  GetVisionIdList() {
    var i = UE.NewArray(UE.BuiltinInt);
    for (const t of this.sen.values()) {
      i.Add(t.r5n);
    }
    return i;
  }
  GetVisionLevelList() {
    var i = UE.NewArray(UE.BuiltinInt);
    for (const t of this.sen.values()) {
      i.Add(t.ATs);
    }
    return i;
  }
  GetVisionLevelByBuffId(i) {
    for (const t of this.sen.values()) {
      if (t.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillBuffIds(t.r5n).includes(i)) {
          return t.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(i) {
    for (const t of this.sen.values()) {
      if (t.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(t.r5n).includes(i)) {
          return t.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(t) {
    if ([...this.sen.values()].some(i => i.r5n === t)) {
      return PhantomUtil_1.PhantomUtil.GetVisionData(t);
    }
  }
  ActivateAbilityVision(i) {
    var t = this.aen.get(i)?.ActivateAbility() ?? false;
    if (t && [0, 1, 4].includes(i)) {
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.ActivateAbilityVision, this.GetVisionId());
      this.e1m(this.GetVisionId());
    }
    return t;
  }
  EndAbilityVision(i) {
    return this.aen.get(i)?.EndAbility() ?? false;
  }
  GetVisionId() {
    return this.hen;
  }
  GetVisionSkillInformation(i) {
    return this.sen.get(i);
  }
  HandlePress(i, t) {
    for (const e of this.aen.values()) {
      if (e.HandlePress(i, t)) {
        return true;
      }
    }
    return false;
  }
  uen(i) {
    this.sen.clear();
    this.hen = 0;
    if (i) {
      var t = this.Entity.GetComponent(211);
      for (const o of i) {
        var e = PhantomUtil_1.PhantomUtil.GetVisionData(o.r5n);
        if (e && (e = e.类型, this.sen.set(e, o), [0, 1, 4].includes(e))) {
          t?.ModifyCdInfo(PhantomUtil_1.PhantomUtil.GetSkillGroupId(o.r5n), PhantomUtil_1.PhantomUtil.GetSkillCd(o.r5n));
          this.hen = o.r5n;
        }
      }
    }
  }
  Fhh() {
    var i;
    this.Bhh = InputController_1.InputController.CreateInputLayer(3);
    if (this.Bhh && (i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity))) {
      this.Bhh.Init(i);
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
  e1m(i) {
    var t = Protocol_1.Aki.Protocol.ylm.create();
    t.Slm = i;
    CombatMessage_1.CombatNet.Send(18994, this.Entity, t);
  }
  static VisionTriggerNotify(i, t) {
    if (i) {
      t = MathUtils_1.MathUtils.LongToNumber(t.Slm);
      SceneTeamController_1.SceneTeamController.EmitEvent(i, EventDefine_1.EEventName.ActivateAbilityVision, t);
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("vlm", true)], CharacterVisionComponent, "VisionTriggerNotify", null);
CharacterVisionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(43)], CharacterVisionComponent);
exports.CharacterVisionComponent = CharacterVisionComponent; //# sourceMappingURL=CharacterVisionComponent.js.map