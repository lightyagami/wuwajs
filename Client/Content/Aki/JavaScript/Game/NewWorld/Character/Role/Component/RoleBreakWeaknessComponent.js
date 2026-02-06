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
    this.udg = "";
    this.cdg = 0;
    this.kk1 = 0;
    this.ddg = 0;
    this.s_g = [];
    this._Cg = undefined;
    this.aYf = [];
    this.I2r = [];
    this.hYf = [];
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
    this.lYf = (t, e) => {
      if (e) {
        this.L3d();
      }
    };
    this.uCg = (t, e) => {
      if (!e) {
        this.L3d();
      }
    };
    this.uYf = (t, e) => {
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
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.TriggerBreakWeakness, this.Entity, t, this.udg);
        }
        this.L3d();
      }
    };
  }
  OnStart() {
    this.tRr = this.Entity.GetComponent(42);
    this.bkr = this.Entity.GetComponent(18);
    this.Xte = this.Entity.GetComponent(217);
    for (const i of this.tRr.GetAllSkillId()) {
      var t = this.tRr.GetSkillInfo(i);
      if (t?.SkillGenre === 13) {
        this.I3d = true;
        t = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t.SkillTarget.LockOnConfigId);
        this.cdg = t?.Distance ?? 0;
        this.kk1 = t?.UpDistance ?? 0;
        this.ddg = t?.DownDistance ?? 0;
        break;
      }
    }
    var e;
    this.cYf();
    if (this.I3d && (this.dYf(), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharLimitDodge, this.w3d), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.q2t), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MonsterBeginBroken, this.P3d), this.Gin = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom), e = this.Gin?.Entity) && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.Zln)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.Zln);
    }
    return true;
  }
  OnEnd() {
    if (this.I3d && (EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharLimitDodge, this.w3d), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.q2t), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MonsterBeginBroken, this.P3d), this.Gin?.Valid)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Gin.Entity, EventDefine_1.EEventName.CharHitLocal, this.Zln);
    }
    this.mYf();
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
      var s = t?.GetComponent(217);
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
                if (this.udg !== i) {
                  this.udg = i;
                  t?.GetComponent(94)?.UpdateTargetSocket(this.udg);
                }
                this.BCe();
                this.tWr();
              } else {
                this.udg = i;
                if (this.BCe()) {
                  this.L3d();
                }
                this.$Yf(t);
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
  $Yf(t) {
    this._se = t.Id;
    this.fYf(t);
    t.GetComponent(94)?.ShowWeaknessButton(this.udg, this.cdg, this.kk1, this.ddg);
    this.Xte?.AddTag(activateButtonTag);
    this.tWr();
  }
  L3d() {
    this.gYf();
    if (this._se) {
      this.BCe();
      EntitySystem_1.EntitySystem.Get(this._se)?.GetComponent(94)?.HideWeaknessButton();
      this.Xte?.RemoveTag(activateButtonTag);
      this._se = 0;
      this.udg = "";
    }
  }
  mdg(t, e, i, s) {
    for (const h of e) {
      var n = t.ListenForTagAddOrRemove(h, s);
      if (n) {
        i.push(n);
      }
    }
  }
  fdg(t) {
    if (t.length !== 0) {
      for (const e of t) {
        e.EndTask();
      }
      t.length = 0;
    }
  }
  fYf(t) {
    this.gYf();
    t = t.GetComponent(217);
    if (t) {
      this.mdg(t, targetForbiddenTags, this.s_g, this.lYf);
      this._Cg = t.ListenForTagAddOrRemove(weaknessTag, this.uCg);
    }
  }
  gYf() {
    this.fdg(this.s_g);
    if (this._Cg) {
      this._Cg.EndTask();
      this._Cg = undefined;
    }
  }
  cYf() {
    this.aYf.length = 0;
    this.I2r.length = 0;
    var t = ConfigManager_1.ConfigManager.SkillButtonConfig?.GetBehaviorCommonButtonConfig(exports.BREAK_WEAKNESS_BUTTON_CONFIG_ID);
    if (t) {
      this.aYf.push(...t.HiddenTags);
      this.I2r.push(...t.DisableTags);
    }
  }
  Vti() {
    return this.Xte?.HasAnyTag(this.aYf) ?? false;
  }
  Dri() {
    return this.Xte?.HasAnyTag(this.I2r) ?? false;
  }
  dYf() {
    this.mYf();
    if (this.Xte && this.aYf.length !== 0) {
      this.mdg(this.Xte, this.aYf, this.hYf, this.uYf);
    }
  }
  mYf() {
    this.fdg(this.hYf);
  }
};
RoleBreakWeaknessComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(95)], RoleBreakWeaknessComponent);
exports.RoleBreakWeaknessComponent = RoleBreakWeaknessComponent; //# sourceMappingURL=RoleBreakWeaknessComponent.js.map