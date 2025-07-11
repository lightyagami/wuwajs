"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../../Ui/UiLayer");
const HelpController_1 = require("../../../../Help/HelpController");
const ItemRewardController_1 = require("../../../../ItemReward/ItemRewardController");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityScratchTicketController_1 = require("../ActivityScratchTicketController");
const ActivityScratchTicketDefine_1 = require("../ActivityScratchTicketDefine");
const ScratchTicketData_1 = require("../Data/ScratchTicketData");
const ScratchTicketCellItem_1 = require("./Item/ScratchTicketCellItem");
const ScratchTicketConditionItem_1 = require("./Item/ScratchTicketConditionItem");
const ScratchTicketRewardItemGrid_1 = require("./Item/ScratchTicketRewardItemGrid");
const ScratchTicketTabItem_1 = require("./Item/ScratchTicketTabItem");
class ScratchTicketMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.gLt = undefined;
    this.lqe = undefined;
    this.anl = undefined;
    this.o8a = undefined;
    this.B7t = undefined;
    this._nl = undefined;
    this.H3e = undefined;
    this.Lol = undefined;
    this.unl = undefined;
    this.cnl = undefined;
    this.TDe = undefined;
    this.jvl = undefined;
    this.e8 = TimeUtil_1.TimeUtil.InverseMillisecond;
    this.$An = i => {
      if (i === "Refresh") {
        this.dnl(this.cnl);
        this.Wvl(this.cnl);
      }
    };
    this.uOl = () => {
      var i = this.Lol.GetRoundDataList();
      this.B7t.RefreshByData(i);
      this.Cnl();
    };
    this.mnl = (i, t) => {
      if (this.unl !== undefined) {
        this.unl.SetSelect(false, false);
      }
      var e = this.cnl;
      this.unl = t;
      this.unl.SetSelect(true, false);
      this.cnl = i;
      this.Qvl(this.cnl, e);
      this.dnl(this.cnl);
      this.Cnl();
    };
    this.gnl = i => {
      var t;
      if (i.IsLock()) {
        if (this.cnl === undefined || this.cnl.GetRoundState() !== 1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ScratchCardActivity_ClickTips02");
        } else if (this.Lol.GetRemainCount() <= 0) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ScratchCardActivity_ClickTips01");
        } else {
          t = this.cnl.Id;
          ActivityScratchTicketController_1.ActivityScratchTicketController.SendScratchCardRewardRequest(t, i.Index, this.pnl);
        }
      }
    };
    this.pnl = (r, i, h, c) => {
      if (i === this.cnl.Id && !(h.length <= 0)) {
        if (h.length === 1) {
          UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", true);
          this.nSl(h[0]);
          this.C0l();
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", false);
            this.p_l(r, c);
          }, h[0].DelayInterval);
        } else {
          this.nSl(h[0]);
          let t = h[0].DelayInterval;
          let e = 1;
          let s = 0;
          this.C0l();
          UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", true);
          this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(i => {
            if (!((s += i) < t)) {
              s %= t;
              if (e >= h.length) {
                UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", false);
                this.p_l(r, c);
                this.jm();
              } else {
                t = e === h.length - 1 ? (this.nSl(h[e]), ActivityScratchTicketDefine_1.LAST_DELAY_INTERVAL) : (this.nSl(h[e]), h[e].DelayInterval);
              }
              e++;
            }
          }, ActivityScratchTicketDefine_1.FOREVER_DELAY_INTERVAL);
        }
      }
    };
    this.khl = () => {
      var i;
      if (this.cnl.GetRoundState() === 2) {
        i = this.Lol.GetRoundDataList();
        this.B7t.RefreshByData(i);
        this.fnl();
      } else {
        this.Cnl();
      }
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.pcr = () => {
      HelpController_1.HelpController.OpenHelpById(this.Lol.GetHelpId());
    };
    this.n8a = () => new ScratchTicketConditionItem_1.ScratchTicketConditionItem();
    this.Mnl = () => {
      var i = new ScratchTicketTabItem_1.ScratchTicketTabItem();
      i.SetClickToggleCallback(this.mnl);
      return i;
    };
    this.Snl = () => {
      var i = new ScratchTicketCellItem_1.ScratchTicketCellItem();
      i.SetClickCallback(this.gnl);
      return i;
    };
    this.CreateRewardGridItem = () => {
      return new ScratchTicketRewardItemGrid_1.ScratchTicketRewardItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIVerticalLayout], [5, UE.UIGridLayout], [6, UE.UIItem], [7, UE.UIMultiTemplateLayout], [9, UE.UISprite], [8, UE.UIItem], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Lol = this.OpenParam;
    if (this.Lol instanceof ScratchTicketData_1.ScratchTicketData) {
      this.o8a = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.n8a);
      this._nl = new GenericLayout_1.GenericLayout(this.GetGridLayout(5), this.Snl);
      this.H3e = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(7), this.CreateRewardGridItem);
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6));
      this.lqe.SetCloseCallBack(this.Jvt);
      this.lqe.SetHelpCallBack(this.pcr);
      await this.lqe.SetCurrencyItemList([this.Lol.GetCostItemId()]);
      this.gLt = new ActivityTitleTypeA_1.ActivityTitleTypeA();
      await this.gLt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
      this.anl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
      await this.anl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
      await this.ynl();
      await this.yll();
      this.Cnl();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchTicketMainView无效输入");
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnScratchTicketConditionRefresh, this.uOl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnScratchTicketConditionRefresh, this.uOl);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length !== 0 && !isNaN(Number(i[0]))) {
      i = Number(i[0]);
      i = this._nl?.GetItemByIndex(i);
      if (i !== undefined) {
        return [i, i];
      }
    }
  }
  async ynl() {
    this.B7t = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.Mnl);
    var i = this.Lol.GetRoundDataList();
    await this.B7t.RefreshByDataAsync(i);
  }
  async yll() {
    var i;
    var t = this.Lol.GetFirstProgressRoundDataIndex();
    if (!(t < 0)) {
      i = this.Lol.GetRoundDataList();
      this.unl = this.B7t.GetLayoutItemByKey(t);
      this.unl.SetSelect(true, false);
      this.cnl = i[t];
      i = this.cnl.GetCellDataList();
      await this._nl.RefreshByDataAsync(i);
    }
  }
  fnl() {
    var i = this.Lol.GetFirstProgressRoundDataIndex();
    if (!(i < 0)) {
      this.B7t.GetLayoutItemByKey(i).SetSelect(true, true);
    }
  }
  dnl(i) {
    const t = i.GetDiagonalResultList();
    if (!(t.length <= 0)) {
      UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", true);
      this.nSl(t[0]);
      this.vnl(t[0].RewardList);
      let i = 1;
      this.jvl = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        if (i >= t.length) {
          UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", false);
          this.Kvl();
        } else {
          this.nSl(t[i]);
          i++;
        }
      }, ActivityScratchTicketDefine_1.REVEAL_DELAY_INTERVAL);
    }
  }
  Cnl() {
    var i;
    if (this.Lol.GetScratchCardActivityConfig() && this.Lol.LocalConfig) {
      this.gLt.SetTitleByText(this.Lol.GetTitle());
      this.H3e.RefreshByData(this.cnl.GetRemainRewardList());
      this.FNe();
      i = this.cnl.GetRoundState();
      this.anl.PanelLock.SetUiActive(i === 0);
      this.anl.PanelActivate.SetUiActive(i === 2);
      this.anl.FunctionButton.SetUiActive(false);
      this.anl.PanelActivate.SetTextByTextId("ScratchCardActivity_CompleteDesc");
      i = this.cnl.Config.TogRoundIcon;
      this.SetSpriteByPath(i, this.GetSprite(9), false, undefined);
      i = this.Lol.IsAllRoundFinish();
      this.lqe.SetCurrencyItemVisible(!i);
      this.GetItem(10).SetUIActive(!i);
      this.GetItem(8).SetUIActive(i);
      i = this.Lol.GetConditionDataList();
      this.o8a.RefreshByData(i);
    }
  }
  FNe() {
    var i = this.Lol.EndOpenTime;
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    var i = Math.max(i - t, 1);
    const e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i);
    const s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ScratchCardActivity_TimeDesc");
    this.gLt.SetTimeTextByText(StringUtils_1.StringUtils.Format(s, e.CountDownText));
    if (this.cnl.GetRoundState() === 0) {
      i = this.cnl.GetUnlockTime() * TimeUtil_1.TimeUtil.Millisecond - t;
      t = this.cnl.GetPreRoundState();
      if (i > 0) {
        const e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i);
        const s = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ScratchCardActivity_NoJoinTips01"), e.CountDownText);
        this.anl.PanelLock.SetTextByText(s);
      } else if (t !== 2) {
        this.anl.PanelLock.SetTextByTextId("ScratchCardActivity_NoJoinTips02");
      } else {
        this.anl.PanelLock.SetTextByTextId("ScratchCardActivity_NoJoinTips03");
      }
    }
  }
  OnTick(i) {
    this.e8 += i;
    if (this.e8 >= TimeUtil_1.TimeUtil.InverseMillisecond) {
      this.FNe();
      this.e8 %= TimeUtil_1.TimeUtil.InverseMillisecond;
    }
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("ScratchTicketMainView", false);
    this.jm();
    this.Kvl();
  }
  jm() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.TDe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Kvl() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.jvl)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.jvl);
      this.jvl = undefined;
    }
  }
  C0l() {
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.PlaySequence("Shake");
    }, ActivityScratchTicketDefine_1.SHOW_SHAKE_INTERVAL);
  }
  Qvl(i, t) {
    var i = this.Lol.GetRoundDataIndex(i);
    var t = this.Lol.GetRoundDataIndex(t);
    var e = i < t;
    var s = Math.min(i, t);
    var i = Math.max(i, t);
    if (i === 1 && s === 0) {
      this.UiViewSequence.PlaySequencePurely("SwitchA", true, e);
    }
    if (i === 2 && s === 0) {
      this.UiViewSequence.PlaySequencePurely("SwitchB", true, e);
    }
    if (i === 2 && s === 1) {
      this.UiViewSequence.PlaySequencePurely("SwitchC", true, e);
    }
  }
  Wvl(i) {
    i = this.Lol.GetRoundDataIndex(i);
    if (i === 1) {
      this.UiViewSequence.PlaySequencePurely("SwitchA", true);
    } else if (i === 2) {
      this.UiViewSequence.PlaySequencePurely("SwitchB", true);
    }
  }
  p_l(i, t) {
    if (i === 0) {
      ActivityScratchTicketController_1.ActivityScratchTicketController.ShowScratchTicketRewardTip(t);
      this.khl();
    } else {
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(ActivityScratchTicketDefine_1.SCRATCH_TICKET_REWRAD_CONFIG_ID, t, this.khl);
    }
  }
  nSl(i) {
    if (i.RewardList.length > 0) {
      this.vnl(i.RewardList);
    }
    if (i.SequenceName !== "Empty") {
      this.UiViewSequence.PlaySequence(i.SequenceName);
    }
  }
  vnl(i) {
    for (const s of i) {
      var t = this._nl.GetLayoutItemByKey(s.Index);
      var e = this.cnl.GetCellDataByIndex(s.Index);
      if (t !== undefined) {
        t.RefreshByResultData(e, s);
      }
    }
  }
}
exports.ScratchTicketMainView = ScratchTicketMainView;
//# sourceMappingURL=ScratchTicketMainView.js.map