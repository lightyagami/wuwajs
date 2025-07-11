"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (n = e[h]) {
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
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DEFAULT_BE_HIT_SELF_CENTER_DURATION = 200;
let CharacterSelfCenterComponent = class CharacterSelfCenterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.vHr = undefined;
    this.uZr = undefined;
    this.H8c = undefined;
    this.Cs1 = 1;
    this.$8c = false;
    this.TDe = undefined;
    this.Ucu = 0;
    this.Dcu = 0;
    this.W8c = e => {
      var e = EntitySystem_1.EntitySystem.GetComponent(e, 285);
      if (e?.$8c) {
        e = e.vHr?.GetForeverTimeScale(e.Ucu) ?? 1;
        this.SetSelfCenterTimeDilation(e);
      }
    };
    this.InitEntityBornDilation = (t, i) => {
      switch (this.Hte.CreatureData.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          {
            let e = 0;
            if (t === 5) {
              e = MathUtils_1.MathUtils.IsNearlyEqual(i, 1) ? 0 : CommonParamById_1.configCommonParamById.GetFloatConfig("MonsterSlowTimeDilation") ?? 0;
            }
            this.uZr?.SetBuffBaseForeverTimeScale(e);
            break;
          }
      }
    };
  }
  get SelfCenterTimeDilation() {
    return this.Cs1;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.vHr = this.Entity.GetComponent(179);
    this.H8c = this.Entity.GetComponent(56);
    this.uZr = this.Entity.GetComponent(16);
    if (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered && ModelManager_1.ModelManager.CharacterModel.SelfCenteredMode === 5) {
      this.InitEntityBornDilation(ModelManager_1.ModelManager.CharacterModel.SelfCenteredMode, ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterSetMaster, this.W8c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.InitEntityBornDilation);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterSetMaster, this.W8c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.InitEntityBornDilation);
    return true;
  }
  SetSelfCenterTimeDilation(e, t = true) {
    this.Cs1 = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 6, "SetSelfCenterTimeDilation", ["Char", this.Hte?.Actor.GetName()], ["TimeDilation", e]);
    }
    if (this.Ucu > 0) {
      this.vHr?.RemoveForeverTimeScale(this.Ucu);
    }
    this.Ucu = this.vHr?.SetForeverTimeScale(14, e, 0, true) ?? 0;
    if (t) {
      var i = this.H8c?.FollowIds;
      if (i) {
        for (const o of i) {
          EntitySystem_1.EntitySystem.GetComponent(o, 285)?.SetSelfCenterTimeDilation(e, t);
        }
      }
    }
    this.$8c = e !== 1 && t;
  }
  SetSelfBeHitTimeDilation(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "SetSelfBeHitTimeDilation", ["Char", this.Hte?.Actor.GetName()], ["TimeDilation", e]);
    }
    if (this.Dcu > 0) {
      this.vHr?.RemoveForeverTimeScale(this.Dcu);
    }
    this.Dcu = this.vHr?.SetForeverTimeScale(15, e) ?? 0;
  }
  RemoveSelfBeHitTimeDilation() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "RemoveSelfBeHitTimeDilation", ["Char", this.Hte?.Actor.GetName()]);
    }
    this.vHr?.RemoveForeverTimeScale(this.Dcu);
    this.Dcu = 0;
  }
  SetBeHitTimeDilation(e, t = DEFAULT_BE_HIT_SELF_CENTER_DURATION) {
    if (MathUtils_1.MathUtils.IsNearlyEqual(this.Cs1, 1)) {
      this.SetSelfBeHitTimeDilation(e);
      if (this.TDe?.Valid()) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
      this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
        this.RemoveSelfBeHitTimeDilation();
      }, t, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    }
  }
};
CharacterSelfCenterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(285)], CharacterSelfCenterComponent);
exports.CharacterSelfCenterComponent = CharacterSelfCenterComponent; //# sourceMappingURL=CharacterSelfCenterComponent.js.map