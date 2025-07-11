"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseRankView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const TowerDefenceDefine_1 = require("../TowerDefenceDefine");
const TowerDefenseRankItem_1 = require("./TowerDefenseRankItem");
class RankTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Esc = undefined;
    this.R$l = undefined;
    this.Bke = () => {
      this.R$l.TabItemToggle(this.Esc);
    };
  }
  OnRegisterComponent() {
    this.R$l = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => this.R$l.TabItemCanExecuteChange(this.Esc));
  }
  GetKey(e, t) {
    return e;
  }
  Refresh(e, t, i) {
    this.Esc = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), TowerDefenceDefine_1.tabText[e]);
  }
  SetToggleState(e, t = false) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(e, t);
  }
}
class TowerDefenseRankView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.B7t = undefined;
    this.Isc = undefined;
    this.Tsc = undefined;
    this.HLn = undefined;
    this.C5e = () => {
      var e = new RankTabItem();
      e.OpenParam = this.HLn;
      return e;
    };
    this.bsc = () => {
      var e = new TowerDefenseRankItem_1.TowerDefenseRankItem(false);
      e.OpenParam = this.HLn;
      return e;
    };
  }
  OnRegisterComponent() {
    this.HLn = this.OpenParam;
    this.HLn.RegisterView(this);
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.HLn.ToggleAnonymousClick]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.HLn.RequestRankData(), this.Lsc(), this.wsc()]);
    this.Rsc();
    this.Asc();
  }
  OnStart() {
    (ModelManager_1.ModelManager.TowerDefenseModel.RankData.IsOwnSingleBestScore(this.HLn.InstanceId) ? this.B7t.GetLayoutItemByIndex(TowerDefenceDefine_1.ETabType.Single) : this.B7t.GetLayoutItemByIndex(TowerDefenceDefine_1.ETabType.Online))?.SetToggleState(true, true);
  }
  async wsc() {
    this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.C5e, this.GetItem(1).GetOwner());
    var e = Object.values(TowerDefenceDefine_1.ETabType).filter(e => typeof e == "number");
    await this.B7t.RefreshByDataAsync(e);
  }
  Rsc() {
    this.Isc = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.bsc);
  }
  Asc() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel.RankData.IsOpenAnonymousName ? 1 : 0;
    this.GetExtendToggle(5).SetToggleState(e);
  }
  async Lsc() {
    this.Tsc = new TowerDefenseRankItem_1.TowerDefenseRankItem(true);
    this.Tsc.OpenParam = this.HLn;
    await this.Tsc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  async Psc(e) {
    var t = ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetRankDataListByTabType(e);
    var i = t.length > 0;
    this.GetItem(6)?.SetUIActive(!i);
    this.Isc.SetTargetRootComponentActive(i);
    if (t.length > 0) {
      await this.Isc.RefreshByDataAsync(t);
    }
    var i = ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetSelfRankDataByTabType(e);
    this.Tsc.Refresh(i);
  }
  xsc(e) {
    e = ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetSelfRankDataByTabType(e);
    this.GetExtendToggle(5).RootUIComp.SetUIActive(e.IsInRank);
  }
  ResetLastTabItemSelected(e) {
    e = this.B7t.GetLayoutItemByIndex(e);
    if (e) {
      e.SetToggleState(false);
    }
  }
  RefreshContent(e) {
    var t = new UiAsyncTask_1.UiAsyncTask("TowerDefenseRankView.RefreshContent", async () => {
      await this.Psc(e);
    });
    this.RunAsyncTask(t);
    this.xsc(e);
  }
  RefreshContentShowName() {
    var t = this.Isc.Iei;
    var i = this.Isc.NCi;
    for (let e = t; e <= i; ++e) {
      var s = this.Isc.TryGetCachedData(e);
      if (s && s.IsSelfInData) {
        this.Isc.UnsafeGetGridProxy(e)?.RefreshPlayerName();
      }
    }
  }
}
exports.TowerDefenseRankView = TowerDefenseRankView;
//# sourceMappingURL=TowerDefenseRankView.js.map