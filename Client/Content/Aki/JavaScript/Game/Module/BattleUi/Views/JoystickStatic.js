"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.JoystickStatic = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  Joystick_1 = require("./Joystick"),
  INIT_TARGET_VECTOR_Y = 200;
class JoystickStatic extends Joystick_1.Joystick {
  constructor() {
    super(...arguments), this.AnimHoverItem = void 0, this.AnimNormalItem = void 0, this.Z91 = void 0, this.Oj1 = (t, e) => {
      e && ((e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()) ? e.MorphShowSpecialEnergyBar = !0 : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnTagAddOrRemove roleData 为空"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnergyBarVisible, !0), this.RootItem?.SetUIActive(!1))
    }, this.OnDynamicChanged = t => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "Override OnDynamicChanged")
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(), this.ComponentRegisterInfos.push([8, UE.UIItem]), this.ComponentRegisterInfos.push([9, UE.UIItem])
  }
  OnAfterShow() {
    this.Z91 = ModelManager_1.ModelManager.BattleUiModel.GetTagIdJoystickStaticVisible();
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t) {
      if (this.Z91) {
        var e = t.GameplayTagComponent;
        if (e)
          if (e.HasAnyTag(this.Z91)) this.RootItem?.SetUIActive(!1), t.MorphShowSpecialEnergyBar = !0;
          else {
            t.MorphShowSpecialEnergyBar = !1;
            for (const i of this.Z91) e.AddTagAddOrRemoveListener(i, this.Oj1)
          }
        else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "Initialize gamePlayTag 为空")
      }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "Initialize roleData 为空")
  }
  Initialize(t) {
    super.Initialize(t), this.AnimHoverItem = new Array;
    let e = this.GetItem(8)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      i = e.Num();
    for (let t = 0; t < i; t++) this.AnimHoverItem.push(e.Get(t));
    this.AnimNormalItem = new Array, e = this.GetItem(9)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()), i = e.Num();
    for (let t = 0; t < i; t++) this.AnimNormalItem.push(e.Get(t));
    this.TargetVector.Set(0, INIT_TARGET_VECTOR_Y, 0), this.SetHandleOffset(this.TargetVector), this.SetInputAxis(this.TargetVector, !0), this.SetUiOnDrag(!1), this.IsDynamicJoystick = !1
  }
  OnHideBattleChildView() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t) {
      if (t.MorphShowSpecialEnergyBar = !0, this.Z91) {
        var e = t.GameplayTagComponent;
        if (e)
          for (const i of this.Z91) e.RemoveTagAddOrRemoveListener(i, this.Oj1);
        else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnHideBattleChildView gamePlayTag 为空")
      }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnHideBattleChildView roleData 为空")
  }
  OnWalk() {
    2 !== this.CurrentJoystickType && (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 10, "控制角色行走"), this.SetUiOnDrag(!0), this.CurrentJoystickType = 2)
  }
  OnRun() {
    3 !== this.CurrentJoystickType && (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 10, "控制角色奔跑"), this.SetUiOnDrag(!0), this.CurrentJoystickType = 3)
  }
  OnStand() {
    0 !== this.CurrentJoystickType && (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 10, "松开摇杆时控制角色站立"), 1 !== this.CurrentJoystickType && this.SetUiOnDrag(!1), this.CurrentJoystickType = 0)
  }
  OnStandInTouch() {
    1 !== this.CurrentJoystickType && (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 10, "按下摇杆时控制角色站立"), 0 !== this.CurrentJoystickType && this.SetUiOnDrag(!1), this.CurrentJoystickType = 1)
  }
  SetUiOnDrag(t) {
    if (t) {
      for (const e of this.AnimNormalItem) e.Stop();
      for (const i of this.AnimHoverItem) i.Play();
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "JoyStick SetUiOnDrag True")
    } else {
      for (const o of this.AnimHoverItem) o.Stop();
      for (const s of this.AnimNormalItem) s.Play();
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "JoyStick SetUiOnDrag False")
    }
  }
  SetHandleOffset(t) {
    t = this.GetRotatorMoveArrow(t);
    t && this.WalkBgItem.SetUIRelativeRotation(t)
  }
  SetVisible(t, e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "Override SetVisible"), this.JoystickVisible = e
  }
  UpdateJoystickVisible() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 20, "Override UpdateJoystickVisible")
  }
}
exports.JoystickStatic = JoystickStatic;
//# sourceMappingURL=JoystickStatic.js.map