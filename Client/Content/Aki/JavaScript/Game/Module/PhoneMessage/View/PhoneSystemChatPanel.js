"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneSystemChatPanel = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MultiTemplateComponent_1 = require("../../Util/ScrollView/MultiTemplateComponent");
const PhoneMsgController_1 = require("../PhoneMsgController");
const PhoneSystemChatItem_1 = require("./PhoneSystemChatItem");
class PhoneSystemChatPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ubf = undefined;
    this.cbf = [];
    this.Rqe = undefined;
    this.Owf = false;
    this.Gwf = false;
    this.Fwf = false;
    this.j4f = false;
    this.s6f = false;
    this.sye = false;
    this.hCf = undefined;
    this.OnAfterOneMsgShow = undefined;
    this.OnMsgReadFinished = undefined;
    this.OnBeforeMsgChange = undefined;
    this.J_ = t => {
      if (this.Gwf) {
        this.Vwf(this.cbf.length - 1, this.Fwf);
        this.Gwf = false;
      }
    };
    this.Hwf = () => {
      if (this.s6f) {
        this.GetScrollViewWithScrollbar(4).ScrollToEnd();
        this.s6f = false;
        this.Owf = false;
        this.Gwf = false;
      }
      if (this.Owf) {
        this.Gwf = true;
        this.Owf = false;
      }
      if (this.j4f && this.$4f()) {
        this.GetVerticalLayout(5)?.SetHeightFitToChildren(true);
        this.j4f = false;
      }
    };
    this.Mxf = () => {
      var t = ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatBgId;
      var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatBgConfig(t).BgPath;
      this.SetTextureByPath(t, this.GetTexture(6));
    };
    this.jtf = () => {
      this.yPf();
    };
    this.HKf = async t => {
      var i = this.ubf;
      if (i.ReadIndex >= i.ChatDataList.length - 1) {
        i.ReadIndex = i.ChatDataList.length - 1;
      } else {
        i.ReadIndex = t;
      }
      return Promise.resolve();
    };
    this.pOf = async t => {
      var i = this.ubf;
      if (!(t > i.ChatDataList.length - 1)) {
        if (i = this.lCf(i.ChatDataList[t])) {
          this.cbf.push(i);
          this.hCf.RefreshByData(this.cbf);
        }
      }
      return Promise.resolve();
    };
    this.vOf = async t => {
      if (this.hCf.GetTemplateIndexByDisplayIndex(t) === 0) {
        t = this.hCf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayInputtingAnimationAsync(), this.vbf()]);
      }
    };
    this.yOf = async t => {
      var i = this.hCf.GetTemplateIndexByDisplayIndex(t);
      if (i === 0 || i === 1) {
        var s = this.hCf.GetProxyByDisplayIndex(t);
        if (this.OnAfterOneMsgShow) {
          t = ModelManager_1.ModelManager.PhoneMsgModel.GetLastChatTextByDisplayData(this.ubf);
          this.OnAfterOneMsgShow(t);
        }
        switch (i) {
          case 0:
            var e = s;
            e.RefreshDisplayItem();
            await Promise.all([this.vbf(), e.PlayChatContentAnimationAsync()]);
            break;
          case 1:
            await Promise.all([this.vbf(), s.PlayChatContentAnimationAsync()]);
        }
      }
    };
    this.SOf = async t => {
      if (this.hCf.GetTemplateIndexByDisplayIndex(t) === 2) {
        t = this.hCf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayTipsAnimationAsync(), this.vbf()]);
      }
    };
    this.MOf = async t => {
      if (this.hCf.GetTemplateIndexByDisplayIndex(t) === 5) {
        t = this.hCf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayRewardAnimationAsync(), this.vbf()]);
      }
    };
    this.EOf = async t => {
      if (this.hCf.GetTemplateIndexByDisplayIndex(t) === 4) {
        t = this.hCf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayBirthdayAnimationAsync(), this.vbf()]);
      }
    };
    this.IOf = async t => {
      if (this.hCf.GetTemplateIndexByDisplayIndex(t) === 3) {
        t = this.hCf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayTaskAnimationAsync(), this.vbf()]);
      }
    };
    this.Tbf = async () => {
      var t = new PhoneSystemChatItem_1.EndLineChatGridData(true);
      this.cbf.push(t);
      this.hCf.RefreshByData(this.cbf);
      await this.vbf();
    };
    this.BOf = t => {
      if (t === 1) {
        this.kOf();
      }
    };
    this.bbf = async () => {
      this.GetItem(14)?.SetUIActive(true);
      this.sye = true;
      return Promise.resolve();
    };
    this.qOf = t => {
      this.GetItem(14)?.SetUIActive(false);
      this.sye = false;
    };
    this.wbf = async () => {
      this.GetItem(14)?.SetUIActive(false);
      this.sye = false;
      return Promise.resolve();
    };
    this.OOf = t => {
      if (t === 1) {
        this.GetItem(14)?.SetUIActive(false);
        this.sye = false;
      }
    };
    this.Lbf = async t => {
      await this.Pbf(t);
    };
    this.Rbf = async () => {
      this.OnMsgReadFinished?.(this.ubf.ShortMsgId);
      return Promise.resolve();
    };
    this.EPf = async (t, i) => {
      if (this.ubf && (t = this.ubf.ChatDataList[t]) !== undefined && (t = t.TalkItem?.Id) !== undefined && (t = this.ubf.IdToIndexMap.get(t)) !== undefined) {
        await ControllerHolder_1.ControllerHolder.PhoneMsgController.ShortMessageReplyAsync(this.ubf.ShortMsgId, t, i);
        this.ubf.OptionSelectedMap.set(t, i);
        ModelManager_1.ModelManager.PhoneMsgModel.ProcessAfterAnswer(this.ubf, t);
      }
    };
    this.W4f = async t => {
      t = this.hCf.GetProxyByDisplayIndex(t);
      if (t) {
        if (!this.Q4f()) {
          this.j4f = true;
          this.GetVerticalLayout(5)?.SetHeightFitToChildren(false);
        }
        await t?.PlayOptionHideAnimationAsync();
      }
    };
    this.K4f = (t, i) => {
      if (t === 1) {
        this.hCf.GetProxyByDisplayIndex(i)?.StopOptionHideAnimation();
        this.j4f = false;
        this.GetVerticalLayout(5)?.SetHeightFitToChildren(true);
      }
    };
    this.X4f = async t => {
      var i;
      var s = this.hCf.GetProxyByDisplayIndex(t);
      if (s && (i = this.ubf.ChatDataList[t]) !== undefined) {
        s = s;
        this.cbf[t].Data = i;
        s.Refresh(i);
        if (this.OnAfterOneMsgShow) {
          t = ModelManager_1.ModelManager.PhoneMsgModel.GetLastChatTextByDisplayData(this.ubf);
          this.OnAfterOneMsgShow(t);
        }
        await s.PlayChatContentAnimationAsync(true);
      }
    };
    this.Y4f = (t, i) => {
      if (t === 1 && (t = this.hCf.GetProxyByDisplayIndex(i))) {
        t?.StopChatContentAnimation(true);
      }
    };
    this.GOf = async t => {
      this.z4f(t);
      this.J4f(t);
      this.fbf();
      this.gbf();
      return Promise.resolve();
    };
    this.FOf = (t, i) => {
      if (t === 1) {
        this.CancelAllAsyncTask();
      }
    };
    this.IPf = async () => {
      var t;
      var i;
      if ((await ControllerHolder_1.ControllerHolder.PhoneMsgController.ShortMessageReceiveAsync(this.ubf.ShortMsgId)) && (i = this.ubf?.ChatDataList) && (t = i[i.length - 1]) && t.ChatContentType === 2 && t.ContentType === 6 && (t.IsFinish = true, i = this.hCf.GetProxyByDisplayIndex(i.length - 1))) {
        i.Refresh(t);
      }
    };
    this.Z4f = (t, i) => {
      if (this.ubf.ChatDataList[t] !== undefined) {
        this.dbf();
        this.MPf(t, i);
        this.NOf(t);
      }
    };
    this.LogReport = (t, i) => {
      var s = ConfigManager_1.ConfigManager.PhoneMsgConfig;
      var e = ModelManager_1.ModelManager.PhoneMsgModel;
      var h = s.GetPhoneMsgConfig(t);
      var s = s.GetChatPartnerConfig(h.WhichChat);
      var e = e.GetPhoneMsgShortMsgDataByShortMsgId(t);
      var a = new LogReportDefine_1.OnSelectShortMessageLogEvent();
      a.i_id = t;
      a.i_type = s?.IsGroupChat ? 1 : 2;
      a.i_reason = i;
      a.l_received_time = e.UnLockTime.low ?? 0;
      a.i_role_id = h.WhichChat;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a);
    };
  }
  get GetIsPlaying() {
    return this.sye;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIVerticalLayout], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
  }
  OnStart() {
    var t = new Map([[0, this.GetItem(7)], [1, this.GetItem(8)], [2, this.GetItem(9)], [3, this.GetItem(10)], [4, this.GetItem(11)], [5, this.GetItem(12)], [6, this.GetItem(13)]]);
    this.hCf = new MultiTemplateComponent_1.MultiTemplateComponent(this.GetVerticalLayout(5).RootUIComp, t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this.Mxf);
    var t = this.GetText(0);
    t.bGameRichText = true;
    t.richText = true;
  }
  OnBeforeShow() {
    this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "PhoneSystemChatPanel", 0, true, undefined, true);
    this.GetScrollViewWithScrollbar(4).OnLateUpdate.Bind(this.Hwf);
    this.Mxf();
  }
  OnBeforeHide() {
    this.TPf();
    this.jwf();
    this.GetScrollViewWithScrollbar(4).OnLateUpdate.Unbind();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this.Mxf);
    this.jwf();
  }
  Q4f() {
    var t;
    var i = this.GetScrollViewWithScrollbar(4);
    return !!i && !!i.IsValid() && !!(t = this.GetVerticalLayout(5)?.RootUIComp) && !!t.IsValid() && (i = i.RootUIComp.GetHeight(), t.GetHeight() < i);
  }
  $4f() {
    var t;
    var i = this.GetVerticalLayout(5)?.RootUIComp;
    return !!i && !!i.IsValid() && !!(t = this.hCf?.GetItemByDisplayIndex(this.cbf.length - 1)) && !!t.IsValid() && (i = i.GetHeight(), t.GetRelativeTransform().GetLocation().Y + t.GetLocalSpaceBottom() < -i);
  }
  jwf() {
    if (this.Rqe) {
      TickSystem_1.TickSystem.Remove(this.Rqe.Id);
      this.Rqe = undefined;
    }
  }
  UpdateChatDialogData() {
    if (this.ubf) {
      for (const t of this.ubf.ChatDataList) {
        t.ChatDialogId = this.ubf.ChatDialogId;
      }
    }
  }
  UpdateChatScrollViewData() {
    if (this.ubf) {
      var t;
      var i = this.ubf.ChatDataList;
      this.cbf.length = 0;
      var s = this.ubf.ReadIndex;
      if (!(s < 0)) {
        for (let t = 0; t <= s; t++) {
          var e = i[t];
          var e = this.lCf(e);
          if (e) {
            this.cbf.push(e);
          }
        }
        if (this.ubf.IsFinished()) {
          t = new PhoneSystemChatItem_1.EndLineChatGridData(true);
          this.cbf.push(t);
        }
      }
    }
  }
  RefreshChatShow() {
    this.UpdateChatDialogData();
    this.Iaf();
    this.Taf();
  }
  Iaf() {
    if (!((this.ubf?.ChatDialogId ?? 0) <= 0)) {
      this.Aaf();
    }
  }
  Taf() {
    var t = this.ubf?.ChatBgId ?? 0;
    if (!(t <= 0)) {
      if (t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatBgConfig(t)) {
        this.SetTextureByPath(t.BgPath, this.GetTexture(6));
      }
    }
  }
  RefreshByData(t) {
    if (this.ubf) {
      this.EWf();
    }
    this.Reset();
    this.ubf = t;
    this.Daf();
    this.UpdateChatScrollViewData();
    this.Aaf();
    this.GetVerticalLayout(5)?.SetHeightFitToChildren(true);
    this.Pbf(this.ubf);
    if (!this.ubf.IsAllChatRead()) {
      this.dbf();
      this.fbf();
      this.gbf();
    }
  }
  async TPf() {
    if (this.ubf) {
      await this.Pbf(this.ubf);
    }
  }
  async EWf() {
    var t = this.ubf;
    if (t) {
      await this.TPf();
      this.OnBeforeMsgChange?.(t.ShortMsgId);
    }
  }
  Reset() {
    this.CancelAllAsyncTask();
    this.GetItem(14)?.SetUIActive(false);
    this.sye = false;
    this.Owf = false;
    this.Fwf = false;
    this.Gwf = false;
    this.j4f = false;
    this.s6f = false;
  }
  fbf() {
    for (let t = this.ubf.ReadIndex + 1; t < this.ubf.ChatDataList.length; t++) {
      this.Abf(t);
    }
    var t = !this.ubf.IsLastOption();
    if (t) {
      this.Dbf();
    }
    this.xbf(this.ubf);
    if (t) {
      this.Bbf();
    }
  }
  Abf(t) {
    var i = this.ubf.ChatDataList[t];
    var s = i.ChatContentType;
    this.jKf(t);
    if (s === 2 && i.ContentType === 4) {
      this.xbf(this.ubf);
    }
    this.VOf(t);
    switch (s) {
      case 0:
        this.HOf(t);
        this.jOf(t);
        break;
      case 1:
        this.jOf(t);
        break;
      case 2:
        switch (i.ContentType) {
          case 7:
            this.$Of(t);
            break;
          case 4:
            this.WOf(t);
            break;
          case 5:
            this.QOf(t);
            break;
          case 6:
            this.KOf(t);
        }
    }
  }
  Daf() {
    var t;
    if (this.ubf && (t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(this.ubf.ShortMsgId).WhichChat, t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(t))) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
      this.GetText(1).SetUIActive(!t.IsGroupChat);
      this.GetItem(2).SetUIActive(t.IsGroupChat);
      if (t.IsGroupChat) {
        this.GetText(3).SetText(String(t.PeopleNum));
      } else if (t.Desc && t.Desc !== "") {
        this.GetText(1).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Desc);
      } else {
        this.GetText(1).SetUIActive(false);
      }
      this.Taf();
    }
  }
  lCf(t) {
    switch (t.ChatContentType) {
      case 0:
        return new PhoneSystemChatItem_1.OtherChatGridData(t);
      case 1:
        var i = new PhoneSystemChatItem_1.SelfChatGridData(t);
        i.OnOptionItemClickDelegate = this.Z4f;
        return i;
      case 2:
        switch (t.ContentType) {
          case 7:
            return new PhoneSystemChatItem_1.TipsChatGridData(t);
          case 4:
            return new PhoneSystemChatItem_1.TaskChatGridData(t);
          case 5:
            return new PhoneSystemChatItem_1.BirthdayChatGridData(t);
          case 6:
            var s = new PhoneSystemChatItem_1.RewardChatGridData(t);
            s.OnRewardClick = this.jtf;
            return s;
          default:
            return;
        }
    }
  }
  Aaf() {
    this.hCf.RefreshByData(this.cbf);
    this.s6f = true;
  }
  Vwf(t, i = true) {
    var s;
    if (this.hCf && (s = this.GetScrollViewWithScrollbar(4)) && (t = this.hCf.GetItemByDisplayIndex(t))) {
      s.ScrollTo(t, i);
    }
  }
  jKf(t) {
    var i = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.HKf(t));
    this.RunAsyncTask(i);
  }
  VOf(t) {
    var i = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.pOf(t));
    this.RunAsyncTask(i);
  }
  HOf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.vOf(i), t => {
      this.XOf(t, i);
    });
    this.RunAsyncTask(t);
  }
  XOf(t, i) {
    if (t === 1 && this.hCf.GetTemplateIndexByDisplayIndex(i) === 0) {
      if (t = this.hCf.GetProxyByDisplayIndex(i)) {
        t.StopInputtingAnimation();
      }
      this.kOf();
    }
  }
  jOf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.yOf(i), t => {
      this.YOf(t, i);
    });
    this.RunAsyncTask(t);
  }
  YOf(t, i) {
    if (t === 1 && ((t = this.hCf.GetTemplateIndexByDisplayIndex(i)) === 0 || t === 1)) {
      if (t = this.hCf.GetProxyByDisplayIndex(i)) {
        t.StopChatContentAnimation();
      }
      this.kOf();
    }
  }
  $Of(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.SOf(i), t => {
      this.zOf(t, i);
    });
    this.RunAsyncTask(t);
  }
  zOf(t, i) {
    if (t === 1 && this.hCf.GetTemplateIndexByDisplayIndex(i) === 2) {
      if (t = this.hCf.GetProxyByDisplayIndex(i)) {
        t.StopTipsAnimation();
      }
      this.kOf();
    }
  }
  KOf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.MOf(i), t => {
      this.JOf(t, i);
    });
    this.RunAsyncTask(t);
  }
  JOf(t, i) {
    if (t === 1 && this.hCf.GetTemplateIndexByDisplayIndex(i) === 5) {
      if (t = this.hCf.GetProxyByDisplayIndex(i)) {
        t.StopRewardAnimation();
      }
      this.kOf();
    }
  }
  QOf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.EOf(i), t => {
      this.ZOf(t, i);
    });
    this.RunAsyncTask(t);
  }
  ZOf(t, i) {
    if (t === 1 && this.hCf.GetTemplateIndexByDisplayIndex(i) === 4) {
      if (t = this.hCf.GetProxyByDisplayIndex(i)) {
        t.StopBirthdayAnimation();
      }
      this.kOf();
    }
  }
  WOf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.IOf(i), t => {
      this.eGf(t, i);
    });
    this.RunAsyncTask(t);
  }
  eGf(t, i) {
    if (t === 1 && this.hCf.GetTemplateIndexByDisplayIndex(i) === 3) {
      if (t = this.hCf.GetProxyByDisplayIndex(i)) {
        t.StopTaskAnimation();
      }
      this.kOf();
    }
  }
  Dbf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.Tbf, this.BOf);
    this.RunAsyncTask(t);
  }
  dbf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.bbf, this.qOf);
    this.RunAsyncTask(t);
  }
  gbf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.wbf, this.OOf);
    this.RunAsyncTask(t);
  }
  xbf(t) {
    var i = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.Lbf(t));
    this.RunAsyncTask(i);
  }
  async Pbf(t) {
    var i = t.IsFinished();
    var s = t.ShortMsgId;
    await PhoneMsgController_1.PhoneMsgController.UpdateProgressOfOneMessageAsync(s, t.ReadIndex, i);
    if (i) {
      await ControllerHolder_1.ControllerHolder.PhoneMsgController.SetOneMessageAsReadAsync(s);
    }
  }
  Bbf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.Rbf);
    this.RunAsyncTask(t);
  }
  MPf(t, i) {
    var s = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.EPf(t, i));
    this.RunAsyncTask(s);
  }
  z4f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.W4f(i), t => {
      this.K4f(t, i);
    });
    this.RunAsyncTask(t);
  }
  J4f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.X4f(i), t => {
      this.Y4f(t, i);
    });
    this.RunAsyncTask(t);
  }
  NOf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.GOf(i), t => {
      this.FOf(t, i);
    });
    this.RunAsyncTask(t);
  }
  yPf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.IPf);
    this.RunAsyncTask(t);
  }
  async vbf() {
    this.Fwf = true;
    this.Owf = true;
    var t = this.GetScrollViewWithScrollbar(4).ScrollToDuration * 1000;
    await TimerSystem_1.GameplayTimerSystem.Wait(t);
  }
  kOf() {
    this.Fwf = false;
    this.Owf = false;
    this.GetScrollViewWithScrollbar(4).StopMovement();
  }
}
exports.PhoneSystemChatPanel = PhoneSystemChatPanel;
//# sourceMappingURL=PhoneSystemChatPanel.js.map