"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceStrengthHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../Abilities/FormationAttributeController");
const MigrationStrengthUnit_1 = require("../HudUnit/MigrationStrengthUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class RaceStrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.VisibleTagId = 0;
    this.SpeedUpTagId = 0;
    this.FormationAttributeId = 8;
    this.StrengthUnit = undefined;
    this.RoleData = undefined;
    this.TagTaskList = [];
    this.IsVisible = false;
    this.IsSpeedUp = false;
    this.xie = () => {
      this.Ake(ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData());
    };
    this.zpe = (t, i) => {
      if (this.RoleData?.EntityHandle === i) {
        this.m$e();
      }
    };
    this.VGa = (t, i) => {
      this.IsVisible = i;
      this.HGa();
    };
    this.jGa = (t, i) => {
      this.IsSpeedUp = i;
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.InitTagAndAttributeId();
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t) {
      this.Ake(t);
    }
  }
  InitTagAndAttributeId() {
    this.FormationAttributeId = 8;
    this.VisibleTagId = -640833006;
    this.SpeedUpTagId = -1220261351;
  }
  Ake(t) {
    this.m$e();
    if (t && t.EntityHandle?.Valid) {
      this.RoleData = t;
      this.StrengthUnit?.RefreshEntity(t);
      this.c$e();
      this.IsVisible = this.RoleData.GameplayTagComponent.HasTag(this.VisibleTagId);
      this.IsSpeedUp = this.RoleData.GameplayTagComponent.HasTag(this.SpeedUpTagId);
      this.HGa();
    } else {
      this.RoleData = undefined;
      this.StrengthUnit?.RefreshEntity(undefined);
      this.StrengthUnit?.SetVisible(false);
    }
  }
  HGa() {
    if (this.IsVisible) {
      this.WGa();
    } else {
      this.StrengthUnit?.SetVisible(false);
    }
  }
  WGa() {
    this.StrengthUnit ||= this.NewHudUnitWithReturn(MigrationStrengthUnit_1.MigrationStrengthUnit, "UiItem_EnduranceB", false, () => {
      if (this.StrengthUnit) {
        this.StrengthUnit.InitData(4);
        this.StrengthUnit.RefreshEntity(this.RoleData);
        this.xni();
      }
    });
    this.StrengthUnit.SetVisible(true);
  }
  OnDestroyed() {
    super.OnDestroyed();
    this.StrengthUnit = undefined;
    this.Ake(undefined);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  c$e() {
    this.mdt(this.VisibleTagId, this.VGa);
    this.mdt(this.SpeedUpTagId, this.jGa);
    if (this.RoleData?.EntityHandle) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.RoleData.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  m$e() {
    for (const t of this.TagTaskList) {
      t?.EndTask();
    }
    this.TagTaskList.length = 0;
    if (this.RoleData?.EntityHandle) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.RoleData?.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  mdt(t, i) {
    t = this.RoleData.GameplayTagComponent.ListenForTagAddOrRemove(t, i);
    if (t) {
      this.TagTaskList.push(t);
    }
  }
  xni() {
    var t = FormationAttributeController_1.FormationAttributeController.GetValue(this.FormationAttributeId);
    var i = FormationAttributeController_1.FormationAttributeController.GetMax(this.FormationAttributeId);
    this.StrengthUnit.SetStrengthPercent(t, i);
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.IsVisible && this.StrengthUnit && this.StrengthUnit.IsShowOrShowing) {
      this.StrengthUnit.RefreshTargetPosition(t);
      this.StrengthUnit.SetRecoverState(this.IsSpeedUp);
      this.xni();
      this.StrengthUnit.TickRecoverAnim(t);
    }
  }
}
exports.RaceStrengthHandle = RaceStrengthHandle;
//# sourceMappingURL=RaceStrengthHandle.js.map