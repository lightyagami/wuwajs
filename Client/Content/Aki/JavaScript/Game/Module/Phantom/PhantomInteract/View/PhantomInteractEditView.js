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
    this.mgf = undefined;
    this.P5f = undefined;
    this.bs_ = undefined;
    this.UEf = undefined;
    this.xEf = undefined;
    this.BEf = [];
    this.JPd = undefined;
    this.Hea = undefined;
    this.FUf = 0;
    this.kEf = [];
    this.qEf = [];
    this.wZf = [];
    this.A4f = 0;
    this.eXf = false;
    this.REf = (t, ...e) => {
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
      this.D4f(-1);
      e.SetFilterIsSpecial(t);
      if (this.eXf) {
        e.RefreshFilterGridViewData();
      }
      this.Refresh();
      this.OEf();
      this.GEf(undefined, true);
    };
    this.fqe = (t, e) => {
      t = new CostTabItem_1.CostTabItem(t);
      t.Init();
      return t;
    };
    this.pqe = t => {
      var e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var t = allCostToggleInfo[t].CostValue;
      this.D4f(-1);
      e.SetFilterCost(t);
      if (this.eXf) {
        e.RefreshFilterGridViewData();
      }
      this.Refresh();
      this.OEf();
      this.GEf(undefined, true);
    };
    this.ggf = () => {
      var t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var e = t.SelectedItemData?.MonsterId ?? 0;
      t.ConfirmEquipHandler?.();
      this.Refresh();
      var i = t.FindGridIndexInMultiTemplate(t.SelectedGridData?.MonsterId ?? 0);
      if (i >= 0) {
        this.D4f(i);
      }
      if (!(e <= 0)) {
        if ((i = t.FindGridIndexInMultiTemplate(e)) >= 0) {
          this.D4f(i);
        }
      }
    };
    this.FEf = () => {
      const t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      t.SetEquipRecommendCallback(() => {
        this.Refresh();
        var e = t.GetFilteredRecommendedIdList()?.length ?? 0;
        for (let t = 0; t < e; t++) {
          var i = t + 1;
          this.D4f(i);
        }
        this.GEf(-1);
      });
      t.EquipRecommendHandler?.();
    };
    this.pgf = e => {
      var i = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      var s = e.ItemIndex !== i.SelectedItemData?.ItemIndex;
      var r = e.MonsterId;
      if (s && r > 0) {
        let t = i.FindGridIndexInMultiTemplate(e.MonsterId);
        if (t < 0 && (s = this.xEf?.GetSelectedIndex() !== 0, r = this.JPd?.GetSelectedIndex() !== 0, s && this.xEf?.SelectToggleByIndex(0, true), r && this.JPd?.SetSelectedIndex(0), s || r)) {
          t = i.FindGridIndexInMultiTemplate(e.MonsterId);
        }
        this.GEf(t < 0 ? 0 : t, true);
      }
      i.SelectItem(e.ItemIndex);
      this.Refresh();
    };
    this.NEf = () => {
      var t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
      t.MoveNextSkinHandler?.();
      this.Refresh();
      var t = t.FindGridIndexInMultiTemplate(t.SelectedGridData?.MonsterId ?? 0);
      if (t >= 0) {
        this.D4f(t);
      }
    };
    this.m8e = t => {
      return new PhantomInteractDropDownItem_1.PhantomInteractDropDownItem(t);
    };
    this.c8e = t => new PhantomInteractDropDownTitleItem_1.PhantomInteractDropDownTitleItem(t);
    this.VEf = (t, e) => {
      ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.SelectGrid(t.MonsterId);
      this.Refresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIMultiTemplateScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    for (const t of allCostToggleInfo) {
      this.ComponentRegisterInfos.push([t.Component, UE.UIItem]);
    }
    this.BtnBindInfo = [[6, this.NEf]];
  }
  async OnBeforeStartAsync() {
    var t;
    var e;
    if (this.OpenParam) {
      this.mgf = new PhantomInteractListPanel_1.PhantomInteractListPanel(false);
      t = [];
      e = this.GetItem(0);
      e = this.mgf.CreateByActorAsync(e.GetOwner());
      t.push(e);
      this.P5f = new PhantomInteractDetailPanel_1.PhantomInteractDetailPanelGroup();
      e = this.P5f.CreateWithParent(this.GetItem(8));
      t.push(e);
      this.bs_ = new ButtonItem_1.ButtonItem(this.GetItem(5));
      this.bs_.SetFunction(this.ggf);
      this.UEf = new MultiTemplateScrollView_1.MultiTemplateScrollView(this.GetMultiTemplateScrollViewComponent(1));
      this.JPd = new CommonDropDown_1.CommonDropDown(this.GetItem(4), this.m8e, this.c8e);
      t.push(this.JPd.Init());
      await Promise.all(t);
      this.mgf.OnClickCb = this.pgf;
      this.mgf?.SetUiActive(true);
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(14)?.SetUIActive(false);
      this.GetItem(13)?.SetUIActive(false);
      this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      e = allCostToggleInfo.map(t => this.GetItem(t.Component));
      this.xEf = new StaticTabComponent_1.StaticTabComponent(this.fqe, this.pqe);
      this.xEf.Init(e);
      this.xEf.SelectToggleByIndex(0, true);
      this.REf("PhantomInteractEditView OnBeforeStartAsync finished");
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
      this.mgf?.Refresh(e.InfoData.EquippedVisionData, true);
      this.OEf();
      t = t.FindGridIndexInMultiTemplate(t.SelectedItemData?.MonsterId ?? 0);
      this.GEf(t);
      this.Refresh();
      if (e.FromSummonView) {
        this.Hea?.PlayLevelSequenceByName("Start01");
      } else {
        this.Hea?.PlayLevelSequenceByName("Start02");
      }
      this.eXf = true;
    }
  }
  Refresh() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel.InteractInfoData;
    var e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
    this.vgf(e.BtnState, e.BtnAvailable);
    this.mgf?.Refresh(t.EquippedVisionData, true);
    var t = e.SelectedItemData;
    if (t) {
      this.mgf.SetSelectedItem(t.ItemIndex);
    }
    var t = e.SelectedGridData;
    var i = t?.IsUnlocked ?? false;
    var s = e.SelectedGridData?.HasSkin ?? false;
    this.GetButton(6)?.RootUIComp.SetUIActive(s && i);
    var s = t?.MonsterId ?? 0;
    if (this.FUf !== s) {
      this.FUf = s;
    }
    var i = e.SelectedGridData?.MonsterId ?? 0;
    this.U4f(i);
    this.P5f?.RefreshDetailPanel(e.ShowDetail, e.DetailViewModel);
  }
  U4f(t) {
    var e;
    var i;
    if (t !== this.A4f) {
      i = (e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel).FindGridIndexInMultiTemplate(this.A4f);
      this.D4f(i);
      i = e.FindGridIndexInMultiTemplate(t);
      this.D4f(i);
      this.A4f = t;
    }
  }
  vgf(t, e) {
    this.bs_?.SetUiActive(t !== 0);
    this.ygf(t);
    this.bs_?.SetEnableClick(e);
  }
  ygf(t) {
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
  OEf() {
    this.BEf = [];
    let t = this.wZf.length = 0;
    let e = 0;
    var i;
    var s = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel;
    for (const a of s.GridsDataList) {
      if (a.TitleType !== 0) {
        (i = this.HEf(e++)).Data = a.TitleType;
        i.ClickRecommendBtnCb = this.FEf;
        this.wZf.push(this.BEf.length);
        this.BEf.push(i);
      }
      for (const h of a.MonsterIds) {
        var r;
        var o = s.GridViewModelMap.get(h);
        if (o) {
          (r = this.jEf(t++)).Data = o;
          r.OnClickCb = this.VEf;
          o.GridIndex = this.BEf.length;
          this.BEf.push(r);
        }
      }
    }
  }
  jEf(e) {
    for (let t = e - this.kEf.length; t >= 0; t--) {
      var i = new PhantomGridGridTemplateData();
      this.kEf.push(i);
    }
    return this.kEf[e];
  }
  HEf(e) {
    for (let t = e - this.qEf.length; t >= 0; t--) {
      var i = new PhantomGridRowTitleTemplateData();
      this.qEf.push(i);
    }
    return this.qEf[e];
  }
  GEf(t, e = false) {
    var i = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.BEf);
    let s = t ?? 0;
    for (const r of this.wZf) {
      if (s > r && s <= r + GRID_FOCUS_CLAMP_TO_TITLE_RANGE) {
        s = r;
        break;
      }
    }
    i.ScrollToGridIndex = s;
    i.GridAnimName = "Start";
    i.PlayGridAnim = e;
    this.UEf?.RefreshByData(i);
    var t = this.UEf?.ScrollView;
    var e = t?.ContentUIItem;
    var i = t?.GetViewport()?.GetUIItem();
    if (i?.IsValid() && e?.IsValid() && (t = i.GetHeight(), e.GetHeight() < t)) {
      e.SetAnchorOffsetY(0);
    }
    var i = this.BEf.length <= 0;
    this.GetItem(2)?.SetUIActive(i);
  }
  D4f(t) {
    var e;
    if (!(t < 0)) {
      e = this.BEf[t];
      this.UEf?.GetProxyByGridIndex(t)?.Refresh(e.Data);
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