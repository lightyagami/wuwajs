"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookEntranceView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const HandBookController_1 = require("./HandBookController");
const HandBookEntranceItem_1 = require("./HandBookEntranceItem");
class HandBookEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.bei = [];
    this.xqe = undefined;
    this.qei = [];
    this.lqe = undefined;
    this.OnHandBookDataInit = () => {
      this.InitVerticalLayout();
      this.GetText(1)?.SetUIActive(false);
    };
    this.OnHandBookRedDotUpdate = () => {
      var i = this.qei.length;
      for (let e = 0; e < i; e++) {
        this.qei[e].RefreshRedDot();
      }
    };
    this.InitVerticalLayout = () => {
      var e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfigList());
      e.sort(this.aei);
      this.bei = e;
      this.xqe ||= new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.sGe);
      this.xqe.RefreshByData(this.bei);
      const i = this.OpenParam;
      if (i && i.SelectedTabType !== undefined && (e = this.bei.findIndex(e => e.Id === i.SelectedTabType), e = this.xqe.GetItemByIndex(e))) {
        this.xqe?.LateScrollTo(e);
      }
    };
    this.sGe = () => {
      var e = new HandBookEntranceItem_1.HandBookEntranceItem();
      this.qei.push(e);
      return e;
    };
    this.aei = (e, i) => e.SortId - i.SortId;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("HandBookEntranceView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(0);
    e.push(1);
    e.push(2);
    e.push(3);
    e.push(4);
    e.push(5);
    e.push(6);
    e.push(7);
    e.push(11);
    var i = [];
    i.push(HandBookController_1.HandBookController.SendIllustratedInfoRequest(e));
    i.push(HandBookController_1.HandBookController.SendIllustratedRedDotRequest());
    i.push(HandBookController_1.HandBookController.RoleIllustratedInfoRequest());
    await Promise.all(i);
  }
  OnStart() {
    this.InitCommonTabTitle();
    this.OnHandBookRedDotUpdate();
    this.OnHandBookDataInit();
  }
  OnBeforeShow() {
    HandBookController_1.HandBookController.SendIllustratedRedDotRequest().then(() => {
      this.OnHandBookRedDotUpdate();
    });
  }
  InitCommonTabTitle() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("HandBookEntrance");
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("HandBookEntrance");
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(i);
    this.lqe.SetTitleIcon(e);
  }
  OnBeforeDestroy() {
    this.bei = [];
    this.qei = [];
  }
}
exports.HandBookEntranceView = HandBookEntranceView;
//# sourceMappingURL=HandBookEntranceView.js.map