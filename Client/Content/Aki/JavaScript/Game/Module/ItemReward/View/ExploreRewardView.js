"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreRewardView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const FriendController_1 = require("../../Friend/FriendController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemRewardController_1 = require("../ItemRewardController");
const BagFullTip_1 = require("./BagFullTip");
const RewardExploreAccumulatedScoreItem_1 = require("./RewardExploreAccumulatedScoreItem");
const RewardExploreBabelSuccessItem_1 = require("./RewardExploreBabelSuccessItem");
const RewardExploreBarList_1 = require("./RewardExploreBarList");
const RewardExploreConfirmButton_1 = require("./RewardExploreConfirmButton");
const RewardExploreDangoAbyssSuccessItem_1 = require("./RewardExploreDangoAbyssSuccessItem");
const RewardExploreDescription_1 = require("./RewardExploreDescription");
const RewardExploreFriendItem_1 = require("./RewardExploreFriendItem");
const RewardExploreHonamiTowerSuccessItem_1 = require("./RewardExploreHonamiTowerSuccessItem");
const RewardExploreOnlineChallengePlayer_1 = require("./RewardExploreOnlineChallengePlayer");
const RewardExploreRecord_1 = require("./RewardExploreRecord");
const RewardExploreScore_1 = require("./RewardExploreScore");
const RewardExploreScoreSubTitle_1 = require("./RewardExploreScoreSubTitle");
const RewardExploreTargetReachedList_1 = require("./RewardExploreTargetReachedList");
const RewardExploreToggle_1 = require("./RewardExploreToggle");
const RewardItemList_1 = require("./RewardItemList");
const SUCCESS_OUTLINE_COLOR = "C48B29FF";
const FAIL_OUTLINE_COLOR = "B33100FF";
class ExploreRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.G0i = undefined;
    this.N0i = undefined;
    this.$0i = undefined;
    this.sOe = undefined;
    this.Y0i = undefined;
    this.J0i = undefined;
    this.z0i = undefined;
    this.TUl = undefined;
    this.dWs = undefined;
    this.Xzs = undefined;
    this.H5_ = undefined;
    this.Z0i = undefined;
    this.Iyn = undefined;
    this.hD_ = undefined;
    this.P_c = undefined;
    this.rv1 = undefined;
    this.Enm = undefined;
    this.Het = [];
    this.efi = () => {
      var t = this.N0i.ButtonInfoList;
      if (t && t?.length > 0) {
        let e = 0;
        for (const i of t) {
          this.Het[e].Refresh(i);
          e++;
        }
      }
    };
    this.Yzs = () => {
      var e = ItemRewardController_1.ItemRewardController.BuildExploreFriendDataList();
      ItemRewardController_1.ItemRewardController.SetExploreFriendDataList(e);
      this.Jzs();
    };
    this.Yra = () => {
      var e = ItemRewardController_1.ItemRewardController.BuildExploreFriendIdList();
      if (FriendController_1.FriendController.CheckHasAnyApplied(e) && !UiManager_1.UiManager.IsViewOpen("FriendApplyView")) {
        UiManager_1.UiManager.OpenView("FriendApplyView", e);
      }
    };
    this.BYt = e => {
      if (this.sOe) {
        this.sOe.Refresh(this.$Tt.GetItemList());
      }
    };
    this.zzs = () => new RewardExploreFriendItem_1.RewardExploreFriendItem();
    this.Sp1 = () => {
      this.dWs?.FullRefresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIVerticalLayout], [22, UE.UIItem], [23, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardButton, this.efi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FriendApplyReceived, this.Yra);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FriendApplicationListUpdate, this.Yzs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FriendAdded, this.Yzs);
    this.UiViewSequence.AddSequenceFinishEvent("Success", this.Sp1);
    this.UiViewSequence.AddSequenceFinishEvent("Fail", this.Sp1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardButton, this.efi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FriendApplyReceived, this.Yra);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FriendApplicationListUpdate, this.Yzs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FriendAdded, this.Yzs);
    this.UiViewSequence.RemoveSequenceFinishEvent("Success", this.Sp1);
    this.UiViewSequence.RemoveSequenceFinishEvent("Fail", this.Sp1);
  }
  async OnBeforeStartAsync() {
    this.$Tt = this.OpenParam;
    this.G0i = this.$Tt.GetRewardInfo();
    this.N0i = this.$Tt.GetExtendRewardInfo();
    this.GetItem(5).SetUIActive(false);
    if (this.G0i.IsBagFull) {
      await this.$5_();
    }
    if (this.G0i.IsRecordVisible && this.N0i.ExploreRecordInfo) {
      if (this.H5_) {
        this.H5_.SetAdjustPanelVisible(true);
      }
      await this.tfi();
    }
    if (this.G0i.IsDescription && !StringUtils_1.StringUtils.IsEmpty(this.G0i.Description)) {
      await this.ifi();
    }
    if (this.G0i.IsItemVisible) {
      if (this.N0i.ItemList && this.N0i.ItemList?.length > 0) {
        await this.ofi();
      } else if (this.G0i.IsBagFull === undefined) {
        await this.$5_();
      }
    }
    if (this.G0i.IsShowOnlineChallengePlayer) {
      await this.CWs();
    }
    if (this.G0i.IsExploreProgressVisible && this.N0i.ExploreBarDataList) {
      await this.rfi();
    }
    if (this.N0i.TargetReached && this.N0i.TargetReached?.length > 0) {
      await this.nfi();
    }
    if (this.N0i.ScoreHalfArea) {
      await this.LUl();
    }
    if (this.N0i.StateToggle) {
      await this.sfi();
    }
    if (this.N0i.ScoreReached) {
      await this.Tyn();
    }
    if (this.N0i.AccumulatedScoreData) {
      await this.lD_();
    }
    if (this.N0i.ExploreFriendDataList) {
      await this.Zzs();
    }
    if (this.N0i.BabelTowerSuccessData) {
      await this.x_c();
    }
    if (this.N0i.DangoAbyssSuccessData) {
      await this.ov1();
    }
    if (this.N0i.HonamiTowerSuccessData) {
      await this.Inm();
    }
    var t = this.N0i.ButtonInfoList;
    if (t && t?.length > 0) {
      let e = 0;
      for (const i of t) {
        this.afi(i, e);
        e++;
      }
    }
    t = this.$Tt.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(t);
  }
  OnStart() {
    this.hfi();
    if (this.GYt()) {
      this.Nft();
      this.lfi();
    }
    if (this.Q0i()) {
      this.X0i();
    }
  }
  OnAfterShow() {
    if (this.N0i.ExploreFriendDataList) {
      this.Yra();
    }
  }
  OnAfterPlayStartSequence() {
    if (this.$Tt.GetRewardInfo().IsSuccess) {
      this.UiViewSequence.PlaySequence("Success", true);
    } else {
      this.UiViewSequence.PlaySequence("Fail", true);
    }
  }
  OnBeforeDestroy() {
    this.G0i.OnCloseCallback?.();
    this.$Tt = undefined;
    this.G0i = undefined;
    this.$0i?.Destroy();
    this.$0i = undefined;
    this.sOe?.Destroy();
    this.sOe = undefined;
    this.Y0i?.Destroy();
    this.Y0i = undefined;
    this.z0i?.Destroy();
    this.z0i = undefined;
    this.TUl?.Destroy();
    this.TUl = undefined;
    this.Z0i?.Destroy();
    this.Z0i = undefined;
    this.J0i?.Destroy();
    this.J0i = undefined;
    this.H5_?.Destroy();
    this.H5_ = undefined;
    for (const e of this.Het) {
      e.Destroy();
    }
    this.Het.length = 0;
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
    if (UiManager_1.UiManager.IsViewOpen("FriendApplyView")) {
      UiManager_1.UiManager.CloseView("FriendApplyView");
    }
  }
  GYt() {
    var e = this.GetItem(0);
    var t = this.G0i.Title;
    var t = !StringUtils_1.StringUtils.IsEmpty(t);
    e.SetUIActive(t);
    return t;
  }
  Nft() {
    var e = this.GetText(1);
    var t = this.G0i.Title;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  hfi() {
    this.GetItem(18).SetUIActive(this.G0i.Tip !== undefined);
    if (this.G0i.Tip) {
      this.GetText(19).SetText(this.G0i.Tip);
    }
  }
  lfi() {
    var e = this.GetText(1);
    var t = e.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
    var i = this.G0i.TitleHexColor;
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      e.SetColor(UE.Color.FromHex(i));
    }
    if (this.G0i.IsSuccess) {
      t.SetOutlineColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR));
    } else {
      t.SetOutlineColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
    }
  }
  Q0i() {
    var e = this.GetTexture(2);
    var t = this.G0i.TitleIconPath;
    var t = !StringUtils_1.StringUtils.IsEmpty(t);
    e.SetUIActive(t);
    return t;
  }
  X0i() {
    const e = this.GetTexture(2);
    var t = this.G0i.TitleIconPath;
    var i = this.G0i.TitleIconHexColor;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e.SetUIActive(false);
      this.SetTextureByPath(t, e, undefined, () => {
        e.SetUIActive(true);
      });
    }
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      e.SetColor(UE.Color.FromHex(i));
    }
  }
  Jzs() {
    var e = this.N0i.ExploreFriendDataList;
    if (e) {
      this.Xzs?.RefreshByData(e);
    }
  }
  async tfi() {
    var e;
    var t = this.N0i.ExploreRecordInfo;
    if (t) {
      e = this.GetItem(3);
      this.$0i = new RewardExploreRecord_1.RewardExploreRecord();
      await this.$0i.CreateThenShowByResourceIdAsync("Uiitem_ResultRecord", e);
      this.$0i.Refresh(t);
    }
  }
  async ofi() {
    var e;
    var t;
    var i = this.$Tt.GetItemList();
    if (!!i && !(i.length < 1)) {
      e = this.GetItem(3);
      this.sOe = new RewardItemList_1.RewardItemList();
      t = this.G0i?.IsRewardMultiLine ? "Uiitem_TipsItemNew" : "Uiitem_TipsItem";
      await this.sOe.CreateThenShowByResourceIdAsync(t, e);
      this.sOe.Refresh(i);
    }
  }
  async $5_() {
    var e = this.GetItem(20);
    this.H5_ = new BagFullTip_1.BagFullTip();
    await this.H5_.CreateThenShowByResourceIdAsync("UiItem_BagFullTips", e);
    this.H5_.SetAdjustPanelVisible(false);
  }
  async rfi() {
    var e;
    var t = this.N0i.ExploreBarDataList;
    if (!!t && !(t.length < 1)) {
      e = this.GetItem(3);
      this.Y0i = new RewardExploreBarList_1.RewardExploreBarList();
      await this.Y0i.CreateThenShowByResourceIdAsync("Uiitem_ResultBar", e);
      this.Y0i.Refresh(this.G0i.ExploreBarTipsTextId, t);
    }
  }
  async ifi() {
    var e;
    var t = this.G0i.Description;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = this.GetItem(3);
      this.J0i = new RewardExploreDescription_1.RewardExploreDescription();
      await this.J0i.CreateThenShowByResourceIdAsync("Uiitem_ResultDesc", e);
      this.J0i.Refresh(t);
    }
  }
  async nfi() {
    var e;
    var t = this.N0i.TargetReached;
    if (!!t && !(t.length < 1)) {
      e = this.GetItem(3);
      this.z0i = new RewardExploreTargetReachedList_1.RewardExploreTargetReachedList();
      await this.z0i.CreateThenShowByResourceIdAsync("UiItem_Settlement", e);
      this.z0i.SetBarList(t);
    }
  }
  async LUl() {
    var e;
    var t = this.N0i.ScoreHalfArea;
    if (t) {
      e = this.GetItem(20);
      this.TUl = new RewardExploreScoreSubTitle_1.RewardExploreScoreSubTitle();
      await this.TUl.CreateThenShowByResourceIdAsync("UiItem_ResultScoreA", e);
      this.TUl.RefreshData(t);
    }
  }
  async CWs() {
    var e = this.GetItem(23);
    this.dWs = new RewardExploreOnlineChallengePlayer_1.RewardExploreOnlineChallengePlayer();
    await this.dWs.CreateByResourceIdAsync("UiItem_ChallengeAgain", e);
  }
  async sfi() {
    var e;
    var t = this.N0i.StateToggle;
    if (t) {
      e = this.GetItem(6);
      this.Z0i = new RewardExploreToggle_1.RewardExploreToggle();
      await this.Z0i.CreateThenShowByResourceIdAsync("UiItem_SettlementToggle", e);
      this.Z0i.Refresh(t);
    }
  }
  async Tyn() {
    var e;
    var t = this.N0i.ScoreReached;
    if (t) {
      e = this.GetItem(20);
      this.Iyn = new RewardExploreScore_1.RewardExploreScore();
      await this.Iyn.CreateThenShowByResourceIdAsync("UiItem_ResultScore", e);
      this.Iyn.Refresh(t);
    }
  }
  async lD_() {
    var e;
    var t = this.N0i.AccumulatedScoreData;
    if (t) {
      e = this.GetItem(20);
      this.hD_ = new RewardExploreAccumulatedScoreItem_1.RewardExploreAccumulatedScoreItem();
      await this.hD_.CreateThenShowByResourceIdAsync("UiItem_ResultScoreD", e);
      this.hD_.Refresh(t);
    }
  }
  async Zzs() {
    var e = this.N0i.ExploreFriendDataList;
    var t = this.GetVerticalLayout(21);
    var i = new GenericLayout_1.GenericLayout(t, this.zzs);
    await i.RefreshByDataAsync(e);
    t.RootUIComp.SetUIActive(true);
    this.Xzs = i;
  }
  async x_c() {
    var e;
    var t = this.N0i.BabelTowerSuccessData;
    if (t) {
      e = this.GetItem(20);
      this.P_c = new RewardExploreBabelSuccessItem_1.RewardExploreBabelSuccessItem();
      await this.P_c.CreateThenShowByResourceIdAsync("UiItem_BabelTowerSuccessItem", e);
      this.P_c.Refresh(t);
    }
  }
  async ov1() {
    var e;
    var t = this.N0i.DangoAbyssSuccessData;
    if (t) {
      e = this.GetItem(20);
      this.rv1 = new RewardExploreDangoAbyssSuccessItem_1.RewardExploreDangoAbyssSuccessItem();
      await this.rv1.CreateThenShowByResourceIdAsync("PnlCelebrationResult", e);
      this.rv1.Refresh(t);
    }
  }
  async Inm() {
    var e;
    var t = this.N0i.HonamiTowerSuccessData;
    if (t) {
      e = this.GetItem(20);
      this.Enm = new RewardExploreHonamiTowerSuccessItem_1.RewardExploreHonamiTowerSuccessItem();
      await this.Enm.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryTowerResult", e);
      this.Enm.Refresh(t);
    }
  }
  afi(e, t) {
    var i = this.GetItem(5);
    var s = this.GetItem(4);
    var i = LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), s);
    var s = new RewardExploreConfirmButton_1.RewardExploreConfirmButton(i, t);
    s.Refresh(e);
    s.SetActive(true);
    this.Het.push(s);
    return s;
  }
  GetBottomToggleState() {
    return this.Z0i?.GetToggleState();
  }
}
exports.ExploreRewardView = ExploreRewardView;
//# sourceMappingURL=ExploreRewardView.js.map