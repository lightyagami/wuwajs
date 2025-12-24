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
exports.CharacterVisionComponent = undefined;
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
const visionTriggerTag = -579527112;
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
    this.yYm = undefined;
    this.aen = new Map();
    this.SYm = [];
    this.Bhh = undefined;
    this.YTc = undefined;
    this.cC = 0;
    this.bpr = e => {
      for (const t of this.aen.values()) {
        t.TeleportStart();
      }
      if (e) {
        this.yYm?.forEach(e => {
          e = e.Z5n;
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e));
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, false, "OnTeleportStart.SetVisionEnable");
        });
      }
    };
    this.Ilt = () => {
      this.yYm?.forEach(e => {
        var t = e.r5n;
        var t = PhantomUtil_1.PhantomUtil.GetVisionData(t);
        if (t && t.类型 === 4 && (t = e.Z5n, t = (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t)))?.Entity?.GetComponent(0)) && SummonCfgById_1.configSummonCfgById.GetConfig(t.SummonCfgId)?.InitVisiable) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, true, "OnTeleportComplete.SetVisionEnable");
        }
      });
    };
    this.Nca = (e, t) => {
      var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity?.GetComponent(41);
      if (i?.Valid) {
        i.SkillTarget = e;
        i.SkillTargetSocket = t;
      }
    };
  }
  OnStart() {
    var e = this.Entity.GetComponent(0).ComponentDataMap.get("uys")?.uys?.CIs;
    this.yYm ||= e ? [...e] : [];
    this.MYm();
    var e = this.Entity.GetComponent(215);
    if (e) {
      this.YTc = e.ListenForTagAnyCountChanged(visionTriggerTag, (e, t, i, o) => {
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
    this.yYm = [...e.CIs];
    this.MYm();
  }
  GetVisionLevel() {
    return this.yYm[this.GetCurrentPosition()].ATs;
  }
  GetVisionLevelByBuffId(e) {
    for (const t of this.yYm) {
      if (t.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillBuffIds(t.r5n).includes(e)) {
          return t.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionLevelByDamageId(e) {
    for (const t of this.yYm) {
      if (t.ATs > 0) {
        if (PhantomUtil_1.PhantomUtil.GetSkillSettleIds(t.r5n).includes(e)) {
          return t.ATs;
        }
      }
    }
    return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
  }
  GetVisionData(e) {
    if (this.SYm.includes(e)) {
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
    return this.SYm[e ?? this.GetCurrentPosition()] || 0;
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
    return MathUtils_1.MathUtils.LongToNumber(this.yYm[this.GetCurrentPosition()].Z5n);
  }
  MYm() {
    let e = false;
    for (const i of this.yYm) {
      if (i.c5n === 0) {
        e = true;
        break;
      }
    }
    this.SYm = this.yYm.map(e => e.r5n);
    if (e) {
      this.SetCurrentPosition(0);
    } else {
      this.SetCurrentPosition(-1);
    }
    var t = this.Entity.GetComponent(218);
    for (const o of this.yYm) {
      t?.ModifyCdInfo(PhantomUtil_1.PhantomUtil.GetSkillGroupId(o.r5n), PhantomUtil_1.PhantomUtil.GetSkillCd(o.r5n));
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
    CombatMessage_1.CombatNet.Send(18994, this.Entity, t);
  }
  static VisionTriggerNotify(e, t) {
    if (e) {
      t = MathUtils_1.MathUtils.LongToNumber(t.Udm);
      SceneTeamController_1.SceneTeamController.EmitEvent(e, EventDefine_1.EEventName.ActivateAbilityVision, t);
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("Adm", true)], CharacterVisionComponent, "VisionTriggerNotify", null);
CharacterVisionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(44)], CharacterVisionComponent);
exports.CharacterVisionComponent = CharacterVisionComponent; //# sourceMappingURL=CharacterVisionComponent.js.map