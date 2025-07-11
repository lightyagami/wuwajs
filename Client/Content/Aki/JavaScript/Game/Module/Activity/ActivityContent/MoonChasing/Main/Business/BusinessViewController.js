"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessViewController = undefined;
const Stack_1 = require("../../../../../../../Core/Container/Stack");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ConfirmBoxController_1 = require("../../../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../../../Help/HelpController");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const MoonChasingController_1 = require("../MoonChasingController");
class ViewStateData {
  constructor(i, t, e) {
    this.ViewState = i;
    this.ExitFunc = t;
    this.EnterFunc = e;
    this.Params = [];
  }
}
class ViewStateManager {
  constructor() {
    this.zOe = new Stack_1.Stack();
    this.ZOe = 0;
    this.kh = new Map();
    this.ZOe = 0;
    this.zOe.Push(this.ZOe);
  }
  RegisterViewState(i, t, e) {
    t = new ViewStateData(i, t, e);
    this.kh.set(i, t);
  }
  SwitchToState(i, ...t) {
    this.zOe.Push(i);
    var e = this.kh.get(this.ZOe);
    if (e) {
      e.ExitFunc?.();
    }
    this.ZOe = i;
    var e = this.kh.get(this.ZOe);
    if (e) {
      e.EnterFunc?.(...t);
      e.Params = t;
    }
  }
  BackToState(i) {
    if (this.ZOe !== i) {
      while (this.zOe.Peek() !== i) {
        const i = this.zOe.Pop();
        const t = this.kh.get(i);
        if (t) {
          t.ExitFunc?.();
        }
      }
      this.ZOe = i;
      const t = this.kh.get(this.ZOe);
      if (t) {
        t.EnterFunc?.(...t.Params);
      }
    }
  }
  BackToLastState() {
    var i = this.zOe.Pop();
    var i = this.kh.get(i);
    if (i) {
      i.ExitFunc?.();
    }
    this.ZOe = this.zOe.Peek();
    var i = this.kh.get(this.ZOe);
    if (i) {
      i.EnterFunc?.(...i.Params);
    }
  }
  get CurrentState() {
    return this.ZOe;
  }
}
const MAINVIEW_HELPID = 103;
const DELEGATE_HELPID = 104;
class BusinessViewController {
  constructor() {
    this.Yzt = undefined;
    this.jio = undefined;
    this.tke = new ViewStateManager();
    this.SkipToBuild = () => {
      var i = UiManager_1.UiManager.GetViewByName("MoonChasingMainView")?.OpenParam;
      i.SkipTarget = 2;
      i.BuildingBackToBusiness = true;
      UiManager_1.UiManager.NormalResetToView("MoonChasingMainView");
    };
    this.SkipToHelper = () => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHelperView();
    };
    this.JumpByConfigCondition = i => {
      i = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(i);
      if (i.JumpType === 1) {
        this.Vpa(i.JumpParam);
      } else if (i.JumpType === 2) {
        this.Hpa(i.JumpParam);
      } else if (i.JumpType === 3) {
        this.jpa(i.JumpParam);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Moonfiesta_EntrustLock");
      }
    };
    this.BackToLastState = () => {
      if (this.tke.CurrentState === 0) {
        this.Yzt.CloseMe();
      } else {
        this.tke.BackToLastState();
      }
    };
    this.OpenHelpView = () => {
      if (this.tke.CurrentState === 1) {
        HelpController_1.HelpController.OpenHelpById(DELEGATE_HELPID);
      } else {
        HelpController_1.HelpController.OpenHelpById(MAINVIEW_HELPID);
      }
    };
  }
  lke() {
    this.tke.RegisterViewState(0, undefined, this.Yzt.SkipToMainView);
    this.tke.RegisterViewState(1, undefined, this.Yzt.SkipToDelegationDetails);
  }
  RegisterView(i) {
    this.Yzt = i;
    this.jio = i.OpenParam;
    this.lke();
  }
  async BeforeShowAsync() {
    var i = this.tke.CurrentState === 0;
    await this.Yzt.BeforeShowAsync(i);
  }
  Show() {
    if (this.jio.SkipTarget !== 0) {
      this.tke.SwitchToState(this.jio.SkipTarget);
    } else {
      this.Yzt.Refresh();
    }
    var i = this.tke.CurrentState === 0;
    this.Yzt.SwitchShowViewSequence(i);
  }
  SwitchToState(i, ...t) {
    this.tke.SwitchToState(i, ...t);
  }
  BackToState(i) {
    this.tke.BackToState(i);
  }
  Vpa(i) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(199);
    var e = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(i);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e.TaskId);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TidName);
    t.SetTextArgs(e);
    t.FunctionMap.set(2, () => {
      MoonChasingController_1.MoonChasingController.OpenTaskView(1, i);
    });
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  Hpa(i) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(199);
    var e = ConfigManager_1.ConfigManager.TaskConfig.GetBranchLineTaskById(i);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e.TaskId);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TidName);
    t.SetTextArgs(e);
    t.FunctionMap.set(2, () => {
      MoonChasingController_1.MoonChasingController.OpenTaskView(2, i);
    });
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  jpa(i) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(196);
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
    t.SetTextArgs(e);
    t.FunctionMap.set(2, () => {
      MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(i);
    });
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  JumpEnergyNotEnough() {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(201);
    i.FunctionMap.set(2, () => {
      MoonChasingController_1.MoonChasingController.OpenTaskView(2);
    });
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
  }
  JumpMoneyNotEnough() {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(202);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
  }
}
exports.BusinessViewController = BusinessViewController;
//# sourceMappingURL=BusinessViewController.js.map