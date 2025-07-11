"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCoastActivityMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonRewardPopup_1 = require("../../../Common/CommonRewardPopup");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const BlackCoastRewardPanel_1 = require("./BlackCoastRewardPanel");
const BlackCoastStageItem_1 = require("./BlackCoastStageItem");
class BlackCoastActivityMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.lqe = undefined;
    this.KTt = undefined;
    this.S2t = undefined;
    this.Vja = undefined;
    this.Hja = () => {
      var t = new BlackCoastStageItem_1.BlackCoastStageItem();
      t.OpenTaskView = this.jja;
      t.NewFlagRedDot = t => this.ActivityBaseData.HasNewStageFlag(t);
      return t;
    };
    this.Wja = t => {
      if (this.ActivityBaseData && this.ActivityBaseData.Id === t) {
        this.KTt.RefreshLayout();
      }
    };
    this.m7s = t => {
      this.S2t.Refresh(t);
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.jja = t => {
      UiManager_1.UiManager.OpenView("BlackCoastActivityTaskView", [this.ActivityBaseData, t]);
    };
    this.Qja = () => {
      var t = {
        WeaponDataList: this.ActivityBaseData.GetPreviewWeaponDataList(),
        SelectedIndex: 0
      };
      UiManager_1.UiManager.OpenView("WeaponPreviewView", t);
    };
    this.axt = () => {
      UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetCurrentLockQuestId());
    };
    this.SWa = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ActivityBaseData.GetProgressItemId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Qja], [6, this.axt], [9, this.SWa]];
  }
  async OnBeforeStartAsync() {
    var t;
    var e;
    this.ActivityBaseData = this.OpenParam;
    if (this.ActivityBaseData) {
      t = [];
      e = this.GetItem(5);
      this.KTt = new BlackCoastRewardPanel_1.BlackCoastRewardPanel(this.ActivityBaseData);
      t.push(this.KTt.CreateThenShowByActorAsync(e.GetOwner()));
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(this.AMo);
      this.lqe.SetTitle(this.ActivityBaseData.GetTitle());
      this.S2t = new CommonRewardPopup_1.CommonRewardPopup(this.GetRootItem());
      this.Vja = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.Hja);
      await Promise.all(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[BlackCoastActivity] 活动主页无数据");
    }
  }
  OnStart() {
    const t = this.GetTexture(2);
    t.SetUIActive(false);
    this.SetItemIcon(t, this.ActivityBaseData.GetProgressItemId, undefined, () => {
      t.SetUIActive(true);
    });
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(undefined, this.ActivityBaseData.Id);
    this.Kja();
    this.$ja();
    this.GetButton(6).RootUIComp.SetUIActive(this.ActivityBaseData.GetCurrentLockQuestId() !== undefined);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Wja);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Wja);
  }
  Kja() {
    this.GetText(3).SetText(this.ActivityBaseData.GetProgressItemCount().toString() + "/");
    this.GetText(4).SetText(this.ActivityBaseData.GetProgressItemTotal().toString());
    this.KTt.Refresh();
  }
  $ja() {
    this.Vja.RefreshByData(this.ActivityBaseData.GetAllStages());
  }
}
exports.BlackCoastActivityMainView = BlackCoastActivityMainView;
//# sourceMappingURL=BlackCoastActivityMainView.js.map