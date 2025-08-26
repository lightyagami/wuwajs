"use strict";

var __decorate = this && this.__decorate || function (t, i, e, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? i : n === null ? n = Object.getOwnPropertyDescriptor(i, e) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, i, e, n);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (o = t[l]) {
        s = (r < 3 ? o(s) : r > 3 ? o(i, e, s) : o(i, e)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(i, e, s);
  }
  return s;
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
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const InputController_1 = require("../../../../../Input/InputController");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const BaseAbilityComponent_1 = require("../Abilities/BaseAbilityComponent");
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
  4: GameplayAbilityVisionPresent_1.GameplayAbilityVisionPresent
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
    this.bpr = t => {
      for (const i of this.aen.values()) {
        i.TeleportStart();
      }
      if (t) {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, false, "OnTeleportStart.SetVisionEnable", false);
      }
    };
    this.Ilt = () => {
      var t = PhantomUtil_1.PhantomUtil.GetVisionData(this.GetVisionId());
      if (t && t.类型 === 4 && (t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity?.GetComponent(0)) && SummonCfgById_1.configSummonCfgById.GetConfig(t.SummonCfgId)?.InitVisiable) {
        PhantomUtil_1.PhantomUtil.SetVisionEnable(this.Entity, true, "OnTeleportComplete.SetVisionEnable", false);
      }
    };
    this.Nca = (t, i) => {
      var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity?.GetComponent(40);
      if (e?.Valid) {
        e.SkillTarget = t;
        e.SkillTargetSocket = i;
      }
    };
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    this.len = t.VisionSkillServerEntityId;
    if (this._en) {
      this.uen(this._en);
      this._en = undefined;
    } else if (t = t.ComponentDataMap.get("uys")?.uys?.CIs) {
      this.uen(t);
    }
    var t = this.Entity.GetComponent(206);
    if (t) {
      this.YTc = t.ListenForTagAnyCountChanged(visionTriggerTag, (t, i, e, n) => {
        if (n < t) {
          SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.ActivateAbilityVision, e);
        }
      });
    }
    for (const e of Object.keys(visionTypes)) {
      var i = Number(e);
      if (i !== 5) {
        this.aen.set(i, visionTypes[i].Spawn(this));
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharSkillTargetChanged, this.Nca);
    this.Fhh();
    return this.rXt = true;
  }
  OnEnd() {
    for (const t of this.aen.values()) {
      t.Destroy();
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
  OnTick(t) {
    for (const i of this.aen.values()) {
      i.Tick(t);
    }
  }
  SetVisionSkillInformationList(t, i) {
    var e = this.len;
    this.len = i;
    if (this.rXt) {
      this.uen(t);
      if (this.len !== e) {
        for (const n of this.aen.values()) {
          n.ChangeVision();
        }
      }
    } else {
      this._en = t;
    }
  }
  uen(t) {
    this.sen.clear();
    this.hen = 0;
    if (t) {
      var i = this.Entity.GetComponent(208);
      for (const n of t) {
        var e = PhantomUtil_1.PhantomUtil.GetVisionData(n.r5n);
        if (e && (e = e.类型, this.sen.set(e, n), [0, 1, 4].includes(e))) {
          i?.ModifyCdInfo(PhantomUtil_1.PhantomUtil.GetSkillGroupId(n.r5n), PhantomUtil_1.PhantomUtil.GetSkillCd(n.r5n));
          this.hen = n.r5n;
        }
      }
    }
  }
  GetVisionIdList() {
    var t = UE.NewArray(UE.BuiltinInt);
    for (const i of this.sen.values()) {
      t.Add(i.r5n);
    }
    return t;
  }
  GetVisionLevelList() {
    var t = UE.NewArray(UE.BuiltinInt);
    for (const i of this.sen.values()) {
      t.Add(i.ATs);
    }
    return t;
  }
  GetVisionLevelByBuffId(t) {
    for (const i of this.sen.values()) {
      if (i.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillBuffIds(i.r5n).includes(t)) {
          return i.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(t) {
    for (const i of this.sen.values()) {
      if (i.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(i.r5n).includes(t)) {
          return i.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(i) {
    if ([...this.sen.values()].some(t => t.r5n === i)) {
      return PhantomUtil_1.PhantomUtil.GetVisionData(i);
    }
  }
  ActivateAbilityVision(t) {
    var i = this.aen.get(t)?.ActivateAbility() ?? false;
    if (i && [0, 1, 4].includes(t)) {
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.ActivateAbilityVision, this.GetVisionId());
    }
    return i;
  }
  EndAbilityVision(t) {
    return this.aen.get(t)?.EndAbility() ?? false;
  }
  GetVisionId() {
    return this.hen;
  }
  GetVisionSkillInformation(t) {
    return this.sen.get(t);
  }
  Fhh() {
    var t;
    this.Bhh = InputController_1.InputController.CreateInputLayer(2);
    if (this.Bhh && (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity))) {
      this.Bhh.Init(t);
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
  HandlePress(t, i) {
    for (const e of this.aen.values()) {
      if (e.HandlePress(t, i)) {
        return true;
      }
    }
    return false;
  }
};
CharacterVisionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(43)], CharacterVisionComponent);
exports.CharacterVisionComponent = CharacterVisionComponent; //# sourceMappingURL=CharacterVisionComponent.js.map