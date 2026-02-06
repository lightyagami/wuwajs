"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrArchiveMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const InfrArchiveCollectCardItem_1 = require("./InfrArchiveCollectCardItem");
const InfrArchiveMenuItem_1 = require("./InfrArchiveMenuItem");
const InfrArchiveRoleCardItem_1 = require("./InfrArchiveRoleCardItem");
class InfrArchiveMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.p5m = undefined;
    this.v5m = undefined;
    this.y5m = undefined;
    this.aOm = 1;
    this.S5m = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.InfrastructureModel.GetScoreRewardData(), (e, r) => {
        if (e && UiManager_1.UiManager.IsViewShow("InfrArchiveMainView")) {
          UiManager_1.UiManager.GetViewByName("InfrArchiveMainView")?.AddChildViewById(r);
        }
      });
    };
    this.rQm = () => {
      this.w5m();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[4, this.S5m]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureArchiveReadUpdate, this.rQm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureArchiveReadUpdate, this.rQm);
  }
  async OnBeforeStartAsync() {
    this.E5m();
    this.I5m();
    await Promise.all([this.e7a(), this.M5m()]);
  }
  OnStart() {
    this.cQa();
    this.b5m();
    this.BNe();
    this.p5m.GetLayoutItemList()[0].SetToggleSelected(1);
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindRedDot("InfrArchive");
  }
  b5m() {
    switch (this.aOm) {
      case 1:
        this.R5m();
        break;
      case 0:
        this.w5m();
    }
    this.v5m.SetActive(this.aOm === 1);
    this.y5m.SetActive(this.aOm === 0);
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async M5m() {
    this.p5m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => {
      var e = new InfrArchiveMenuItem_1.InfrArchiveMenuItem();
      e.SetToggleClickCb(e => {
        this.L5m(e);
      });
      return e;
    });
    await this.p5m.RefreshByDataAsync([{
      CardType: 1,
      DesText: "BuildRoadFile_MessagePage"
    }, {
      CardType: 0,
      DesText: "BuildRoadFile_RecordsPage"
    }]);
  }
  E5m() {
    this.v5m = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), () => {
      var e = new InfrArchiveRoleCardItem_1.InfrArchiveRoleCardItem();
      e.SetSelectedCallBack(e => {
        this.P5m(e);
      });
      return e;
    });
  }
  I5m() {
    this.y5m = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), () => new InfrArchiveCollectCardItem_1.InfrArchiveCollectCardItem());
  }
  cQa() {
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi.SetHelpBtnActive(false);
  }
  R5m() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrPhoneMessageConfigList();
    const a = ModelManager_1.ModelManager.PhoneMsgModel;
    e = e.map(e => e.Id).sort((e, r) => {
      var i = a.IsPhoneMsgUnlock(e) ? 0 : 1;
      var t = a.IsPhoneMsgUnlock(r) ? 0 : 1;
      if (i != t) {
        return i - t;
      } else {
        return e - r;
      }
    });
    this.v5m.RefreshByData(e);
  }
  w5m() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemIdConfigList().map(e => e.Id).sort((e, r) => {
      var i = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemConfig(e);
      var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.ItemId) > 0 ? 0 : 1;
      var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemConfig(r);
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId) > 0 ? 0 : 1;
      if (i != t) {
        return i - t;
      } else {
        return e - r;
      }
    });
    this.y5m.RefreshByData(e);
  }
  L5m(r) {
    this.aOm = r;
    this.p5m?.GetLayoutItemList().filter(e => e.CardType !== r).forEach(e => {
      e.SetToggleSelected(0);
    });
    this.b5m();
  }
  P5m(e) {
    var e = this.v5m.GetScrollItemByIndex(e);
    if (ModelManager_1.ModelManager.PhoneMsgModel.IsPhoneMsgUnlock(e.MsgId)) {
      e = {
        ShortMessage: ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(e.MsgId),
        NeedShowTips: false,
        OpenWay: Number(5),
        ViewType: Number(1)
      };
      UiManager_1.UiManager.OpenView("PhoneMsgPanelViewBig", e);
    }
  }
  BNe() {
    var e = this.GetItem(10);
    RedDotController_1.RedDotController.BindRedDot("InfrArchive", e, undefined);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var r;
    if (e.length !== 0 && e[0] === "MenuItem") {
      r = Number(e[1]);
      return this.p5m?.GetLayoutItemByIndex(r)?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
}
exports.InfrArchiveMainView = InfrArchiveMainView;
//# sourceMappingURL=InfrArchiveMainView.js.map