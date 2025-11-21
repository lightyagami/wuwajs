"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrizeDrawingQuestItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class PrizeDrawingQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Z8d = -1;
    this.e7d = -1;
    this.UHs = undefined;
    this.Y8d = () => {
      UiManager_1.UiManager.OpenView("QuestView", this.Z8d);
      ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData.ReadQuestRedDot();
      this.BNe();
    };
    this.hoc = () => {
      if (this.e7d !== -1) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.e7d);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Y8d]];
  }
  async OnBeforeStartAsync() {
    this.UHs = new SmallItemGrid_1.SmallItemGrid();
    this.UHs.BindOnExtendToggleClicked(this.hoc);
    this.UHs.BindOnCanExecuteChange(() => false);
    await this.UHs.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  RefreshFinishState(e) {
    this.GetItem(5)?.SetUIActive(e);
    this.GetItem(4)?.SetUIActive(!e);
    this.GetButton(3)?.RootUIComp.SetUIActive(!e);
    this.GetItem(6)?.SetUIActive(e);
  }
  RefreshByQuestId(e, i, t) {
    this.Z8d = e;
    this.t7d(e);
    this.i7d(e);
    this.r7d(e);
    this.Nqe(i, t);
    this.BNe();
  }
  t7d(e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TidName);
  }
  i7d(e) {
    e = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
    this.GetButton(3)?.RootUIComp.SetUIActive(!e);
    this.GetItem(6)?.SetUIActive(e);
  }
  r7d(e) {
    var i;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfoFromQuestConfig(e);
    if (e) {
      i = e[0][0].ItemId;
      e = e[0][1];
      e = {
        Data: ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i),
        Type: 4,
        ItemConfigId: i,
        BottomText: e === 0 ? "" : e.toString()
      };
      this.UHs?.Apply(e);
      this.e7d = i;
    }
  }
  Nqe(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Ichiban_Kuji_Progress_Task", e, i);
  }
  BNe() {
    var e = ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController.ActivityData.IsCurQuestReaded();
    this.GetItem(7)?.SetUIActive(!e);
  }
}
exports.PrizeDrawingQuestItem = PrizeDrawingQuestItem;
//# sourceMappingURL=PrizeDrawingQuestItem.js.map