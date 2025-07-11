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
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemRewardController_1 = require("../ItemRewardController");
const RewardItemList_1 = require("./RewardItemList");
class CommonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.sOe = undefined;
    this.V0i = e => {
      var t = e.GetRewardInfo();
      if (t.Type === 1 && t.ViewName === "CommonRewardView" && (this.UiViewSequence?.PlaySequencePurely("Start01", true), this.$Tt = e, this.bYt())) {
        this.qYt();
      }
    };
    this.dSt = () => {
      UiManager_1.UiManager.CloseView("CommonRewardView");
    };
    this.BYt = e => {
      if (this.bYt()) {
        this.qYt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
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
    var e = this.GetItem(3);
    this.sOe = new RewardItemList_1.RewardItemList();
    await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e);
  }
  OnStart() {
    var e = this.OpenParam;
    this.bl(e);
    var e = e.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(e);
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
    var e = this.$Tt.GetRewardInfo().OnCloseCallback;
    if (e) {
      e();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCloseRewardView);
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  bl(e) {
    this.$Tt = e;
    if (this.GYt()) {
      this.mGe();
    }
    if (this.NYt()) {
      this.OYt();
    }
    if (this.bYt()) {
      this.qYt();
    }
  }
  GYt() {
    var e = this.$Tt.GetRewardInfo().Title;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(2).SetUIActive(e);
    return e;
  }
  mGe() {
    var e;
    var t = this.$Tt.GetRewardInfo().Title;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  NYt() {
    var e = this.$Tt.GetRewardInfo().ContinueText;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(4).SetUIActive(e);
    return e;
  }
  OYt() {
    var e;
    var t = this.$Tt.GetRewardInfo().ContinueText;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = this.GetText(4);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  bYt() {
    var e = this.$Tt.GetRewardInfo().IsItemVisible;
    var t = this.$Tt.GetItemList();
    var e = e && t !== undefined && t?.length > 0;
    if (this.sOe.GetActive() !== e) {
      this.sOe.SetActive(e);
    }
    return e;
  }
  qYt() {
    this.sOe.Refresh(this.$Tt.GetItemList());
  }
}
exports.CommonRewardView = CommonRewardView;
//# sourceMappingURL=CommonRewardView.js.map