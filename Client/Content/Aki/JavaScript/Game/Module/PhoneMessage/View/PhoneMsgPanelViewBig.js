"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgPanelViewBig = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const PhoneSystemDefine_1 = require("../PhoneSystemDefine");
const PhoneSystemChatPanel_1 = require("./PhoneSystemChatPanel");
const PhoneSystemChatPartnerTabItem_1 = require("./PhoneSystemChatPartnerTabItem");
class PhoneMsgPanelViewBig extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.qYf = 0;
    this.lqe = undefined;
    this.xsf = undefined;
    this.WBf = undefined;
    this.Bsf = undefined;
    this.Kvf = [];
    this.Hea = undefined;
    this.ksf = () => {
      var e = new PhoneSystemChatPartnerTabItem_1.PhoneSystemChatPartnerTabItem();
      e.SetClickCallBack(this.Xvf);
      e.SetRefreshMainPanelFunc(this.OnSelectUpdateChatPanel);
      return e;
    };
    this.Xvf = e => {
      if (this.Bsf.GetSelectedIndex() === e) {
        this.Bsf.GetGenericLayout().DeselectCurrentGridProxy();
      } else {
        this.Bsf.SelectGridProxy(e);
      }
    };
    this.OnSelectUpdateChatPanel = (e, t) => {
      this.WBf = t;
      this.CheckAndCloseTips(e);
      if (this.qYf !== e) {
        this.qYf = e;
        this.UpdateChatPanel(e);
      }
    };
    this.OnHandleMessagesToDelete = () => {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Message_ForceCloseTips");
      this.CloseMe();
    };
    this.RefreshCurSelectChatTabTextShow = e => {
      if (this.WBf) {
        this.WBf.SetShowChatText(e);
      }
    };
    this.OnBeforeMsgChange = e => {
      var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(e)?.WhichChat;
      if (t &&= this.Bsf?.GetScrollItemByKey(t)) {
        t.RefreshShowChatText(e);
      }
    };
    this.UpdateChatPanel = e => {
      var t = ModelManager_1.ModelManager.PhoneMsgModel.CreateShortMessageDisplayDataByShortMsgId(e);
      if (t) {
        ControllerHolder_1.ControllerHolder.PhoneMsgController.TopPanelCheckAndPopHead(e);
        this.xsf?.RefreshByData(t);
        this.xsf?.SetUiActive(true);
        if (this.GetItem(1).IsUIActiveSelf()) {
          this.GetItem(1).SetUIActive(false);
        }
        this.Hea?.StopSequenceByKey("Null_to_Talk");
        this.Hea?.PlayLevelSequenceByName("Null_to_Talk");
        this.xsf?.LogReport(e, 1);
      }
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.Osf = () => {
      if (this.xsf.GetIsPlaying) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Message_ForbidSetting");
      } else {
        UiManager_1.UiManager.OpenView("PhoneMsgSettingView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.Osf]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.xsf = new PhoneSystemChatPanel_1.PhoneSystemChatPanel();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = [this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.xsf.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())];
    await Promise.all(e);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.GetItem(1).SetUIActive(true);
    this.xsf.SetUiActive(false);
    this.xsf.OnAfterOneMsgShow = this.RefreshCurSelectChatTabTextShow;
    this.xsf.OnBeforeMsgChange = this.OnBeforeMsgChange;
    this.Z2f();
    await this.eqf();
    var e = this.OpenParam;
    if (e) {
      this.OYf(e.OpenWay, e.ViewType);
      if (e.ShortMessage) {
        var t;
        var e = e.ShortMessage;
        var i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(e.WhichChat);
        if (i) {
          for (let e = 0; e < this.Kvf.length; e++) {
            if (this.Kvf[e].ChatPartnerId === i.Id) {
              this.Bsf.SelectGridProxy(e);
              t = this.Bsf.GetItemByIndex(e);
              this.Bsf.LateScrollTo(t);
            }
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgChatTabClick, e.Id, i.Id);
          this.UpdateChatPanel(e.Id);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("PhoneSystem", 43, "打开手机界面PhoneMsgPanelViewBig时OpenParam未定义，埋点上报不生效！");
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneHaveMsgToRemove, this.OnHandleMessagesToDelete);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneHaveMsgToRemove, this.OnHandleMessagesToDelete);
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
  Z2f() {
    var e = ModelManager_1.ModelManager.PhoneMsgModel.GetAllChatPartnerIds();
    this.Kvf = [];
    for (const i of e) {
      var t = new PhoneSystemDefine_1.ChatPartnerTabItemData(i);
      this.Kvf.push(t);
    }
  }
  async eqf() {
    this.Bsf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.ksf, undefined, true);
    await this.Bsf.RefreshByDataAsync(this.Kvf);
  }
  CheckAndCloseTips(e) {}
  OYf(e, t) {
    var i = new LogReportDefine_1.OnOpenPhoneViewLogEvent();
    i.i_open_way = e;
    i.i_reason = t;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
  }
}
exports.PhoneMsgPanelViewBig = PhoneMsgPanelViewBig;
//# sourceMappingURL=PhoneMsgPanelViewBig.js.map