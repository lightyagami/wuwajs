"use strict";

var __decorate = this && this.__decorate || function (e, a, t, r) {
  var u;
  var l = arguments.length;
  var i = l < 3 ? a : r === null ? r = Object.getOwnPropertyDescriptor(a, t) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, a, t, r);
  } else {
    for (var C = e.length - 1; C >= 0; C--) {
      if (u = e[C]) {
        i = (l < 3 ? u(i) : l > 3 ? u(a, t, i) : u(a, t)) || i;
      }
    }
  }
  if (l > 3 && i) {
    Object.defineProperty(a, t, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseGameplayCueComponent = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController");
const GameplayCueAnimBeam_1 = require("./GameplayCueSFX/GameplayCueAnimBeam");
const GameplayCueAudioEvent_1 = require("./GameplayCueSFX/GameplayCueAudioEvent");
const GameplayCueBeam_1 = require("./GameplayCueSFX/GameplayCueBeam");
const GameplayCueCameraEffect_1 = require("./GameplayCueSFX/GameplayCueCameraEffect");
const GameplayCueEffect_1 = require("./GameplayCueSFX/GameplayCueEffect");
const GamePlayCueEffectNiagara_1 = require("./GameplayCueSFX/GamePlayCueEffectNiagara");
const GameplayCueFixHook_1 = require("./GameplayCueSFX/GameplayCueFixHook");
const GameplayCueFollow_1 = require("./GameplayCueSFX/GameplayCueFollow");
const GameplayCueFromSummoned_1 = require("./GameplayCueSFX/GameplayCueFromSummoned");
const GameplayCueHideBone_1 = require("./GameplayCueSFX/GameplayCueHideBone");
const GameplayCueHideMesh_1 = require("./GameplayCueSFX/GameplayCueHideMesh");
const GameplayCueHitEffect_1 = require("./GameplayCueSFX/GameplayCueHitEffect");
const GameplayCueHookUp_1 = require("./GameplayCueSFX/GameplayCueHookUp");
const GameplayCueManipulateInteract_1 = require("./GameplayCueSFX/GameplayCueManipulateInteract");
const GameplayCueMaterial_1 = require("./GameplayCueSFX/GameplayCueMaterial");
const GameplayCueMoveSpline_1 = require("./GameplayCueSFX/GameplayCueMoveSpline");
const GameplayCueSkillTargetBeam_1 = require("./GameplayCueSFX/GameplayCueSkillTargetBeam");
const GameplayCueSkinDamage_1 = require("./GameplayCueSFX/GameplayCueSkinDamage");
const GameplayCueTraceRay_1 = require("./GameplayCueSFX/GameplayCueTraceRay");
const GameplayCueUIEffect_1 = require("./GameplayCueSFX/GameplayCueUIEffect");
function getGameplayCueClass(e, a) {
  switch (e.CueType) {
    case 0:
      if (e.bSoftFollow) {
        return GameplayCueFollow_1.GameplayCueFollow;
      } else {
        return GameplayCueEffect_1.GameplayCueEffect;
      }
    case 1:
      return GameplayCueMaterial_1.GameplayCueMaterial;
    case 4:
    case 2:
    case 14:
    case 20:
    case 22:
      if (a) {
        return undefined;
      } else {
        return GameplayCueUIEffect_1.GameplayCueUIEffect;
      }
    case 5:
      return GameplayCueUIEffect_1.GameplayCueUIEffect;
    case 3:
      return GameplayCueMoveSpline_1.GameplayCueMoveSpline;
    case 6:
      if (a) {
        return undefined;
      } else {
        return GameplayCueBeam_1.GameplayCueBeam;
      }
    case 7:
      if (a) {
        return undefined;
      } else {
        return GameplayCueHookUp_1.GameplayCueHookUp;
      }
    case 8:
      if (a) {
        return undefined;
      } else {
        return GameplayCueFixHook_1.GameplayCueFixHook;
      }
    case 9:
      return GameplayCueCameraEffect_1.GameplayCueCameraEffect;
    case 10:
      return GameplayCueFromSummoned_1.GameplayCueFromSummoned;
    case 11:
      return GameplayCueHideMesh_1.GameplayCueHideMesh;
    case 12:
      return GameplayCueHideBone_1.GameplayCueHideBone;
    case 13:
      return GameplayCueManipulateInteract_1.GameplayCueManipulateInteract;
    case 15:
      return GameplayCueHitEffect_1.GameplayCueHitEffect;
    case 16:
      return GameplayCueSkillTargetBeam_1.GameplayCueSkillTargetBeam;
    case 17:
      return GameplayCueAnimBeam_1.GameplayCueAnimBeam;
    case 18:
      return GameplayCueTraceRay_1.GameplayCueTraceRay;
    case 19:
      return GameplayCueSkinDamage_1.GameplayCueSkinDamage;
    case 21:
      return GameplayCueAudioEvent_1.GameplayCueAudioEvent;
    case 23:
      return GamePlayCueEffectNiagara_1.GamePlayCueEffectNiagara;
    default:
      return;
  }
}
let BaseGameplayCueComponent = class BaseGameplayCueComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Ksu = new Map();
    this.m1t = undefined;
    this.Ysu = new Map();
  }
  GetBuffComponent() {
    return this.m1t;
  }
  OnStart() {
    this.m1t = this.Entity.CheckGetComponent(209);
    return true;
  }
  OnEnd() {
    for (const e of this.Ksu.keys()) {
      this.RemoveCueByHandle(e);
    }
    return true;
  }
  OnTick(e) {
    var a = e * TimeUtil_1.TimeUtil.Millisecond;
    for (const t of this.GetAllCurrentCueRef()) {
      t.Tick(a);
    }
  }
  AddCue(e, a = {}) {
    var t;
    var e = this.zsu(e, a);
    if (e) {
      if (a.Instant) {
        return GameplayCueController_1.INSTANT_CUE_HANDLE;
      } else {
        t = GameplayCueController_1.GameplayCueController.GenerateHandle();
        e.Add(t, a.Buff?.Handle ?? 0);
        this.Ksu.set(t, e);
        return t;
      }
    } else {
      return GameplayCueController_1.INVALID_CUE_HANDLE;
    }
  }
  RemoveCue(e) {
    for (const a of this.tlu(e)) {
      this.RemoveCueByHandle(a);
    }
  }
  RemoveCueByHandle(e) {
    var a = this.Ksu.get(e);
    if (a) {
      a.Remove(e);
      if (a.CueHandleIds.size === 0) {
        a.Destroy();
        this.Zsu(a);
      }
      this.Ksu.delete(e);
    } else {
      CombatLog_1.CombatLog.Error("Cue", this.Entity, "Cue特效.移除Cue引用失败", ["CueHandleId", e]);
    }
  }
  AddCueEffectToSet(e, a) {}
  GetEntityHandle() {}
  *GetAllCurrentCueRef() {
    var e = new Set();
    for (const a of this.Ksu.values()) {
      if (!e.has(a)) {
        e.add(a);
        yield a;
      }
    }
  }
  GetCueByHandle(e) {
    return this.Ksu.get(e);
  }
  xJs(e) {
    var a = Protocol_1.Aki.Protocol.he_.create();
    a.TJs = MathUtils_1.MathUtils.NumberToLong(e);
    CombatMessage_1.CombatNet.Send(27430, this.GetEntityHandle().Entity, a);
  }
  static GameplayCueNotify(e, a) {
    e = e?.GetComponent(21);
    a = MathUtils_1.MathUtils.LongToNumber(a.TJs);
    e?.AddCue(a, {
      Instant: true
    });
  }
  tlu(e) {
    var a;
    var t;
    var r = [];
    for ([a, t] of this.Ksu.entries()) {
      if (t.CueConfig.Id === e) {
        r.push(a);
      }
    }
    return r;
  }
  ilu(e) {
    for (const a of this.Ksu.values()) {
      if (a.CueConfig.Id === e) {
        return a;
      }
    }
  }
  zsu(a, t = {}) {
    var r = GameplayCueController_1.GameplayCueController.GetConfigById(a);
    if (r) {
      if (this.eau(r)) {
        var u = t.Buff;
        var l = t.Instant ?? false;
        var i = getGameplayCueClass(r, l);
        if (i) {
          let e = this.ilu(a);
          if (!e || !i.IsSingleInstance()) {
            e = i.Spawn({
              CueConfig: r,
              EntityHandle: this.GetEntityHandle(),
              CueComp: this,
              Buff: u,
              Instant: l,
              BeginCallback: t.BeginCallback,
              EndCallback: t.EndCallback,
              Instigator: u?.GetInstigator() ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(u.GetInstigator()) : t.Instigator
            });
            this.Jsu(r);
          }
          if (t.Sync) {
            this.xJs(a);
          }
          return e;
        }
        CombatLog_1.CombatLog.Error("Cue", this.Entity, "不存在这种Cue特效类型", ["CueId", a], ["Cue类型", r.CueType]);
      }
    } else {
      CombatLog_1.CombatLog.Error("Cue", this.Entity, "Cue特效表不存在CueId", ["CueId", a]);
    }
  }
  eau(e) {
    var a;
    return e.Group <= 0 || !(a = this.Ysu.get(e.Group)) || !(a = this.ilu(a)) || a.CueConfig.Priority <= e.Priority;
  }
  Jsu(e) {
    if (!(e.Group <= 0)) {
      var a = this.Ysu.get(e.Group);
      if (a) {
        if (a === e.Id) {
          return;
        }
        var t = this.ilu(a);
        if (t && t.CueConfig.Priority > e.Priority) {
          return;
        }
        this.RemoveCue(a);
      }
      this.Ysu.set(e.Group, e.Id);
    }
  }
  Zsu(e) {
    if (e && e.CueConfig.Group > 0) {
      this.Ysu.delete(e.CueConfig.Group);
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("EJs", true)], BaseGameplayCueComponent, "GameplayCueNotify", null);
BaseGameplayCueComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(225)], BaseGameplayCueComponent);
exports.BaseGameplayCueComponent = BaseGameplayCueComponent; //# sourceMappingURL=BaseGameplayCueComponent.js.map