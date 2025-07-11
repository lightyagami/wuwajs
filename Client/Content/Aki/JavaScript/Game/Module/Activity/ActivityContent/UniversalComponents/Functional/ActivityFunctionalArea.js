"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunctionalArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ButtonSpriteItem_1 = require("../../../../Common/Button/ButtonSpriteItem");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityButtonItem_1 = require("./ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("./ActivityFunctionalTypeA");
class ActivityFunctionalArea extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Data = t;
    this.FunctionButton = undefined;
    this.CircleButton = undefined;
    this.PanelLock = undefined;
    this.xJa = () => {
      if (this.Data) {
        ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(this.Data);
      }
    };
    this.OpenPreOpenRequestConfirmBox = () => {
      var t;
      var e;
      if (this.Data) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(251)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.ActivityController.RequestPreOpenActivity(this.Data, t => {
            if (t) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.Data.Id);
            }
          });
        });
        if (e = this.Data.LocalConfig.PreOpenText) {
          t.SetTextArgs(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e));
        }
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    var e = this.GetItem(0);
    this.PanelLock = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    t.push(this.PanelLock.CreateByActorAsync(e.GetOwner()));
    var e = this.GetItem(3);
    this.CircleButton = new ButtonSpriteItem_1.ButtonSpriteItem();
    t.push(this.CircleButton.CreateThenShowByActorAsync(e.GetOwner()));
    var e = this.GetItem(1);
    this.FunctionButton = new ActivityButtonItem_1.ActivityButtonItem();
    t.push(this.FunctionButton.CreateThenShowByActorAsync(e.GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.FunctionButton.SetExtraFunction(this.xJa);
    this.SetRewardRedDotVisible(false);
  }
  SetLockTextByTextId(t, ...e) {
    this.PanelLock.SetTextByTextId(t, ...e);
  }
  SetLockTextByText(t) {
    this.PanelLock.SetTextByText(t);
  }
  SetLockSpriteVisible(t) {
    this.PanelLock.SetSpriteVisible(t);
  }
  SetPanelConditionVisible(t) {
    this.GetItem(0).SetUIActive(t);
  }
  SetRewardButtonVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetRewardButtonFunction(t) {
    this.CircleButton.SetFunction(t);
  }
  SetRewardRedDotVisible(t) {
    this.CircleButton.SetRedDotVisible(t);
  }
  BindRewardRedDot(t, e = 0) {
    this.CircleButton.BindRedDot(t, e);
  }
  UnbindRewardRedDot() {
    this.CircleButton.UnBindRedDot();
  }
  SetFunctionButtonVisible(t) {
    this.FunctionButton?.SetUiActive(t);
  }
  SetPanelTipByTextId(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t, e);
  }
  SetPanelTipByText(t) {
    this.GetText(5).SetText(t);
  }
  SetPanelTipVisible(t) {
    this.GetItem(4).SetUIActive(t);
  }
  RefreshGeneralPerformance(t) {
    var e;
    var i;
    var n;
    if (this.Data) {
      e = this.Data.IsUnLock();
      i = this.Data.CanPreOpen();
      n = this.Data.HasPreOpenCondition();
      if (e) {
        if (t) {
          this.SetGeneralUnlockPerformance(t);
        }
      } else if (n) {
        if (i) {
          this.SetPanelTipByTextId("ActivityPreOpenTip");
          this.SetPanelConditionVisible(true);
          this.FunctionButton.SetLocalTextNew("ActivityPreOpen");
          this.FunctionButton.SetFunction(() => {
            if (!t?.BeforePreOpenCheck || !!t.BeforePreOpenCheck()) {
              this.OpenPreOpenRequestConfirmBox();
            }
          });
          this.FunctionButton.SetUiActive(true);
          this.SetPanelConditionVisible(false);
        } else {
          this.FunctionButton.SetUiActive(false);
          this.SetPerformanceConditionLock(this.Data.PreOpenConditionGroupId, this.Data.Id);
        }
      } else {
        this.FunctionButton.SetUiActive(false);
        this.SetPerformanceConditionLock(this.Data.ConditionGroupId, this.Data.Id);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "未传递活动数据,请传递数据再刷新");
    }
  }
  SetGeneralUnlockPerformance(t) {
    this.SetPanelConditionVisible(false);
    if (t.UnlockBtnTextId) {
      if (t.UnlockBtnTextArgs) {
        this.FunctionButton.SetLocalTextNew(t.UnlockBtnTextId, ...t.UnlockBtnTextArgs);
      } else {
        this.FunctionButton.SetLocalTextNew(t.UnlockBtnTextId);
      }
    }
    if (t.UnlockBtnFunction) {
      this.FunctionButton.SetFunction(t.UnlockBtnFunction);
    }
    this.FunctionButton.SetUiActive(true);
  }
  SetPerformanceOpenTimeOver() {
    this.SetPanelConditionVisible(true);
    this.SetLockTextByTextId("Activity_EndDesc01");
    this.PanelLock.SetButtonVisible(false);
    this.SetRewardButtonVisible(false);
    this.FunctionButton.SetUiActive(false);
  }
  SetPerformanceConditionLock(t, e) {
    this.SetPanelConditionVisible(true);
    this.PanelLock.SetButtonVisible(true);
    t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t);
    if (t) {
      this.SetLockTextByTextId(t);
    }
    this.PanelLock.ButtonCallBack = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(e);
    };
  }
}
exports.ActivityFunctionalArea = ActivityFunctionalArea;
//# sourceMappingURL=ActivityFunctionalArea.js.map