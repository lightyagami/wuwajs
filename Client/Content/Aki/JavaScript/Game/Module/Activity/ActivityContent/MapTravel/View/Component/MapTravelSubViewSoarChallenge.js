"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTravelSubViewSoarChallenge = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const DynScrollView_1 = require("../../../../../Util/ScrollView/DynScrollView");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityMapTravelController_1 = require("../../ActivityMapTravelController");
const MapTravelTabDynamicItem_1 = require("./MapTravelTabDynamicItem");
const MapTravelTaskItem_1 = require("./MapTravelTaskItem");
const SoarChallengeTabDynamicScrollItem_1 = require("./SoarChallengeTabDynamicScrollItem");
class MapTravelSubViewSoarChallenge extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ActivityBaseData = e;
    this.LayoutList = undefined;
    this.TabLayout = undefined;
    this.LevelSequencePlayer = undefined;
    this.fVl = -1;
    this.Hwn = (e, i, t) => {
      var s = new SoarChallengeTabDynamicScrollItem_1.SoarChallengeTabDynamicScrollItem();
      s.BindSelectedCallBack(this.pVl);
      s.BindIsSelectedOn(this.vIl);
      return s;
    };
    this.sGe = () => {
      var e = new SoarChallengeItem(this.ActivityBaseData);
      e.SetClickRewardCb(this.aQu);
      return e;
    };
    this.aQu = () => {
      var e = this.ActivityBaseData.GetAllSoarTabData()[this.fVl];
      var e = this.ActivityBaseData.GetSoarItemDataList(e.RewardIds).filter(e => e.Status === 0).map(e => e.Id);
      ActivityMapTravelController_1.ActivityMapTravelController.RequestMultiTakeSoarChallengeReward(e);
    };
    this.vVl = () => {
      var e = this.ActivityBaseData.GetAllSoarTabData()[this.fVl];
      this.TabLayout.GetScrollItemFromIndex(this.fVl).Update(e, this.fVl);
      this.Dke(e);
    };
    this.pVl = e => {
      if (this.fVl >= 0 && e.TabIndex !== this.fVl) {
        this.XN(this.fVl, false, false);
      }
      this.fVl = e.TabIndex;
      if (e.IsUnlock && !this.ActivityBaseData.SaveFirstCheckRedDotState(7, e.PlayId)) {
        this.TabLayout.GetScrollItemFromIndex(this.fVl)?.SetItemNewVisible(false);
      }
      this.Dke(e);
    };
    this.vIl = e => this.fVl === e.TabIndex;
    this.yVl = () => {
      var e = this.ActivityBaseData.GetAllSoarTabData()[this.fVl];
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.JumpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.yVl]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.LayoutList = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.sGe);
    this.TabLayout = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), new MapTravelTabDynamicItem_1.SoarTabDynamicItem(), this.Hwn);
    e.push(this.TabLayout.Init());
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    await Promise.all(e);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapTravelSoarRefresh, this.vVl);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapTravelSoarRefresh, this.vVl);
  }
  async Refresh() {
    var i = this.ActivityBaseData.GetAllSoarTabData();
    this.TabLayout.RefreshByData(i);
    await this.TabLayout.WaitForInit();
    let t = 0;
    for (let e = 0; e < i.length; e++) {
      if (i[e].IsNew) {
        t = e;
        break;
      }
    }
    this.XN(t, true, true);
  }
  XN(e, i, t) {
    this.TabLayout.GetScrollItemFromIndex(e).SetSelected(i, t);
  }
  Dke(e) {
    var i = e.IsUnlock;
    var t = i ? this.ActivityBaseData.GetSoarItemDataList(e.RewardIds) : [];
    this.LayoutList.RefreshByData(t, undefined, true);
    this.GetItem(4).SetUIActive(!i);
    if (!i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), this.ActivityBaseData.GetSoarPlayLockTips(e.PlayId));
    }
    this.GetButton(6).RootUIComp.SetUIActive(i);
  }
  async PlayStartSequence() {
    await this.Refresh();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise(), true);
  }
  async PlayCloseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise(), true);
    this.XN(this.fVl, false, false);
    this.fVl = -1;
  }
}
exports.MapTravelSubViewSoarChallenge = MapTravelSubViewSoarChallenge;
class SoarChallengeItem extends MapTravelTaskItem_1.TaskItemBase {
  constructor() {
    super(...arguments);
    this.TaskData = undefined;
    this.aQu = undefined;
    this.OnClickedRewardButton = () => {
      this.aQu?.();
    };
  }
  Refresh(e) {
    this.TaskData = e;
    var i = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetSoarChallengeConfig(this.TaskData.Id);
    var t = e.Status === 2;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.ScoreText);
    this.GetText(1).SetText(e.Current + "/" + e.Target);
    this.SVl(i.Reward);
    this.RewardButtonItem.SetUiActive(e.Status === 0);
    this.GetItem(6).SetUIActive(e.Status === 1);
    this.GetItem(5).SetUIActive(t);
  }
  SetClickRewardCb(e) {
    this.aQu = e;
  }
  SVl(e) {
    var i = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e)) {
      var t = {
        Item: s,
        HasClaimed: this.TaskData.Status === 2
      };
      i.push(t);
    }
    this.RewardScrollView.RefreshByData(i);
  }
}
//# sourceMappingURL=MapTravelSubViewSoarChallenge.js.map