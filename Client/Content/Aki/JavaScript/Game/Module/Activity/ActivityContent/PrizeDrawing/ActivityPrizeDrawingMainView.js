"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrizeDrawingMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivityButtonItem_1 = require("../UniversalComponents/Functional/ActivityButtonItem");
const PrizeDrawingFinalRewardItem_1 = require("./Components/PrizeDrawingFinalRewardItem");
const PrizeDrawingQuestItem_1 = require("./Components/PrizeDrawingQuestItem");
const PrizeDrawingRewardItem_1 = require("./Components/PrizeDrawingRewardItem");
class PrizeDrawingMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Ket = undefined;
    this.ZTn = undefined;
    this.O8d = undefined;
    this.k8d = [];
    this.sOe = [];
    this.SPe = undefined;
    this.q8d = false;
    this.BAm = e => {
      if (e === "Guide") {
        this.W_f();
      }
    };
    this.Q_f = e => {
      if (e === "TransIn") {
        this.W_f();
      }
    };
    this.G8d = () => {
      this.q8d = true;
      this.ZGe();
      this.Nqe();
    };
    this.$Ge = e => {
      if (e === "PrizeDrawingTearView") {
        if (this.q8d) {
          this.KGt();
          this.q8d = false;
        }
        this.SPe?.PlaySequencePurely("TransIn", true);
      }
    };
    this.Eff = () => {
      this.Og();
    };
    this.F8d = () => {
      if (ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData.HaveEnoughCoinToRoll()) {
        this.SPe?.PlaySequencePurely("TransOut", true);
        this.SPe?.StopSequenceByKey("GuideLoop");
        this.SPe?.PlaySequencePurely("GuideDefault");
        UiManager_1.UiManager.OpenView("PrizeDrawingTearView");
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Ichiban_Kuji_NotEnoughTips");
      }
    };
    this.$xi = () => {
      this.CloseMe();
    };
  }
  get Pe() {
    return ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.O8d = this.GetText(12);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Ket = new ActivityButtonItem_1.ActivityButtonItem();
    e.push(this.Ket.CreateThenShowByActorAsync(this.GetItem(18).GetOwner()));
    this.ZTn = new PrizeDrawingQuestItem_1.PrizeDrawingQuestItem();
    e.push(this.ZTn.CreateThenShowByActorAsync(this.GetItem(19).GetOwner()));
    e.push(this.N8d());
    await Promise.all(e);
  }
  OnStart() {
    this.cQa();
    this.KGt(true);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Q_f);
  }
  Og() {
    this.KGt();
    this.Nqe();
    this.u3e();
    this.ZGe();
    this.hLn();
  }
  OnBeforeShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
  }
  OnTick(e) {
    this.u3e();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPrizeDrawingRewardStatusChanged, this.G8d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPrizeDrawingQuestUpdated, this.Eff);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.BAm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPrizeDrawingRewardStatusChanged, this.G8d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPrizeDrawingQuestUpdated, this.Eff);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.BAm);
  }
  W_f() {
    if (this.Pe.ShouldShowButtonRedDot()) {
      this.SPe?.PlayOrReplaySequenceByName("GuideLoop");
    } else {
      this.SPe?.PlaySequencePurely("GuideDefault");
    }
  }
  async N8d() {
    const i = this.Pe.GetAllAwardItem();
    const s = [1, 2, 3, 4];
    const r = [];
    s.forEach((e, t) => {
      t = i[t];
      r.push(this.V8d(e, t.ItemId, t.Count));
    });
    [5, 6, 7, 8, 9, 10].forEach((e, t) => {
      t = i[t + s.length];
      r.push(this.rOe(e, t.ItemId, t.Count, t.Times));
    });
    await Promise.all(r);
  }
  async V8d(e, t, i) {
    t = new PrizeDrawingFinalRewardItem_1.PrizeDrawingFinalRewardItem(t, i);
    this.k8d.push(t);
    await t.CreateThenShowByActorAsync(this.GetItem(e).GetOwner());
  }
  async rOe(e, t, i, s) {
    t = new PrizeDrawingRewardItem_1.PrizeDrawingRewardItem(t, i, s);
    this.sOe.push(t);
    await t.CreateThenShowByActorAsync(this.GetItem(e).GetOwner());
  }
  KGt(i = false) {
    const s = this.Pe.GetAllAwardGroup();
    this.k8d.forEach((e, t) => {
      e.Refresh(this.Pe.IsGotAward(s[t].Id), i);
    });
    this.sOe.forEach((e, t) => {
      e.Refresh(this.Pe.GetAwardCurrentAmount(s[t + this.k8d.length].Id), i);
    });
  }
  cQa() {
    this.lqe.SetTitleLocalText(this.Pe.GetTitleTextId());
    this.lqe.SetCloseCallBack(this.$xi);
    this.lqe?.SetCurrencyItemList([this.Pe.GetCostCoinId()]);
  }
  Nqe() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Ichiban_Kuji_Progress_Reward", this.Pe.GetCurrentProgress(), this.Pe.GetTotalProgress());
  }
  u3e() {
    var [e, t] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.Pe);
    this.O8d = this.GetText(12);
    this.O8d.SetUIActive(e);
    this.O8d.SetText(t);
  }
  ZGe() {
    var e = this.GetItem(17);
    if (this.Pe?.IsAllFinished()) {
      this.Ket?.SetUiActive(false);
      e?.SetUIActive(true);
    } else {
      this.Ket?.SetUiActive(true);
      e?.SetUIActive(false);
      this.Ket?.SetShowText("Ichiban_Kuji_Start");
      this.Ket?.SetFunction(this.F8d);
      this.Ket?.SetRedDotVisible(this.Pe.ShouldShowButtonRedDot());
    }
  }
  hLn() {
    var e;
    if (this.Pe.IsQuestAllCompleted()) {
      this.ZTn?.RefreshFinishState(true);
    } else {
      this.ZTn?.RefreshFinishState(false);
      if (e = this.Pe.GetCurrentQuestId()) {
        this.ZTn?.RefreshByQuestId(e, this.Pe.GetQuestProgress(), this.Pe.GetQuestTotalProgress());
      }
    }
  }
}
exports.PrizeDrawingMainView = PrizeDrawingMainView;
//# sourceMappingURL=ActivityPrizeDrawingMainView.js.map