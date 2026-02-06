"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorGameplayEntryView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const UiTimeDilation_1 = require("../../../../../Ui/Base/UiTimeDilation");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ConditionGroupData_1 = require("../../../ConditionGroupData");
const TICK_INTERVAL = 500;
class SpringManorGameplayEntryView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.oVf = [];
    this.Qyi = undefined;
    this.j3 = 0;
    this.I5t = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.I5t]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    var e = new FunctionItem(1);
    this.oVf.push(e);
    i.push(e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    var e = new FunctionItem(2);
    this.oVf.push(e);
    i.push(e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    var e = new FunctionItem(7);
    this.oVf.push(e);
    i.push(e.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    var e = new FunctionItem(8);
    this.oVf.push(e);
    i.push(e.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(i);
  }
  OnBeforeShow() {
    this.PauseTimeDilation();
  }
  OnBeforeHide() {
    this.ResumeTimeDilation();
  }
  OnStart() {
    this.Qyi?.SetCloseCallBack(this.I5t);
  }
  PauseTimeDilation() {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("SpringManorGameplayEntryView");
  }
  ResumeTimeDilation() {}
  OnTick(i) {
    if (this.j3 > 0) {
      this.j3 -= i;
    } else {
      this.j3 = TICK_INTERVAL;
      for (const e of this.oVf) {
        e.Refresh();
      }
    }
  }
}
exports.SpringManorGameplayEntryView = SpringManorGameplayEntryView;
class FunctionItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.w7t = i;
    this.ac = 0;
    this.l4e = undefined;
    this.GGt = () => {
      if (this.ac !== 2) {
        this.Y8d();
      } else {
        ModelManager_1.ModelManager.SpringManorModel.GetGameplayData(this.w7t).EnterGame();
      }
    };
    this.Y8d = () => {
      if (this.ac === 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Spring26_Gameplay_TimeLimit");
      } else {
        var e = [];
        var i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetFunctionConfigById(this.w7t);
        for (const n of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(i.ConditionGroup)) {
          var t;
          var s = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(n);
          let i = -1;
          if (s.AccessId) {
            t = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(s.AccessId);
            i = t.SkipName;
          }
          const r = {
            ConditionId: n,
            ConditionTextId: s.Description,
            IsFinished: this.Teu(n),
            AccessId: s.AccessId,
            AccessType: i
          };
          e.push(r);
        }
        const r = new ConditionGroupData_1.ConditionGroupData(i.ConditionGroup, e);
        UiManager_1.UiManager.OpenView("CommonConditionView", r);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.GGt]];
  }
  OnStart() {
    this.Refresh();
    this._Bg();
  }
  OnBeforeDestroy() {
    this.uBg();
  }
  _Bg() {
    var i = ModelManager_1.ModelManager.SpringManorModel.GetGameplayData(this.w7t);
    this.l4e = i.GetRedDotName();
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(this.l4e, this.GetItem(9));
    } else {
      this.GetItem(9)?.SetUIActive(false);
    }
  }
  uBg() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(9));
    }
  }
  Refresh() {
    this._Oe();
    this.Euo(this.ac !== 2);
    switch (this.ac) {
      case 0:
        var i = ModelManager_1.ModelManager.SpringManorModel?.GetFunctionUnlockRemainText(this.w7t);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Spring26_Gameplay_TimeLock", i);
        break;
      case 1:
        i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetFunctionConfigById(this.w7t)?.ConditionGroup;
        i = ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionGroupConfig(i)?.HintText;
        this.GetText(5)?.ShowTextNew(i);
        break;
      case 2:
        var i = ModelManager_1.ModelManager.SpringManorModel.GetGameplayData(this.w7t);
        var e = i.GetCurrentProgress();
        var i = i.GetTotalProgress();
        var t = i <= e ? "Spring26_GameProgress_Done" : "Spring26_GameProgress";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t, e.toString(), i.toString());
    }
  }
  _Oe() {
    var i = ModelManager_1.ModelManager.SpringManorModel;
    if (i.ActivityData.IsFunctionUnlocked(this.w7t)) {
      this.ac = 2;
    } else {
      i = i.GetFunctionUnlockRemainText(this.w7t);
      this.ac = i === undefined ? 1 : 0;
    }
  }
  Euo(i) {
    this.GetItem(3)?.SetUIActive(!i);
    this.GetItem(4)?.SetUIActive(i);
    this.GetItem(7)?.SetUIActive(!i);
    this.GetItem(1)?.SetUIActive(!i);
    this.GetItem(2)?.SetUIActive(i);
  }
  Teu(i) {
    return false;
  }
}
//# sourceMappingURL=SpringManorGameplayEntryView.js.map