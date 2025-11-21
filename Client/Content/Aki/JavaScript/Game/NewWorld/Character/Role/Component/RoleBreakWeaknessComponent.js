"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreakWeaknessComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
const InputFunctionCommon_1 = require("../../Common/Component/Input/InputLayerFunction/InputFunctionCommon");
const BREAK_WEAKNESS_DELAY = 3000;
const weaknessTag = 1100879485;
let RoleBreakWeaknessComponent = class RoleBreakWeaknessComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.tRr = undefined;
    this.T3d = 0;
    this.Gin = undefined;
    this.b3d = undefined;
    this._se = 0;
    this.OYd = 0;
    this.Zln = e => {
      e = e.Target;
      this.R3d(e);
    };
    this.w3d = (e, t, i, n) => {
      this.R3d(e);
    };
    this.Zpe = e => {
      if (!e) {
        this.L3d();
      }
    };
    this.q2t = e => {
      if (e === this.Entity.Id) {
        this.L3d();
      }
    };
    this.P3d = e => {
      if (e === this._se && this.T3d && (0, InputFunctionCommon_1.canResponseInput)(this.Entity)) {
        e = EntitySystem_1.EntitySystem.Get(this._se);
        this.tRr?.BeginSkillAsync(this.T3d, {
          Reason: "触发破弱技能",
          Target: e
        }).then(e => {
          if (e) {
            this.L3d();
          }
        });
      }
    };
  }
  OnStart() {
    this.tRr = this.Entity.GetComponent(39);
    for (const i of this.tRr.GetAllSkillId()) {
      var e = this.tRr.GetSkillInfo(i);
      if (e?.SkillGenre === 13) {
        this.T3d = i;
        e = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(e.SkillTarget.LockOnConfigId);
        this.OYd = e?.Distance ?? 0;
        break;
      }
    }
    var t;
    if (this.T3d && (EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharLimitDodge, this.w3d), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.q2t), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MonsterBeginBroken, this.P3d), this.Gin = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom), t = this.Gin?.Entity) && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.Zln)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.Zln);
    }
    return true;
  }
  OnEnd() {
    if (this.T3d && (EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharLimitDodge, this.w3d), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.q2t), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MonsterBeginBroken, this.P3d), this.Gin?.Valid)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Gin.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln);
    }
    this.L3d();
    return true;
  }
  R3d(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
      ParamType: 1
    })?.IsControl();
    var i = e?.GetComponent(209);
    if (t && i?.HasTag(weaknessTag) && this.tRr?.CurrentSkill?.SkillInfo?.SkillGenre !== 13) {
      if (this._se === e?.Id) {
        this.BCe();
      } else {
        if (this.BCe()) {
          this.L3d();
        }
        this._se = e.Id;
        e.GetComponent(89)?.ShowWeaknessButton(this.OYd);
      }
      this.tWr();
    }
  }
  tWr() {
    this.b3d = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
      this.L3d();
    }, BREAK_WEAKNESS_DELAY);
  }
  BCe() {
    return !!TimerSystem_1.FlowTimeTimerSystem.Has(this.b3d) && !(TimerSystem_1.FlowTimeTimerSystem.Remove(this.b3d), this.b3d = undefined);
  }
  L3d() {
    if (this._se) {
      this.BCe();
      EntitySystem_1.EntitySystem.Get(this._se)?.GetComponent(89)?.HideWeaknessButton();
      this._se = 0;
    }
  }
};
RoleBreakWeaknessComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(90)], RoleBreakWeaknessComponent);
exports.RoleBreakWeaknessComponent = RoleBreakWeaknessComponent; //# sourceMappingURL=RoleBreakWeaknessComponent.js.map