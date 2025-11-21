"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExploreDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const UiModel_1 = require("../../../Ui/UiModel");
const HelpController_1 = require("../../Help/HelpController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ExploreProgressController_1 = require("../ExploreProgressController");
const ExploreDetailLockItem_1 = require("./ExploreDetailLockItem");
const MapAreaRewardPanel_1 = require("./MapAreaRewardPanel");
const MapExploreDetailItem_1 = require("./MapExploreDetailItem");
const MapExplorePlayProgressPanel_1 = require("./MapExplorePlayProgressPanel");
class MapExploreDetailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.YOl = undefined;
    this.zOl = [];
    this.JOl = 0;
    this.ZOl = undefined;
    this.ExploreScroll = undefined;
    this.zJa = undefined;
    this.eNl = undefined;
    this.tNl = undefined;
    this.NSd = undefined;
    this.wOl = () => {
      ExploreProgressController_1.ExploreProgressController.ReceiveAreaStageRewardAsyncRequest(this.YOl.GetStageRewardDataList().filter(t => t.State === 1).map(t => t.Id));
    };
    this.T8l = () => {
      var t = this.b8l();
      this.ExploreScroll?.ScrollToGridIndex(t);
      this.ExploreScroll?.DeselectCurrentGridProxy(false);
      this.ExploreScroll?.SelectGridProxy(t);
      var t = this.ExploreScroll?.UnsafeGetGridProxy(t);
      if (t) {
        UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(t.GetBtnRootItem(), true);
      }
    };
    this.iNl = () => {
      return new MapExploreDetailItem_1.MapExploreDetailItem();
    };
    this.rNl = () => {
      UiManager_1.UiManager.OpenView("MapAreaShowView", {
        CountryId: this.YOl.CountryId,
        AreaId: this.YOl.AreaId,
        OnClickArea: this.L8l
      });
    };
    this.oNl = () => {
      UiManager_1.UiManager.OpenView("MapExploreStoryView", {
        AreaData: this.YOl
      }, this.Zjl);
    };
    this.nNl = () => {
      var t = this.eNl?.GetPhantomSkillHelpId();
      if (t) {
        HelpController_1.HelpController.OpenHelpById(t);
      }
    };
    this.sNl = () => {
      if (this.eNl) {
        UiManager_1.UiManager.OpenView("ExploreMissionView", this.eNl.AreaId, this.Zjl);
      }
    };
    this.aNl = () => {
      UiManager_1.UiManager.OpenView("MapPlayPointDetailView", {
        ExploreAreaItemData: this.eNl
      }, this.Zjl);
    };
    this.Zjl = (t, e) => {
      if (t) {
        UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(e);
      }
    };
    this.lNl = () => {
      if (UiManager_1.UiManager.IsViewShow("WorldMapView")) {
        this.eNl?.TrackPoint();
      } else {
        ModelManager_1.ModelManager.ExploreProgressModel.SetTrackExploreAreaItemData(this.eNl);
      }
      this.CloseMe();
    };
    this.hNl = () => {
      this.CloseMe();
    };
    this._Nl = () => {
      this.uNl(-1);
      this.PlaySequence("SwitchLeft");
    };
    this.cNl = () => {
      this.uNl(1);
      this.PlaySequence("SwitchRight");
    };
    this.L8l = t => {
      if (!this.IsDestroyOrDestroying) {
        UiManager_1.UiManager.CloseView("MapAreaShowView");
        if (this.YOl?.AreaId !== t && this.dNl(t) && this.IsShow) {
          this.CNl();
        }
      }
    };
    this.gNl = t => {
      this.ZOl?.UpdateRewardIds(t);
    };
    this.pNl = t => {
      if (this.YOl?.AreaId === t) {
        this.ZOl?.RefreshProgressBarDynamic(this.YOl.GetProgress());
      }
    };
    this.fNl = t => {
      this.eNl = t;
      this.vNl();
    };
    this.SNl = t => {
      if (this.YOl?.AreaId === t) {
        this.vNl();
      }
    };
    this.MNl = () => {
      this.yNl();
    };
    this.A8l = (t, e) => {
      if (this.YOl?.AreaId === t) {
        this.x8l(e);
      } else {
        this.R8l(t, e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UILoopScrollViewComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIButtonComponent], [16, UE.UIItem], [17, UE.UIButtonComponent], [18, UE.UIButtonComponent], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [24, UE.UIItem], [25, UE.UIText], [26, UE.UISprite], [27, UE.UIItem], [28, UE.UIItem]];
    this.BtnBindInfo = [[1, this._Nl], [2, this.cNl], [4, this.oNl], [6, this.rNl], [15, this.nNl], [10, this.sNl], [17, this.aNl], [18, this.lNl]];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    var e = t.AreaId;
    if (this.dNl(e)) {
      await Promise.all([this.VSd(), this.jSd(), this.HSd()]);
      this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.zJa.SetCloseCallBack(this.hNl);
      if (t?.ExploreType) {
        this.eNl = this.YOl.GetExploreAreaItemData(t.ExploreType);
      }
      this.InitExploreScroll();
    }
  }
  async VSd() {
    this.ZOl = new MapAreaRewardPanel_1.MapAreaRewardPanel();
    await this.ZOl.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
    this.ZOl.InitCommonRewardPopup(this.RootItem);
  }
  async jSd() {
    this.tNl = new MapExplorePlayProgressPanel_1.MapExplorePlayProgressPanel();
    await this.tNl.Init(this.GetItem(16));
  }
  async HSd() {
    this.NSd = new ExploreDetailLockItem_1.ExploreDetailLockItem();
    await this.NSd.CreateThenShowByActorAsync(this.GetItem(28).GetOwner());
    this.NSd.SetUiActive(false);
  }
  OnStart() {
    this.GetText(25)?.SetText("0");
  }
  ENl() {
    this.ZOl?.ChangeParamData({
      InitValue: this.YOl.GetProgress(),
      MaxValue: this.YOl.MaxExploreProgress,
      RewardDataList: this.YOl.GetStageRewardDataList(),
      GetRewardCallback: this.wOl
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceiveAreaStageRewardResponse, this.gNl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAreaExploreProgressUpdate, this.pNl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapExploreDetailItemClick, this.fNl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AreaPlayPointUpdate, this.SNl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AreaStoryProgressSave, this.MNl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap, this.A8l);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceiveAreaStageRewardResponse, this.gNl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAreaExploreProgressUpdate, this.pNl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapExploreDetailItemClick, this.fNl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AreaPlayPointUpdate, this.SNl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AreaStoryProgressSave, this.MNl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap, this.A8l);
  }
  OnBeforeShow() {
    if (!this.CNl()) {
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    this.ZOl = undefined;
    this.zJa = undefined;
  }
  InitExploreScroll() {
    var t = this.GetLoopScrollViewComponent(3);
    this.ExploreScroll = new LoopScrollView_1.LoopScrollView(t, this.GetItem(20).GetOwner(), this.iNl);
  }
  INl() {
    this.ExploreScroll?.RefreshByData(this.YOl.GetAllExploreAreaItemData(), false, this.T8l, true);
  }
  b8l() {
    var t = this.YOl.GetAllExploreAreaItemData();
    let e = 0;
    if ((e = this.eNl ? t.findIndex(t => t.ExploreType === this.eNl.ExploreType) : e) === -1) {
      e = 0;
      this.eNl = t[e];
    }
    return e;
  }
  uNl(t) {
    var e = this.zOl.length;
    var t = this.JOl + t;
    if ((t = MathUtils_1.MathUtils.Clamp(t, 0, e - 1)) !== this.JOl) {
      this.JOl = t;
      this.YOl = this.zOl[t];
      this.CNl();
    }
  }
  CNl() {
    if (!this.YOl) {
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ExploreProgress", 69, "UpdateAreaData", ["AreaId", this.YOl.AreaId], ["AreaName", ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(this.YOl.GetNameId())]);
    }
    this.GetButton(1)?.RootUIComp.SetUIActive(this.JOl > 0);
    this.GetButton(2)?.RootUIComp.SetUIActive(this.JOl < this.zOl.length - 1);
    this.YOl.CheckUpdatePlayPointData();
    this.TNl();
    this.ENl();
    this.INl();
    var t = this.YOl.GetProgress();
    this.GetSprite(26)?.SetFillAmount(t / 100);
    this.LNl();
    this.yNl();
    return true;
  }
  TNl() {
    this.GetText(5)?.ShowTextNew(this.YOl.GetNameId());
    var t = this.YOl.GetProgress();
    var e = t + "%";
    this.GetText(8)?.SetText(e);
    var e = this.GetText(25);
    e.SetChangeColor(t > 0, e.changeColor);
  }
  dNl(t) {
    var e = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t);
    if (e) {
      this.YOl = e;
      if (this.zOl.length <= 0) {
        this.zOl = ModelManager_1.ModelManager.ExploreProgressModel.GetAllAreaDataListSortCountryState();
        this.zOl.forEach(t => {
          t.ClearFlagUpdatePlayPointData();
        });
      }
      this.JOl = this.zOl.findIndex(t => t.AreaId === this.YOl.AreaId);
      return true;
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("Area Id Cannot Be Found: " + t);
      return false;
    }
  }
  OnTick(t) {
    this.ZOl?.OnTickRefresh(t);
  }
  x8l(t, e = true) {
    if (t && t !== this.eNl.ExploreType && (t = this.YOl.GetExploreAreaItemData(t)) && (this.eNl = t, e)) {
      this.T8l();
    }
  }
  R8l(t, e) {
    if (this.dNl(t)) {
      this.x8l(e, false);
      this.CNl();
    }
  }
  vNl() {
    var t;
    var e = !!this.eNl?.IsUnlocked();
    this.GetItem(21)?.SetUIActive(e);
    this.GetItem(22)?.SetUIActive(!e);
    if (e) {
      this.SetTextureByPath(this.eNl.DescBg, this.GetTexture(11));
      this.GetText(12)?.ShowTextNew(this.eNl.DescId);
      e = this.eNl.IsCompleted();
      t = this.eNl.HasPhantomSkill();
      this.GetItem(24)?.SetUIActive(e);
      this.GetItem(13)?.SetUIActive(!e && t);
      t = this.$Sd();
      this.UNl();
      e = this.eNl.IsShowTrackBtn && !e && t;
      this.GetButton(18)?.RootUIComp.SetUIActive(e);
      t = this.GetText(14);
      if (e = this.eNl.GetIsPhantomSkillUnlock() ? this.eNl.GetUnlockTextId() : this.eNl.GetLockTextId()) {
        t.ShowTextNew(e);
      }
      t.SetUIActive(!!e);
      t = this.eNl.ExploreType === 6;
      this.GetButton(10).RootUIComp.SetUIActive(t);
    } else if (e = this.eNl?.GetLockDetailId()) {
      this.GetText(23)?.ShowTextNew(e);
    }
  }
  UNl() {
    var t = this.eNl.IsShowProgressBar;
    this.GetItem(19)?.SetUIActive(t);
    if (t) {
      this.tNl?.UpdateData(this.eNl.GetPlayProgressDataIgnoreHiddenList());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateExploreProgressBar);
    }
  }
  $Sd() {
    var t = this.eNl.GetNearTrackMapMark();
    let e = true;
    if (t && t.GameplayLockJumpId !== 0 && t.GameplayLockText !== "") {
      if (this.eNl?.GetPlayIdIsUnlock(t.RelativeId)) {
        this.NSd?.Reset();
      } else {
        this.NSd?.RefreshExternalByData(t.MarkId);
        e = false;
      }
    }
    return e;
  }
  LNl() {
    for (const t of this.zOl) {
      if (t.AreaId !== this.YOl.AreaId && t.HasCanTakeStageReward()) {
        this.GetItem(9)?.SetUIActive(true);
        return;
      }
    }
    this.GetItem(9)?.SetUIActive(false);
  }
  yNl() {
    var t = this.YOl.HasNewStoryUnlocked();
    this.GetItem(27)?.SetUIActive(t);
  }
  get IsShowProgressBar() {
    return this.eNl?.IsShowProgressBar;
  }
}
exports.MapExploreDetailView = MapExploreDetailView;
//# sourceMappingURL=MapExploreDetailView.js.map