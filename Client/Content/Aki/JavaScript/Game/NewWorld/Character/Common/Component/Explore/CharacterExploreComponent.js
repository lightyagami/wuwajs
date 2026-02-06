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
    this.Jeg = undefined;
    this.k4r = false;
    this.Unu = undefined;
    this.Yyf = false;
    this.orn = true;
    this.rrn = false;
    this.N4r = false;
    this.G4r = false;
    this.Nlg = 0;
    this.Vlg = 0;
    this.Hlg = 0;
    this.jlg = 0;
    this.j4r = undefined;
    this.M6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.Yyf = true;
        this.HighlightLogic?.HideHighlightExploreSkill();
        this.OnExploreComponentDisable("主控角色进入载具");
      }
    };
    this.E6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.Yyf = false;
        this.OnExploreComponentEnable("主控角色离开载具");
      }
    };
    this.fHe = (t, e) => {
      if (!this.Yyf) {
        if (e?.Id === this.Entity.Id) {
          this.OnExploreComponentDisable("OnRoleGoDown");
        } else if (t.Id === this.Entity.Id) {
          this.OnExploreComponentEnable("OnRoleGoUp");
        }
      }
    };
    this.a7r = () => {
      var t;
      this.N4r = false;
      this.G4r = false;
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === GrapplingHookPointDefine_1.HOOK_VISION_ID) {
        if (this.rrn) {
          this.UpdateHookIconTag(true, this.FocusTarget?.GetTagId(), "切换到钩锁技能且NeedAddTag为真时, 添加定点钩索可用标签");
          this.UpdateHookIconHighlightTag(true, this.FocusTarget?.GetHighlightTagId());
        }
      } else if ((t = ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList)[t.length - 1] === GrapplingHookPointDefine_1.HOOK_VISION_ID) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 48, "请求切换钩锁中忽略目标清除");
        }
      } else {
        this.UpdateHookIconTag(false, undefined, "切换到非钩锁技能时，删除定点钩索可用标签");
        this.UpdateHookIconHighlightTag(false, undefined);
        if (this.FocusTarget) {
          this.FocusTarget.ChangeHookPointState(0);
          this.FocusTarget = undefined;
        }
      }
    };
    this.ttg = () => {
      if (this.FocusTarget && this.FocusTargetLegalExceptSkill) {
        if (this.jlg !== this.FocusTarget.Entity.Id) {
          this.jlg = this.FocusTarget.Entity.Id;
          this.N4r = true;
        }
      } else {
        this.N4r = false;
        this.jlg = 0;
        this.Hlg = 0;
        this.n5r(0);
      }
    };
    this.s5r = (t, e, i) => {
      if (!(this.k4r = i)) {
        if (t) {
          this.G4r = true;
          this.j4r = e.GetComponent(1);
          this.Vlg = e.Id;
        } else {
          this.G4r = false;
          this.j4r = undefined;
          this.Vlg = 0;
          this.Nlg = 0;
          this.n5r(1);
        }
      }
    };
    this.ene = (t, e) => {
      const i = ModelManager_1.ModelManager.ExploreModel;
      if (this.Unu.has(e)) {
        if (this.FocusTarget && this.FocusTargetLegalExceptSkill) {
          this.m5r(0);
        } else if (this.G4r) {
          this.m5r(1);
        } else {
          i.ResetExplodeSkillId(3, "OnCharSkillEnd");
          e = i.GetTopLayerExplodeSkillId();
          RouletteController_1.RouletteController.ExploreSkillSetRequest(e, t => {
            i.AutoResetSkillFinished = true;
            this.UpdateHookIconTag(false, undefined, "(角色)钩锁技能结束且当前选中钩锁点无效, 删除定点钩索可用标签");
          }, true);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] OnCharSkillEnd", ["FocusTarget", this.FocusTarget], ["FocusTargetLegalExceptSkill", this.FocusTargetLegalExceptSkill], ["ManipulateFound", this.G4r], ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["TopLayerSkillId", i.GetTopLayerExplodeSkillId()]);
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
    if ((this.orn = t) && this.FocusTarget) {
      this.FocusTarget.ChangeHookPointState(this.FocusTargetLegalExceptSkill ? 1 : 2);
    }
  }
  OnStart() {
    this.LogKey = "(角色)探索组件";
    super.OnStart();
    if (!this.CheckDisableComponent()) {
      this.yJl = this.Entity.GetComponent(70);
      this.SJl = this.Entity.GetComponent(71);
      this.Jeg = this.Entity.GetComponent(107);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    return true;
  }
  OnEnd() {
    super.OnEnd();
    if (!this.CheckDisableComponent()) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
      this.OnExploreComponentDisable("OnEnd");
    }
    return true;
  }
  CheckDisableComponent() {
    return !this.ActorComponent?.IsRoleAndCtrlByMe;
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
      this.Vlg = 0;
      this.Nlg = 0;
    }
    if (!this.FocusTarget?.Valid && this.N4r) {
      this.N4r = false;
      this.jlg = 0;
      this.Hlg = 0;
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
    if (this.N4r && this.jlg !== this.Hlg && this.FocusTargetLegalExceptSkill) {
      this.m5r(0);
      this.NeedChangeTargetState = true;
    } else if (this.G4r && this.Vlg !== this.Nlg) {
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
      e = this.FocusTarget.HookLocation;
      t = this.j4r.ActorLocationProxy;
      e = Vector_1.Vector.DistSquared(i, e);
      i = Vector_1.Vector.DistSquared(i, t);
      if (Math.abs(e - i) < Number.EPSILON || i < e) {
        if (this.Vlg !== this.Nlg) {
          this.m5r(1);
        }
        this.NeedChangeTargetState = false;
      } else {
        if (this.jlg !== this.Hlg && this.FocusTargetLegalExceptSkill) {
          this.m5r(0);
        }
        this.NeedChangeTargetState = true;
      }
    }
  }
  SetDataFromOldRole(t) {
    t = t.Entity.GetComponent(58);
    this.Yyf = t.Yyf;
    if (t.IsLockingTarget) {
      this.ForceLockTarget(t.FocusTarget, "上场角色继承下场角色锁定目标");
    } else {
      this.FocusTarget = t.FocusTarget;
      this.FocusTargetLegal = t.FocusTargetLegal;
    }
    this.PendingHighlightSkill = t.PendingHighlightSkill;
    if (t.HighlightLogic) {
      this.HighlightLogic = t.HighlightLogic;
      t.HighlightLogic = undefined;
      this.HighlightLogic?.Init(this);
    } else {
      this.InitHighlightHandle();
    }
    if (t.CurrentIconTagId) {
      this.UpdateHookIconTag(true, t.CurrentIconTagId, "上场角色继承下场角色Tag");
    }
    if (t.CurrentIconHighlightTagId) {
      this.UpdateHookIconHighlightTag(true, t.CurrentIconHighlightTagId);
    }
  }
  OnDetectedTargetChanged(t, e) {
    if (this.FocusTarget !== t || e !== this.FocusTargetLegal) {
      if (t?.Valid && t !== this.FocusTarget) {
        t.ChangeHookPointState(0);
      }
      if (this.FocusTarget?.Valid && this.NeedChangeTargetState) {
        this.FocusTarget.ChangeHookPointState(this.FocusTargetLegalExceptSkill ? 1 : 2);
      }
      this.ttg();
      if (this.FocusTarget !== undefined && this.FocusTargetLegalExceptSkill) {
        if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== GrapplingHookPointDefine_1.HOOK_VISION_ID) {
          this.rrn = true;
        } else if (this.FocusTargetLegal) {
          this.UpdateHookIconTag(true, this.FocusTarget?.GetTagId(), "(角色)当前选中的钩锁点有效");
          this.UpdateHookIconHighlightTag(true, this.FocusTarget?.GetHighlightTagId());
        } else {
          if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
            this.UpdateHookIconTag(false, undefined, "(角色)当前选中的钩锁点无效，且不需要等待切换技能");
          }
          this.UpdateHookIconHighlightTag(false, undefined);
        }
      } else {
        this.rrn = false;
        if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
          this.UpdateHookIconTag(false, undefined, "(角色)当前未选中点，且不需要等待切换技能");
        }
        this.UpdateHookIconHighlightTag(false, undefined);
      }
      this.Jeg.OnDetectedTargetChanged();
    }
  }
  m5r(t) {
    let e = 0;
    switch (t) {
      case 0:
        e = GrapplingHookPointDefine_1.HOOK_VISION_ID;
        this.Hlg = this.jlg;
        break;
      case 1:
        e = MANIPULATE_VISION_ID;
        this.Nlg = this.Vlg;
    }
    if (this.d5r(e)) {
      if ((t = ModelManager_1.ModelManager.ExploreModel).CheckNeedChangeSkill(e, 3)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] TryChangeSkill", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["NewSkill", e], ["Id", this.Entity.Id]);
        }
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e, undefined, true);
        t.AutoResetSkillFinished = false;
      }
      t.SetExploreSkillId(e, 3, "角色探索组件自动切换技能");
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
          e.ResetExplodeSkillId(3, "CheckExit");
          t = e.GetTopLayerExplodeSkillId();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Character", 79, "[CharacterExploreComponent] CheckExit", ["OldSkill", ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId], ["NewSkill", t], ["Id", this.Entity.Id]);
          }
          RouletteController_1.RouletteController.ExploreSkillSetRequest(t, t => {
            e.AutoResetSkillFinished = true;
          }, true);
          this.NeedChangeTargetState = true;
        }
      } else {
        e.AutoResetSkillFinished = true;
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
CharacterExploreComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(58)], CharacterExploreComponent);
exports.CharacterExploreComponent = CharacterExploreComponent; //# sourceMappingURL=CharacterExploreComponent.js.map