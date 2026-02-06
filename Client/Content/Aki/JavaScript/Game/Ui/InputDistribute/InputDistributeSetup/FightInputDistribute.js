"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightInputDistribute = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputManager_1 = require("../../Input/InputManager");
const UiLayer_1 = require("../../UiLayer");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class FightInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  jlh() {
    if (Info_1.Info.IsInGamepad() && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.IsSwitchInteractOpen) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]刷新战斗输入时，手柄开启了优化通用交互功能,添加分发类型 InteractionRootTag");
      }
      this.AddInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag);
    }
  }
  OnRefresh() {
    var t;
    if (UiLayer_1.UiLayer.UiRootItem.IsUIActiveSelf() || UiLayer_1.UiLayer.WorldSpaceUiRootItem.IsUIActiveSelf()) {
      if ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(67)) && t.IsOnlyAllowFightInput()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 67, "[InputDistribute]当前角色处于只允许战斗输入的状态, 设置输入分发Tag为 FightInputRootTag");
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag]);
      } else if (InputManager_1.InputManager.IsShowMouseCursor() && Info_1.Info.IsInKeyBoard()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]刷新战斗输入时，处于键鼠设备并且在显示鼠标，设置输入分发Tag为 UiInputRootTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Input", 10, "[InputDistribute]刷新战斗输入时，则设置分发类型为 FightInputRootTag,UiInputRootTag");
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag]);
        this.jlh();
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]尝试刷新战斗输入时，当任何界面都没显示时，只允许战斗输入");
      }
      this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag]);
      this.jlh();
    }
    return true;
  }
}
exports.FightInputDistribute = FightInputDistribute;
//# sourceMappingURL=FightInputDistribute.js.map