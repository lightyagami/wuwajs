"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRewardViewEnergy = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const DreamLinkController_1 = require("../DreamLinkController");
const DreamLinkRewardEnergyItem_1 = require("./SubView/DreamLinkRewardEnergyItem");
class DreamLinkRewardViewEnergy extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.boh = undefined;
    this.Otl = undefined;
    this.qoh = undefined;
    this.VOe = () => {
      var e = new DreamLinkRewardEnergyItem_1.DreamLinkRewardEnergyItem();
      e.SetBtnClickCallback(() => {
        var e = this.boh.GetEnergyRewardDataList();
        DreamLinkController_1.DreamLinkController.MultiEnergyRewardRequest(e.filter(e => e.Status === 0).map(e => e.Id));
      });
      return e;
    };
    this.gcl = () => {
      this.v4e();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.Otl.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.VOe);
    await Promise.all(e);
  }
  OnStart() {
    this.boh = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
  }
  OnBeforeShow() {
    this.v4e();
    this.ktl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DreamLinkRewardRefresh, this.gcl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DreamLinkRewardRefresh, this.gcl);
  }
  async v4e() {
    var i = this.boh.GetEnergyRewardDataList();
    await this.qoh.RefreshByDataAsync(i, true);
    let t = 0;
    for (let e = 0; e < i.length; e++) {
      if (i[e].Status !== 2) {
        t = e;
        break;
      }
    }
    var e = Math.min(t + 2, i.length - 1);
    var e = this.qoh.GetItemByIndex(e);
    if (e) {
      this.qoh.LateScrollTo(e);
    }
  }
  ktl() {
    var e = this.boh.MaxEnergy;
    var i = this.boh.GetEnergyItemCount();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "DreamLink_Reward_Ins_Progress", i, e);
  }
}
exports.DreamLinkRewardViewEnergy = DreamLinkRewardViewEnergy;
//# sourceMappingURL=DreamLinkRewardViewEnergy.js.map