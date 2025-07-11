"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlScreenController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const InputController_1 = require("../../Input/InputController");
const InputEnums_1 = require("../../Input/InputEnums");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const BattleUiControl_1 = require("../BattleUi/BattleUiControl");
const ControlScreenDefine_1 = require("./ControlScreenDefine");
class ControlScreenController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnFormationLoadCompleted);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.OnRoleGoDown);
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnFormationLoadCompleted);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.OnRoleGoDown);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  static Mgt(e, n) {
    var t;
    var r;
    var o;
    var i = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(n);
    if (i) {
      t = ModelManager_1.ModelManager.ControlScreenModel;
      if (e) {
        r = (e = i.GetPointerEventData()).enterComponent;
        o = e.pressComponent;
        if (i.IsTouchEmpty() || i.IsTouchComponentContainTag(ControlScreenDefine_1.ignoreTag)) {
          t.AddTouchEmptyFingerData(i);
          if (t.IsDoubleTouch(n) && t.IsDoubleTouchResetCameraComponent(i, ControlScreenDefine_1.resetCameraTag)) {
            BattleUiControl_1.BattleUiControl.ResetFocus();
          }
          t.SetCurrentTouchTimeStamp(TimeUtil_1.TimeUtil.GetServerTimeStamp());
          t.SetCurrentTouchId(n);
          t.SetCurrentEnterComponent(r);
          t.SetCurrentPressComponent(o);
        } else {
          n = i.GetFingerIndex();
          if (e) {
            if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Input", 10, "[InputLog][InputController]当开始触摸时，手指没有触摸在空白部分", ["fingerIndex", n], ["enterComponent", r?.GetOwner()?.GetName()], ["fingerIndex", o?.GetOwner()?.GetName()]);
            }
          } else if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Input", 10, "[InputLog][InputController]当开始触摸时，PointerEventData不存在", ["fingerIndex", n]);
          }
        }
      } else {
        t.RemoveTouchEmptyFingerData(i);
      }
    }
  }
  static Egt(e) {
    var n = ModelManager_1.ModelManager.ControlScreenModel;
    switch (n.GetTouchEmptyFingerDataCount()) {
      case 1:
        this.RefreshCameraRotation(e);
        break;
      case 2:
        var t = n.GetTouchEmptyFingerDataByCount(2);
        var r = t[0];
        var t = t[1];
        var r = r.GetFingerIndex();
        var t = t.GetFingerIndex();
        this.RefreshCameraSpringLength(r, t);
    }
  }
  static RefreshCameraRotation(e) {
    var n;
    if (ControlScreenController.Sqt()) {
      if (n = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e)) {
        if (n.IsInTouch()) {
          if (ModelManager_1.ModelManager.ControlScreenModel.IsTouchEmpty(e)) {
            this.ExecuteCameraRotation(e);
            return true;
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Input", 10, "[InputLog][InputController]尝试旋转镜头失败，失败原因，对应手指开始触摸时，没有触摸在空白部分", ["fingerIndex", e]);
            }
            return false;
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Input", 10, "[InputLog][InputController]尝试旋转镜头失败，失败原因，对应手指触摸数据没有触摸", ["fingerIndex", e]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Input", 10, "[InputLog][InputController]尝试旋转镜头失败，失败原因，找不到对应手指触摸数据", ["fingerIndex", e]);
        }
        return false;
      }
    } else {
      if (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 10, "[InputLog][InputController]尝试旋转镜头失败，失败原因，当前状态不允许控制摄像机");
      }
      return false;
    }
  }
  static RefreshCameraSpringLength(e, n) {
    return !!ControlScreenController.yqt() && (this.ExecuteCameraZoom(e, n), true);
  }
  static ExecuteCameraRotation(e) {
    var e = TouchFingerManager_1.TouchFingerManager.GetFingerDirection(e);
    var n = ModelManager_1.ModelManager.ControlScreenModel.GetRotationScreenRate();
    var t = e.X * n;
    var e = e.Y * n;
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.Turn, t);
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.LookUp, e);
  }
  static ExecuteCameraZoom(e, n) {
    var t = ModelManager_1.ModelManager.ControlScreenModel;
    var e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(e, n);
    var n = MathUtils_1.MathUtils.RangeClamp(e, t.MinTouchMoveDifference, t.MaxTouchMoveDifference, t.MinTouchMoveValue, t.MaxTouchMoveValue);
    InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.Zoom, n);
  }
  static Iqt(e) {
    var n = e.Id;
    if (this.Tqt !== n && (this.Tqt = n, e)) {
      if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharOnDirectionStateChanged, ControlScreenController.OnCharCameraStateChanged)) {
        EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnDirectionStateChanged, ControlScreenController.OnCharCameraStateChanged);
      }
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n);
      if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      }
    }
  }
  static Lqt(e) {
    if (EventSystem_1.EventSystem.HasWithTarget(e.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, ControlScreenController.OnCharCameraStateChanged)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.CharOnDirectionStateChanged, ControlScreenController.OnCharCameraStateChanged);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, ControlScreenController.OnRemoveEntity)) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    }
  }
  static Sqt() {
    return InputDistributeController_1.InputDistributeController.IsAllowFightCameraRotationInput();
  }
  static yqt() {
    return InputDistributeController_1.InputDistributeController.IsAllowFightCameraZoomInput();
  }
}
(exports.ControlScreenController = ControlScreenController).Eqt = (e, n) => {
  var n = n.TouchType;
  var t = Number(e);
  switch (n) {
    case 0:
      ControlScreenController.Mgt(true, t);
      break;
    case 1:
      ControlScreenController.Mgt(false, t);
      break;
    case 2:
      ControlScreenController.Egt(t);
  }
};
ControlScreenController.OnFormationLoadCompleted = () => {
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e) {
    ModelManager_1.ModelManager.ControlScreenModel.RefreshRotationScreenRate();
    ControlScreenController.Iqt(e.Entity);
  }
};
ControlScreenController.OnChangeRole = () => {
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e) {
    ModelManager_1.ModelManager.ControlScreenModel.RefreshRotationScreenRate();
    ControlScreenController.Iqt(e.Entity);
  }
};
ControlScreenController.OnRoleGoDown = e => {
  e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
  if (e) {
    ControlScreenController.Lqt(e);
  }
};
ControlScreenController.OnRemoveEntity = (e, n) => {
  var t = n.Entity.GetComponent(0);
  if (t?.Valid && t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t.GetPlayerId()) {
    ControlScreenController.Lqt(n);
  }
};
ControlScreenController.OnCharCameraStateChanged = (e, n) => {
  if (n !== e) {
    ModelManager_1.ModelManager.ControlScreenModel.RefreshRotationScreenRate();
  }
}; //# sourceMappingURL=ControlScreenController.js.map