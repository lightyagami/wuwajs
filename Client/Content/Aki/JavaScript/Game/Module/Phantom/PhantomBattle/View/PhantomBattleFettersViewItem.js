"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDetailMonsterItem = exports.VisionDetailMonsterItemData = exports.PhantomBattleFettersViewItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomBattleItemView_1 = require("./PhantomBattleItemView");
const VisionFetterDescItem_1 = require("./VisionFetterDescItem");
const VisionFetterMonsterItem_1 = require("./VisionFetterMonsterItem");
class PhantomBattleFettersViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Z6i = 14;
    this.e8i = undefined;
    this.t8i = undefined;
    this.vpt = undefined;
    this.Mpt = undefined;
    this.eGe = undefined;
    this.H1i = undefined;
    this.SPe = undefined;
    this.i8i = 0;
    this.dFe = 0;
    this.o8i = 0;
    this.r8i = false;
    this.OnFastFilter = undefined;
    this.n8i = () => {
      return new VisionFetterMonsterItem_1.VisionFetterMonsterItem();
    };
    this.sGe = () => {
      return new VisionFetterDescItem_1.VisionFetterDescItem();
    };
    this.Mo_ = () => {
      var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.i8i).AccessId;
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
    };
    this.cHe = () => {
      var e = new PhantomBattleItemView_1.PhantomFettersItem();
      e.BindOnItemButtonClickedCallback(this.BTt);
      return e;
    };
    this.Qvt = e => {
      var t = e;
      this.t8i = [];
      var i = t.length;
      for (let e = 0; e < i; e++) {
        var r = new PhantomBattleItemView_1.PhantomFetterItemData();
        r.PhantomFetterGroup = t[e];
        r.RoleId = this.dFe;
        this.t8i.push(r);
      }
      this.Esi();
      this.s8i(e);
    };
    this.Esi = () => {
      if (this.t8i) {
        this.e8i.DeselectCurrentGridProxy();
        this.e8i.ReloadData(this.t8i);
        if (this.o8i === 0) {
          this.e8i.SelectGridProxy(0);
          this.e8i.RefreshGridProxy(0);
          this.a8i(this.t8i[0].PhantomFetterGroup);
        } else {
          let t = 0;
          var i = this.t8i.length;
          for (let e = 0; e < i; e++) {
            if (this.t8i[e].PhantomFetterGroup.Id === this.o8i) {
              t = e;
              break;
            }
          }
          this.e8i.ScrollToGridIndex(t, true);
          this.e8i.SelectGridProxy(t);
          this.e8i.RefreshGridProxy(t);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 27, "没有羁绊幻象");
      }
    };
    this.BTt = e => {
      this.e8i.DeselectCurrentGridProxy();
      var t = this.t8i.indexOf(e);
      if (this.e8i.IsGridDisplaying(t)) {
        this.a8i(e.PhantomFetterGroup);
        this.e8i.SelectGridProxy(t);
        this.e8i.RefreshGridProxy(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIVerticalLayout], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIScrollViewWithScrollbarComponent]];
    if (this.OnFastFilter) {
      this.BtnBindInfo = [[5, this.OnFastFilter]];
    }
    this.BtnBindInfo.push([12, this.Mo_]);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.e8i = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.cHe);
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(6), this.Qvt);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(7), this.Qvt);
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.sGe);
    this.H1i = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(10), this.n8i);
    this.vpt.SetUiActive(!ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab);
    this.Mpt.SetUiActive(!ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab);
  }
  async PlayStartSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Start", e);
  }
  async PlayHideSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  OnBeforeShow() {
    var e;
    if (UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle()) {
      e = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model?.CheckGetComponent(0);
      this.r8i = e?.GetVisible() ?? false;
      e?.SetVisible(false);
    }
    this.h8i();
  }
  h8i() {
    var e = ModelManager_1.ModelManager.CalabashModel.GetPhantomFetterGroupList();
    this.vpt.UpdateData(this.Z6i, e, this.dFe);
    this.Mpt.UpdateData(this.Z6i, e, this.dFe);
  }
  s8i(e) {
    this.GetItem(8).SetUIActive(e.length > 0);
    this.GetButton(5).RootUIComp.SetUIActive(e.length > 0 && this.OnFastFilter !== undefined);
  }
  l8i(t) {
    var i = t.length;
    var r = new Map();
    for (let e = 0; e < i; e++) {
      var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(t[e])[0].Rarity;
      var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(s).Cost;
      var o = r.get(s) ?? [];
      o.push(new VisionDetailMonsterItemData(t[e], 0, this.dFe));
      r.set(s, o);
    }
    const a = ModelManager_1.ModelManager.CalabashModel.OnlyMonsterCostShowMaxLevel;
    const n = new Array();
    r.forEach((e, t) => {
      var i;
      if (a === undefined || !(a < t)) {
        (i = new VisionFetterMonsterItem_1.VisionFetterMonsterData()).Cost = t;
        i.MonsterList = e;
        n.push(i);
      }
    });
    n.sort((e, t) => t.Cost - e.Cost);
    if (n.length > 0) {
      this.H1i.RefreshByData(n);
    }
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArray(t);
    this.GetText(9).SetText(e + "/" + t.length);
  }
  SelectByFetterId(t) {
    var e = this.t8i.findIndex(e => e.PhantomFetterGroup.Id === t);
    if (e >= 0) {
      this.e8i.ScrollToGridIndex(e, true);
      this.e8i.SelectGridProxy(e);
    }
  }
  SetSelectRoleId(e) {
    this.dFe = e;
  }
  a8i(e) {
    this.i8i = e.Id;
    this.P5e(e.FetterGroupName);
    this.nOe(e.FetterMap);
    this._8i(e.FetterGroupDesc);
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(this.i8i);
    e = Array.from(e);
    this.l8i(e);
    this.GetScrollViewWithScrollbar(13).SetScrollProgress(0);
  }
  P5e(e) {
    this.GetText(2).ShowTextNew(e);
  }
  nOe(e) {
    const r = new Array();
    e.forEach((e, t) => {
      var i = new VisionFetterDescItem_1.VisionFetterDescData();
      i.Key = t;
      i.Value = e;
      r.push(i);
    });
    this.eGe.RefreshByData(r, undefined, true);
    if (this.SPe?.GetCurrentSequence() === "Switch") {
      this.SPe?.ReplaySequenceByKey("Switch");
    } else {
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Switch");
    }
  }
  _8i(e) {
    this.GetText(4).ShowTextNew(e);
  }
  GetCurrentSelectGroupId() {
    return this.i8i;
  }
  OnBeforeDestroy() {
    var e;
    ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter = undefined;
    if (UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() && (e = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model)) {
      UiModelUtil_1.UiModelUtil.SetVisible(e, this.r8i);
    }
    if (this.e8i) {
      this.e8i.ClearGridProxies();
      this.e8i = undefined;
    }
  }
}
exports.PhantomBattleFettersViewItem = PhantomBattleFettersViewItem;
class VisionDetailMonsterItemData {
  constructor(e = 0, t = 0, i = 0) {
    this.MonsterId = e;
    this.QualityId = t;
    this.RoleId = i;
  }
}
exports.VisionDetailMonsterItemData = VisionDetailMonsterItemData;
class VisionDetailMonsterItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.u8i = 0;
    this.RFe = () => {};
    this.c8i = () => {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.TryJumpToTargetViewByMonsterId(this.u8i);
    };
  }
  OnStart() {
    this.BindOnExtendToggleClicked(this.RFe);
  }
  OnExtendToggleClicked() {
    this.c8i();
  }
  OnExtendToggleStateChanged(e) {
    this.SetSelected(false, false);
  }
  OnRefresh(e, t, i) {
    this.Refresh(e);
  }
  Refresh(t) {
    this.u8i = t.MonsterId;
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, this.u8i);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t.RoleId);
    var r = e?.GetPhantomData()?.GetDataMap();
    let s = 0;
    if (r) {
      for (var [, o] of r) {
        if (o?.GetConfig().MonsterId === this.u8i) {
          s = e?.GetRoleId();
          break;
        }
      }
    }
    r = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.u8i);
    if (r) {
      i = i !== undefined;
      let e = undefined;
      if (t.QualityId > 0) {
        a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(this.u8i);
        e = a[t.QualityId - 1];
      }
      var a = {
        Data: t,
        Type: 3,
        ItemConfigId: e,
        BottomText: "",
        IsNotFoundVisible: !i,
        MonsterId: r.MonsterInfoId,
        IconHidden: !i
      };
      a.VisionRoleHeadInfo = s;
      this.Apply(a);
    }
  }
}
exports.VisionDetailMonsterItem = VisionDetailMonsterItem;
//# sourceMappingURL=PhantomBattleFettersViewItem.js.map