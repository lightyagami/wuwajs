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
    this.Ydg = 0;
    this.lqe = undefined;
    this.alf = undefined;
    this.kNf = undefined;
    this.hlf = undefined;
    this.sEf = [];
    this.Hea = undefined;
    this.llf = () => {
      var e = new PhoneSystemChatPartnerTabItem_1.PhoneSystemChatPartnerTabItem();
      e.SetClickCallBack(this.aEf);
      e.SetRefreshMainPanelFunc(this.OnSelectUpdateChatPanel);
      return e;
    };
    this.aEf = e => {
      if (this.hlf.GetSelectedIndex() === e) {
        this.hlf.GetGenericLayout().DeselectCurrentGridProxy();
      } else {
        this.hlf.SelectGridProxy(e);
      }
    };
    this.OnSelectUpdateChatPanel = (e, t) => {
      this.kNf = t;
      this.CheckAndCloseTips(e);
      if (this.Ydg !== e) {
        this.Ydg = e;
        this.UpdateChatPanel(e);
      }
    };
    this.OnHandleMessagesToDelete = () => {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Message_ForceCloseTips");
      this.CloseMe();
    };
    this.RefreshCurSelectChatTabTextShow = e => {
      if (this.kNf) {
        this.kNf.SetShowChatText(e);
      }
    };
    this.OnBeforeMsgChange = e => {
      var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(e)?.WhichChat;
      if (t &&= this.hlf?.GetScrollItemByKey(t)) {
        t.RefreshShowChatText(e);
      }
    };
    this.UpdateChatPanel = e => {
      var t = ModelManager_1.ModelManager.PhoneMsgModel.CreateShortMessageDisplayDataByShortMsgId(e);
      if (t) {
        ControllerHolder_1.ControllerHolder.PhoneMsgController.TopPanelCheckAndPopHead(e);
        this.alf?.RefreshByData(t);
        this.alf?.SetUiActive(true);
        if (this.GetItem(1).IsUIActiveSelf()) {
          this.GetItem(1).SetUIActive(false);
        }
        this.Hea?.StopSequenceByKey("Null_to_Talk");
        this.Hea?.PlayLevelSequenceByName("Null_to_Talk");
        this.alf?.LogReport(e, 1);
      }
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.ulf = () => {
      if (this.alf.GetIsPlaying) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Message_ForbidSetting");
      } else {
        UiManager_1.UiManager.OpenView("PhoneMsgSettingView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.ulf]];
  }
  async OnBeforeStartAsync() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgPanelOpen);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.alf = new PhoneSystemChatPanel_1.PhoneSystemChatPanel();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = [this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.alf.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())];
    await Promise.all(e);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.GetItem(1).SetUIActive(true);
    this.alf.SetUiActive(false);
    this.alf.OnAfterOneMsgShow = this.RefreshCurSelectChatTabTextShow;
    this.alf.OnBeforeMsgChange = this.OnBeforeMsgChange;
    this.q5f();
    await this.O5f();
    var e = this.OpenParam;
    if (e) {
      this.zdg(e.OpenWay, e.ViewType);
      if (e.ShortMessage) {
        var t;
        var e = e.ShortMessage;
        var i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(e.WhichChat);
        if (i) {
          for (let e = 0; e < this.sEf.length; e++) {
            if (this.sEf[e].ChatPartnerId === i.Id) {
              this.hlf.SelectGridProxy(e);
              t = this.hlf.GetItemByIndex(e);
              this.hlf.LateScrollTo(t);
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
  q5f() {
    var e = ModelManager_1.ModelManager.PhoneMsgModel.GetAllChatPartnerIds();
    this.sEf = [];
    for (const i of e) {
      var t = new PhoneSystemDefine_1.ChatPartnerTabItemData(i);
      this.sEf.push(t);
    }
  }
  async O5f() {
    this.hlf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.llf, undefined, true);
    await this.hlf.RefreshByDataAsync(this.sEf);
  }
  CheckAndCloseTips(e) {}
  zdg(e, t) {
    var i = new LogReportDefine_1.OnOpenPhoneViewLogEvent();
    i.i_open_way = e;
    i.i_reason = t;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
  }
}
exports.PhoneMsgPanelViewBig = PhoneMsgPanelViewBig;
//# sourceMappingURL=PhoneMsgPanelViewBig.js.map