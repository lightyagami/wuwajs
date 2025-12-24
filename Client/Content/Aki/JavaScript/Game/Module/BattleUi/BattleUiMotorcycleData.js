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
const padHideChildren = [9];
const nitrogenTagIds = [735065266, -105723823];
const parkourTagId = -1954349972;
const firstPersonTagId = -1636232993;
const hideHudTag = -433141728;
class BattleUiMotorcycleData {
  constructor() {
    this.yx_ = false;
    this.yEl = 0;
    this.iJm = true;
    this.AXe = false;
    this.IsPressJoyStick = false;
    this.MotorcycleEntityId = 0;
    this.MotorcycleEntityHandle = undefined;
    this.MotorcycleTagComponent = undefined;
    this.TGf = [];
    this.bGf = false;
    this.RGf = false;
    this.IFf = false;
    this.vXf = false;
    this.LGf = false;
    this.Zxf = false;
    this.eBf = false;
    this.T2f = false;
    this.wGf = new Set();
    this.HudColorState = 0;
    this.IsNeedCacheUi = false;
    this.DebugLog = false;
    this.PGf = (t, e) => {
      this.bGf = e;
      this.AGf();
    };
    this.DGf = (t, e) => {
      this.RGf = e;
      this.AGf();
    };
    this.TFf = (t, e) => {
      this.IFf = e;
      this.SetHudVisible(!this.IFf, "firstPersonTag");
    };
    this.yXf = (t, e) => {
      this.vXf = e;
      this.SetHudVisible(!this.vXf, "HideHudTag");
    };
  }
  Init() {
    this.yEl = Info_1.Info.OperationType;
  }
  Clear() {
    if (this.IsDriving) {
      this.LeaveVehicle();
    }
    this.wGf.clear();
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
      this.rJm(!t);
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
      this.MotorcycleTagComponent = this.MotorcycleEntityHandle.Entity.GetComponent(215);
    }
    this.LGf = ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController?.CheckInMotorParkourDungeon() ?? false;
    if (this.MotorcycleTagComponent) {
      for (const e of nitrogenTagIds) {
        this.mdt(this.MotorcycleTagComponent, e, this.PGf);
      }
      if (this.LGf) {
        this.mdt(this.MotorcycleTagComponent, parkourTagId, this.DGf);
      }
      this.mdt(this.MotorcycleTagComponent, firstPersonTagId, this.TFf);
      this.mdt(this.MotorcycleTagComponent, hideHudTag, this.yXf);
    }
    this.IsDriving = true;
  }
  LeaveVehicle(t) {
    this.MotorcycleEntityId = 0;
    this.MotorcycleEntityHandle = undefined;
    this.MotorcycleTagComponent = undefined;
    for (const e of this.TGf) {
      e.EndTask();
    }
    this.TGf.length = 0;
    this.bGf = false;
    this.RGf = false;
    this.IFf = false;
    this.vXf = false;
    this.IsDriving = false;
  }
  mdt(t, e, i) {
    var s = t.ListenForTagAddOrRemove(e, i);
    if (s) {
      this.TGf.push(s);
    }
    i(e, t.HasTag(e));
  }
  AGf() {
    var t = this.HudColorState;
    if (this.RGf && this.LGf) {
      this.HudColorState = 2;
    } else if (this.bGf) {
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
        this.rJm(true);
        this.yEl = e;
        this.rJm(false);
      } else {
        this.yEl = e;
      }
    }
  }
  rJm(t) {
    if (this.yEl === 1) {
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(16, padHideChildren, t);
    }
  }
  get IsShowBulletJumpLeftClick() {
    return this.iJm;
  }
  set IsShowBulletJumpLeftClick(t) {
    if (this.iJm !== t) {
      this.iJm = t;
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
  get AutoAcceleratorSettingEnable() {
    return this.Zxf;
  }
  set AutoAcceleratorSettingEnable(t) {
    if (this.Zxf !== t) {
      this.Zxf = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorcycleAutoAcceleratorSettingChanged, t);
    }
  }
  get AutoNitrogenSettingEnable() {
    return this.eBf;
  }
  set AutoNitrogenSettingEnable(t) {
    if (this.eBf !== t) {
      this.eBf = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorcycleAutoNitrogenSettingChanged, t);
    }
  }
  get DriftAcceleratorSettingEnable() {
    return this.T2f;
  }
  set DriftAcceleratorSettingEnable(t) {
    if (this.T2f !== t) {
      this.T2f = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorcycleDriftAcceleratorSettingChanged, t);
    }
  }
  SetHudVisible(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "设置摩托车hud显隐", ["visible", t], ["reason", e]);
    }
    var i = this.wGf.size <= 0;
    if (t) {
      this.wGf.delete(e);
    } else {
      this.wGf.add(e);
    }
    var t = this.wGf.size <= 0;
    if (i != t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiMotorcycleHudVisibleChanged, t);
    }
  }
  GetHudVisible() {
    return this.wGf.size <= 0;
  }
  IsInFirstPersonMode() {
    return this.IFf;
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