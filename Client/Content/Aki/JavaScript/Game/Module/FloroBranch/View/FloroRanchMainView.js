"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchMainView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
class FloroRanchMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.fs1 = undefined;
    this.gmu = undefined;
    this.SOu = undefined;
    this.LAu = undefined;
    this.AAu = undefined;
    this.TDe = undefined;
    this.MOu = () => {
      this.bNe();
    };
    this.djc = () => {
      this.RefreshRecord();
    };
    this.Cmu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchLimitRewardView");
    };
    this.pmu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchPermanentRewardView");
    };
    this.UEu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchSkillView", false);
    };
    this.DEu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchHandBookView");
    };
    this.BEu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchTechnologyView");
    };
    this.kEu = () => {
      if (this.CNe.HasUnFinishedSubIns()) {
        const n = this.CNe.GetUnFinishedSubDungeonData();
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(334);
        var i = this.CNe.GetFloroRanchDungeonData(n.InstanceId);
        var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.GetDungeonName());
        var t = n.Difficulty;
        var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(FloroRanchDefine_1.floroRanchDifficultyTextId[t]);
        var s = this.CNe.GetSavedStage();
        e.SetTextArgs(i, t, s.toString());
        e.IsEscViewTriggerCallBack = false;
        e.FunctionMap.set(1, () => {
          FloroRanchController_1.FloroRanchController.SendFloroRanchSettleRequest(this.CNe.Id, n.Id, true, () => {
            UiManager_1.UiManager.OpenView("FloroRanchDungeonSelectView");
          });
        });
        e.FunctionMap.set(2, () => {
          FloroRanchController_1.FloroRanchController.SendFloroRanchStartPlayRequest(this.CNe.Id, n.Id);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        UiManager_1.UiManager.OpenView("FloroRanchDungeonSelectView");
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [8, UE.UIItem], [7, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[6, this.kEu]];
  }
  OnStart() {
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.AMo);
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.fs1 = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.fs1.SetFunction(this.Cmu);
    this.GetItem(1)?.SetUIActive(this.CNe.IsInLimitTime());
    this.gmu = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.gmu.SetFunction(this.pmu);
    this.SOu = new ButtonItem_1.ButtonItem(this.GetItem(3));
    this.SOu.SetFunction(this.UEu);
    this.LAu = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.LAu.SetFunction(this.DEu);
    this.AAu = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.AAu.SetFunction(this.BEu);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FloroRanchDataRedDot, this.MOu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FloroRanchSettlement, this.djc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FloroRanchDataRedDot, this.MOu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FloroRanchSettlement, this.djc);
  }
  OnBeforeShow() {
    var e = this.CNe.GetPermanentRewardProgress();
    this.gmu?.SetText(e);
    this.gmu?.SetRedDotVisible(this.CNe.IsPermanentTaskHasRedDot());
    this.fs1?.SetRedDotVisible(this.CNe.IsLimitTaskHasRedDot());
    var e = this.CNe.GetHandBookProgress();
    this.LAu?.SetText(e);
    this.GetItem(9)?.SetUIActive(this.CNe.IsDungeonHasRedDot());
    this.sSt();
    this.bNe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.sSt();
    }, 1000);
    this.RefreshRecord();
  }
  bNe() {
    var e = this.CNe.IsSkillHasRedDot();
    this.SOu?.SetRedDotVisible(e);
    this.LAu?.SetRedDotVisible(this.CNe.IsHandBookHasRedDot());
    var e = this.CNe.GetTechnologyProgress();
    this.AAu?.SetText(e);
    this.AAu?.SetRedDotVisible(this.CNe.HasAnyTechPointCanUnlock());
  }
  RefreshRecord() {
    var e = this.CNe.HasUnFinishedSubIns();
    var i = e ? "Farm_ContinueGame" : "Farm_NewGame";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i);
    this.GetItem(8)?.SetUIActive(e);
  }
  sSt() {
    if (!this.CNe.IsInLimitTime() && this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    var e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.GetLimitTimeActivityEndTime(), "{0}");
    this.fs1?.SetText(e);
  }
  OnBeforeHide() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.FloroRanchMainView = FloroRanchMainView;
//# sourceMappingURL=FloroRanchMainView.js.map