"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressBpRewardTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class RegressBpRewardTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.vVt = undefined;
    this.E2i = undefined;
    this.d2t = () => new RegressBpRewardItem();
    this.utg = () => {
      this.R2i(false);
    };
    this.BBf = () => {
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetBpPayButtonRedDotChecked();
      UiManager_1.UiManager.OpenView("RegressBpPayView", undefined, (e, r) => {
        UiManager_1.UiManager.GetViewByName("ActivityRegressMainView")?.AddChildViewById(r);
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.BBf]];
  }
  async OnBeforeStartAsync() {
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.d2t);
    this.E2i = new RegressBpRewardItem();
    await this.E2i.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.vVt.BindOnScrollValueChanged(this.utg);
  }
  OnBeforeShow() {
    this.RefreshView(true);
  }
  RefreshBtnClaimVisible(e) {
    e.SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.CheckRegressScoreRewardReached());
  }
  OnClickBtnClaimAll() {
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards();
  }
  RefreshView(e) {
    var r;
    if (this.vVt) {
      (r = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressMainTaskScoreRewardGridDataArr()).sort((e, r) => e.Config.NeedScore - r.Config.NeedScore);
      this.vVt.RefreshByData(r, undefined, undefined, e);
      this.R2i(true);
      this.GetSprite(0).SetUIActive(!ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsPayRewardUnlock());
      this.GetButton(4).SetSelfInteractive(!ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsPayRewardUnlock());
    }
  }
  R2i(e) {
    var r = this.vVt.NCi;
    let i = Math.ceil(r / 10) * 10 - 1;
    let t = this.vVt.TryGetCachedData(i);
    if (!t) {
      i = r;
      t = this.vVt.TryGetCachedData(i);
    }
    if (this.E2i.GridIndex !== i || !!e) {
      this.E2i.GridIndex = i;
      this.E2i.Refresh(t, false, this.E2i.GridIndex);
    }
  }
}
exports.RegressBpRewardTabView = RegressBpRewardTabView;
class RegressBpRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.avt = [];
    this.X5f = [];
    this.q3e = e => {
      var e = this.avt[e];
      if (e) {
        if (e.RewardState === 1) {
          ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards();
        } else {
          e = e.ItemInfo.Id;
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    var e = new SmallItemGrid_1.SmallItemGrid();
    var r = new SmallItemGrid_1.SmallItemGrid();
    var i = new SmallItemGrid_1.SmallItemGrid();
    e.Initialize(this.GetItem(1).GetOwner());
    r.Initialize(this.GetItem(2).GetOwner());
    i.Initialize(this.GetItem(3).GetOwner());
    this.X5f = [e, r, i];
    this.X5f.forEach((e, r) => {
      e.BindOnCanExecuteChange(() => false);
      e.BindOnExtendToggleClicked(() => {
        this.q3e(r);
      });
    });
  }
  Refresh(e, r, i) {
    this.GetText(0)?.SetText((i + 1).toString());
    var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e.Config.Drop ?? 0).DropPreview;
    var t = [];
    if (i.size > 0) {
      for (var [s, a] of i) {
        s = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(s);
        if (s !== undefined) {
          t.push({
            ItemInfo: s,
            ItemCount: a,
            RewardState: e.RewardState
          });
          break;
        }
      }
    }
    var o;
    var l;
    var i = e.Config.PayDrop;
    for ([o, l] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(i).DropPreview) {
      var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o);
      if (n !== undefined) {
        t.push({
          ItemInfo: n,
          ItemCount: l,
          RewardState: e.PayRewardState
        });
      }
    }
    for (let e = 0; e < this.X5f.length; e++) {
      if (t.length > e) {
        ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(this.X5f[e], t[e]);
        this.X5f[e].SetUiActive(true);
      } else {
        this.X5f[e].SetUiActive(false);
      }
    }
    this.avt = t;
  }
}
//# sourceMappingURL=RegressBpRewardTabView.js.map