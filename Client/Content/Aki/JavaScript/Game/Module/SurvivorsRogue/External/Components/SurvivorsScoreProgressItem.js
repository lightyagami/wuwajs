"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsScoreProgressItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class SurvivorsScoreProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.gOe = undefined;
    this.qsi = undefined;
    this.OnClickToGet = undefined;
    this.hJs = () => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.GetMilestoneItemCount() ?? 0;
      if (this.Pe.IsReceivable(e)) {
        this.OnClickToGet?.();
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.qsi[0].ItemId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    this.gOe = new SmallItemGrid_1.SmallItemGrid();
    this.gOe.Initialize(this.GetItem(2).GetOwner());
    this.gOe.BindOnCanExecuteChange(() => false);
    this.gOe.BindOnExtendToggleClicked(this.hJs);
  }
  Refresh(e, r, i) {
    this.Pe = e;
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.GetMilestoneItemCount() ?? 0;
    this.GetText(1).SetText(e.Goal.toString());
    this.GetSprite(0).SetUIActive(e.IsAchieved(t));
    var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.DropId);
    this.qsi = e[0];
    this.cNe(t);
  }
  cNe(e) {
    var r = !this.Pe.IsAchieved(e);
    var e = this.Pe.IsReceivable(e);
    var i = this.Pe.IsGot;
    var i = {
      Data: this.Pe,
      Type: 4,
      ItemConfigId: this.qsi[0].ItemId,
      BottomText: this.qsi[1].toString(),
      IsReceivableVisible: e,
      IsReceivedVisible: i,
      IsRedDotVisible: e
    };
    this.gOe.Apply(i);
    this.gOe.SetLockBlackVisible(r);
  }
}
exports.SurvivorsScoreProgressItem = SurvivorsScoreProgressItem;
//# sourceMappingURL=SurvivorsScoreProgressItem.js.map