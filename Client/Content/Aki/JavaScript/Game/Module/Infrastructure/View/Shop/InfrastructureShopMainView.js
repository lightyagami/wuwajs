"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureShopMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
const InfrastructureShopItem_1 = require("./InfrastructureShopItem");
const InfrastructureShopMenuItem_1 = require("./InfrastructureShopMenuItem");
class InfrastructureShopMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.qVl = 0;
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem();
    this.mVm = undefined;
    this.fVm = undefined;
    this.gVm = e => {
      this.mVm.GetLayoutItemList().forEach(e => {
        if (e.Level === this.qVl) {
          e.SetDeselect();
        }
      });
      this.qVl = e;
      this.CVm();
    };
    this.YFi = () => {
      this.CVm();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.YFi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.YFi);
  }
  mjm() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetAllLevelConfigs().filter(e => e.Level > 1).map(e => e.Level).sort((e, t) => e - t);
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopInfo(true);
    await Promise.all([this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.fjm()]);
    await this.cQa();
    this.vVm();
  }
  async cQa() {
    this.dqc.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.dqc.SetHelpBtnActive(false);
    await this.dqc.SetCurrencyItemList([InfrastructureDefine_1.INFR_SHOP_CURRENCY_ID]);
  }
  async fjm() {
    this.mVm = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => {
      var e = new InfrastructureShopMenuItem_1.InfrastructureShopMenuItem();
      e.SetOnClickToggleItem(this.gVm);
      return e;
    });
    await this.mVm.RefreshByDataAsync(this.mjm());
  }
  vVm() {
    this.fVm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), () => {
      return new InfrastructureShopItem_1.InfrastructureShopItem();
    });
  }
  OnStart() {
    ModelManager_1.ModelManager.InfrastructureModel.RefreshShopHasNewRedDot();
    this.qVl = this.mjm()[0];
    this.CVm();
    this.gjm();
    this.mVm.GetLayoutItemList().forEach(e => {
      if (e.Level === this.qVl) {
        e.SetSelect();
      }
    });
  }
  CVm() {
    var e = ModelManager_1.ModelManager.InfrastructureModel.GetShopDataList(this.qVl);
    this.fVm.RefreshByData(e);
  }
  gjm() {}
}
exports.InfrastructureShopMainView = InfrastructureShopMainView;
//# sourceMappingURL=InfrastructureShopMainView.js.map