"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumBdDescPanel = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TrapDefenseBdBuffItem_1 = require("./TrapDefenseBdBuffItem");
class TrapDefenseBdSumBdDescPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BdData = undefined;
    this.LayoutBdBuff = undefined;
    this.CreateItemBdBuff = () => {
      var e = new TrapDefenseBdBuffItem_1.TrapDefenseBdBuffItem();
      e.OnClickBuffItemCallback = this.OnClickBdBuffItem;
      e.CanExecuteChangeCallback = this.BdBuffCanExecuteChange;
      return e;
    };
    this.OnClickBdBuffItem = e => {
      var t = e.GetBelongBdData();
      var r = e.Config.Quality;
      var a = this.GetBdQualityShowNew(t, r);
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewBdQuality(t.Id, r, a, e.Id);
    };
    this.BdBuffCanExecuteChange = () => false;
  }
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UILayoutBase], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(5);
    var t = this.GetItem(6)?.GetOwner();
    this.LayoutBdBuff = new GenericLayout_1.GenericLayout(e, this.CreateItemBdBuff, t);
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    var t = !(this.BdData = e).IsUnlockInTheUi();
    this.GetItem(1)?.SetUIActive(t);
    this.GetItem(0)?.SetUIActive(!t);
    if (!t) {
      this.GetText(2)?.ShowTextNew(e.Config.Name);
      this.GetText(3)?.ShowTextNew(e.Config.Desc);
      this.UpdateGoldQualityBuffShow();
    }
  }
  UpdateGoldQualityBuffShow() {
    var e = this.BdData.GetGoldQualityBuffDataList();
    var t = e.length > 0;
    this.GetItem(4)?.SetUIActive(t);
    if (t) {
      this.LayoutBdBuff.RefreshByData(e);
    }
  }
  GetBdQualityShowNew(e, t) {
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelBdSum.IsInstance && e.GetCurActiveQualityPool() === t;
  }
}
exports.TrapDefenseBdSumBdDescPanel = TrapDefenseBdSumBdDescPanel;
//# sourceMappingURL=TrapDefenseBdSumBdDescPanel.js.map