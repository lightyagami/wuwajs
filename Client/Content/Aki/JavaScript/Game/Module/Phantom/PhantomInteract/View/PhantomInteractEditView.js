"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomGridGridTemplateData = exports.PhantomGridItem = exports.PhantomGridRowTitleTemplateData = exports.PhantomGridRowTitleItem = exports.PhantomInteractEditView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const StaticTabComponent_1 = require("../../../Common/TabComponent/StaticTabComponent");
const SyncGridProxyAbstract_1 = require("../../../Util/Grid/SyncGridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MultiTemplateScrollView_1 = require("../../../Util/ScrollView/MultiTemplateScrollView");
const CostTabItem_1 = require("../../Vision/View/CostTabItem");
const PhantomInteractModel_1 = require("../PhantomInteractModel");
const PhantomInteractDetailPanel_1 = require("./PhantomInteractDetailPanel");
const PhantomInteractDropDownItem_1 = require("./PhantomInteractDropDownItem");
const PhantomInteractDropDownTitleItem_1 = require("./PhantomInteractDropDownTitleItem");
const PhantomInteractGridMediumItemGrid_1 = require("./PhantomInteractGridMediumItemGrid");
const PhantomInteractListPanel_1 = require("./PhantomInteractListPanel");
const allCostToggleInfo = [{
  Component: 9,
  CostValue: -1
}, {
  Component: 10,
  CostValue: 1
}, {
  Component: 11,
  CostValue: 3
}, {
  Component: 12,
  CostValue: 4
}];
const allFilterOption = [0, 1, 2];
const CAPTION_ICON_ID = "/Game/Aki/UI/UIResources/Common/Atlas/SkillIcon/SkillIconNor/SP_IconT29.SP_IconT29";
const CAPTION_TITLE_ID = "ExploreTools_1007_Name";
const CAPTION_HELP_ID = 473;
const GRID_FOCUS_CLAMP_TO_TITLE_RANGE = 3;
class PhantomInteractEditView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Kda = undefined;
    this.ZSf = undefined;
    this._Qf = undefined;
    this.bs_ = undefined;
    this._wf = undefined;
    this.uwf = undefined;
    this.cwf = [];
    this.JPd = undefined;
    this.Hea = undefined;
    this.SGf = 0;
    this.dwf = [];
    this.mwf = [];
    this.USg = [];
    this.oWf = 0;
    this.o_g = false;
    this.nwf = (t, ...e) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomInteraction", 95, t, ...e);
      }
    };
    this.g8e = t => {
      return Number(t);
    };
    this.C8e = t => {
      var e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var t = allFilterOption[t];
      this.nWf(-1);
      e.SetFilterIsSpecial(t);
      if (this.o_g) {
        e.RefreshFilterGridViewData();
      }
      this.Refresh();
      this.fwf();
      this.gwf(undefined, true);
    };
    this.fqe = (t, e) => {
      t = new CostTabItem_1.CostTabItem(t);
      t.Init();
      return t;
    };
    this.pqe = t => {
      var e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var t = allCostToggleInfo[t].CostValue;
      this.nWf(-1);
      e.SetFilterCost(t);
      if (this.o_g) {
        e.RefreshFilterGridViewData();
      }
      this.Refresh();
      this.fwf();
      this.gwf(undefined, true);
    };
    this.tMf = () => {
      var t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var e = t.SelectedItemData?.MonsterId ?? 0;
      t.ConfirmEquipHandler?.();
      this.Refresh();
      var i = t.FindGridIndexInMultiTemplate(t.SelectedGridData?.MonsterId ?? 0);
      if (i >= 0) {
        this.nWf(i);
      }
      if (!(e <= 0)) {
        if ((i = t.FindGridIndexInMultiTemplate(e)) >= 0) {
          this.nWf(i);
        }
      }
    };
    this.Cwf = () => {
      const t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      t.SetEquipRecommendCallback(() => {
        this.Refresh();
        var e = t.GetFilteredRecommendedIdList()?.length ?? 0;
        for (let t = 0; t < e; t++) {
          var i = t + 1;
          this.nWf(i);
        }
        this.gwf(-1);
      });
      t.EquipRecommendHandler?.();
    };
    this.rMf = e => {
      var i = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var s = e.ItemIndex !== i.SelectedItemData?.ItemIndex;
      var r = e.MonsterId;
      if (s && r > 0) {
        let t = i.FindGridIndexInMultiTemplate(e.MonsterId);
        if (t < 0 && (s = this.uwf?.GetSelectedIndex() !== 0, r = this.JPd?.GetSelectedIndex() !== 0, s && this.uwf?.SelectToggleByIndex(0, true), r && this.JPd?.SetSelectedIndex(0), s || r)) {
          t = i.FindGridIndexInMultiTemplate(e.MonsterId);
        }
        this.gwf(t < 0 ? 0 : t, true);
      }
      i.SelectItem(e.ItemIndex);
      this.Refresh();
    };
    this.pwf = () => {
      var t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      t.MoveNextSkinHandler?.();
      this.Refresh();
      var t = t.FindGridIndexInMultiTemplate(t.SelectedGridData?.MonsterId ?? 0);
      if (t >= 0) {
        this.nWf(t);
      }
    };
    this.m8e = t => {
      return new PhantomInteractDropDownItem_1.PhantomInteractDropDownItem(t);
    };
    this.c8e = t => new PhantomInteractDropDownTitleItem_1.PhantomInteractDropDownTitleItem(t);
    this.vwf = (t, e) => {
      ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.SelectGrid(t.MonsterId);
      this.Refresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIMultiTemplateScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    for (const t of allCostToggleInfo) {
      this.ComponentRegisterInfos.push([t.Component, UE.UIItem]);
    }
    this.BtnBindInfo = [[6, this.pwf]];
  }
  async OnBeforeStartAsync() {
    var t;
    var e;
    if (this.OpenParam) {
      this.ZSf = new PhantomInteractListPanel_1.PhantomInteractListPanel(false);
      t = [];
      e = this.GetItem(0);
      e = this.ZSf.CreateByActorAsync(e.GetOwner());
      t.push(e);
      this._Qf = new PhantomInteractDetailPanel_1.PhantomInteractDetailPanelGroup();
      e = this._Qf.CreateWithParent(this.GetItem(8));
      t.push(e);
      this.bs_ = new ButtonItem_1.ButtonItem(this.GetItem(5));
      this.bs_.SetFunction(this.tMf);
      this._wf = new MultiTemplateScrollView_1.MultiTemplateScrollView(this.GetMultiTemplateScrollViewComponent(1));
      this.JPd = new CommonDropDown_1.CommonDropDown(this.GetItem(4), this.m8e, this.c8e);
      t.push(this.JPd.Init());
      await Promise.all(t);
      this.ZSf.OnClickCb = this.rMf;
      this.ZSf?.SetUiActive(true);
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(14)?.SetUIActive(false);
      this.GetItem(13)?.SetUIActive(false);
      this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      e = allCostToggleInfo.map(t => this.GetItem(t.Component));
      this.uwf = new StaticTabComponent_1.StaticTabComponent(this.fqe, this.pqe);
      this.uwf.Init(e);
      this.uwf.SelectToggleByIndex(0, true);
      this.nwf("PhantomInteractEditView OnBeforeStartAsync finished");
    }
  }
  OnDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
  aHi() {
    this.JPd.SetOnSelectCall(this.C8e);
    this.JPd.SetShowType(1);
    this.JPd.InitScroll(allFilterOption, this.g8e, 0);
  }
  OnStart() {
    var t;
    var e = this.OpenParam;
    if (e) {
      t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      this.Kda = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
      this.Kda.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.Kda.SetTitleByTextIdAndArgNew(CAPTION_TITLE_ID);
      this.Kda.SetTitleIcon(CAPTION_ICON_ID);
      this.Kda.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(CAPTION_HELP_ID);
      });
      this.aHi();
      this.ZSf?.Refresh(e.InfoData.EquippedVisionData, true);
      this.fwf();
      t = t.FindGridIndexInMultiTemplate(t.SelectedItemData?.MonsterId ?? 0);
      this.gwf(t);
      this.Refresh();
      if (e.FromSummonView) {
        this.Hea?.PlayLevelSequenceByName("Start01");
      } else {
        this.Hea?.PlayLevelSequenceByName("Start02");
      }
      this.o_g = true;
    }
  }
  Refresh() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel.InteractInfoData;
    var e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
    this.oMf(e.BtnState, e.BtnAvailable);
    this.ZSf?.Refresh(t.EquippedVisionData, true);
    var t = e.SelectedItemData;
    if (t) {
      this.ZSf.SetSelectedItem(t.ItemIndex);
    }
    var t = e.SelectedGridData;
    var i = t?.IsUnlocked ?? false;
    var s = e.SelectedGridData?.HasSkin ?? false;
    this.GetButton(6)?.RootUIComp.SetUIActive(s && i);
    var s = t?.MonsterId ?? 0;
    if (this.SGf !== s) {
      this.SGf = s;
    }
    var i = e.SelectedGridData?.MonsterId ?? 0;
    this.sWf(i);
    this._Qf?.RefreshDetailPanel(e.ShowDetail, e.DetailViewModel);
  }
  sWf(t) {
    var e;
    var i;
    if (t !== this.oWf) {
      i = (e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel).FindGridIndexInMultiTemplate(this.oWf);
      this.nWf(i);
      i = e.FindGridIndexInMultiTemplate(t);
      this.nWf(i);
      this.oWf = t;
    }
  }
  oMf(t, e) {
    this.bs_?.SetUiActive(t !== 0);
    this.nMf(t);
    this.bs_?.SetEnableClick(e);
  }
  nMf(t) {
    let e = undefined;
    switch (t) {
      case 2:
        e = "Text_PhantomPutOn_Text";
        break;
      case 1:
        e = "Text_PhantomTakeOff_Text";
        break;
      case 3:
        e = "Text_PhantomReplace_Text";
        break;
      default:
        e = undefined;
    }
    if (e) {
      this.bs_?.SetLocalTextNew(e);
    }
  }
  fwf() {
    this.cwf = [];
    let t = this.USg.length = 0;
    let e = 0;
    var i;
    var s = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
    for (const a of s.GridsDataList) {
      if (a.TitleType !== 0) {
        (i = this.ywf(e++)).Data = a.TitleType;
        i.ClickRecommendBtnCb = this.Cwf;
        this.USg.push(this.cwf.length);
        this.cwf.push(i);
      }
      for (const h of a.MonsterIds) {
        var r;
        var o = s.GridViewModelMap.get(h);
        if (o) {
          (r = this.Swf(t++)).Data = o;
          r.OnClickCb = this.vwf;
          o.GridIndex = this.cwf.length;
          this.cwf.push(r);
        }
      }
    }
  }
  Swf(e) {
    for (let t = e - this.dwf.length; t >= 0; t--) {
      var i = new PhantomGridGridTemplateData();
      this.dwf.push(i);
    }
    return this.dwf[e];
  }
  ywf(e) {
    for (let t = e - this.mwf.length; t >= 0; t--) {
      var i = new PhantomGridRowTitleTemplateData();
      this.mwf.push(i);
    }
    return this.mwf[e];
  }
  gwf(t, e = false) {
    var i = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.cwf);
    let s = t ?? 0;
    for (const r of this.USg) {
      if (s > r && s <= r + GRID_FOCUS_CLAMP_TO_TITLE_RANGE) {
        s = r;
        break;
      }
    }
    i.ScrollToGridIndex = s;
    i.GridAnimName = "Start";
    i.PlayGridAnim = e;
    this._wf?.RefreshByData(i);
    t = this.cwf.length <= 0;
    this.GetItem(2)?.SetUIActive(t);
  }
  nWf(t) {
    var e;
    if (!(t < 0)) {
      e = this.cwf[t];
      this._wf?.GetProxyByGridIndex(t)?.Refresh(e.Data);
    }
  }
}
exports.PhantomInteractEditView = PhantomInteractEditView;
class PhantomGridRowTitleItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ClickRecommendBtnCb = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, () => {
      this.ClickRecommendBtnCb?.();
    }]];
  }
  Refresh(t) {
    let e = "";
    let i = false;
    switch (t) {
      case 2:
      case 1:
        i = true;
        e = "PhantomDisplay_RecommendingTitle";
        break;
      case 3:
        e = "PhantomDisplay_ElseTitle";
        break;
      default:
        e = "";
    }
    var t = t !== 2;
    var s = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, e);
    var s = this.GetButton(1);
    s?.RootUIComp?.SetUIActive(i);
    s?.SetSelfInteractive(t);
  }
}
exports.PhantomGridRowTitleItem = PhantomGridRowTitleItem;
class PhantomGridRowTitleTemplateData {
  constructor() {
    this.Data = 0;
    this.ClickRecommendBtnCb = undefined;
  }
  GetTemplateIndex() {
    return 0;
  }
  CreateProxy() {
    var t = new PhantomGridRowTitleItem();
    t.ClickRecommendBtnCb = () => {
      this.ClickRecommendBtnCb?.();
    };
    return t;
  }
}
exports.PhantomGridRowTitleTemplateData = PhantomGridRowTitleTemplateData;
class PhantomGridItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Q$l = undefined;
    this.OnClickCb = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  OnStart() {
    var t = this.GetExtendToggle(0)?.GetRootComponent();
    this.Q$l = new PhantomInteractGridMediumItemGrid_1.PhantomInteractGridMediumItemGrid();
    this.Q$l.CreateThenShowByActor(t.GetOwner());
    this.Q$l.SetOnClickCallBack((t, e) => {
      this.OnClickCb(t, e);
    });
  }
  Refresh(t) {
    if (t) {
      if (t.IsSelected && PhantomInteractModel_1.PhantomInteractModel.CheckPhantomInteractUnlockRedDot(t.MonsterId)) {
        PhantomInteractModel_1.PhantomInteractModel.SetPhantomInteractUnlockRedDot(t.MonsterId, false);
      }
      this.Q$l.Refresh(t, false, this.GridIndex);
      this.SetToggleState(t.IsSelected);
    }
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, false, false, true);
  }
}
exports.PhantomGridItem = PhantomGridItem;
class PhantomGridGridTemplateData {
  constructor() {
    this.Data = undefined;
    this.OnClickCb = undefined;
  }
  GetTemplateIndex() {
    return 1;
  }
  CreateProxy() {
    var t = new PhantomGridItem();
    t.OnClickCb = (t, e) => {
      this.OnClickCb(t, e);
    };
    return t;
  }
}
exports.PhantomGridGridTemplateData = PhantomGridGridTemplateData;
//# sourceMappingURL=PhantomInteractEditView.js.map