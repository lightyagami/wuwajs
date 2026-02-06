"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventAddInputTag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../../Game/Global");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelEventLockInputState_1 = require("../LevelEventLockInputState");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddInputTag extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.pLe = "Input Limited Action";
  }
  ExecuteNew(t, e) {
    if (t) {
      var n = t;
      let e = undefined;
      var o = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, this.pLe);
      switch (n.Type.Type) {
        case IAction_1.ELimitPlayOperation.AllowCamera:
          e = "FightInputRoot.FightInput.AxisInput.CameraInput";
          break;
        case IAction_1.ELimitPlayOperation.AllowAction:
          e = "FightInputRoot.FightInput.ActionInput";
          break;
        case IAction_1.ELimitPlayOperation.AllowMove:
          if (n.Type.IsOnlyForward) {
            ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, false, false, false);
          }
          e = "FightInputRoot.FightInput.AxisInput.MoveInput";
          break;
        case IAction_1.ELimitPlayOperation.AllowMoveNew:
          ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(n.Type.Forward, n.Type.Back, n.Type.Left, n.Type.Right);
          e = "FightInputRoot.FightInput.AxisInput.MoveInput";
          if (o?.Valid && (o.GetComponent(217)?.AddTag(477750727), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Test", 29, "[LevelEventAddInputTag.ExecuteNew] AddTag 禁止冲刺");
          }
          break;
        case IAction_1.ELimitPlayOperation.AllowUi:
          e = "UiInputRoot";
          break;
        case IAction_1.ELimitPlayOperation.AllowMouse:
          e = "UiInputRoot.MouseInputTag";
          break;
        case IAction_1.ELimitPlayOperation.BlockAll:
          e = "BlockAllInputTag";
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 24, "没有定义ELimitPlayOperation对应什么InputTag!", ["ELimitPlayOperation", n.Type]);
          }
          return;
      }
      if (LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()) {
        LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(e);
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
      } else {
        ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(e);
        LevelEventLockInputState_1.LevelEventLockInputState.Lock([e]);
      }
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, {
      Name: "UnLimitPlayerOperation"
    });
  }
}
exports.LevelEventAddInputTag = LevelEventAddInputTag;
//# sourceMappingURL=LevelEventAddInputTag.js.map