"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiMotorcycleData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../Activity/ActivityControllerHolder");
const padHideChildren = [9, 12];
const padHideChildrenInRoundJoystick = [9, 39];
const nitrogenTagIds = [735065266, -105723823];
const parkourTagId = -1954349972;
const firstPersonTagId = -1636232993;
const hideHudTag = -433141728;
class BattleUiMotorcycleData {
  constructor() {
    this.yx_ = false;
    this.yEl = 0;
    this.Vef = true;
    this.AXe = false;
    this.g8g = false;
    this.IsPressJoyStick = false;
    this.MotorcycleEntityId = 0;
    this.MotorcycleEntityHandle = undefined;
    this.MotorcycleTagComponent = undefined;
    this.G6f = [];
    this.F6f = false;
    this.N6f = false;
    this.J7f = false;
    this.w_g = false;
    this.V6f = false;
    this.HFf = false;
    this.jFf = false;
    this.e5f = false;
    this.H6f = new Set();
    this.HudColorState = 0;
    this.IsNeedCacheUi = false;
    this.DebugLog = false;
    this.j6f = (t, e) => {
      this.F6f = e;
      this.$6f();
    };
    this.W6f = (t, e) => {
      this.N6f = e;
      this.$6f();
    };
    this.Z7f = (t, e) => {
      this.J7f = e;
    };
    this.P_g = (t, e) => {
      this.w_g = e;
      this.SetHudVisible(!this.w_g, "HideHudTag");
    };
  }
  Init() {
    this.yEl = Info_1.Info.OperationType;
  }
  Clear() {
    if (this.IsDriving) {
      this.LeaveVehicle();
    }
    this.H6f.clear();
  }
  get IsDriving() {
    return this.yx_;
  }
  set IsDriving(t) {
    if (this.yx_ !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "战斗Ui切换摩托车驾驶状态", ["是否驾驶中", t]);
      }
      this.yx_ = t;
      this.Hef(!t);
      ModelManager_1.ModelManager.SkillButtonUiModel.ChangeGamepadData(t ? 1 : 0);
      ModelManager_1.ModelManager.SkillButtonUiModel.RefreshVisibleByBehaviorType(101);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.yx_);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshInputData, "驾驶摩托车状态改变");
    }
  }
  EnterVehicle(t) {
    this.MotorcycleEntityId = t.VehicleEntity?.Id ?? 0;
    this.MotorcycleEntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MotorcycleEntityId);
    if (this.MotorcycleEntityHandle?.Valid) {
      this.MotorcycleTagComponent = this.MotorcycleEntityHandle.Entity.GetComponent(217);
    }
    this.V6f = ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController?.CheckInMotorParkourDungeon() ?? false;
    if (this.MotorcycleTagComponent) {
      for (const e of nitrogenTagIds) {
        this.mdt(this.MotorcycleTagComponent, e, this.j6f);
      }
      if (this.V6f) {
        this.mdt(this.MotorcycleTagComponent, parkourTagId, this.W6f);
      }
      this.mdt(this.MotorcycleTagComponent, firstPersonTagId, this.Z7f);
      this.mdt(this.MotorcycleTagComponent, hideHudTag, this.P_g);
    }
    this.IsDriving = true;
  }
  LeaveVehicle(t) {
    this.MotorcycleEntityId = 0;
    this.MotorcycleEntityHandle = undefined;
    this.MotorcycleTagComponent = undefined;
    for (const e of this.G6f) {
      e.EndTask();
    }
    this.G6f.length = 0;
    this.F6f = false;
    this.N6f = false;
    this.J7f = false;
    this.w_g = false;
    this.IsDriving = false;
  }
  mdt(t, e, i) {
    var s = t.ListenForTagAddOrRemove(e, i);
    if (s) {
      this.G6f.push(s);
    }
    i(e, t.HasTag(e));
  }
  $6f() {
    var t = this.HudColorState;
    if (this.N6f && this.V6f) {
      this.HudColorState = 2;
    } else if (this.F6f) {
      this.HudColorState = 1;
    } else {
      this.HudColorState = 0;
    }
    if (t !== this.HudColorState) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.HudColorState);
    }
  }
  ShowTypeChange(t, e) {
    if (e !== 0 && this.yEl !== e) {
      if (this.IsDriving) {
        this.Hef(true);
        this.yEl = e;
        this.Hef(false);
      } else {
        this.yEl = e;
      }
    }
  }
  Hef(t) {
    if (this.yEl === 1) {
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(16, this.g8g ? padHideChildrenInRoundJoystick : padHideChildren, t);
    }
  }
  get IsShowBulletJumpLeftClick() {
    return this.Vef;
  }
  set IsShowBulletJumpLeftClick(t) {
    if (this.Vef !== t) {
      this.Vef = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMotorcycleBulletJumpChanged);
    }
  }
  SetIsDynamicJoystick(t) {
    this.AXe = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetMotorcycleJoystickMode, t);
  }
  GetIsDynamicJoystick() {
    return this.AXe;
  }
  SetIsRoundJoystick(t) {
    if (this.g8g !== t) {
      if (this.IsDriving) {
        this.Hef(true);
        this.g8g = t;
        this.Hef(false);
      } else {
        this.g8g = t;
      }
      ModelManager_1.ModelManager.SkillButtonUiModel.RefreshMotorPadSkillButtonIndexOnJoystickChange(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorcycleRoundJoystickChanged, t);
    }
  }
  GetIsRoundJoystick() {
    return this.g8g;
  }
  get AutoAcceleratorSettingEnable() {
    return this.HFf;
  }
  set AutoAcceleratorSettingEnable(t) {
    if (this.HFf !== t) {
      this.HFf = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorcycleAutoAcceleratorSettingChanged, t);
    }
  }
  get AutoNitrogenSettingEnable() {
    return this.jFf;
  }
  set AutoNitrogenSettingEnable(t) {
    if (this.jFf !== t) {
      this.jFf = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorcycleAutoNitrogenSettingChanged, t);
    }
  }
  get DriftAcceleratorSettingEnable() {
    return this.e5f;
  }
  set DriftAcceleratorSettingEnable(t) {
    if (this.e5f !== t) {
      this.e5f = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorcycleDriftAcceleratorSettingChanged, t);
    }
  }
  SetHudVisible(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "设置摩托车hud显隐", ["visible", t], ["reason", e]);
    }
    var i = this.H6f.size <= 0;
    if (t) {
      this.H6f.delete(e);
    } else {
      this.H6f.add(e);
    }
    var t = this.H6f.size <= 0;
    if (i != t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMotorcycleHudVisibleChanged, t);
    }
  }
  GetHudVisible() {
    return this.H6f.size <= 0;
  }
  IsInFirstPersonMode() {
    return this.J7f;
  }
  SetNeedCacheUi(t) {
    if (this.IsNeedCacheUi !== t) {
      this.IsNeedCacheUi = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetBattleUiChildCacheState, 0, t);
    }
  }
}
exports.BattleUiMotorcycleData = BattleUiMotorcycleData;
//# sourceMappingURL=BattleUiMotorcycleData.js.map