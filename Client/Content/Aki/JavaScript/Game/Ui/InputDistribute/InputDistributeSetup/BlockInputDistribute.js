"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BlackScreenFadeController_1 = require("../../../Module/BlackScreen/BlackScreenFadeController");
const UiManager_1 = require("../../UiManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class BlockInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    if (this.Bc_()) {
      if (ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 50, "[InputDistribute]无缝加载过渡场景中，使用无缝加载设置的输入分发tag");
        }
        this.SetInputDistributeTags(ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelInputDistributeTags);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 50, "[InputDistribute]无缝加载过渡场景中，只允许角色轴向输入");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInputTag);
      }
      return true;
    }
    {
      var t;
      if (this.v$e()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]加载中设置输入分发tag为 MouseInputTag NavigationTag");
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]);
        return true;
      } else if (this.Udr()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]断线中，则设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if (this.oIa()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]Sdk打开界面，则设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if (this.Adr()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 17, "[InputDistribute]战斗结算中设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if (ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 48, "[InputDistribute]死亡界面打开中设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if (this.yX1()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 45, "[InputDistribute]CG中，则设置输入分发tag为 UiInputRootTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag);
        return true;
      } else if (this.Pdr()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 45, "[InputDistribute]黑幕中，则设置输入分发tag为 MouseInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag);
        return true;
      } else if (CameraController_1.CameraController.IsSequenceCameraInCinematic()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]玩家角色在播放处决中，大招中等镜头时，只允许角色技能输入，设置输入分发tag为 CharacterSkillInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInput.CharacterSkillInputTag);
        return true;
      } else if (ModelManager_1.ModelManager.MapModel?.IsInUnopenedAreaPullback()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]角色进入未开放区域启动拉回，设置输入分发tag为 MouseInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag);
        return true;
      } else if (this.qc_()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 50, "[InputDistribute]角色处于载具攀瀑状态，禁止所有输入");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(215)) && t.HasTag(191377386)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]角色落水中，则设置输入分发tag为 MouseInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag);
        return true;
      } else if (t?.HasTag(-1266260958)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 50, "[InputDistribute]角色退出载具中，禁止交互和战斗输入");
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]);
        return true;
      } else if (ModelManager_1.ModelManager.MenuModel?.IsWaitForKeyInput) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]玩家设置按键中，则设置输入分发tag为 NavigationTag");
        }
        this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag]);
        return true;
      } else if (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]行为配置禁用输入 设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if (this.dgl()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 67, "[InputDistribute]播放Link分屏中 设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else if (ModelManager_1.ModelManager.SubLevelModel?.IsInSubLevelSwitchingAndBlockingInput()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "[InputDistribute]切换子关卡且禁止输入 设置输入分发tag为 BlockAllInputTag");
        }
        this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        return true;
      } else {
        return !!ModelManager_1.ModelManager.DeadEyeModeModel.IsInDeadEyeMode && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 67, "[InputDistribute]死眼跳台玩法中 设置输入分发tag为 BlockAllInputTag"), t = [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag], this.SetInputDistributeTags(t), true);
      }
    }
  }
  Bc_() {
    return ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel || ModelManager_1.ModelManager.TeleportModel.TeleportContext?.IsInSeamlessTeleport === true;
  }
  v$e() {
    return ModelManager_1.ModelManager.LoadingModel.IsLoading;
  }
  Udr() {
    return ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus() === 1;
  }
  oIa() {
    return ModelManager_1.ModelManager.KuroSdkModel.GetSdkFocusState();
  }
  yX1() {
    return UiManager_1.UiManager.IsViewOpen("VideoView");
  }
  Pdr() {
    return BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis;
  }
  Adr() {
    return ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement;
  }
  qc_() {
    return !!Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(242)?.VehicleEntity?.GetComponent(260)?.IsWaterfallMove;
  }
  dgl() {
    return ControllerHolder_1.ControllerHolder.BattleLinkController?.GetIsInLinkExplosion();
  }
}
exports.BlockInputDistribute = BlockInputDistribute;
//# sourceMappingURL=BlockInputDistribute.js.map