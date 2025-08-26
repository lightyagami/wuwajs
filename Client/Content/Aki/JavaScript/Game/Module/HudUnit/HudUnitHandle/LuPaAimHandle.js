"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LuPaAimHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LuPaAimUnit_1 = require("../HudUnit/LuPaAimUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const BUFF_ID = 12076110101;
class LuPaAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.roi = false;
    this.noi = undefined;
    this.rqo = undefined;
    this.oXe = false;
    this.m1t = undefined;
    this.bst = undefined;
    this.p2a = 0;
    this.m7c = undefined;
    this.xie = () => {
      this.uoi();
    };
    this.f7c = t => {
      this.m7c = t;
      this.wke();
    };
    this.xp1 = (t, i) => {
      this.oXe = i;
      if (this.oXe) {
        this.foi();
      } else {
        this.Up1();
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.uoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, this.f7c);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, this.f7c);
  }
  Up1() {
    if (this.noi) {
      this.noi.SetTargetVisible(this.oXe);
    }
  }
  wke() {
    if (this.noi) {
      if (this.m7c?.Valid) {
        this.noi.SetLockState(true);
      } else {
        this.noi.SetLockState(false);
      }
    }
  }
  uoi() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t?.CreatureRoleId !== 1207) {
      this.poi();
    } else {
      this.rqo = t.GameplayTagComponent.ListenForTagAddOrRemove(-307383857, this.xp1);
      this.oXe = t.GameplayTagComponent.HasTag(-307383857);
      this.m1t = t.BuffComponent;
      if (this.oXe) {
        this.foi();
      }
    }
  }
  foi() {
    if (this.noi) {
      this.Up1();
    } else if (!this.roi) {
      this.roi = true;
      this.NewHudUnit(LuPaAimUnit_1.LuPaAimUnit, "UiItem_AimLuPa").then(t => {
        this.noi = t;
        this.Up1();
        this.wke();
      }).finally(() => {
        this.roi = false;
      });
    }
  }
  poi() {
    if (this.rqo) {
      this.rqo.EndTask();
      this.rqo = undefined;
    }
    this.m1t = undefined;
    this.oXe = false;
    this.m7c = undefined;
    this.Up1();
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.oXe && this.noi && this.m1t && (this.bst && this.m1t?.GetBuffByHandle(this.p2a) || (this.bst = this.m1t?.GetBuffById(BUFF_ID), this.p2a = this.bst?.Handle ?? 0), this.bst) && this.bst.Duration > 0) {
      this.noi.SetProgress(this.bst.GetRemainDuration() / this.bst.Duration);
    }
  }
}
exports.LuPaAimHandle = LuPaAimHandle;
//# sourceMappingURL=LuPaAimHandle.js.map