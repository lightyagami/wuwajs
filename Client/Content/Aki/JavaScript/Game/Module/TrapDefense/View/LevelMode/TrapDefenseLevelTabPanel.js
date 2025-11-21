"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelTabPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseDifficultyChangePanel_1 = require("./TrapDefenseDifficultyChangePanel");
const TrapDefenseLevelItem_1 = require("./TrapDefenseLevelItem");
class TrapDefenseLevelTabPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ModeData = undefined;
    this.PanelDifficultyChange = undefined;
    this.ScrollLevel = undefined;
    this.OnSelectLevelCallback = undefined;
    this.CurSelectLevel = undefined;
    this.IsInstance = false;
    this.OnClickBtnBdSum = () => {
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewBdSum(this.IsInstance, 0);
    };
    this.CreateItemLevel = () => {
      var e = new TrapDefenseLevelItem_1.TrapDefenseLevelItem();
      e.OnSelectLevelCallBack = this.SelectLevelItem;
      return e;
    };
    this.SelectLevelItem = e => {
      e = e.ItemData;
      this.CurSelectLevel = e;
      this.OnSelectLevelCallback?.(e);
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIArtText]];
    this.BtnBindInfo = [[3, this.OnClickBtnBdSum]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetItem(0);
    this.PanelDifficultyChange = new TrapDefenseDifficultyChangePanel_1.TrapDefenseDifficultyChangePanel();
    await this.PanelDifficultyChange.Init(e);
    var e = this.GetScrollViewWithScrollbar(1);
    var i = this.GetItem(2).GetOwner();
    this.ScrollLevel = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.CreateItemLevel, i, true);
  }
  InitSelectLevel(e) {
    this.CurSelectLevel = e;
  }
  UpdateLevelDataList(e) {
    const i = this.bJc(e);
    this.CurSelectLevel = e[i];
    this.ScrollLevel.SelectGridProxy(-1);
    this.ScrollLevel.RefreshByData(e, () => {
      this.ScrollLevel.SelectGridProxy(i);
      var e = this.ScrollLevel.GetItemByIndex(i);
      if (e) {
        this.ScrollLevel.ScrollTo(e);
      }
    }, true);
  }
  bJc(e) {
    var i = e.findIndex(e => e.Id === this.CurSelectLevel?.Id);
    if (i >= 0) {
      return i;
    } else if ((i = e.findIndex(e => !e.IsUnlock)) < 0) {
      return e.length - 1;
    } else if (i === 0) {
      return 0;
    } else {
      return i - 1;
    }
  }
  UpdateBdSumProgress() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData;
    var i = this.GetArtText(5);
    var t = e.GetUnlockBdBuffSum();
    var e = e.BdBuffDataList.length;
    i.SetText(t + "/" + e);
  }
}
exports.TrapDefenseLevelTabPanel = TrapDefenseLevelTabPanel;
//# sourceMappingURL=TrapDefenseLevelTabPanel.js.map