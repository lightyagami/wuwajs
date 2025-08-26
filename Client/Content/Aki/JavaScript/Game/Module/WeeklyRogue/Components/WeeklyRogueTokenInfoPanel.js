"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueTokenInfoPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueArtifactGrid_1 = require("./WeeklyRogueArtifactGrid");
const WeeklyRogueArtifactItem_1 = require("./WeeklyRogueArtifactItem");
const WeeklyRogueTokenGrid_1 = require("./WeeklyRogueTokenGrid");
const WeeklyRogueTokenItem_1 = require("./WeeklyRogueTokenItem");
class WeeklyRogueTokenInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CoreTokenLayout = undefined;
    this.ArtifactGrid = undefined;
    this.TokenLayout = undefined;
    this.TokenItem = undefined;
    this.ArtifactItem = undefined;
    this.SelectOnTokenId = -1;
    this.eV_ = (e, i) => {
      if (i) {
        this.Q$c(e);
      }
    };
    this.gke = (e, i, t) => e > 0;
    this.tV_ = () => {
      var e = new WeeklyRogueTokenGrid_1.WeeklyRogueTokenInfoGrid();
      e.BindOnCanExecuteChange(this.gke);
      e.OnSelectedChange = this.eV_;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIGridLayout], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.ArtifactGrid = new WeeklyRogueArtifactGrid_1.WeeklyRogueArtifactGrid();
    this.ArtifactGrid.OnSelectedChange = this.eV_;
    e.push(this.ArtifactGrid.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.CoreTokenLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.tV_);
    this.TokenLayout = new GenericLayout_1.GenericLayout(this.GetGridLayout(4), this.tV_);
    this.TokenItem = new WeeklyRogueTokenItem_1.WeeklyRogueTokenItem();
    e.push(this.TokenItem.CreateByActorAsync(this.GetItem(7).GetOwner()));
    this.ArtifactItem = new WeeklyRogueArtifactItem_1.WeeklyRogueArtifactItem();
    e.push(this.ArtifactItem.CreateByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(e);
    this.ArtifactItem.SetInteractive(false);
    this.TokenItem.SetInteractive(false);
  }
  OnStart() {
    this.K$c();
    this.X$c();
    this.tst();
    this.ArtifactGrid?.OnSelected(true);
  }
  Q$c(e) {
    if (this.SelectOnTokenId > 0) {
      const i = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.SelectOnTokenId);
      if (!i) {
        return;
      }
      switch (i.BuffType) {
        case 1:
          this.ArtifactGrid?.OnDeselected(false);
          break;
        case 2:
          this.CoreTokenLayout?.GetLayoutItemByKey(this.SelectOnTokenId)?.OnDeselected(false);
          break;
        default:
          this.TokenLayout?.GetLayoutItemByKey(this.SelectOnTokenId)?.OnDeselected(false);
      }
    }
    const i = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
    if (i) {
      (i.BuffType === 1 ? (this.TokenItem?.SetActive(false), this.ArtifactItem?.UpdateByConfigId(e), this.ArtifactItem) : (this.ArtifactItem?.SetActive(false), this.TokenItem?.UpdateByConfigId(e), this.TokenItem))?.SetActive(true);
      this.SelectOnTokenId = e;
    }
  }
  K$c() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.GetArtifactBuffId();
    this.ArtifactGrid?.Refresh(e, true, 0);
  }
  X$c() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.GetArtifactBuffId();
    var i = ModelManager_1.ModelManager.WeeklyRogueModel.GetCoreTokenIdListByArtifactId(e);
    var t = ModelManager_1.ModelManager.WeeklyRogueModel.GetBuffIdListByType(2);
    var r = [];
    for (let e = 0; e < i.length; e++) {
      if (e < t.length) {
        r.push(t[e]);
      } else {
        r.push(0);
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "WeRogueOverviewCoreBuff", t.length, i.length);
    this.CoreTokenLayout?.RefreshByData(r);
  }
  tst() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.GetBuffIdListByType(3);
    var i = ModelManager_1.ModelManager.WeeklyRogueModel.GetBuffIdListByType(4);
    e.push(...i);
    this.TokenLayout?.SetActive(e.length > 0);
    if (e.length > 0) {
      this.TokenLayout?.RefreshByData(e);
    }
    this.GetItem(6).SetUIActive(e.length === 0);
  }
}
exports.WeeklyRogueTokenInfoPanel = WeeklyRogueTokenInfoPanel;
//# sourceMappingURL=WeeklyRogueTokenInfoPanel.js.map