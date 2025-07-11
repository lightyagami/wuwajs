"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoystickStatic = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const Joystick_1 = require("./Joystick");
const INIT_TARGET_VECTOR_Y = 200;
class JoystickStatic extends Joystick_1.Joystick {
  constructor() {
    super(...arguments);
    this.AnimHoverItem = undefined;
    this.AnimNormalItem = undefined;
    this.pH1 = undefined;
    this.p71 = (t, e) => {
      if (e) {
        if (e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()) {
          e.MorphShowSpecialEnergyBar = true;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "OnTagAddOrRemove roleData 为空");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnergyBarVisible, true);
        this.RootItem?.SetUIActive(false);
      }
    };
    this.OnDynamicChanged = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "Override OnDynamicChanged");
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([8, UE.UIItem]);
    this.ComponentRegisterInfos.push([9, UE.UIItem]);
  }
  OnAfterShow() {
    this.pH1 = ModelManager_1.ModelManager.BattleUiModel.GetTagIdJoystickStaticVisible();
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t) {
      if (this.pH1) {
        var e = t.GameplayTagComponent;
        if (e) {
          if (e.HasAnyTag(this.pH1)) {
            this.RootItem?.SetUIActive(false);
            t.MorphShowSpecialEnergyBar = true;
          } else {
            t.MorphShowSpecialEnergyBar = false;
            for (const i of this.pH1) {
              e.AddTagAddOrRemoveListener(i, this.p71);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "Initialize gamePlayTag 为空");
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 20, "Initialize roleData 为空");
    }
  }
  Initialize(t) {
    super.Initialize(t);
    this.AnimHoverItem = new Array();
    let e = this.GetItem(8)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    let i = e.Num();
    for (let t = 0; t < i; t++) {
      this.AnimHoverItem.push(e.Get(t));
    }
    this.AnimNormalItem = new Array();
    e = this.GetItem(9)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    i = e.Num();
    for (let t = 0; t < i; t++) {
      this.AnimNormalItem.push(e.Get(t));
    }
    this.TargetVector.Set(0, INIT_TARGET_VECTOR_Y, 0);
    this.SetHandleOffset(this.TargetVector);
    this.SetInputAxis(this.TargetVector, true);
    this.SetUiOnDrag(false);
    this.IsDynamicJoystick = false;
  }
  OnHideBattleChildView() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t) {
      t.MorphShowSpecialEnergyBar = true;
      if (this.pH1) {
        var e = t.GameplayTagComponent;
        if (e) {
          for (const i of this.pH1) {
            e.RemoveTagAddOrRemoveListener(i, this.p71);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "OnHideBattleChildView gamePlayTag 为空");
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 20, "OnHideBattleChildView roleData 为空");
    }
  }
  OnWalk() {
    if (this.CurrentJoystickType !== 2) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "控制角色行走");
      }
      this.SetUiOnDrag(true);
      this.CurrentJoystickType = 2;
    }
  }
  OnRun() {
    if (this.CurrentJoystickType !== 3) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "控制角色奔跑");
      }
      this.SetUiOnDrag(true);
      this.CurrentJoystickType = 3;
    }
  }
  OnStand() {
    if (this.CurrentJoystickType !== 0) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "松开摇杆时控制角色站立");
      }
      if (this.CurrentJoystickType !== 1) {
        this.SetUiOnDrag(false);
      }
      this.CurrentJoystickType = 0;
    }
  }
  OnStandInTouch() {
    if (this.CurrentJoystickType !== 1) {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 10, "按下摇杆时控制角色站立");
      }
      if (this.CurrentJoystickType !== 0) {
        this.SetUiOnDrag(false);
      }
      this.CurrentJoystickType = 1;
    }
  }
  SetUiOnDrag(t) {
    if (t) {
      for (const e of this.AnimNormalItem) {
        e.Stop();
      }
      for (const i of this.AnimHoverItem) {
        i.Play();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "JoyStick SetUiOnDrag True");
      }
    } else {
      for (const o of this.AnimHoverItem) {
        o.Stop();
      }
      for (const s of this.AnimNormalItem) {
        s.Play();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "JoyStick SetUiOnDrag False");
      }
    }
  }
  SetHandleOffset(t) {
    t = this.GetRotatorMoveArrow(t);
    if (t) {
      this.WalkBgItem.SetUIRelativeRotation(t);
    }
  }
  SetVisible(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 20, "Override SetVisible");
    }
    this.JoystickVisible = e;
  }
  UpdateJoystickVisible() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 20, "Override UpdateJoystickVisible");
    }
  }
}
exports.JoystickStatic = JoystickStatic;
//# sourceMappingURL=JoystickStatic.js.map