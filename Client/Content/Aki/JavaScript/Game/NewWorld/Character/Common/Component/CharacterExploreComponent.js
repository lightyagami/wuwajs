"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var r;
  var o = arguments.length;
  var h = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (r = e[n]) {
        h = (o < 3 ? r(h) : o > 3 ? r(t, i, h) : r(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
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
      var s = this.O4r;
      if (e && s.IsLegalExceptSkill()) {
        e = s.GetNextTarget();
        if (!(i.HookEntity = e) || i.CurHookTriggerId !== e.Entity.Id) {
          if (e) {
            i.CurHookTriggerId = e.Entity.Id;
          }
          i.HookFound = true;
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
    this.ene = (e, t) => {
      if (this.Unu.has(t)) {
        const i = ModelManager_1.ModelManager.ExploreModel;
        if (i.HookFound) {
          this.m5r(0);
        } else if (i.ManipulateFound) {
          this.m5r(1);
        } else {
          i.ResetExplodeSkillId(2);
          t = i.GetTopLayerExplodeSkillId();
          RouletteController_1.RouletteController.ExploreSkillSetRequest(t, e => {
            i.AutoResetSkillFinished = true;
          }, true);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] OnCharSkillEnd", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["HookFound", i.HookFound], ["ManipulateFound", i.ManipulateFound], ["TopLayerSkillId", i.GetTopLayerExplodeSkillId()]);
        }
        this.O4r.NeedChangeTargetState = true;
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
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
    var e = ModelManager_1.ModelManager.ExploreModel;
    if (this.yJl?.CurSelectedEntity === undefined && this.SJl?.GetCurrentTarget === undefined && e.ManipulateFound) {
      e.ManipulateFound = false;
      e.ManipulateEntity = undefined;
      e.ManipulateActorComp = undefined;
      e.CurManipulateTriggerId = 0;
      e.LastManipulateTriggerId = 0;
    }
    var t = this.O4r?.GetNextTarget() !== undefined;
    if (!t && e.HookFound) {
      e.HookFound = false;
      ModelManager_1.ModelManager.ExploreModel.HookEntity = undefined;
      e.CurHookTriggerId = 0;
      e.LastHookTriggerId = 0;
    }
    if (e.HookFound || e.ManipulateFound) {
      if (e.HookFound !== e.ManipulateFound) {
        this.u5r();
      } else {
        this.c5r();
      }
    }
  }
  u5r() {
    var e = ModelManager_1.ModelManager.ExploreModel;
    if (e.HookFound && e.CurHookTriggerId !== e.LastHookTriggerId && this.O4r.IsLegalExceptSkill()) {
      this.m5r(0);
      this.O4r.NeedChangeTargetState = true;
    } else if (e.ManipulateFound && e.CurManipulateTriggerId !== e.LastManipulateTriggerId) {
      this.m5r(1);
      this.O4r.NeedChangeTargetState = false;
    }
  }
  c5r() {
    var e;
    var t;
    var i;
    var s = ModelManager_1.ModelManager.ExploreModel;
    if (this.k4r) {
      this.m5r(1);
    } else {
      i = this.H4r.ActorLocationProxy;
      t = s.HookEntity.HookLocation;
      e = s.ManipulateActorComp.ActorLocationProxy;
      t = Vector_1.Vector.DistSquared(i, t);
      i = Vector_1.Vector.DistSquared(i, e);
      if (Math.abs(t - i) < Number.EPSILON || i < t) {
        if (s.CurManipulateTriggerId !== s.LastManipulateTriggerId) {
          this.m5r(1);
        }
        this.O4r.NeedChangeTargetState = false;
      } else {
        if (s.CurHookTriggerId !== s.LastHookTriggerId && this.O4r.IsLegalExceptSkill()) {
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
    }
  }
  kre() {
    if (this.t5r) {
      this.t5r = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.s5r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleFindFixHook, this.o5r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r);
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
    if (this.d5r(t)) {
      if (i.CheckNeedChangeSkill(t, 2)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] TryChangeSkill", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["NewSkill", t], ["Id", this.Entity.Id]);
        }
        RouletteController_1.RouletteController.ExploreSkillSetRequest(t, undefined, true);
        i.AutoResetSkillFinished = false;
      }
      i.SetExploreSkillId(t, 2);
    }
  }
  n5r(e) {
    const t = ModelManager_1.ModelManager.ExploreModel;
    if (t.HookFound) {
      this.m5r(0);
      this.O4r.NeedChangeTargetState = true;
    } else if (!t.ManipulateFound && t.ExistAutoLayerSkill()) {
      if (this.C5r(e)) {
        if (e !== undefined) {
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
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] CheckExit", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["NewSkill", e], ["Id", this.Entity.Id]);
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
  C5r(e) {
    var t;
    return !!this.cBe.CurrentSkill && (t = this.cBe.CurrentSkill.SkillId, e === 0 && !!HOOK_SKILL_ID_MAP.has(t) || e === 1 && !!MANIPULATE_SKILL_ID_MAP.has(t));
  }
  i5r() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id === this.Entity.Id;
  }
  ShowHighlightExploreSkill(e, t, i, s, r, o) {
    this.ExploreSkillHighlightHandle.ShowHighlightExploreSkill(e, t, i, s, r, o);
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