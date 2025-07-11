"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookEntranceView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
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
      var e = HandBookController_1.HandBookController.GetAllCollectProgress();
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", e[0], e[1]);
      this.GetText(1)?.SetUIActive(false);
      HandBookController_1.HandBookController.SendIllustratedRedDotRequest();
    };
    this.OnHandBookRedDotUpdate = () => {
      var t = this.qei.length;
      for (let e = 0; e < t; e++) {
        this.qei[e].RefreshRedDot();
      }
    };
    this.InitVerticalLayout = () => {
      var e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfigList());
      e.sort(this.aei);
      this.bei = e;
      this.xqe ||= new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.sGe);
      this.xqe.ClearChildren();
      this.xqe.RefreshByData(this.bei);
    };
    this.sGe = (e, t, i) => {
      t = new HandBookEntranceItem_1.HandBookEntranceItem(t);
      t.Refresh(e, false, i);
      this.qei.push(t);
      return {
        Key: i,
        Value: t
      };
    };
    this.aei = (e, t) => e.Id - t.Id;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("HandBookEntranceView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem]];
  }
  OnStart() {
    this.InitCommonTabTitle();
    this.AddEvents();
    this.InitData();
  }
  InitData() {
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
    HandBookController_1.HandBookController.SendIllustratedInfoRequest(e);
  }
  OnAfterShow() {
    HandBookController_1.HandBookController.SendIllustratedRedDotRequest();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRedDotUpdate, this.OnHandBookRedDotUpdate);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataInit, this.OnHandBookDataInit);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRedDotUpdate, this.OnHandBookRedDotUpdate);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataInit, this.OnHandBookDataInit);
  }
  InitCommonTabTitle() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("HandBookEntrance");
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("HandBookEntrance");
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(t);
    this.lqe.SetTitleIcon(e);
  }
  OnBeforeDestroy() {
    this.RemoveEvents();
    if (this.xqe) {
      this.xqe.ClearChildren();
      this.xqe = undefined;
    }
    this.bei = [];
    this.qei = [];
  }
}
exports.HandBookEntranceView = HandBookEntranceView;
//# sourceMappingURL=HandBookEntranceView.js.map