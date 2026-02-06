"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRewardMainView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const PlayerTitleItem_1 = require("../Common/PlayerTitleItem");
const SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class FeedbackRewardMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.HFd = [];
    this.ZOi = [];
    this.l0g = [];
    this._0g = 0;
    this.u0g = undefined;
    this.bOe = undefined;
    this.qoh = undefined;
    this.jWt = () => {
      return new RewardItem();
    };
    this.ou_ = () => {
      return new TaskItem();
    };
    this.wwe = () => {
      if (!(this._0g <= 0)) {
        this.UiViewSequence?.PlaySequence("Switch_Left");
        this._0g--;
      }
    };
    this.Pwe = () => {
      if (!(this._0g >= this.l0g.length - 1)) {
        this.UiViewSequence?.PlaySequence("Switch_Right");
        this._0g++;
      }
    };
    this.i2i = () => {
      var e = this.l0g[this._0g];
      var e = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(e);
      if (!!e && !(e.SkipParam <= 0)) {
        if (e.ShowType === 3) {
          ControllerHolder_1.ControllerHolder.ItemController.OpenTitleTipsByItemId(e.SkipParam);
        } else if (e.ShowType === 2) {
          UiManager_1.UiManager.OpenView("FlySkinShowView", e.SkipParam);
        } else {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.SkipParam);
        }
      }
    };
    this.d0g = () => {
      for (const e of this.l0g) {
        if (ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackRewardState(e) !== 2) {
          this._0g = this.l0g.indexOf(e);
          break;
        }
      }
      this.c0g();
      this.Z3e();
    };
    this.CIf = (e, t) => {
      if (t === "Sequence_Item_Switch") {
        this.c0g();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [5, UE.UIText], [4, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIHorizontalLayout], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIArtText], [12, UE.UIVerticalLayout], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIScrollViewWithScrollbarComponent], [16, UE.UIItem]];
    this.BtnBindInfo = [[1, this.wwe], [2, this.Pwe], [3, this.i2i]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.u0g = new RewardPanel();
    t.push(this.u0g.CreateThenShowByResourceIdAsync("PnlFeedbackRewardA", this.GetItem(10)));
    this.ZOi = ModelManager_1.ModelManager.FeedbackRewardModel.GetAllRewardList();
    for (const e of this.ZOi) {
      if (ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(e)?.ShowType !== 1) {
        this.l0g.push(e);
      }
    }
    var i = this.l0g.length;
    var s = this.GetItem(9);
    var r = this.GetHorizontalLayout(8).RootUIComp;
    for (let e = 0; e < i; e++) {
      var a = new PageItem();
      var n = LguiUtil_1.LguiUtil.CopyItem(s, r);
      t.push(a.CreateThenShowByActorAsync(n.GetOwner()));
      this.HFd.push(a);
    }
    s.SetUIActive(false);
    t.push(ControllerHolder_1.ControllerHolder.FeedbackRewardController.GivebackInfoRequest());
    await Promise.all(t);
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FeedbackRewardRefresh, this.d0g);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FeedbackRewardRefresh, this.d0g);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(15), this.jWt);
    this.qoh = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(12), this.ou_);
    for (const e of this.l0g) {
      if (ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackRewardState(e) !== 2) {
        this._0g = this.l0g.indexOf(e);
        break;
      }
    }
    this.c0g();
    this.Z3e();
    this.m0g();
  }
  c0g() {
    var e = this.l0g[this._0g];
    var t = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(e);
    if (t) {
      var i = StringUtils_1.StringUtils.IsEmpty(t.IconLarge) ? undefined : t.IconLarge;
      this.u0g?.RefreshItem(i, t.PlayerTitleId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.DesText);
      this.GetButton(3).RootUIComp.SetUIActive(t.ShowType !== 1);
      this.GetButton(2).RootUIComp.SetUIActive(this._0g < this.l0g.length - 1);
      this.GetButton(1).RootUIComp.SetUIActive(this._0g > 0);
      for (const s of this.HFd) {
        s.RefreshItem(this._0g === this.HFd.indexOf(s));
      }
      i = ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackRewardState(e);
      this.GetItem(6).SetUIActive(i === 1);
      this.GetItem(7).SetUIActive(i === 2);
      t = this.bOe?.GetScrollItemList() ?? [];
      for (const r of t) {
        r.SetPreviewVisible(r.RewardId === e);
      }
    }
  }
  Z3e() {
    this.bOe?.RefreshByData(this.ZOi, () => {
      let e = false;
      for (const t of this.bOe?.GetScrollItemList() ?? []) {
        if (ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackRewardState(t.RewardId) === 0 && !e) {
          this.bOe?.LateScrollTo(t.GetRootItem());
          e = true;
        }
        t.SetPreviewVisible(t.RewardId === this.l0g[this._0g]);
      }
    });
    this.GetText(14).SetText(Math.min(ModelManager_1.ModelManager.FeedbackRewardModel.CurrentPointCount, ModelManager_1.ModelManager.FeedbackRewardModel.MaxShowScore).toString());
  }
  m0g() {
    this.GetArtText(11).SetText(ModelManager_1.ModelManager.FeedbackRewardModel.CurrentLoginDayCount.toString());
    var e = ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackTaskList();
    this.qoh?.RefreshByData(e);
  }
}
exports.FeedbackRewardMainView = FeedbackRewardMainView;
class RewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.rhc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem();
    await this.rhc.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  RefreshItem(e, t) {
    var i = this.GetTexture(0);
    if (e) {
      this.rhc?.SetUiActive(false);
      i.SetUIActive(true);
      this.SetTextureByPath(e, i);
    } else {
      this.rhc?.SetUiActive(true);
      i.SetUIActive(false);
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      this.rhc?.Refresh(t, undefined, e);
    }
  }
}
class RewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RewardId = 0;
    this.i4i = undefined;
    this.q3e = () => {
      var e;
      if (ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackRewardState(this.RewardId) !== 1) {
        if (e = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(this.RewardId)) {
          if (e.ShowType === 3) {
            ControllerHolder_1.ControllerHolder.ItemController.OpenTitleTipsByItemId(e.SkipParam);
          } else {
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.SkipParam);
          }
        }
      } else {
        ControllerHolder_1.ControllerHolder.FeedbackRewardController.GivebackRewardRequest();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.i4i = new SmallItemGrid_1.SmallItemGrid();
    await this.i4i.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.i4i.BindOnCanExecuteChange(() => false);
    this.i4i.BindOnExtendToggleClicked(this.q3e);
  }
  Refresh(e, t, i) {
    var s = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(e);
    if (s) {
      this.RewardId = e;
      this.GetText(3).SetText(s.Target.toString());
      var r = ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackRewardState(e);
      var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(s.DropId);
      if (e && e.DropPreview.size > 0) {
        for (var [a, n] of e.DropPreview) {
          a = {
            Data: a,
            Type: 4,
            ItemConfigId: a,
            BottomText: n > 0 ? n.toString() : undefined,
            IsStarReceivableVisible: r === 1,
            IsReceivedVisible: r === 2
          };
          this.i4i?.Apply(a);
          break;
        }
      }
      this.GetItem(0).SetUIActive(i > 0);
      this.GetItem(1).SetUIActive(r >= 1);
    }
  }
  SetPreviewVisible(e) {
    this.i4i?.SetPreviewVisible(e);
  }
}
class PageItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  RefreshItem(e) {
    this.GetItem(1).SetUIActive(e);
  }
}
class TaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.t5e = 0;
    this.pcr = () => {
      if (this.t5e) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.t5e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.pcr]];
  }
  Refresh(e, t, i) {
    var s = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackTaskById(e);
    if (s) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.TaskName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s.TaskDes);
      e = ModelManager_1.ModelManager.FeedbackRewardModel.GetFeedbackTaskCurrentPoint(e);
      this.GetText(4).SetText(e.toString());
      this.GetText(5).SetText("/" + s.MaxScore.toString());
      this.GetSprite(3).SetFillAmount(e / s.MaxScore);
      this.GetItem(6).SetUIActive(e >= s.MaxScore);
      this.t5e = s.HelpBtn;
      this.GetButton(0).RootUIComp.SetUIActive(this.t5e > 0);
    }
  }
}
//# sourceMappingURL=FeedbackRewardMainView.js.map