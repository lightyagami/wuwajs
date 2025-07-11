"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeRewardView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemRewardController_1 = require("../ItemRewardController");
const RewardItemList_1 = require("./RewardItemList");
const RewardProgressBar_1 = require("./RewardProgressBar");
class CompositeRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.sOe = undefined;
    this.H0i = undefined;
    this.dSt = () => {
      UiManager_1.UiManager.CloseView("CompositeRewardView");
    };
    this.BYt = e => {
      if (this.bYt()) {
        this.qYt();
      }
    };
    this.j0i = () => {
      if (this.W0i()) {
        this.K0i();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.dSt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardProgressBar, this.j0i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardProgressBar, this.j0i);
  }
  async OnBeforeStartAsync() {
    this.sOe = new RewardItemList_1.RewardItemList();
    var e = this.GetItem(5);
    await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e);
    this.H0i = new RewardProgressBar_1.RewardProgressBar(this.GetItem(6).GetOwner());
  }
  OnStart() {
    this.$Tt = this.OpenParam;
    if (this.GYt()) {
      this.mGe();
    }
    if (this.Q0i()) {
      this.X0i();
    }
    if (this.NYt()) {
      this.OYt();
    }
    if (this.bYt()) {
      this.qYt();
    }
    if (this.W0i()) {
      this.K0i();
    }
    var e = this.$Tt.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(e);
  }
  OnAfterShow() {
    if (this.$Tt.GetRewardInfo().IsSuccess) {
      this.UiViewSequence.PlaySequence("Success", true);
    } else {
      this.UiViewSequence.PlaySequence("Fail", true);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
  }
  OnBeforeDestroy() {
    this.H0i = undefined;
    this.$Tt = undefined;
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  OnTick(e) {
    this.H0i.Tick(e);
  }
  GYt() {
    var e = this.$Tt.GetRewardInfo().Title;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(4).SetUIActive(e);
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
  Q0i() {
    var e = this.$Tt.GetRewardInfo().TitleIconPath;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    var t = this.GetTexture(2);
    var i = this.GetTexture(3);
    t.SetUIActive(e);
    i.SetUIActive(e);
    return e;
  }
  X0i() {
    var e = this.$Tt.GetRewardInfo().TitleIconPath;
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      const t = this.GetTexture(2);
      t.SetUIActive(false);
      this.SetTextureByPath(e, t, undefined, () => {
        t.SetUIActive(true);
      });
    }
  }
  NYt() {
    var e = this.$Tt.GetRewardInfo().ContinueText;
    var e = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(7).SetUIActive(e);
    return e;
  }
  OYt() {
    var e;
    var t = this.$Tt.GetRewardInfo().ContinueText;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = this.GetText(7);
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
  W0i() {
    var e = this.$Tt.GetRewardInfo();
    var t = this.$Tt.GetExtendRewardInfo();
    var e = e.IsProgressVisible;
    var t = t.ProgressQueue;
    var e = e && t !== undefined && t?.length > 0;
    this.H0i.SetActive(e);
    return e;
  }
  K0i() {
    var e = this.$Tt.GetRewardInfo();
    var t = this.$Tt.GetExtendRewardInfo().ProgressQueue;
    if (t && t.length !== 0) {
      this.H0i.Refresh(e.ProgressBarTitle, t, e.ProgressBarAnimationTime);
    }
  }
}
exports.CompositeRewardView = CompositeRewardView;
//# sourceMappingURL=CompositeRewardView.js.map