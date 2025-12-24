"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        r = (h < 3 ? n(r) : h > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreakWeaknessComponent = exports.BREAK_WEAKNESS_BUTTON_CONFIG_ID = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
const InputFunctionCommon_1 = require("../../Common/Component/Input/InputLayerFunction/InputFunctionCommon");
const BREAK_WEAKNESS_DELAY = 3000;
exports.BREAK_WEAKNESS_BUTTON_CONFIG_ID = 2004;
const weaknessTag = 1100879485;
const triggerTag = -1709334266;
const activateButtonTag = 1945673966;
const targetForbiddenTags = [2050198060, 501201000, 1659230325, -149285150];
let RoleBreakWeaknessComponent = class RoleBreakWeaknessComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.tRr = undefined;
    this.bkr = undefined;
    this.Xte = undefined;
    this.I3d = false;
    this.Gin = undefined;
    this.b3d = undefined;
    this._se = 0;
    this.IYf = "";
    this.TYf = 0;
    this.kk1 = 0;
    this.bYf = 0;
    this.iXf = [];
    this.gJf = undefined;
    this.ZVf = [];
    this.I2r = [];
    this.e8f = [];
    this.Zln = t => {
      var e = t.Target;
      this.R3d(e, t);
    };
    this.w3d = (t, e, i, s) => {
      this.R3d(t);
    };
    this.Zpe = t => {
      if (!t) {
        this.L3d();
      }
    };
    this.q2t = t => {
      if (t === this.Entity.Id) {
        this.L3d();
      }
    };
    this.t8f = (t, e) => {
      if (e) {
        this.L3d();
      }
    };
    this.CJf = (t, e) => {
      if (!e) {
        this.L3d();
      }
    };
    this.r8f = (t, e) => {
      if (e) {
        this.L3d();
      }
    };
    this.P3d = t => {
      var e;
      var i;
      if (t === this._se && this.I3d && (0, InputFunctionCommon_1.canResponseInput)(this.Entity) && !this.Dri()) {
        e = (t = EntitySystem_1.EntitySystem.Get(this._se))?.GetComponent(1)?.Owner;
        (i = new UE.GameplayEventData()).Target = e;
        this.bkr.SendGameplayEventToActor(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(triggerTag), i);
        if (t) {
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.TriggerBreakWeakness, this.Entity, t, this.IYf);
        }
        this.L3d();
      }
    };
  }
  OnStart() {
    this.tRr = this.Entity.GetComponent(40);
    this.bkr = this.Entity.GetComponent(18);
    this.Xte = this.Entity.GetComponent(215);
    for (const i of this.tRr.GetAllSkillId()) {
      var t = this.tRr.GetSkillInfo(i);
      if (t?.SkillGenre === 13) {
        this.I3d = true;
        t = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t.SkillTarget.LockOnConfigId);
        this.TYf = t?.Distance ?? 0;
        this.kk1 = t?.UpDistance ?? 0;
        this.bYf = t?.DownDistance ?? 0;
        break;
      }
    }
    var e;
    this.o8f();
    if (this.I3d && (this.n8f(), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharLimitDodge, this.w3d), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.q2t), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MonsterBeginBroken, this.P3d), this.Gin = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom), e = this.Gin?.Entity) && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.Zln)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.Zln);
    }
    return true;
  }
  OnEnd() {
    if (this.I3d && (EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharLimitDodge, this.w3d), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.q2t), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MonsterBeginBroken, this.P3d), this.Gin?.Valid)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Gin.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln);
    }
    this.s8f();
    this.L3d();
    return true;
  }
  R3d(t, e) {
    if (this.Vti()) {
      this.L3d();
    } else {
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
        ParamType: 1
      })?.IsControl();
      var s = t?.GetComponent(215);
      if (i && s?.HasTag(weaknessTag)) {
        for (const n of targetForbiddenTags) {
          if (s.HasTag(n)) {
            return;
          }
        }
        i = this.tRr?.CurrentSkill;
        if (i?.SkillInfo?.SkillGenre !== 13) {
          var i = t?.GetComponent(0);
          if (i?.GetMonsterMatchType() !== 0) {
            if (e) {
              i = e.DamageId;
              if (!ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(i)?.WeaknessLvl[0]) {
                return;
              }
            }
            if (!e || this.tRr?.SkillTarget?.Entity === t) {
              i = this.tRr?.SkillTargetSocket ?? "";
              if (this._se === t?.Id) {
                if (this.IYf !== i) {
                  this.IYf = i;
                  t?.GetComponent(92)?.UpdateTargetSocket(this.IYf);
                }
                this.BCe();
                this.tWr();
              } else {
                this.IYf = i;
                if (this.BCe()) {
                  this.L3d();
                }
                this.B8f(t);
              }
            }
          }
        }
      }
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
  B8f(t) {
    this._se = t.Id;
    this.a8f(t);
    t.GetComponent(92)?.ShowWeaknessButton(this.IYf, this.TYf, this.kk1, this.bYf);
    this.Xte?.AddTag(activateButtonTag);
    this.tWr();
  }
  L3d() {
    this.h8f();
    if (this._se) {
      this.BCe();
      EntitySystem_1.EntitySystem.Get(this._se)?.GetComponent(92)?.HideWeaknessButton();
      this.Xte?.RemoveTag(activateButtonTag);
      this._se = 0;
      this.IYf = "";
    }
  }
  RYf(t, e, i, s) {
    for (const h of e) {
      var n = t.ListenForTagAddOrRemove(h, s);
      if (n) {
        i.push(n);
      }
    }
  }
  LYf(t) {
    if (t.length !== 0) {
      for (const e of t) {
        e.EndTask();
      }
      t.length = 0;
    }
  }
  a8f(t) {
    this.h8f();
    t = t.GetComponent(215);
    if (t) {
      this.RYf(t, targetForbiddenTags, this.iXf, this.t8f);
      this.gJf = t.ListenForTagAddOrRemove(weaknessTag, this.CJf);
    }
  }
  h8f() {
    this.LYf(this.iXf);
    if (this.gJf) {
      this.gJf.EndTask();
      this.gJf = undefined;
    }
  }
  o8f() {
    this.ZVf.length = 0;
    this.I2r.length = 0;
    var t = ConfigManager_1.ConfigManager.SkillButtonConfig?.GetBehaviorCommonButtonConfig(exports.BREAK_WEAKNESS_BUTTON_CONFIG_ID);
    if (t) {
      this.ZVf.push(...t.HiddenTags);
      this.I2r.push(...t.DisableTags);
    }
  }
  Vti() {
    return this.Xte?.HasAnyTag(this.ZVf) ?? false;
  }
  Dri() {
    return this.Xte?.HasAnyTag(this.I2r) ?? false;
  }
  n8f() {
    this.s8f();
    if (this.Xte && this.ZVf.length !== 0) {
      this.RYf(this.Xte, this.ZVf, this.e8f, this.r8f);
    }
  }
  s8f() {
    this.LYf(this.e8f);
  }
};
RoleBreakWeaknessComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(93)], RoleBreakWeaknessComponent);
exports.RoleBreakWeaknessComponent = RoleBreakWeaknessComponent; //# sourceMappingURL=RoleBreakWeaknessComponent.js.map