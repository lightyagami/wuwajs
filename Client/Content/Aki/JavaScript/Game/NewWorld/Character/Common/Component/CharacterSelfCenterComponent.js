"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var o = arguments.length;
  var n = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        n = (o < 3 ? h(n) : o > 3 ? h(e, i, n) : h(e, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSelfCenterComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const DEFAULT_BE_HIT_SELF_CENTER_DURATION = 200;
let CharacterSelfCenterComponent = class CharacterSelfCenterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.vHr = undefined;
    this.uZr = undefined;
    this.H8c = undefined;
    this.hed = undefined;
    this.led = undefined;
    this._ed = undefined;
    this.Cs1 = 1;
    this.$8c = false;
    this.TDe = undefined;
    this.gdu = 0;
    this.Cdu = 0;
    this.tZ = false;
    this.W8c = t => {
      var t = EntitySystem_1.EntitySystem.GetComponent(t, 289);
      if (t?.$8c) {
        t = t.vHr?.GetForeverTimeScale(t.gdu) ?? 1;
        this.SetSelfCenterTimeDilation(t);
      }
    };
    this.lSl = () => {
      this.cTa();
    };
    this.InitEntityBornDilation = (e, i) => {
      switch (this.Hte.CreatureData.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          {
            let t = 0;
            if (e === 5) {
              t = MathUtils_1.MathUtils.IsNearlyEqual(i, 1) ? 0 : CommonParamById_1.configCommonParamById.GetFloatConfig("MonsterSlowTimeDilation") ?? 0;
            }
            this.uZr?.SetBuffBaseForeverTimeScale(t);
            break;
          }
      }
    };
  }
  get SelfCenterTimeDilation() {
    return this.Cs1;
  }
  OnStart() {
    this.tZ = true;
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(3);
    this.vHr = this.Entity.GetComponent(180);
    this.H8c = this.Entity.GetComponent(56);
    this.uZr = this.Entity.GetComponent(16);
    this.hed = this.Entity.GetComponent(123);
    this.led = new Set();
    this._ed = new Set();
    if (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered && ModelManager_1.ModelManager.CharacterModel.SelfCenteredMode === 5) {
      this.InitEntityBornDilation(ModelManager_1.ModelManager.CharacterModel.SelfCenteredMode, ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterSetMaster, this.W8c);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.lSl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.InitEntityBornDilation);
    return true;
  }
  OnEnd() {
    this.cTa();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterSetMaster, this.W8c);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.lSl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.InitEntityBornDilation);
    return true;
  }
  SetSelfCenterTimeDilation(t, e = true) {
    this.Cs1 = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 6, "SetSelfCenterTimeDilation", ["Char", this.Hte?.Actor.GetName()], ["TimeDilation", t]);
    }
    if (this.gdu > 0) {
      this.vHr?.RemoveForeverTimeScale(this.gdu);
    }
    this.gdu = this.vHr?.SetForeverTimeScale(14, t, 0, true) ?? 0;
    if (e) {
      var i = this.H8c?.FollowIds;
      if (i) {
        for (const s of i) {
          EntitySystem_1.EntitySystem.GetComponent(s, 289)?.SetSelfCenterTimeDilation(t, e);
        }
      }
      i = this.EIe.CustomServerEntityIds;
      if (i.length > 0) {
        for (const h of i) {
          EntitySystem_1.EntitySystem.GetComponent(ModelManager_1.ModelManager.CreatureModel.GetEntityId(h), 289)?.SetSelfCenterTimeDilation(t, e);
        }
      }
    }
    this.$8c = t !== 1 && e;
  }
  SetSelfBeHitTimeDilation(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "SetSelfBeHitTimeDilation", ["Char", this.Hte?.Actor.GetName()], ["TimeDilation", t]);
    }
    if (this.Cdu > 0) {
      this.vHr?.RemoveForeverTimeScale(this.Cdu);
    }
    this.Cdu = this.vHr?.SetForeverTimeScale(15, t) ?? 0;
  }
  RemoveSelfBeHitTimeDilation() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "RemoveSelfBeHitTimeDilation", ["Char", this.Hte?.Actor.GetName()]);
    }
    this.vHr?.RemoveForeverTimeScale(this.Cdu);
    this.Cdu = 0;
  }
  SetBeHitTimeDilation(t, e = DEFAULT_BE_HIT_SELF_CENTER_DURATION) {
    if (MathUtils_1.MathUtils.IsNearlyEqual(this.Cs1, 1)) {
      this.SetSelfBeHitTimeDilation(t);
      if (this.TDe?.Valid()) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
      this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
        this.RemoveSelfBeHitTimeDilation();
      }, e, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    }
  }
  AddEffect(t) {
    if (this.o1h() && this.Active && EffectSystem_1.EffectSystem.IsValid(t) && (this.led.add(t), this.hed?.Valid)) {
      EffectUtil_1.EffectUtil.SetEffectTimeScale(t, this.hed, this.hed.TimeDilation);
    }
  }
  RemoveEffect(t) {
    if (this.o1h()) {
      this._ed.add(t);
    }
  }
  cTa() {
    if (!!this.o1h() && !(this.led.size <= 0)) {
      this.led.forEach(t => {
        if (EffectSystem_1.EffectSystem.IsValid(t)) {
          EffectSystem_1.EffectSystem.SetTimeScale(t, 1, true);
        }
      });
      this.led.clear();
      this._ed.clear();
    }
  }
  OnChangeTimeDilation(t) {
    if (!!this.o1h() && !(this.led.size <= 0)) {
      this.led.forEach(t => {
        if (EffectSystem_1.EffectSystem.IsValid(t)) {
          if (this.hed?.Valid) {
            EffectUtil_1.EffectUtil.SetEffectTimeScale(t, this.hed, this.hed.TimeDilation);
          } else {
            EffectSystem_1.EffectSystem.SetTimeScale(t, 1, true);
          }
        } else {
          this._ed.add(t);
        }
      });
      this._ed.forEach(t => {
        this.led.delete(t);
      });
      this._ed.clear();
    }
  }
  o1h() {
    return this.tZ;
  }
};
CharacterSelfCenterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(289)], CharacterSelfCenterComponent);
exports.CharacterSelfCenterComponent = CharacterSelfCenterComponent; //# sourceMappingURL=CharacterSelfCenterComponent.js.map