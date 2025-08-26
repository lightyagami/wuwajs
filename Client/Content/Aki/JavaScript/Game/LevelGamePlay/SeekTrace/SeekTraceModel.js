"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceModel = exports.SeekTraceItemData = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
class SeekTraceItemData {
  constructor() {
    this.ItemType = 0;
    this.BasePosition = [0, 0];
    this.FilledPositionOffsetList = [];
    this.FilledIndexSet = new Set();
    this.IsValid = true;
  }
}
exports.SeekTraceItemData = SeekTraceItemData;
class SeekTraceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsGameFinish = false;
    this.GameFinishResult = false;
    this.Config = undefined;
    this.AddStep = 0;
    this.PanelWidth = 0;
    this.PanelHeight = 0;
    this.ResetTimes = 0;
    this.RemainUiAfterCompletion = false;
    this.CurrentInteractEntityId = -1;
    this.IconType = IAction_1.ETraceTracingImageType.Type1;
    this.OnSeekTraceFinish = undefined;
    this.StepLimit = 0;
    this.ItemDataList = undefined;
    this.EnableGridList = undefined;
    this.SelectedItem = undefined;
    this.SelectedStartPosition = undefined;
    this.SelectedStartFilledIndexSet = undefined;
    this.IndexToItemMap = undefined;
    this.PreSelectedIndexToItemsMap = undefined;
    this.ItemToPreSelectedIndexSetMap = undefined;
    this.MainItemMap = undefined;
  }
}
exports.SeekTraceModel = SeekTraceModel;
//# sourceMappingURL=SeekTraceModel.js.map