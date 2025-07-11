"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceCreateWordBtnItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateWordBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.E9 = 0;
    this.Xy = 0;
    this.YP = () => {
      if (this.E9 === 0) {
        this.$7e();
        UiManager_1.UiManager.OpenView("AdviceSortWordView");
      } else {
        this.Q7e();
        UiManager_1.UiManager.OpenView("AdviceWordView");
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  SetType(e) {
    this.E9 = e;
  }
  SetIndex(e) {
    this.Xy = e;
  }
  $7e() {
    var e;
    var i = ModelManager_1.ModelManager.AdviceModel;
    var r = i.CurrentWordMap.get(this.Xy);
    if (r !== undefined && r > 0) {
      e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordType(r);
      i.CurrentSelectSortTypeId = e;
      i.CurrentSelectSortWordId = r;
    } else {
      e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs()[0].Id;
      i.CurrentSelectSortTypeId = e;
      i.CurrentSelectSortWordId = -1;
    }
    i.CurrentSelectWordIndex = this.Xy;
  }
  Q7e() {
    var e = ModelManager_1.ModelManager.AdviceModel;
    e.CurrentChangeWordType = 1;
    e.CurrentSelectWordId = e.CurrentConjunctionId;
  }
  RefreshView() {
    this.Y7e();
  }
  Y7e() {
    var e;
    if (this.E9 === 0) {
      if ((e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(this.Xy)) > 0) {
        e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(e);
        this.GetText(1).SetText(e);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord");
      }
    } else if ((e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId) > 0) {
      e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(e);
      this.GetText(1).SetText(e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord");
    }
  }
}
exports.AdviceCreateWordBtnItem = AdviceCreateWordBtnItem;
//# sourceMappingURL=AdviceCreateWordBtnItem.js.map