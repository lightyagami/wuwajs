"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonUiModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const SkillButtonTextAll_1 = require("../../../Core/Define/ConfigQuery/SkillButtonTextAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SkillButtonEntityData_1 = require("./SkillButtonEntityData");
const SkillButtonFollowerEntityData_1 = require("./SkillButtonFollowerEntityData");
const SkillButtonFormationData_1 = require("./SkillButtonFormationData");
const SkillButtonIndexData_1 = require("./SkillButtonIndexData");
const SkillButtonUiGamepadData_1 = require("./SkillButtonUiGamepadData");
const SkillButtonUiMotorcycleGamepadData_1 = require("./SkillButtonUiMotorcycleGamepadData");
const SkillButtonVehicleEntityData_1 = require("./SkillButtonVehicleEntityData");
class SkillButtonUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.SkillPriorityButtonConfigMap = new Map();
    this._Io = new Map();
    this.uIo = undefined;
    this.SkillButtonFormationData = undefined;
    this.Gxa = undefined;
    this.m3_ = undefined;
    this.DefaultSkillButtonIndexData = undefined;
    this.OtherSkillButtonIndexData = undefined;
    this.CurSkillButtonIndexData = undefined;
    this.SkillButtonRotationRate = 0;
    this.Feh = undefined;
    this.GamepadDataMap = new Map();
    this.mIo = undefined;
    this.gU = false;
  }
  get GamepadData() {
    if (!this.Feh) {
      if (this.gU && !Info_1.Info.IsInTouch()) {
        this.Uhf();
      }
    }
    return this.Feh;
  }
  OnInit() {
    this.SkillButtonRotationRate = CommonParamById_1.configCommonParamById.GetFloatConfig("SkillButtonRotationRate");
    this.SkillButtonFormationData = new SkillButtonFormationData_1.SkillButtonFormationData();
    this.SkillButtonFormationData.Init();
    this.SkillPriorityButtonConfigMap.clear();
    for (const e of ConfigManager_1.ConfigManager.SkillButtonConfig.GetAllSkillPriorityButtonConfig()) {
      this.SkillPriorityButtonConfigMap.set(e.ButtonType, e);
    }
    if (!Info_1.Info.IsInTouch()) {
      this.Uhf();
    }
    var t = Info_1.Info.OperationType === 2;
    var i = ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillIndexConfig(0);
    this.DefaultSkillButtonIndexData = new SkillButtonIndexData_1.SkillButtonIndexData();
    this.DefaultSkillButtonIndexData.UpdateSkillButtonIndexConfig(i, t);
    this.DefaultSkillButtonIndexData.InitMotorPadSkillButtonIndexConfig();
    this.OtherSkillButtonIndexData = new SkillButtonIndexData_1.SkillButtonIndexData();
    this.CurSkillButtonIndexData = this.DefaultSkillButtonIndexData;
    return this.gU = true;
  }
  OnClear() {
    this.SkillButtonFormationData?.Clear();
    this.SkillButtonFormationData = undefined;
    this.ClearAllSkillButtonEntityData();
    this.ClearSkillButtonFollowerEntityData();
    this.ClearSkillButtonVehicleEntityData();
    this.Feh?.Clear();
    this.Feh = undefined;
    this.gU = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonDataClear);
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  Uhf() {
    this.ChangeGamepadData(0, false);
  }
  ChangeGamepadData(t, i = 0) {
    if (this.GamepadDataMap.has(t)) {
      this.Feh = this.GamepadDataMap.get(t);
    } else {
      this.Feh = new (t === 1 ? SkillButtonUiMotorcycleGamepadData_1.SkillButtonUiMotorcycleGamepadData : SkillButtonUiGamepadData_1.SkillButtonUiGamepadData)();
      this.Feh.Init();
      this.GamepadDataMap.set(t, this.Feh);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiGamepadDataChanged);
  }
  GetSkillButtonEntityData(t) {
    return this._Io.get(t);
  }
  CheckAndRemoveInvalidEntityData() {
    for (const t of this._Io.values()) {
      if (t.EntityHandle && !t.EntityHandle.Valid) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 17, "技能按钮数据有非法的实体, 执行清理", ["EntityHandleId", t.EntityHandle?.Id]);
        }
        this.OnRemoveEntity(t.EntityHandle);
      }
    }
  }
  CreateAllSkillButtonEntityData() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      if (i === t) {
        this.uIo = this.CreateSkillButtonEntityData(i, true);
      } else {
        this.CreateSkillButtonEntityData(i, false);
      }
    }
  }
  CreateSkillButtonEntityData(t, i) {
    var e = t.Entity.Id;
    let n = this._Io.get(e);
    if (n) {
      if (n.IsCurEntity !== i) {
        n.OnChangeRole(i);
      }
    } else {
      (n = new SkillButtonEntityData_1.SkillButtonEntityData()).Init(t, i);
      this._Io.set(e, n);
    }
    return n;
  }
  ClearAllSkillButtonEntityData() {
    for (const t of this._Io.values()) {
      t.Clear();
    }
    this._Io.clear();
    this.uIo = undefined;
  }
  CreateSkillButtonFollowerEntityData(t) {
    var i = ModelManager_1.ModelManager.BattleUiModel?.FormationData?.GetFollowerEnable() ?? false;
    if (this.Gxa) {
      if (this.Gxa.EntityHandle === t) {
        if (this.Gxa.IsEnable !== i) {
          this.Gxa.SetEnable(i);
        }
        return;
      }
      this.Gxa.Clear();
      this.Gxa = undefined;
    }
    this.Gxa = new SkillButtonFollowerEntityData_1.SkillButtonFollowerEntityData();
    this.Gxa.Init(t, i);
  }
  ClearSkillButtonFollowerEntityData() {
    if (this.Gxa) {
      if (this.Gxa.IsEnable) {
        this.Gxa.SetEnable(false);
      }
      this.Gxa.Clear();
      this.Gxa = undefined;
    }
  }
  CreateSkillButtonVehicleEntityData(t) {
    this.ClearSkillButtonVehicleEntityData();
    this.m3_ = new SkillButtonVehicleEntityData_1.SkillButtonVehicleEntityData();
    this.m3_.Init(t);
    this.Feh?.RefreshSkillButtonData(2);
  }
  ClearSkillButtonVehicleEntityData() {
    if (this.m3_) {
      this.m3_.Clear();
      this.m3_ = undefined;
    }
    this.Feh?.RefreshSkillButtonData(2);
    this.uIo?.RefreshSkillButtonData(2);
  }
  OnRemoveEntity(t) {
    var i = this._Io.get(t.Id);
    if (i && (this._Io.delete(t.Id), i.Clear(), i === this.uIo)) {
      this.uIo = undefined;
    }
    if (this.uIo === i) {
      this.uIo = undefined;
    }
    if (this.Gxa?.EntityHandle === t) {
      this.ClearSkillButtonFollowerEntityData();
    }
  }
  RefreshSkillButtonData(i, t, e) {
    if (e === 0) {
      this.ClearAllSkillButtonEntityData();
      this.CreateAllSkillButtonEntityData();
    }
    if (e === 1) {
      let t = false;
      for (const o of this._Io.values()) {
        if (i === o.EntityHandle) {
          o.OnChangeRole(true);
          this.uIo = o;
          t = true;
        } else {
          o.OnChangeRole(false);
        }
      }
      if (!t) {
        this.uIo = this.CreateSkillButtonEntityData(i, true);
      }
    }
    var n = this.uIo.SkillButtonIndexConfig;
    if (n) {
      if (n.Id === 0) {
        this.CurSkillButtonIndexData = this.DefaultSkillButtonIndexData;
      } else {
        this.OtherSkillButtonIndexData.UpdateSkillButtonIndexConfig(n, t);
        this.CurSkillButtonIndexData = this.OtherSkillButtonIndexData;
      }
    }
    this.CurSkillButtonIndexData.RefreshSkillButtonIndex(i);
    this.CurSkillButtonIndexData.RefreshMotorPadSkillButtonIndex(i, ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.GetIsRoundJoystick());
    this.Feh?.RefreshSkillButtonData(e);
    this.uIo.RefreshSkillButtonData(e);
  }
  RefreshSkillButtonExplorePhantomSkillId(t) {
    for (const i of this._Io.values()) {
      i.RefreshSkillButtonExplorePhantomSkillId(t);
    }
    this.m3_?.RefreshSkillButtonExplorePhantomSkillId(t);
  }
  GetSkillButtonIndexByButton(t) {
    return this.GetButtonTypeList().indexOf(t);
  }
  GetButtonTypeList() {
    return this.CurSkillButtonIndexData?.ButtonTypeList ?? [];
  }
  RefreshSkillButtonIndexByTag(t, i, e, n) {
    if (t.Id === this.CurSkillButtonIndexData?.ButtonIndexConfigId) {
      if (n && this.CurSkillButtonIndexData.IsNormalButtonTypeList && !this.CurSkillButtonIndexData.ButtonIndexTagIdSet.has(e)) {
        this.CurSkillButtonIndexData.RefreshSkillButtonIndexByTag(i, e);
      } else {
        this.CurSkillButtonIndexData.RefreshSkillButtonIndex(i);
      }
    }
  }
  RefreshMotorPadSkillButtonIndexOnJoystickChange(t) {
    var i = this.uIo?.EntityHandle;
    if (i) {
      this.CurSkillButtonIndexData?.RefreshMotorPadSkillButtonIndex(i, t);
    }
    this.uIo?.MarkMotorPadSkillIndexChanged();
  }
  RefreshSkillButtonIndexOnOperationTypeChanged() {
    var t = Info_1.Info.OperationType === 2;
    this.CurSkillButtonIndexData.UpdateSkillButtonIndexConfig(this.CurSkillButtonIndexData.ButtonIndexConfig, t);
    if (this.DefaultSkillButtonIndexData !== this.uIo) {
      this.DefaultSkillButtonIndexData.UpdateSkillButtonIndexConfig(this.DefaultSkillButtonIndexData.ButtonIndexConfig, t);
    }
  }
  GetMotorPadSkillButtonIndexByButton(t) {
    return this.GetMotorPadButtonTypeList().indexOf(t);
  }
  GetMotorPadButtonTypeList() {
    return this.CurSkillButtonIndexData?.MotorPadButtonTypeList ?? [];
  }
  RefreshMotorPadSkillButtonIndex(t, i) {
    if (t.Id === this.CurSkillButtonIndexData?.ButtonIndexConfigId) {
      this.CurSkillButtonIndexData.RefreshMotorPadSkillButtonIndex(i, this.CurSkillButtonIndexData.IsRoundJoystick);
    }
  }
  ExecuteMultiSkillIdChanged(t, i, e) {
    this._Io.get(t)?.ExecuteMultiSkillIdChanged(i, e);
  }
  ExecuteMultiSkillEnable(t, i, e) {
    this._Io.get(t)?.ExecuteMultiSkillEnable(i, e);
  }
  OnSkillCdChanged(t) {
    for (const e of t.EntityIds) {
      if (e === this.m3_?.EntityHandle?.Id) {
        for (const n of t.SkillCdInfoMap.keys()) {
          this.m3_.RefreshSkillCd(n);
        }
      } else if (e === this.Gxa?.EntityHandle?.Id) {
        for (const o of t.SkillCdInfoMap.keys()) {
          this.Gxa.RefreshSkillCd(o);
        }
      } else {
        var i = this._Io.get(e);
        if (i) {
          for (const s of t.SkillCdInfoMap.keys()) {
            i.RefreshSkillCd(s);
          }
        }
      }
    }
  }
  OnAimStateChanged() {
    this.xet();
    if (this.GamepadData?.RefreshAimState()) {
      this.uIo?.RefreshSkillButtonData(4);
    }
  }
  xet() {
    this.uIo?.RefreshBehaviorButtonState();
  }
  OnActionKeyChanged(t) {
    this.GamepadData?.OnActionKeyChanged(t);
  }
  OnInputEnableChanged(t, i) {
    for (const e of this._Io.values()) {
      e.RefreshEnableByInputEvent(t, i);
    }
    this.Gxa?.RefreshEnableByInputEvent(t, i);
    this.m3_?.RefreshEnableByInputEvent(t, i);
  }
  OnInputVisibleChanged(t, i) {
    for (const e of this._Io.values()) {
      e.RefreshVisibleByInputEvent(t, i);
    }
    this.Gxa?.RefreshVisibleByInputEvent(t, i);
    this.m3_?.RefreshVisibleByInputEvent(t, i);
  }
  RefreshEnableByButtonType(t) {
    for (const i of this._Io.values()) {
      i.RefreshEnableByButtonType(t);
    }
    this.Gxa?.RefreshEnableByButtonType(t);
    this.m3_?.RefreshEnableByButtonType(t);
  }
  RefreshVisibleByButtonType(t) {
    for (const i of this._Io.values()) {
      i.RefreshVisibleByButtonType(t);
    }
    this.Gxa?.RefreshVisibleByButtonType(t);
    this.m3_?.RefreshVisibleByButtonType(t);
  }
  GetCurSkillButtonEntityData() {
    return this.uIo;
  }
  GetAllSkillButtonEntityData() {
    return this._Io.values();
  }
  GetSkillButtonDataByButton(t) {
    if (this.Gxa?.IsEnable) {
      var i = this.Gxa.GetSkillButtonDataByButton(t);
      if (i?.IsOccupy()) {
        return i;
      }
    }
    if (this.m3_) {
      i = this.m3_.GetSkillButtonDataByButton(t);
      if (i) {
        return i;
      }
    }
    return this.uIo?.GetSkillButtonDataByButton(t);
  }
  GetBehaviorButtonDataByButton(t) {
    return this.uIo?.GetBehaviorButtonDataByButton(t);
  }
  GetCurRoleConfig() {
    return this.uIo?.RoleConfig;
  }
  GetSkillNameBySkillId(t) {
    this.dIo();
    return this.mIo.get(t);
  }
  dIo() {
    if (!this.mIo) {
      this.mIo = new Map();
      var t = SkillButtonTextAll_1.configSkillButtonTextAll.GetConfigList();
      if (t) {
        for (const i of t) {
          this.mIo.set(i.Id, i.Name);
        }
      }
    }
  }
  GetCurSkillButtonFollowerEntityData() {
    return this.Gxa;
  }
  RefreshVisibleByBehaviorType(t) {
    for (const i of this._Io.values()) {
      i.RefreshVisibleByBehaviorType(t);
    }
  }
  GetGamepadDataByType(t) {
    return this.GamepadDataMap.get(t);
  }
  OnInputControllerChange(t, i) {
    for (const e of this._Io.values()) {
      e.OnInputControllerChange(t, i);
    }
  }
}
exports.SkillButtonUiModel = SkillButtonUiModel;
//# sourceMappingURL=SkillButtonUiModel.js.map