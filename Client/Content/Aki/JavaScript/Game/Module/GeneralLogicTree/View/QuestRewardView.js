"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestRewardView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestRewardItemList_1 = require("./QuestRewardItemList");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
class QuestRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.sOe = undefined;
    this.dSt = () => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.BYt = e => {
      if (this.bYt()) {
        this.qYt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.dSt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeChildView, this.dSt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshRewardViewItemList, this.BYt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeChildView, this.dSt);
  }
  OnStart() {
    var e = this.OpenParam;
    if (e) {
      this.$Tt = e;
      this.sOe = new QuestRewardItemList_1.QuestRewardItemList(this.GetItem(3).GetOwner());
      if (this.GYt()) {
        this.mGe();
      }
      if (this.NYt()) {
        this.OYt();
      }
      if (this.bYt()) {
        this.qYt();
      }
      e = e.GetRewardInfo().AudioId;
      ItemRewardController_1.ItemRewardController.PlayAudio(e);
    }
  }
  OnAfterDestroy() {
    this.$Tt = undefined;
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
  }
  OnBeforeDestroyImplement() {
    this.$Tt.GetRewardInfo().OnCloseCallback?.();
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
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
    this.GetText(4).SetUIActive(e);
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
exports.QuestRewardView = QuestRewardView;
//# sourceMappingURL=QuestRewardView.js.map