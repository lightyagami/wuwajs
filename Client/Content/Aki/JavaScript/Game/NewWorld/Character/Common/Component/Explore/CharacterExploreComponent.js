"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var n = arguments.length;
  var o = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        o = (n < 3 ? h(o) : n > 3 ? h(e, i, o) : h(e, i)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterExploreComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RouletteController_1 = require("../../../../../Module/Roulette/RouletteController");
const GrapplingHookPointDefine_1 = require("../../../Custom/Components/Define/GrapplingHookPointDefine");
const BaseExploreComponent_1 = require("./BaseExploreComponent");
const MANIPULATE_VISION_ID = 1003;
const MANIPULATE_SKILL_ID_MAP = new Set([210007]);
const HOOK_SKILL_ID_MAP = new Set([100020, 100021, 100022, 200004, 210130, 100024, 210032]);
let CharacterExploreComponent = class CharacterExploreComponent extends BaseExploreComponent_1.BaseExploreComponent {
  constructor() {
    super(...arguments);
    this.yJl = undefined;
    this.SJl = undefined;
    this.k4r = false;
    this.Unu = undefined;
    this.dpf = false;
    this.orn = true;
    this.rrn = false;
    this.N4r = false;
    this.G4r = false;
    this.qKf = 0;
    this.OKf = 0;
    this.GKf = 0;
    this.FKf = 0;
    this.j4r = undefined;
    this.M6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.dpf = true;
        this.OnExploreComponentDisable("主控角色进入载具");
      }
    };
    this.E6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.dpf = false;
        this.OnExploreComponentEnable("主控角色离开载具");
      }
    };
    this.fHe = (t, e) => {
      if (!this.dpf) {
        if (e?.Id === this.Entity.Id) {
          this.OnExploreComponentDisable("OnRoleGoDown");
        } else if (t.Id === this.Entity.Id) {
          this.OnExploreComponentEnable("OnRoleGoUp");
        }
      }
    };
    this.a7r = () => {
      this.N4r = false;
      this.G4r = false;
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === GrapplingHookPointDefine_1.HOOK_VISION_ID) {
        if (this.rrn) {
          this.UpdateHookIconTag(true, this.FocusTargetInternal?.GetTagId(), "切换到钩锁技能且NeedAddTag为真时, 添加定点钩索可用标签");
          this.UpdateHookIconHighlightTag(true);
        }
      } else {
        this.UpdateHookIconTag(false, undefined, "切换到非钩锁技能时，删除定点钩索可用标签");
        this.UpdateHookIconHighlightTag(false);
        if (this.FocusTargetInternal) {
          this.FocusTargetInternal.ChangeHookPointState(0);
          this.FocusTargetInternal = undefined;
        }
      }
    };
    this.S7f = () => {
      if (this.FocusTargetInternal && this.NextLegalExceptSkill) {
        if (this.FKf !== this.FocusTargetInternal.Entity.Id && (this.FKf = this.FocusTargetInternal.Entity.Id, this.N4r = true, this.FocusTargetInternal) && this.NeedChangeTargetState) {
          this.FocusTargetInternal.ChangeHookPointState(this.NextLegalExceptSkill ? 1 : 2);
        }
      } else {
        this.N4r = false;
        this.FKf = 0;
        this.GKf = 0;
        this.n5r(0);
      }
    };
    this.s5r = (t, e, i) => {
      if (!(this.k4r = i)) {
        if (t) {
          this.G4r = true;
          this.j4r = e.GetComponent(1);
          this.OKf = e.Id;
        } else {
          this.G4r = false;
          this.j4r = undefined;
          this.OKf = 0;
          this.qKf = 0;
          this.n5r(1);
        }
      }
    };
    this.ene = (t, e) => {
      const i = ModelManager_1.ModelManager.ExploreModel;
      if (this.Unu.has(e)) {
        if (this.FocusTargetInternal && this.NextLegalExceptSkill) {
          this.m5r(0);
        } else if (this.G4r) {
          this.m5r(1);
        } else {
          i.ResetExplodeSkillId(2, "OnCharSkillEnd");
          e = i.GetTopLayerExplodeSkillId();
          RouletteController_1.RouletteController.ExploreSkillSetRequest(e, t => {
            i.AutoResetSkillFinished = true;
          }, true);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] OnCharSkillEnd", ["NextTarget", this.FocusTargetInternal], ["NextLegalExceptSkill", this.NextLegalExceptSkill], ["ManipulateFound", this.G4r], ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["TopLayerSkillId", i.GetTopLayerExplodeSkillId()]);
        }
        this.NeedChangeTargetState = true;
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
      }
    };
  }
  get NeedChangeTargetState() {
    return this.orn;
  }
  set NeedChangeTargetState(t) {
    if ((this.orn = t) && this.FocusTargetInternal) {
      this.FocusTargetInternal.ChangeHookPointState(this.NextLegalExceptSkill ? 1 : 2);
    }
  }
  OnStart() {
    super.OnStart();
    this.LogKey = "(角色)探索组件";
    this.yJl = this.Entity.GetComponent(68);
    this.SJl = this.Entity.GetComponent(69);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    this.OnExploreComponentDisable("OnEnd");
    return true;
  }
  OnExploreComponentEnable(t) {
    return !!super.OnExploreComponentEnable(t) && (this.k4r = false, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.s5r), true);
  }
  OnExploreComponentDisable(t) {
    return !!super.OnExploreComponentDisable(t) && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.s5r), true);
  }
  OnTick() {
    this._5r();
    return true;
  }
  _5r() {
    if (this.yJl?.CurSelectedEntity === undefined && this.SJl?.GetCurrentTarget === undefined && this.G4r) {
      this.G4r = false;
      this.j4r = undefined;
      this.OKf = 0;
      this.qKf = 0;
    }
    if (!this.FocusTargetInternal?.Valid && this.N4r) {
      this.N4r = false;
      this.FKf = 0;
      this.GKf = 0;
    }
    if (this.N4r || this.G4r) {
      if (this.N4r !== this.G4r) {
        this.u5r();
      } else {
        this.c5r();
      }
    }
  }
  u5r() {
    if (this.N4r && this.FKf !== this.GKf && this.NextLegalExceptSkill) {
      this.m5r(0);
      this.NeedChangeTargetState = true;
    } else if (this.G4r && this.OKf !== this.qKf) {
      this.m5r(1);
      this.NeedChangeTargetState = false;
    }
  }
  c5r() {
    var t;
    var e;
    var i;
    if (this.k4r) {
      this.m5r(1);
    } else {
      i = this.ActorComponent.ActorLocationProxy;
      e = this.FocusTargetInternal.HookLocation;
      t = this.j4r.ActorLocationProxy;
      e = Vector_1.Vector.DistSquared(i, e);
      i = Vector_1.Vector.DistSquared(i, t);
      if (Math.abs(e - i) < Number.EPSILON || i < e) {
        if (this.OKf !== this.qKf) {
          this.m5r(1);
        }
        this.NeedChangeTargetState = false;
      } else {
        if (this.FKf !== this.GKf && this.NextLegalExceptSkill) {
          this.m5r(0);
        }
        this.NeedChangeTargetState = true;
      }
    }
  }
  SetDataFromOldRole(t) {
    t = t.Entity.GetComponent(56);
    this.dpf = t.dpf;
    this.HighlightLogic = t.HighlightLogic;
    t.HighlightLogic = undefined;
    this.PendingHighlightSkill = t.PendingHighlightSkill;
    this.HighlightLogic?.Init(this);
    if (t.CurrentIconTagId) {
      this.UpdateHookIconTag(true, t.CurrentIconTagId, "上场角色继承下场角色Tag");
    }
    if (t.CurrentIconHighlightTagId) {
      this.UpdateHookIconHighlightTag(true);
    }
  }
  OnDetectedTargetChanged() {
    this.S7f();
    if (this.FocusTargetInternal !== undefined && this.NextLegalExceptSkill) {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== GrapplingHookPointDefine_1.HOOK_VISION_ID) {
        this.rrn = true;
      } else if (this.FocusTargetLegal) {
        this.UpdateHookIconTag(true, this.FocusTargetInternal?.GetTagId(), "(角色)当前选中的钩锁点有效");
        this.UpdateHookIconHighlightTag(true);
      } else {
        if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
          this.UpdateHookIconTag(false, undefined, "(角色)当前选中的钩锁点无效，且不需要等待切换技能");
        }
        this.UpdateHookIconHighlightTag(false);
      }
    } else {
      this.rrn = false;
      if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
        this.UpdateHookIconTag(false, undefined, "(角色)当前未选中点，且不需要等待切换技能");
      }
      this.UpdateHookIconHighlightTag(false);
    }
  }
  m5r(t) {
    let e = 0;
    switch (t) {
      case 0:
        e = GrapplingHookPointDefine_1.HOOK_VISION_ID;
        this.GKf = this.FKf;
        break;
      case 1:
        e = MANIPULATE_VISION_ID;
        this.qKf = this.OKf;
    }
    if (this.d5r(e)) {
      if ((t = ModelManager_1.ModelManager.ExploreModel).CheckNeedChangeSkill(e, 2)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] TryChangeSkill", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["NewSkill", e], ["Id", this.Entity.Id]);
        }
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e, undefined, true);
        t.AutoResetSkillFinished = false;
      }
      t.SetExploreSkillId(e, 2, "角色探索组件自动切换技能");
    }
  }
  n5r(t) {
    if (this.N4r) {
      this.m5r(0);
      this.NeedChangeTargetState = true;
    } else if (!this.G4r) {
      const e = ModelManager_1.ModelManager.ExploreModel;
      if (e.ExistAutoLayerSkill()) {
        if (this.C5r(t)) {
          if (t !== undefined) {
            switch (t) {
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
          e.ResetExplodeSkillId(2, "CheckExit");
          t = e.GetTopLayerExplodeSkillId();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] CheckExit", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["NewSkill", t], ["Id", this.Entity.Id]);
          }
          RouletteController_1.RouletteController.ExploreSkillSetRequest(t, t => {
            e.AutoResetSkillFinished = true;
          }, true);
          this.NeedChangeTargetState = true;
        }
      }
    }
  }
  d5r(t) {
    return ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(t);
  }
  C5r(t) {
    var e;
    return !!this.SkillComponent.CurrentSkill && (e = this.SkillComponent.CurrentSkill.SkillId, t === 0 && !!HOOK_SKILL_ID_MAP.has(e) || t === 1 && !!MANIPULATE_SKILL_ID_MAP.has(e));
  }
};
CharacterExploreComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(56)], CharacterExploreComponent);
exports.CharacterExploreComponent = CharacterExploreComponent; //# sourceMappingURL=CharacterExploreComponent.js.map