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
    this.VAf = undefined;
    this.HAf = [];
    this.Rqe = undefined;
    this.hUf = false;
    this.lUf = false;
    this._Uf = false;
    this.CWf = false;
    this.vzf = false;
    this.sye = false;
    this.jvf = undefined;
    this.OnAfterOneMsgShow = undefined;
    this.OnMsgReadFinished = undefined;
    this.OnBeforeMsgChange = undefined;
    this.J_ = t => {
      if (this.lUf) {
        this.cUf(this.HAf.length - 1, this._Uf);
        this.lUf = false;
      }
    };
    this.dUf = () => {
      if (this.vzf) {
        this.GetScrollViewWithScrollbar(4).ScrollToEnd();
        this.vzf = false;
        this.hUf = false;
        this.lUf = false;
      }
      if (this.hUf) {
        this.lUf = true;
        this.hUf = false;
      }
      if (this.CWf && this.pWf()) {
        this.GetVerticalLayout(5)?.SetHeightFitToChildren(true);
        this.CWf = false;
      }
    };
    this._Ff = () => {
      var t = ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatBgId;
      var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatBgConfig(t).BgPath;
      this.SetTextureByPath(t, this.GetTexture(6));
    };
    this.zrf = () => {
      this.n2f();
    };
    this.Jlg = async t => {
      var i = this.VAf;
      if (i.ReadIndex >= i.ChatDataList.length - 1) {
        i.ReadIndex = i.ChatDataList.length - 1;
      } else {
        i.ReadIndex = t;
      }
      return Promise.resolve();
    };
    this.R8f = async t => {
      var i = this.VAf;
      if (!(t > i.ChatDataList.length - 1)) {
        if (i = this.$vf(i.ChatDataList[t])) {
          this.HAf.push(i);
          this.jvf.RefreshByData(this.HAf);
        }
      }
      return Promise.resolve();
    };
    this.L8f = async t => {
      if (this.jvf.GetTemplateIndexByDisplayIndex(t) === 0) {
        t = this.jvf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayInputtingAnimationAsync(), this.YAf()]);
      }
    };
    this.w8f = async t => {
      var i = this.jvf.GetTemplateIndexByDisplayIndex(t);
      if (i === 0 || i === 1) {
        var s = this.jvf.GetProxyByDisplayIndex(t);
        if (this.OnAfterOneMsgShow) {
          t = ModelManager_1.ModelManager.PhoneMsgModel.GetLastChatTextByDisplayData(this.VAf);
          this.OnAfterOneMsgShow(t);
        }
        switch (i) {
          case 0:
            var e = s;
            e.RefreshDisplayItem();
            await Promise.all([this.YAf(), e.PlayChatContentAnimationAsync()]);
            break;
          case 1:
            await Promise.all([this.YAf(), s.PlayChatContentAnimationAsync()]);
        }
      }
    };
    this.P8f = async t => {
      if (this.jvf.GetTemplateIndexByDisplayIndex(t) === 2) {
        t = this.jvf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayTipsAnimationAsync(), this.YAf()]);
      }
    };
    this.A8f = async t => {
      if (this.jvf.GetTemplateIndexByDisplayIndex(t) === 5) {
        t = this.jvf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayRewardAnimationAsync(), this.YAf()]);
      }
    };
    this.D8f = async t => {
      if (this.jvf.GetTemplateIndexByDisplayIndex(t) === 4) {
        t = this.jvf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayBirthdayAnimationAsync(), this.YAf()]);
      }
    };
    this.U8f = async t => {
      if (this.jvf.GetTemplateIndexByDisplayIndex(t) === 3) {
        t = this.jvf.GetProxyByDisplayIndex(t);
        await Promise.all([t.PlayTaskAnimationAsync(), this.YAf()]);
      }
    };
    this.iDf = async () => {
      var t = new PhoneSystemChatItem_1.EndLineChatGridData(true);
      this.HAf.push(t);
      this.jvf.RefreshByData(this.HAf);
      await this.YAf();
    };
    this.j8f = t => {
      if (t === 1) {
        this.$8f();
      }
    };
    this.rDf = async () => {
      this.GetItem(14)?.SetUIActive(true);
      this.sye = true;
      return Promise.resolve();
    };
    this.W8f = t => {
      this.GetItem(14)?.SetUIActive(false);
      this.sye = false;
    };
    this.oDf = async () => {
      this.GetItem(14)?.SetUIActive(false);
      this.sye = false;
      return Promise.resolve();
    };
    this.Q8f = t => {
      if (t === 1) {
        this.GetItem(14)?.SetUIActive(false);
        this.sye = false;
      }
    };
    this.sDf = async t => {
      await this.aDf(t);
    };
    this.nDf = async () => {
      this.OnMsgReadFinished?.(this.VAf.ShortMsgId);
      return Promise.resolve();
    };
    this.h2f = async (t, i) => {
      if (this.VAf && (t = this.VAf.ChatDataList[t]) !== undefined && (t = t.TalkItem?.Id) !== undefined && (t = this.VAf.IdToIndexMap.get(t)) !== undefined) {
        await ControllerHolder_1.ControllerHolder.PhoneMsgController.ShortMessageReplyAsync(this.VAf.ShortMsgId, t, i);
        this.VAf.OptionSelectedMap.set(t, i);
        ModelManager_1.ModelManager.PhoneMsgModel.ProcessAfterAnswer(this.VAf, t);
      }
    };
    this.vWf = async t => {
      t = this.jvf.GetProxyByDisplayIndex(t);
      if (t) {
        if (!this.yWf()) {
          this.CWf = true;
          this.GetVerticalLayout(5)?.SetHeightFitToChildren(false);
        }
        await t?.PlayOptionHideAnimationAsync();
      }
    };
    this.SWf = (t, i) => {
      if (t === 1) {
        this.jvf.GetProxyByDisplayIndex(i)?.StopOptionHideAnimation();
        this.CWf = false;
        this.GetVerticalLayout(5)?.SetHeightFitToChildren(true);
      }
    };
    this.MWf = async t => {
      var i;
      var s = this.jvf.GetProxyByDisplayIndex(t);
      if (s && (i = this.VAf.ChatDataList[t]) !== undefined) {
        s = s;
        this.HAf[t].Data = i;
        s.Refresh(i);
        if (this.OnAfterOneMsgShow) {
          t = ModelManager_1.ModelManager.PhoneMsgModel.GetLastChatTextByDisplayData(this.VAf);
          this.OnAfterOneMsgShow(t);
        }
        await s.PlayChatContentAnimationAsync(true);
      }
    };
    this.EWf = (t, i) => {
      if (t === 1 && (t = this.jvf.GetProxyByDisplayIndex(i))) {
        t?.StopChatContentAnimation(true);
      }
    };
    this.K8f = async t => {
      this.IWf(t);
      this.TWf(t);
      this.WAf();
      this.QAf();
      return Promise.resolve();
    };
    this.X8f = (t, i) => {
      if (t === 1) {
        this.CancelAllAsyncTask();
      }
    };
    this.l2f = async () => {
      var t;
      var i;
      if ((await ControllerHolder_1.ControllerHolder.PhoneMsgController.ShortMessageReceiveAsync(this.VAf.ShortMsgId)) && (i = this.VAf?.ChatDataList) && (t = i[i.length - 1]) && t.ChatContentType === 2 && t.ContentType === 6 && (t.IsFinish = true, i = this.jvf.GetProxyByDisplayIndex(i.length - 1))) {
        i.Refresh(t);
      }
    };
    this.bWf = (t, i) => {
      if (this.VAf.ChatDataList[t] !== undefined) {
        this.jAf();
        this.a2f(t, i);
        this.Y8f(t);
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
    this.jvf = new MultiTemplateComponent_1.MultiTemplateComponent(this.GetVerticalLayout(5).RootUIComp, t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this._Ff);
    var t = this.GetText(0);
    t.bGameRichText = true;
    t.richText = true;
  }
  OnBeforeShow() {
    this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "PhoneSystemChatPanel", 0, true, undefined, true);
    this.GetScrollViewWithScrollbar(4).OnLateUpdate.Bind(this.dUf);
    this._Ff();
  }
  OnBeforeHide() {
    this._2f();
    this.mUf();
    this.GetScrollViewWithScrollbar(4).OnLateUpdate.Unbind();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this._Ff);
    this.mUf();
  }
  yWf() {
    var t;
    var i = this.GetScrollViewWithScrollbar(4);
    return !!i && !!i.IsValid() && !!(t = this.GetVerticalLayout(5)?.RootUIComp) && !!t.IsValid() && (i = i.RootUIComp.GetHeight(), t.GetHeight() < i);
  }
  pWf() {
    var t;
    var i = this.GetVerticalLayout(5)?.RootUIComp;
    return !!i && !!i.IsValid() && !!(t = this.jvf?.GetItemByDisplayIndex(this.HAf.length - 1)) && !!t.IsValid() && (i = i.GetHeight(), t.GetRelativeTransform().GetLocation().Y + t.GetLocalSpaceBottom() < -i);
  }
  mUf() {
    if (this.Rqe) {
      TickSystem_1.TickSystem.Remove(this.Rqe.Id);
      this.Rqe = undefined;
    }
  }
  UpdateChatDialogData() {
    if (this.VAf) {
      for (const t of this.VAf.ChatDataList) {
        t.ChatDialogId = this.VAf.ChatDialogId;
      }
    }
  }
  UpdateChatScrollViewData() {
    if (this.VAf) {
      var t;
      var i = this.VAf.ChatDataList;
      this.HAf.length = 0;
      var s = this.VAf.ReadIndex;
      if (!(s < 0)) {
        for (let t = 0; t <= s; t++) {
          var e = i[t];
          var e = this.$vf(e);
          if (e) {
            this.HAf.push(e);
          }
        }
        if (this.VAf.IsFinished()) {
          t = new PhoneSystemChatItem_1.EndLineChatGridData(true);
          this.HAf.push(t);
        }
      }
    }
  }
  RefreshChatShow() {
    this.UpdateChatDialogData();
    this.zlf();
    this.Jlf();
  }
  zlf() {
    if (!((this.VAf?.ChatDialogId ?? 0) <= 0)) {
      this.o1f();
    }
  }
  Jlf() {
    var t = this.VAf?.ChatBgId ?? 0;
    if (!(t <= 0)) {
      if (t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatBgConfig(t)) {
        this.SetTextureByPath(t.BgPath, this.GetTexture(6));
      }
    }
  }
  RefreshByData(t) {
    if (this.VAf) {
      this.fng();
    }
    this.Reset();
    this.VAf = t;
    this.n1f();
    this.UpdateChatScrollViewData();
    this.o1f();
    this.GetVerticalLayout(5)?.SetHeightFitToChildren(true);
    this.aDf(this.VAf);
    if (!this.VAf.IsAllChatRead()) {
      this.jAf();
      this.WAf();
      this.QAf();
    }
  }
  async _2f() {
    if (this.VAf) {
      await this.aDf(this.VAf);
    }
  }
  async fng() {
    var t = this.VAf;
    if (t) {
      await this._2f();
      this.OnBeforeMsgChange?.(t.ShortMsgId);
    }
  }
  Reset() {
    this.CancelAllAsyncTask();
    this.GetItem(14)?.SetUIActive(false);
    this.sye = false;
    this.hUf = false;
    this._Uf = false;
    this.lUf = false;
    this.CWf = false;
    this.vzf = false;
  }
  WAf() {
    for (let t = this.VAf.ReadIndex + 1; t < this.VAf.ChatDataList.length; t++) {
      this.hDf(t);
    }
    var t = !this.VAf.IsLastOption();
    if (t) {
      this.lDf();
    }
    this.uDf(this.VAf);
    if (t) {
      this.cDf();
    }
  }
  hDf(t) {
    var i = this.VAf.ChatDataList[t];
    var s = i.ChatContentType;
    this.Zlg(t);
    if (s === 2 && i.ContentType === 4) {
      this.uDf(this.VAf);
    }
    this.z8f(t);
    switch (s) {
      case 0:
        this.J8f(t);
        this.Z8f(t);
        break;
      case 1:
        this.Z8f(t);
        break;
      case 2:
        switch (i.ContentType) {
          case 7:
            this.e6f(t);
            break;
          case 4:
            this.t6f(t);
            break;
          case 5:
            this.i6f(t);
            break;
          case 6:
            this.r6f(t);
        }
    }
  }
  n1f() {
    var t;
    if (this.VAf && (t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(this.VAf.ShortMsgId).WhichChat, t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(t))) {
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
      this.Jlf();
    }
  }
  $vf(t) {
    switch (t.ChatContentType) {
      case 0:
        return new PhoneSystemChatItem_1.OtherChatGridData(t);
      case 1:
        var i = new PhoneSystemChatItem_1.SelfChatGridData(t);
        i.OnOptionItemClickDelegate = this.bWf;
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
            s.OnRewardClick = this.zrf;
            return s;
          default:
            return;
        }
    }
  }
  o1f() {
    this.jvf.RefreshByData(this.HAf);
    this.vzf = true;
  }
  cUf(t, i = true) {
    var s;
    if (this.jvf && (s = this.GetScrollViewWithScrollbar(4)) && (t = this.jvf.GetItemByDisplayIndex(t))) {
      s.ScrollTo(t, i);
    }
  }
  Zlg(t) {
    var i = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.Jlg(t));
    this.RunAsyncTask(i);
  }
  z8f(t) {
    var i = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.R8f(t));
    this.RunAsyncTask(i);
  }
  J8f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.L8f(i), t => {
      this.o6f(t, i);
    });
    this.RunAsyncTask(t);
  }
  o6f(t, i) {
    if (t === 1 && this.jvf.GetTemplateIndexByDisplayIndex(i) === 0) {
      if (t = this.jvf.GetProxyByDisplayIndex(i)) {
        t.StopInputtingAnimation();
      }
      this.$8f();
    }
  }
  Z8f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.w8f(i), t => {
      this.n6f(t, i);
    });
    this.RunAsyncTask(t);
  }
  n6f(t, i) {
    if (t === 1 && ((t = this.jvf.GetTemplateIndexByDisplayIndex(i)) === 0 || t === 1)) {
      if (t = this.jvf.GetProxyByDisplayIndex(i)) {
        t.StopChatContentAnimation();
      }
      this.$8f();
    }
  }
  e6f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.P8f(i), t => {
      this.s6f(t, i);
    });
    this.RunAsyncTask(t);
  }
  s6f(t, i) {
    if (t === 1 && this.jvf.GetTemplateIndexByDisplayIndex(i) === 2) {
      if (t = this.jvf.GetProxyByDisplayIndex(i)) {
        t.StopTipsAnimation();
      }
      this.$8f();
    }
  }
  r6f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.A8f(i), t => {
      this.a6f(t, i);
    });
    this.RunAsyncTask(t);
  }
  a6f(t, i) {
    if (t === 1 && this.jvf.GetTemplateIndexByDisplayIndex(i) === 5) {
      if (t = this.jvf.GetProxyByDisplayIndex(i)) {
        t.StopRewardAnimation();
      }
      this.$8f();
    }
  }
  i6f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.D8f(i), t => {
      this.h6f(t, i);
    });
    this.RunAsyncTask(t);
  }
  h6f(t, i) {
    if (t === 1 && this.jvf.GetTemplateIndexByDisplayIndex(i) === 4) {
      if (t = this.jvf.GetProxyByDisplayIndex(i)) {
        t.StopBirthdayAnimation();
      }
      this.$8f();
    }
  }
  t6f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.U8f(i), t => {
      this.l6f(t, i);
    });
    this.RunAsyncTask(t);
  }
  l6f(t, i) {
    if (t === 1 && this.jvf.GetTemplateIndexByDisplayIndex(i) === 3) {
      if (t = this.jvf.GetProxyByDisplayIndex(i)) {
        t.StopTaskAnimation();
      }
      this.$8f();
    }
  }
  lDf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.iDf, this.j8f);
    this.RunAsyncTask(t);
  }
  jAf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.rDf, this.W8f);
    this.RunAsyncTask(t);
  }
  QAf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.oDf, this.Q8f);
    this.RunAsyncTask(t);
  }
  uDf(t) {
    var i = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.sDf(t));
    this.RunAsyncTask(i);
  }
  async aDf(t) {
    var i = t.IsFinished();
    var s = t.ShortMsgId;
    await PhoneMsgController_1.PhoneMsgController.UpdateProgressOfOneMessageAsync(s, t.ReadIndex, i);
    if (i) {
      await ControllerHolder_1.ControllerHolder.PhoneMsgController.SetOneMessageAsReadAsync(s);
    }
  }
  cDf() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.nDf);
    this.RunAsyncTask(t);
  }
  a2f(t, i) {
    var s = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.h2f(t, i));
    this.RunAsyncTask(s);
  }
  IWf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.vWf(i), t => {
      this.SWf(t, i);
    });
    this.RunAsyncTask(t);
  }
  TWf(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.MWf(i), t => {
      this.EWf(t, i);
    });
    this.RunAsyncTask(t);
  }
  Y8f(i) {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", async () => this.K8f(i), t => {
      this.X8f(t, i);
    });
    this.RunAsyncTask(t);
  }
  n2f() {
    var t = new UiAsyncTask_1.UiAsyncTask("ChatPerformance", this.l2f);
    this.RunAsyncTask(t);
  }
  async YAf() {
    this._Uf = true;
    this.hUf = true;
    var t = this.GetScrollViewWithScrollbar(4).ScrollToDuration * 1000;
    await TimerSystem_1.GameplayTimerSystem.Wait(t);
  }
  $8f() {
    this._Uf = false;
    this.hUf = false;
    this.GetScrollViewWithScrollbar(4).StopMovement();
  }
}
exports.PhoneSystemChatPanel = PhoneSystemChatPanel;
//# sourceMappingURL=PhoneSystemChatPanel.js.map