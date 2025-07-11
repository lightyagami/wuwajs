"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingHandBookRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const FishingHandBookRewardItem_1 = require("./FishingHandBookRewardItem");
class FishingHandBookRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.NGt = undefined;
    this.jWt = () => {
      return new FishingHandBookRewardItem_1.FishingHandBookRewardItem();
    };
    this.ck_ = () => {
      this.v4e();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshHandBookRewardView, this.ck_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshHandBookRewardView, this.ck_);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  OnStart() {
    this.NGt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.jWt);
    this.v4e();
  }
  v4e() {
    var e = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookRewardMap;
    var e = Array.from(e.values());
    e.sort((e, t) => {
      return (e.IsTaken ? 2 : e.IsFinished ? 0 : 1) - (t.IsTaken ? 2 : t.IsFinished ? 0 : 1);
    });
    var t = [];
    for (const i of e) {
      t.push(i.Id);
    }
    this.NGt.RefreshByData(t, () => {
      this.NGt?.GetUiAnimController()?.Play();
    });
  }
}
exports.FishingHandBookRewardView = FishingHandBookRewardView;
//# sourceMappingURL=FishingHandBookRewardView.js.map