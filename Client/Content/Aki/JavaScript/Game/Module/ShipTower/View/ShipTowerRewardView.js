"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRewardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ShipTowerAreaItem_1 = require("./ShipTowerAreaItem");
const ShipTowerRewardItem_1 = require("./ShipTowerRewardItem");
class ShipTowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.zJa = undefined;
    this.PA_ = undefined;
    this.xA_ = undefined;
    this.uA_ = undefined;
    this.iJl = undefined;
    this.OW_ = true;
    this.n9_ = e => {
      if (e === "Start") {
        this.PA_?.SelectGridProxy(this.kA_());
      }
    };
    this.UA_ = () => {
      var e = new ShipTowerAreaItem_1.ShipTowerAreaItem();
      e.ClickCallBack = this.DA_;
      return e;
    };
    this.rOe = () => {
      var e = new ShipTowerRewardItem_1.ShipTowerRewardItem();
      e.ClickCallBack = this.u6e;
      return e;
    };
    this.DA_ = e => {
      this.iJl = e;
      this.xA_?.RefreshByData(e.RewardList, undefined, undefined, this.OW_);
      this.OW_ = true;
    };
    this.u6e = e => {
      var t = this.iJl?.RewardList.filter(e => e.IsReceive)?.map(e => e.Id) ?? [];
      ModelManager_1.ModelManager.ShipTowerModel.ReceiveAward(e.Id, t);
    };
    this.BA_ = e => {
      if (this.iJl && (this.PA_?.RefreshByData(this.uA_, true, () => {
        this.OW_ = false;
        this.PA_?.DeselectCurrentGridProxy();
        this.PA_?.SelectGridProxy(this.dq_());
      }), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Temp", 69, "", ["EventRewardReceive", e], ["SelectId", this.iJl?.Id]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem]];
  }
  Es_() {
    this.uA_ = ModelManager_1.ModelManager.ShipTowerModel.GetAreaList();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    await this.s1c();
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.CloseMe.bind(this));
    this.zJa.SetHelpBtnActive(false);
    this.PA_ = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(3).GetOwner(), this.UA_, true);
    this.xA_ = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(4).GetOwner(), this.rOe, true);
    await this.PA_.RefreshByDataAsync(this.uA_);
  }
  async s1c() {
    if (!UiManager_1.UiManager.IsViewOpen("ShipTowerView")) {
      await ModelManager_1.ModelManager.ShipTowerModel.CheckIsNeedShowSeasonReview();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerRewardReceive, this.BA_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.n9_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerRewardReceive, this.BA_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.n9_);
  }
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  kA_() {
    if (!this.OpenParam?.RewardId) {
      return this.dq_();
    }
    const t = this.OpenParam.RewardId;
    var e = this.uA_.findIndex(e => e.RewardList.some(e => e.Id === t));
    return this.mq_(e);
  }
  dq_() {
    var e = this.uA_.findIndex(e => e.RewardList.some(e => e.IsReceive));
    return this.mq_(e);
  }
  mq_(e) {
    if (e === -1) {
      return 0;
    } else {
      return e;
    }
  }
}
exports.ShipTowerRewardView = ShipTowerRewardView;
//# sourceMappingURL=ShipTowerRewardView.js.map