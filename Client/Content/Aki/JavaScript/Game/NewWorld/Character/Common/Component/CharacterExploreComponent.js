"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var r = arguments.length;
  var o = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        o = (r < 3 ? s(o) : r > 3 ? s(t, i, o) : s(t, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterExploreComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RouletteController_1 = require("../../../../Module/Roulette/RouletteController");
const HighlightExploreSkillLogic_1 = require("./Skill/HighlightExploreSkillLogic");
const HOOK_VISION_ID = 1001;
const MANIPULATE_VISION_ID = 1003;
const MANIPULATE_SKILL_ID_MAP = new Set([210007]);
const HOOK_SKILL_ID_MAP = new Set([100020, 100021, 100022, 200004, 210130, 100024]);
let CharacterExploreComponent = class CharacterExploreComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.O4r = undefined;
    this.yJl = undefined;
    this.SJl = undefined;
    this.k4r = false;
    this.H4r = undefined;
    this.cBe = undefined;
    this.ldu = undefined;
    this.Unu = undefined;
    this.z4r = undefined;
    this.Z4r = false;
    this.t5r = false;
    this.fHe = () => {
      if (this.i5r()) {
        this.Ore();
      } else {
        this.kre();
      }
    };
    this.o5r = (e, t) => {
      var i = ModelManager_1.ModelManager.ExploreModel;
      var n = this.O4r;
      if (e && n.IsLegalExceptSkill()) {
        e = n.GetNextTarget();
        if (!(i.HookEntity = e) || i.CurHookTriggerId !== e.Entity.Id) {
          if (e) {
            i.CurHookTriggerId = e.Entity.Id;
          }
          i.HookFound = true;
          if (this.Z4r) {
            if (this.z4r !== 0) {
              i.SetExploreSkillId(HOOK_VISION_ID, 2);
            } else if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene)) {
              EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
            }
          }
        }
      } else {
        i.HookFound = false;
        i.HookEntity = undefined;
        i.CurHookTriggerId = 0;
        i.LastHookTriggerId = 0;
        this.n5r(0);
      }
    };
    this.s5r = (e, t, i) => {
      if (!(this.k4r = i)) {
        i = ModelManager_1.ModelManager.ExploreModel;
        if (e) {
          i.ManipulateFound = true;
          i.ManipulateEntity = t;
          i.ManipulateActorComp = t.GetComponent(1);
          i.CurManipulateTriggerId = t.Id;
          if (this.Z4r) {
            if (this.z4r !== 1) {
              i.SetExploreSkillId(MANIPULATE_VISION_ID, 2);
            } else if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene)) {
              EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
            }
          }
        } else {
          i.ManipulateFound = false;
          i.ManipulateEntity = undefined;
          i.ManipulateActorComp = undefined;
          i.CurManipulateTriggerId = 0;
          i.LastManipulateTriggerId = 0;
          this.n5r(1);
        }
      }
    };
    this.h5r = e => {
      var t = ModelManager_1.ModelManager.ExploreModel;
      t.ManipulateFound = false;
      t.HookFound = false;
      t.AutoResetSkillFinished = true;
    };
    this.l5r = (e, t) => {};
    this.ene = (e, t) => {
      if (this.Unu.has(t)) {
        this.Z4r = false;
        this.z4r = undefined;
        const i = ModelManager_1.ModelManager.ExploreModel;
        i.ResetExplodeSkillId(2);
        t = i.GetTopLayerExplodeSkillId();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 31, "[CharacterExploreComponent] OnCharSkillEnd", ["oldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["newSkill", t], ["id", this.Entity.Id]);
        }
        RouletteController_1.RouletteController.ExploreSkillSetRequest(t, e => {
          i.AutoResetSkillFinished = true;
        }, true);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
        this.O4r.NeedChangeTargetState = true;
      }
    };
  }
  get ExploreSkillHighlightHandle() {
    if (!this.ldu) {
      this.ldu = new HighlightExploreSkillLogic_1.HighlightExploreSkillLogic();
      this.ldu.Init(this.Entity.GetComponent(206));
    }
    return this.ldu;
  }
  set ExploreSkillHighlightHandle(e) {
    this.ldu = e;
  }
  OnStart() {
    this.O4r = this.Entity.GetComponent(100);
    this.H4r = this.Entity.GetComponent(1);
    this.cBe = this.Entity.GetComponent(40);
    this.yJl = this.Entity.GetComponent(65);
    this.SJl = this.Entity.GetComponent(66);
    if (this.i5r()) {
      this.Ore();
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    if (ModelManager_1.ModelManager.ExploreModel.ManipulateFound || ModelManager_1.ModelManager.ExploreModel.HookFound) {
      this._5r();
    } else {
      this.n5r();
    }
    return true;
  }
  OnEnable() {
    this.k4r = false;
    if (ModelManager_1.ModelManager.ExploreModel.ManipulateFound || ModelManager_1.ModelManager.ExploreModel.HookFound) {
      this._5r();
    } else {
      this.n5r();
    }
  }
  OnEnd() {
    if (this.ExploreSkillHighlightHandle) {
      this.ExploreSkillHighlightHandle.Clear();
      this.ExploreSkillHighlightHandle = undefined;
    }
    this.kre();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    return true;
  }
  OnTick() {
    this._5r();
    return true;
  }
  _5r() {
    if (this.yJl?.CurSelectedEntity === undefined && this.SJl?.GetCurrentTarget === undefined && !!ModelManager_1.ModelManager.ExploreModel.ManipulateFound) {
      ModelManager_1.ModelManager.ExploreModel.ManipulateFound = false;
      ModelManager_1.ModelManager.ExploreModel.ManipulateEntity = undefined;
      ModelManager_1.ModelManager.ExploreModel.ManipulateActorComp = undefined;
      ModelManager_1.ModelManager.ExploreModel.CurManipulateTriggerId = 0;
      ModelManager_1.ModelManager.ExploreModel.LastManipulateTriggerId = 0;
    }
    var e = this.O4r?.GetNextTarget() !== undefined;
    if (!e && ModelManager_1.ModelManager.ExploreModel.HookFound) {
      ModelManager_1.ModelManager.ExploreModel.HookFound = false;
      ModelManager_1.ModelManager.ExploreModel.HookEntity = undefined;
      ModelManager_1.ModelManager.ExploreModel.CurHookTriggerId = 0;
      ModelManager_1.ModelManager.ExploreModel.LastHookTriggerId = 0;
    }
    if (ModelManager_1.ModelManager.ExploreModel.HookFound || ModelManager_1.ModelManager.ExploreModel.ManipulateFound) {
      e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      if (ModelManager_1.ModelManager.ExploreModel.HookFound !== ModelManager_1.ModelManager.ExploreModel.ManipulateFound) {
        this.u5r(e);
      } else {
        this.c5r(e);
      }
    }
  }
  u5r(e) {
    if (ModelManager_1.ModelManager.ExploreModel.HookFound && ModelManager_1.ModelManager.ExploreModel.CurHookTriggerId !== ModelManager_1.ModelManager.ExploreModel.LastHookTriggerId && e !== HOOK_VISION_ID && this.O4r.IsLegalExceptSkill()) {
      this.m5r(0);
      this.O4r.NeedChangeTargetState = true;
    } else if (ModelManager_1.ModelManager.ExploreModel.ManipulateFound && ModelManager_1.ModelManager.ExploreModel.CurManipulateTriggerId !== ModelManager_1.ModelManager.ExploreModel.LastManipulateTriggerId && e !== MANIPULATE_VISION_ID) {
      this.m5r(1);
      this.O4r.NeedChangeTargetState = false;
    }
  }
  c5r(e) {
    var t;
    var i;
    var n;
    if (this.k4r) {
      if (e !== MANIPULATE_VISION_ID) {
        this.m5r(1);
      }
    } else {
      n = this.H4r.ActorLocationProxy;
      i = ModelManager_1.ModelManager.ExploreModel.HookEntity.HookLocation;
      t = ModelManager_1.ModelManager.ExploreModel.ManipulateActorComp.ActorLocationProxy;
      i = Vector_1.Vector.DistSquared(n, i);
      n = Vector_1.Vector.DistSquared(n, t);
      if (Math.abs(i - n) < Number.EPSILON || n < i) {
        if (e !== MANIPULATE_VISION_ID && ModelManager_1.ModelManager.ExploreModel.CurManipulateTriggerId !== ModelManager_1.ModelManager.ExploreModel.LastManipulateTriggerId) {
          this.m5r(1);
        }
        this.O4r.NeedChangeTargetState = false;
      } else {
        if (e !== HOOK_VISION_ID && ModelManager_1.ModelManager.ExploreModel.CurHookTriggerId !== ModelManager_1.ModelManager.ExploreModel.LastHookTriggerId && this.O4r.IsLegalExceptSkill()) {
          this.m5r(0);
        }
        this.O4r.NeedChangeTargetState = true;
      }
    }
  }
  Ore() {
    if (!this.t5r) {
      this.t5r = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.s5r);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleFindFixHook, this.o5r);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.l5r);
    }
  }
  kre() {
    if (this.t5r) {
      this.t5r = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.s5r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleFindFixHook, this.o5r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.l5r);
    }
  }
  m5r(e) {
    let t = 0;
    var i = ModelManager_1.ModelManager.ExploreModel;
    switch (e) {
      case 0:
        t = HOOK_VISION_ID;
        i.LastHookTriggerId = i.CurHookTriggerId;
        break;
      case 1:
        t = MANIPULATE_VISION_ID;
        i.LastManipulateTriggerId = i.CurManipulateTriggerId;
    }
    if (this.d5r(t) && !i.SetExploreSkillId(t, 2)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 31, "[CharacterExploreComponent] TryChangeSkill", ["oldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["newSkill", t], ["id", this.Entity.Id]);
      }
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t, 2);
      RouletteController_1.RouletteController.ExploreSkillSetRequest(t, undefined, true);
      i.AutoResetSkillFinished = false;
    }
  }
  n5r(e) {
    const t = ModelManager_1.ModelManager.ExploreModel;
    if (t.HookFound) {
      this.m5r(0);
      this.O4r.NeedChangeTargetState = true;
    } else if (!t.ManipulateFound && t.ExistAutoLayerSkill()) {
      if (this.C5r()) {
        if (e !== undefined) {
          this.z4r = e;
          this.Z4r = true;
          switch (e) {
            case 0:
              this.Unu = HOOK_SKILL_ID_MAP;
              break;
            case 1:
              this.Unu = MANIPULATE_SKILL_ID_MAP;
          }
          if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene)) {
            EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
          }
        }
      } else {
        t.ResetExplodeSkillId(2);
        e = t.GetTopLayerExplodeSkillId();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 31, "[CharacterExploreComponent] CheckExit", ["oldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["newSkill", e], ["id", this.Entity.Id]);
        }
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e, e => {
          t.AutoResetSkillFinished = true;
        }, true);
        this.O4r.NeedChangeTargetState = true;
      }
    }
  }
  d5r(e) {
    return ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(e);
  }
  C5r() {
    var e;
    return !!this.cBe.CurrentSkill && !(e = this.cBe.CurrentSkill.SkillId, !MANIPULATE_SKILL_ID_MAP.has(e) && !HOOK_SKILL_ID_MAP.has(e));
  }
  i5r() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id === this.Entity.Id;
  }
  ShowHighlightExploreSkill(e, t, i, n, s, r) {
    this.ExploreSkillHighlightHandle.ShowHighlightExploreSkill(e, t, i, n, s, r);
  }
  HideHighlightExploreSkill() {
    this.ExploreSkillHighlightHandle.HideHighlightExploreSkill();
  }
  SetDataFromOldRole(e) {
    e = e.Entity.GetComponent(54);
    this.ExploreSkillHighlightHandle = e.ExploreSkillHighlightHandle;
    e.ExploreSkillHighlightHandle = undefined;
    this.ExploreSkillHighlightHandle?.Init(this.Entity.GetComponent(206));
  }
};
CharacterExploreComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(54)], CharacterExploreComponent);
exports.CharacterExploreComponent = CharacterExploreComponent; //# sourceMappingURL=CharacterExploreComponent.js.map