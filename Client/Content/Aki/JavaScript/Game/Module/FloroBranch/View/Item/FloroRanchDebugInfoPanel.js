"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDebugInfoPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const FloroRanchDebugInfoItem_1 = require("./FloroRanchDebugInfoItem");
class FloroRanchDebugInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LoopScrollView = undefined;
    this.OnClickCloseButton = () => {
      this.Hide();
    };
    this.InitItem = () => {
      return new FloroRanchDebugInfoItem_1.FloroRanchDebugInfoItem();
    };
    this.OnDebugInfoRefresh = () => {
      var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActionInfoList;
      this.LoopScrollView.RefreshByData(e);
      this.LoopScrollView.ScrollToGridIndex(e.length - 1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickCloseButton]];
  }
  OnStart() {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.InitItem);
  }
  async OnBeforeShowAsyncImplement() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActionInfoList;
    await this.LoopScrollView.RefreshByDataAsync(e);
    this.LoopScrollView.ScrollToGridIndex(e.length - 1);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchDebugInfoRefresh, this.OnDebugInfoRefresh);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchDebugInfoRefresh, this.OnDebugInfoRefresh);
  }
}
exports.FloroRanchDebugInfoPanel = FloroRanchDebugInfoPanel;
//# sourceMappingURL=FloroRanchDebugInfoPanel.js.map