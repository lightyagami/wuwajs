"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
        s = (i < 3 ? n(s) : i > 3 ? n(t, o, s) : n(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDebugComponent = undefined;
const cpp_1 = require("cpp");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../../Module/Abilities/FormationDataController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const LogController_1 = require("../../../../../World/Controller/LogController");
const DELAY_TIME = 5000;
const CHECK_TIME = 100;
let MonsterDebugComponent = class MonsterDebugComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.HFt = 0;
    this.PAf = false;
    this.AAf = false;
    this.j3 = undefined;
    this.DAf = false;
    this.wK = false;
    this.SUf = e => {
      if (!!this.Entity.Active && ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id === e && !this.PAf) {
        if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
          this.wK = true;
        }
        this.tWr();
        this.PAf = true;
      }
    };
    this.Dca = () => {
      this.AAf = true;
    };
    this.Zpe = e => {
      if (e) {
        this.wK = true;
      }
    };
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.MonsterDebug, this.SUf);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeDamage, this.Dca);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    return true;
  }
  OnTick(e) {
    if (this.PAf && !this.DAf) {
      this.HFt += e;
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.MonsterDebug, this.SUf);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeDamage, this.Dca);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    this.BCe();
    return true;
  }
  tWr() {
    this.j3 = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
      this.BCe();
      var e = this.Entity?.GameBudgetManagedToken;
      if (this.HFt <= CHECK_TIME) {
        this.DAf = true;
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "怪物状态出问题了！不Tick！", ["TimeCount", this.HFt], ["DebugInfo", LogController_1.LogController.OutputDebugInfo(false)], ["location", this.Entity?.GetComponent(1)?.ActorLocationProxy], ["centerRoleLocation", GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole?.K2_GetActorLocation()], ["centerOffset", GameBudgetInterfaceController_1.GameBudgetInterfaceController.GetCenterOffset()], ["debugStr", e ? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(e) : undefined]);
      }
      if (!this.AAf) {
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "怪物状态出问题了！没有伤害结算！", ["DebugInfo", LogController_1.LogController.OutputDebugInfo(false)], ["location", this.Entity?.GetComponent(1)?.ActorLocationProxy], ["centerRoleLocation", GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole?.K2_GetActorLocation()], ["centerOffset", GameBudgetInterfaceController_1.GameBudgetInterfaceController.GetCenterOffset()], ["debugStr", e ? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(e) : undefined]);
      }
      if (!this.wK) {
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "怪物状态出问题了！没有进入战斗状态！", ["TimeCount", this.HFt], ["DebugInfo", LogController_1.LogController.OutputDebugInfo(false)], ["location", this.Entity?.GetComponent(1)?.ActorLocationProxy], ["centerRoleLocation", GameBudgetInterfaceController_1.GameBudgetInterfaceController.CenterRole?.K2_GetActorLocation()], ["centerOffset", GameBudgetInterfaceController_1.GameBudgetInterfaceController.GetCenterOffset()], ["debugStr", e ? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(e) : undefined]);
      }
    }, DELAY_TIME);
  }
  BCe() {
    if (TimerSystem_1.FlowTimeTimerSystem.Has(this.j3)) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
};
MonsterDebugComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(193)], MonsterDebugComponent);
exports.MonsterDebugComponent = MonsterDebugComponent; //# sourceMappingURL=MonsterDebugComponent.js.map