"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionInputDistribute = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const LevelPickInteractController_1 = require("../../../LevelGamePlay/LevelPickControl/LevelPickInteractController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils");
const UiLayerType_1 = require("../../Define/UiLayerType");
const InputManager_1 = require("../../Input/InputManager");
const UiLayer_1 = require("../../UiLayer");
const UiManager_1 = require("../../UiManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class InteractionInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    if (ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning || TsInteractionUtils_1.TsInteractionUtils.IsInteractWaitOpenViewName) {
      if (InputManager_1.InputManager.IsShowMouseCursor() && Info_1.Info.IsInKeyBoard()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,鼠标处于显示状态，并且在键鼠设备", ["IsInteractionTurning", ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning], ["IsInteractWaitOpenViewName", TsInteractionUtils_1.TsInteractionUtils.IsInteractWaitOpenViewName]);
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,鼠标处于显示状态，并且不是键鼠设备", ["IsInteractionTurning", ModelManager_1.ModelManager.InteractionModel.IsInteractionTurning], ["IsInteractWaitOpenViewName", TsInteractionUtils_1.TsInteractionUtils.IsInteractWaitOpenViewName]);
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
      }
      return true;
    }
    if (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity !== undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 36, "[InputDistribute]刷新交互列表输入Tag时,处于交互锁定状态");
      }
      this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
      return true;
    }
    var t = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(198);
    if (t && !t.GetClientCanInteraction()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,当前交互实体在执行交互,禁用热键");
      }
      this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
      return true;
    }
    if (LevelPickInteractController_1.LevelPickInteractController.zOa) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Input", 36, "[InputDistribute]刷新交互列表输入Tag时,当前处于Pick状态,禁用热键和战斗");
      }
      this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]);
      return true;
    }
    if (UiManager_1.UiManager.IsViewOpen("InteractionHintView") || ModelManager_1.ModelManager.BattleUiModel.ExistBattleInteract()) {
      if (TsInteractionUtils_1.TsInteractionUtils.IsInteractionOpenView()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,当前通过交互打开了界面", ["viewName", TsInteractionUtils_1.TsInteractionUtils.GetCurrentOpenViewName()]);
        }
      } else {
        t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD);
        if (t && t.bIsUIActive) {
          if (!InputManager_1.InputManager.IsShowMouseCursor()) {
            if (UiManager_1.UiManager.IsViewOpen("PhantomExploreView")) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,探索轮盘界面在打开中，只允许角色输入，界面快捷键，鼠标输入，界面导航输入");
              }
              this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]);
            } else if (Info_1.Info.IsInGamepad() || Info_1.Info.IsInTouch()) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,鼠标处于隐藏状态并且在用手柄或手机输入");
              }
              this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,鼠标处于隐藏状态");
              }
              this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
            }
            return true;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,鼠标处于显示状态");
          }
          this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,Hud层没有显示");
        }
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Input", 10, "[InputDistribute]刷新交互列表输入Tag时,没有打开交互界面,也不存在战斗交互,也没有开启交互切换探索工具");
    }
    return false;
  }
}
exports.InteractionInputDistribute = InteractionInputDistribute;
//# sourceMappingURL=InteractionInputDistribute.js.map