"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewLongShan = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const UiNavigationNewController_1 = require("../../../UiNavigation/New/UiNavigationNewController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const ActivityLongShanController_1 = require("./ActivityLongShanController");
const LongShanStageItem_1 = require("./LongShanStageItem");
class ActivitySubViewLongShan extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.StageItems = undefined;
    this.bNn = false;
    this.UOe = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewState, false, 0);
    };
    this.AOe = () => {
      this.StageItems?.forEach(t => {
        t.RefreshState();
      });
      this.GetButton(3).RootUIComp.SetUIActive(this.ActivityBaseData.StageIds.findIndex(t => this.ActivityBaseData.GetStageInfoById(t) === undefined) >= 0);
      this.BNe();
    };
    this.POe = () => {
      if (this.ActivityBaseData && this.ActivityBaseData.StageIds) {
        let t = undefined;
        for (const e of this.ActivityBaseData.StageIds) {
          if (!this.ActivityBaseData?.GetStageInfoById(e)) {
            var i = LongShanStageById_1.configLongShanStageById.GetConfig(e);
            t = i?.QuestionId;
            break;
          }
        }
        UiManager_1.UiManager.OpenView("QuestView", t);
      }
    };
    this.wOe = t => {
      if (this.ActivityBaseData.GetStageInfoById(t)) {
        this.bNn = true;
        UiManager_1.UiManager.OpenView("LongShanView", [this.ActivityBaseData, t]);
      } else {
        ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, this.POe]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.AddChild(this.CommonInfoPanel);
    var t = [this.CommonInfoPanel.OnlyCreateByActorAsync(this.GetItem(2).GetOwner())];
    this.StageItems = [];
    for (const e of this.ActivityBaseData.StageIds) {
      var i = new LongShanStageItem_1.LongShanStageItem(this.ActivityBaseData, e);
      i.OnClickStageDetail = this.wOe;
      this.AddChild(i);
      t.push(i.OnlyCreateByActorAsync(this.GetItem(4 + this.StageItems.length).GetOwner()));
      this.StageItems.push(i);
    }
    await Promise.all(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LongShanUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LongShanUpdate, this.AOe);
  }
  OnStart() {
    this.FNe();
  }
  OnBeforeShow() {
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join");
    this.CommonInfoPanel?.SetClickFunc(this.UOe);
    this.BNe();
  }
  async OnBeforeHideSelfAsync() {
    if (this.bNn) {
      await this.LevelSequencePlayer.PlaySequenceAsync("TransOut", new CustomPromise_1.CustomPromise(), true);
    }
  }
  OnTimer(t) {
    this.FNe();
  }
  OnRefreshView() {
    this.FNe();
    this.CommonInfoPanel?.OnRefreshView();
    this.AOe();
    if (this.bNn) {
      this.LevelSequencePlayer.PlayLevelSequenceByName("TransIn", true);
      this.bNn = false;
    }
  }
  OnCommonViewStateChange(t) {
    this.PlaySubViewSequence(t ? "SwitchOut" : "SwitchIn", true);
  }
  OnSequenceStart(t) {
    if (t === "Start" || t === "SwitchOut") {
      this.vBn(false);
    } else if (t === "SwitchIn" && (this.vBn(true), this.StageItems)) {
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(this.StageItems[0].GetLongShanButton(), true);
    }
  }
  vBn(t) {
    this.GetButton(3)?.SetSelfInteractive(t);
    if (this.StageItems) {
      for (const i of this.StageItems) {
        i.SetButtonInteractive(t);
      }
    }
  }
  FNe() {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.GetText(1).SetUIActive(t);
    if (t) {
      this.GetText(1).SetText(i);
    }
  }
  BNe() {
    var t = this.ActivityBaseData.CheckAnyStageRed();
    this.CommonInfoPanel?.SetFunctionRedDotVisible(t);
  }
}
exports.ActivitySubViewLongShan = ActivitySubViewLongShan;
//# sourceMappingURL=ActivitySubViewLongShan.js.map