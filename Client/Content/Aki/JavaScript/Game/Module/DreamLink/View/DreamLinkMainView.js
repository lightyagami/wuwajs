"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkMainView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const DreamLinkController_1 = require("../DreamLinkController");
const DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem");
const DreamLinkLimitTimeRewardItem_1 = require("./SubView/DreamLinkLimitTimeRewardItem");
class DreamLinkMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionComponent = undefined;
    this.qsi = undefined;
    this.Atl = undefined;
    this.btl = undefined;
    this.qtl = undefined;
    this.Gtl = undefined;
    this.Pe = undefined;
    this.bGl = undefined;
    this.ueh = () => {
      this.H0l(1, "DreamLinkWorldRunView");
    };
    this.ceh = () => {
      if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MowingTowerMultiTips");
      } else {
        this.H0l(2, "DreamLinkDungeonView");
      }
    };
    this.meh = () => {
      if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MowingTowerMultiTips");
      } else {
        this.H0l(3, "DreamLinkWhiteCatView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i;
    this.Pe = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (this.Pe) {
      i = [];
      this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(this.Pe);
      i.push(this.qsi.CreateByActorAsync(this.GetItem(4).GetOwner()));
      this.AddChild(this.qsi);
      this.Atl = new DreamLinkLimitTimeRewardItem_1.DreamLinkLimitTimeRewardItem(this.Pe);
      i.push(this.Atl.CreateByActorAsync(this.GetItem(5).GetOwner()));
      this.CaptionComponent = new PopupCaptionItem_1.PopupCaptionItem();
      i.push(this.CaptionComponent.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
      this.CaptionComponent.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.btl = new DreamLinkButton();
      i.push(this.btl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
      this.btl.BindButtonFunction(this.ueh);
      this.qtl = new DreamLinkButton();
      i.push(this.qtl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
      this.qtl.BindButtonFunction(this.ceh);
      this.Gtl = new DreamLinkButton();
      i.push(this.Gtl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
      this.Gtl.BindButtonFunction(this.meh);
      await Promise.all(i);
    }
  }
  OnStart() {
    var i = this.OpenParam;
    if (i && i === 1) {
      this.UiViewSequence.StartSequenceName = "Start01";
      this.UiViewSequence.CloseSequenceName = "Close01";
    } else {
      this.UiViewSequence.StartSequenceName = "Start02";
      this.UiViewSequence.CloseSequenceName = "Close02";
    }
  }
  OnBeforeShow() {
    this.Atl.RefreshActive();
    this.Svt();
    this.Rtl();
  }
  OnBeforeHide() {
    this.Atl.SetActive(false);
    this.qGl();
  }
  H0l(i, e) {
    var t;
    var s = this.Pe.GetActivityConfig();
    if (s) {
      t = this.Pe.IsDreamLinkFunctionUnlock(i);
      s = s.OpenCondition.get(i) ?? 0;
      if (t) {
        this.PlaySequence("SwitchView", undefined, true);
        this.qGl();
        this.bGl = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          UiManager_1.UiManager.OpenView(e);
          this.bGl = undefined;
        }, 320);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(s));
      }
    }
  }
  qGl() {
    if (this.bGl) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.bGl);
      this.bGl = undefined;
    }
  }
  Svt() {
    var e;
    var t;
    var s;
    var r;
    var i = this.Pe.GetActivityConfig();
    if (i) {
      for ([e, t, s, r] of [[1, this.btl, () => this.Pe.CheckHasRunRedDot(), () => this.Pe.CheckHasRunFinished()], [2, this.qtl, () => this.Pe.CheckDungeonRedDotState(), () => this.Pe.IsAllInstFinished()], [3, this.Gtl, () => this.Pe.CheckHasBossReward() || this.Pe.CheckAllBossInstRedDotState(), () => false]]) {
        var h = this.Pe.IsDreamLinkFunctionUnlock(e);
        t.SetToggleEnable(h);
        let i = false;
        if (h) {
          i = s();
        }
        t.SetRedDotState(i);
        t.SetFinishedState(r());
      }
    }
  }
  Rtl() {
    var i = this.Pe.GetInstStage() === 0;
    this.GetItem(6).SetUIActive(i);
    this.GetItem(7).SetUIActive(!i);
  }
}
exports.DreamLinkMainView = DreamLinkMainView;
class DreamLinkButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.nqe = () => {
      this.Gke?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite]];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => false);
    this.GetExtendToggle(0).OnPointUpCallBack.Bind(this.nqe);
  }
  SetRedDotState(i) {
    this.GetItem(1).SetUIActive(i);
  }
  SetFinishedState(i) {
    this.GetItem(2).SetUIActive(i);
  }
  BindButtonFunction(i) {
    this.Gke = i;
  }
  SetToggleEnable(i) {
    var e = i ? 0 : 2;
    this.GetExtendToggle(0).SetToggleStateForce(e);
    this.GetItem(3).SetUIActive(!i);
    var e = this.GetSprite(4);
    e.SetChangeColor(!i, e.changeColor);
  }
}
//# sourceMappingURL=DreamLinkMainView.js.map