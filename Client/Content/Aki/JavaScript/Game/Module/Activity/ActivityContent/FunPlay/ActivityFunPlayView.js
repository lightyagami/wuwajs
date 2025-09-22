"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const HelpController_1 = require("../../../Help/HelpController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivityFunPlayPages_1 = require("./ActivityFunPlayPages");
const ActivityFunPlayRewardView_1 = require("./ActivityFunPlayRewardView");
const ActivityFunPlayTabItem_1 = require("./ActivityFunPlayTabItem");
class ActivityFunPlayView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.m3e = undefined;
    this.C3e = undefined;
    this.Mnd = undefined;
    this.Ind = undefined;
    this.Tnd = 0;
    this.bnd = 0;
    this.DGd = [];
    this.Bqe = () => new ActivityFunPlayTabItem_1.ActivityFunPlayTabItem();
    this.L3e = () => {
      var i = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData()?.GetChallengeId();
      if (i) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityFunPlayController?.RequestEnterChallengeAsync(i);
      }
    };
    this.Rnd = () => {
      var i = this.C3e.GetDisplayGridStartIndex();
      let t = Math.max(i - 1, 0);
      if (this.Tnd !== -1) {
        t = this.Tnd;
      }
      this.C3e?.ScrollToGridIndex(t, true);
    };
    this.wnd = () => {
      let i = this.C3e.GetDisplayGridStartIndex() + 1;
      if (this.bnd !== -1) {
        i = this.bnd;
      }
      this.C3e?.ScrollToGridIndex(i, true);
    };
    this.e11 = () => {
      let t = false;
      let e = false;
      this.Tnd = -1;
      this.bnd = -1;
      var s = this.C3e.GetDisplayGridStartIndex();
      var r = this.C3e.GetDisplayGridEndIndexPurely();
      var h = ModelManager_1.ModelManager.ActivityFunPlayModel.GetAllChallengeData();
      for (let i = 0; i < h.length; i++) {
        var n = h[i];
        if (!t && n.GetRedPoint() && i < s) {
          t = true;
          this.Tnd = i;
        }
        if (!e && n.GetRedPoint() && i > r) {
          e = true;
          this.bnd = i;
        }
      }
      this.GetItem(5).SetUIActive(t);
      this.GetItem(6).SetUIActive(e);
      this.GetButton(3).RootUIComp.SetUIActive(s > 0);
      this.GetButton(4).RootUIComp.SetUIActive(r < h.length - 1);
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.dpt = () => {
      var i = this.m3e.GetHelpId();
      HelpController_1.HelpController.OpenHelpById(i);
    };
    this.Lnd = () => {
      this.Pnd();
      this.Dnd(true);
      this.xnd();
      this.I3e();
    };
    this.Und = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ActivityFunPlay", 87, "趣味活动页面信息刷新");
      }
      this.A3e(false);
      this.Pnd();
      this.Dnd(false);
      this.xnd();
    };
    this.e8 = TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Rnd], [4, this.wnd], [13, this.L3e]];
  }
  async OnBeforeStartAsync() {
    this.m3e = this.OpenParam;
    this.U3e();
    this.nOi();
    this.UGd();
    await Promise.all([this.Bnd(), this.knd()]);
  }
  async Bnd() {
    this.Mnd = new ActivityFunPlayRewardView_1.ActivityFunPlayRewardView();
    await this.Mnd.CreateThenShowByActorAsync(this.GetItem(12).GetOwner());
  }
  async knd() {
    this.Ind = new ActivityFunPlayPages_1.ActivityFunPlayPages();
    this.Ind.SetParentSequence(this.UiViewSequence);
    await this.Ind.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
  }
  nOi() {
    var i = this.GetItem(1).GetOwner().GetComponentByClass(UE.UILoopScrollViewComponent.StaticClass());
    this.C3e = new LoopScrollView_1.LoopScrollView(i, this.GetItem(2).GetOwner(), this.Bqe);
    this.GetItem(2).SetUIActive(false);
    this.C3e.BindOnScrollValueChanged(this.e11);
  }
  U3e() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    if (this.m3e) {
      this.lqe.SetTitle(this.m3e.GetTitle());
    }
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.AMo);
    this.lqe.SetHelpCallBack(this.dpt);
  }
  A3e(t) {
    var i = ModelManager_1.ModelManager.ActivityFunPlayModel.GetAllChallengeData();
    this.C3e.RefreshByDataAsync(i).then(() => {
      var i;
      if (t) {
        i = ModelManager_1.ModelManager.ActivityFunPlayModel.GetDefaultSelectIndex();
        this.C3e.ScrollToGridIndex(i, true);
        this.C3e.SelectGridProxy(i, true);
      }
    });
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(undefined, this.m3e.Id);
    this.A3e(true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectActivityFunPlayChallengeItem, this.Lnd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityFunPlayInfoRefresh, this.Und);
  }
  Dnd(i) {
    var t = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
    if (t && (t = t.GetIsUnlock(), this.GetItem(14).SetUIActive(t), t)) {
      this.Ind?.Refresh(i);
    }
  }
  Pnd() {
    var i;
    var t = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
    if (t) {
      i = t.GetIsUnlock();
      this.GetItem(7).SetUIActive(!i);
      if (!i) {
        i = t.GetLeftTimeText();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Activity_105900001_Locktime", i);
      }
    }
  }
  xnd() {
    var i = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
    if (i && (i = i.GetIsUnlock(), this.GetItem(9).SetUIActive(i), i)) {
      this.Ond();
      this.Mnd?.Refresh();
    }
  }
  Ond() {
    var i;
    var t = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
    if (t) {
      i = t.GetTitle();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i);
      i = t.GetDesc();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectActivityFunPlayChallengeItem, this.Lnd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityFunPlayInfoRefresh, this.Und);
  }
  I3e() {
    if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
      this.UiViewSequence.ReplaySequence("Switch");
    } else {
      this.UiViewSequence.PlaySequence("Switch");
    }
  }
  OnTick(i) {
    this.e8 += i;
    if (this.e8 >= TimeUtil_1.TimeUtil.InverseMillisecond && void (this.e8 = 0) !== (i = this.GetNeedRefreshUnlock()) && (this.Und(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityFunPlayRedDot, i), (i = this.m3e?.Id) !== undefined)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, i);
    }
  }
  GetNeedRefreshUnlock() {
    var i;
    if (this.DGd.length !== 0) {
      i = this.DGd[0];
      if (ModelManager_1.ModelManager.ActivityFunPlayModel.GetChallengeData(i)?.GetIsUnlock()) {
        this.DGd.shift();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("ActivityFunPlay", 87, "解锁刷新的关卡id", ["ChallengeId", i]);
        }
        return i;
      } else {
        return undefined;
      }
    }
  }
  UGd() {
    var i;
    for (const t of ModelManager_1.ModelManager.ActivityFunPlayModel.GetAllChallengeData()) {
      if (!t.GetIsUnlock()) {
        i = t.GetChallengeId();
        this.DGd.push(i);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("ActivityFunPlay", 87, "添加未解锁的关卡id", ["ChallengeId", i]);
        }
      }
    }
  }
}
exports.ActivityFunPlayView = ActivityFunPlayView;
//# sourceMappingURL=ActivityFunPlayView.js.map