"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterStartNodeItem = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const QuestTreeNodeItemFactory_1 = require("./IoC/QuestTreeNodeItemFactory");
class QuestTreeChapterStartNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Pe = e;
    this.iwd = undefined;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.Rom = 0;
    this.J_ = e => {
      var t = this.GetVerticalLayout(4);
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RecordHeightBalanceValue(-1, 0, t?.GetRootComponent()?.GetHeight() ?? 0);
      var t = this.GetUiSizeControlByOther(5);
      var i = this.iwd.GetLayoutItemByIndex(this.iwd.GetDatas().length - 1);
      if (i) {
        t.SetAdditionalHeight(this.Rom - i.GetAdditionalHeight());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIVerticalLayout], [5, UE.UISizeControlByOther]];
  }
  async OnBeforeStartAsync() {
    await this.nOe();
  }
  OnStart() {
    this.Rom = this.GetUiSizeControlByOther(5).GetAdditionalHeight();
    this.iwd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), () => QuestTreeNodeItemFactory_1.QuestTreeNodeItemFactory.Instance.CreateLogicalNodeItem(4));
    this.rwd();
    this.sKe = TickSystem_1.TickSystem.Add(this.J_, "QuestTreeChapterStartNodeItem", 0, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
  }
  OnBeforeDestroy() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  async RefreshByData(e) {
    this.Pe = e;
    this.rwd();
    await this.nOe();
  }
  async nOe() {
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.Pe.Config.RegionName);
    var e = this.GetTexture(0);
    await this.SetTextureAsync(this.Pe.Config.RegionImage, e);
  }
  rwd() {
    var e = this.Pe.GetNoParentNodeGroupList();
    this.iwd.RefreshByData(e);
    this.GetItem(3).SetUIActive(e.length > 0);
  }
}
exports.QuestTreeChapterStartNodeItem = QuestTreeChapterStartNodeItem;
//# sourceMappingURL=QuestTreeChapterStartNodeItem.js.map