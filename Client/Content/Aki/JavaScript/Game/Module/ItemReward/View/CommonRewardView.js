"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonRewardView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemRewardController_1 = require("../ItemRewardController");
const RewardItemList_1 = require("./RewardItemList");
const RewardItemLoopList_1 = require("./RewardItemLoopList");
const MAXROWCNT = 2;
class CommonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.sOe = undefined;
    this.q9a = undefined;
    this.s$a = undefined;
    this.Awf = undefined;
    this.V0i = t => {
      var e = t.GetRewardInfo();
      if (e.Type === 1 && e.ViewName === "CommonRewardView" && (this.UiViewSequence?.PlaySequencePurely("Start01", true), this.$Tt = t, this.bYt())) {
        this.qYt();
      }
    };
    this.dSt = () => {
      var t = this.$Tt?.GetRewardInfo();
      if (!t?.LeftBtnTextId || !t?.RightBtnTextId) {
        UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(10);
        UiManager_1.UiManager.CloseView("CommonRewardView");
      }
    };
    this.BYt = t => {
      if (this.bYt()) {
        this.qYt();
      }
    };
    this.tNe = () => {
      this.$Tt?.GetRewardInfo()?.LeftAction?.();
      this.CloseMe();
    };
    this.iNe = () => {
      this.$Tt?.GetRewardInfo()?.RightAction?.();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIGridLayout]];
    this.BtnBindInfo = [[0, this.dSt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeChildView, this.dSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardView, this.V0i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeChildView, this.dSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardView, this.V0i);
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(3);
    this.sOe = new RewardItemList_1.RewardItemList();
    await this.sOe.CreateThenShowByActorAsync(t.GetOwner(), t);
    this.q9a = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.s$a = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.q9a?.SetFunction(this.tNe);
    this.s$a?.SetFunction(this.iNe);
    var t = this.GetItem(7);
    this.Awf = new RewardItemLoopList_1.RewardItemLoopList();
    await this.Awf.CreateByActorAsync(t.GetOwner(), t);
  }
  OnStart() {
    var t = this.OpenParam;
    this.bl(t);
    var t = t.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(t);
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequence("Switch");
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
  }
  OnBeforePlayCloseSequence() {
    this.UiViewSequence.StopSequenceByKey("Switch");
  }
  OnBeforeDestroy() {
    this.Awf = undefined;
    this.sOe = undefined;
    var t = this.$Tt.GetRewardInfo().OnCloseCallback;
    if (t) {
      t();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCloseRewardView);
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  bl(t) {
    this.$Tt = t;
    if (this.GYt()) {
      this.mGe();
    }
    if (this.NYt()) {
      this.OYt();
    }
    if (this.bYt()) {
      this.qYt();
    }
    this.ZGe(t);
  }
  GYt() {
    var t = this.$Tt.GetRewardInfo().Title;
    var t = !StringUtils_1.StringUtils.IsEmpty(t);
    this.GetItem(2).SetUIActive(t);
    return t;
  }
  mGe() {
    var t;
    var e = this.$Tt.GetRewardInfo().Title;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      t = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
    }
  }
  NYt() {
    var t = this.$Tt.GetRewardInfo();
    var e = t.ContinueText;
    var e = !StringUtils_1.StringUtils.IsEmpty(e) && t.LeftBtnTextId === undefined && t.RightBtnTextId === undefined;
    this.GetItem(4).SetUIActive(e);
    return e;
  }
  OYt() {
    var t;
    var e = this.$Tt.GetRewardInfo().ContinueText;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      t = this.GetText(4);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
    }
  }
  bYt() {
    var t = this.$Tt.GetRewardInfo().IsItemVisible;
    var e = this.$Tt.GetItemList();
    var t = t && e !== undefined && e?.length > 0;
    if (this.sOe.GetActive() !== t) {
      this.sOe.SetActive(t);
    }
    return t;
  }
  Dwf() {
    var t = this.GetGridLayout(8).GetCellSize().X;
    var e = this.GetGridLayout(8).RootUIComp;
    return Math.floor(e.GetWidth() / t) * MAXROWCNT;
  }
  qYt() {
    if (this.$Tt && this.sOe && this.Awf) {
      (this.$Tt.GetItemList().length < this.Dwf() ? (this.sOe.Show(), this.Awf.Hide(), this.sOe) : (this.sOe.Hide(), this.Awf.Show(), this.Awf)).Refresh(this.$Tt.GetItemList(), this.$Tt.GetRewardInfo().TipsCanSkip);
    }
  }
  ZGe(t) {
    t = t.GetRewardInfo();
    if (t?.LeftBtnTextId) {
      this.q9a?.SetShowText(t.LeftBtnTextId);
      this.q9a?.SetUiActive(true);
    } else {
      this.q9a?.SetUiActive(false);
    }
    if (t?.RightBtnTextId) {
      this.s$a?.SetShowText(t.RightBtnTextId);
      this.s$a?.SetUiActive(true);
    } else {
      this.s$a?.SetUiActive(false);
    }
    this.GetText(4)?.SetUIActive(t.LeftBtnTextId !== undefined || t.RightBtnTextId !== undefined);
  }
}
exports.CommonRewardView = CommonRewardView;
//# sourceMappingURL=CommonRewardView.js.map