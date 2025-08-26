"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonUiController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Stats_1 = require("../../../Core/Common/Stats");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class SkillButtonUiController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnClear() {
    this.wjc.clear();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowTypeChange, this.lEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMultiSkillIdChanged, this.Uyo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMultiSkillEnable, this.Ayo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.OJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharSkillCountChanged, this.Pyo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharSkillRemainCdChanged, this.xyo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAimStateChanged, this.Pet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, this.Pet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleInputEnableChanged, this.Kaa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleInputVisibleChanged, this.$aa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, this.HRn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.mDn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.dDn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
    InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.通用交互, this.qah);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowTypeChange, this.lEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMultiSkillIdChanged, this.Uyo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMultiSkillEnable, this.Ayo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.OJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillCountChanged, this.Pyo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillRemainCdChanged, this.xyo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAimStateChanged, this.Pet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, this.Pet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleInputEnableChanged, this.Kaa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleInputVisibleChanged, this.$aa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, this.HRn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.mDn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.dDn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.组合主键, this.RZe);
    InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.通用交互, this.qah);
  }
  static wyo(e, t = 4) {
    var n = Info_1.Info.OperationType === 2;
    ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonData(e, n, t);
  }
  static GetRoleId(e) {
    var e = e.GetComponent(0);
    if (e) {
      e = e.GetRoleId();
      return ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e);
    } else {
      return 0;
    }
  }
  static AddEventInterface(e) {
    if (e) {
      this.wjc.add(e);
    }
  }
  static RemoveEventInterface(e) {
    if (e) {
      this.wjc.delete(e);
    }
  }
}
exports.SkillButtonUiController = SkillButtonUiController;
(_a = SkillButtonUiController).kQe = Stats_1.Stat.Create("[ChangeRole]SkillButtonUiController");
SkillButtonUiController.wjc = new Set();
SkillButtonUiController.Uyo = (e, t, n) => {
  ModelManager_1.ModelManager.SkillButtonUiModel.ExecuteMultiSkillIdChanged(e, t, n);
};
SkillButtonUiController.Ayo = (e, t, n) => {
  ModelManager_1.ModelManager.SkillButtonUiModel.ExecuteMultiSkillEnable(e, t, n);
};
SkillButtonUiController.xie = (e, t) => {
  SkillButtonUiController.kQe.Start();
  SkillButtonUiController.wyo(e, 1);
  SkillButtonUiController.kQe.Stop();
};
SkillButtonUiController.kpe = () => {
  ModelManager_1.ModelManager.SkillButtonUiModel.CheckAndRemoveInvalidEntityData();
  ModelManager_1.ModelManager.SkillButtonUiModel.CreateAllSkillButtonEntityData();
};
SkillButtonUiController.lEa = () => {
  ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonIndexOnOperationTypeChanged();
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e) {
    SkillButtonUiController.wyo(e);
  }
};
SkillButtonUiController.zpe = (e, t) => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnRemoveEntity(t);
};
SkillButtonUiController.OJe = () => {
  var e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
  if (ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e)?.SkillType !== 5) {
    ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonExplorePhantomSkillId(7);
  }
  for (const t of _a.wjc) {
    t.EquipExplorePhantomSkill?.();
  }
};
SkillButtonUiController.Pyo = e => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnSkillCdChanged(e);
  for (const t of _a.wjc) {
    t.SkillCountChanged?.(e);
  }
};
SkillButtonUiController.xyo = e => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnSkillCdChanged(e);
  for (const t of _a.wjc) {
    t.SkillRemainCdChanged?.(e);
  }
};
SkillButtonUiController.Pet = () => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnAimStateChanged();
};
SkillButtonUiController.Dut = e => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnActionKeyChanged(e);
};
SkillButtonUiController.Kaa = (e, t) => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnInputEnableChanged(e, t);
};
SkillButtonUiController.HRn = e => {
  ModelManager_1.ModelManager.SkillButtonUiModel.SkillButtonFormationData?.RefreshOnFollowerAimStateChange(e);
};
SkillButtonUiController.$aa = (e, t) => {
  ModelManager_1.ModelManager.SkillButtonUiModel.OnInputVisibleChanged(e, t);
};
SkillButtonUiController.mDn = e => {
  ModelManager_1.ModelManager.SkillButtonUiModel.CreateSkillButtonFollowerEntityData(e);
};
SkillButtonUiController.dDn = () => {
  ModelManager_1.ModelManager.SkillButtonUiModel.ClearSkillButtonFollowerEntityData();
};
SkillButtonUiController.M6l = e => {
  e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.VehicleEntity?.Id ?? 0);
  if (e?.Valid) {
    ModelManager_1.ModelManager.SkillButtonUiModel.CreateSkillButtonVehicleEntityData(e);
  }
};
SkillButtonUiController.E6l = e => {
  ModelManager_1.ModelManager.SkillButtonUiModel.ClearSkillButtonVehicleEntityData();
};
SkillButtonUiController.FQe = e => {
  if (e === "MenuView") {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(0);
  }
};
SkillButtonUiController.$Ge = e => {
  if (e === "MenuView") {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(0);
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshSwitchInteractOpen();
  }
};
SkillButtonUiController.RZe = (e, t) => {
  t = t === 0;
  ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.SetIsPressCombineButton(t);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiPressCombineButtonChanged, t);
};
SkillButtonUiController.qah = (e, t) => {
  t = t === 0;
  ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.SwitchInteractData.InputInteractButton(t);
}; //# sourceMappingURL=SkillButtonUiController.js.map