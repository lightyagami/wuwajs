"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorRewardBottomItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const SmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const REWARD_ITEM_WIDTH = 130;
class SpringManorRewardBottomItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$0g = undefined;
    this.Afl = 0;
    this.W0g = () => {
      var e = new GiftItem();
      e.ReceiveCallback = this.awg;
      return e;
    };
    this.awg = () => {
      this.Refresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite]];
  }
  OnStart() {
    this.$0g = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.W0g);
    this.Afl = this.GetSprite(4).GetWidth();
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetCurrentMilestone();
    var t = ModelManager_1.ModelManager.SpringManorModel.GetScoreRewardConfigList().map(e => e.Id);
    this.RefreshProgressItem(e, t);
  }
  async RefreshProgressItem(t, r) {
    this.GetText(0)?.SetText(t.toString());
    this.GetSprite(3)?.SetChangeColor(t > 0, this.GetSprite(3).changeColor);
    let i = 0;
    let s = 0;
    var a = r.length;
    let o = 0;
    for (let e = 0; e < a; e++) {
      var n = r[e];
      var n = ConfigManager_1.ConfigManager.SpringManorConfig.GetScoreRewardConfigById(n);
      if (t >= n.Score) {
        i += 1 / a;
      } else if (t > o) {
        var l = n.Score;
        var h = this.Afl / a - REWARD_ITEM_WIDTH;
        var l = (t - o) / (l - o);
        s = (h * l + REWARD_ITEM_WIDTH / 2) / this.Afl;
        break;
      }
      o = n.Score;
    }
    this.GetSprite(4).SetFillAmount(i + s);
    await this.$0g?.RefreshByDataAsync(r);
  }
}
exports.SpringManorRewardBottomItem = SpringManorRewardBottomItem;
class GiftItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.Q0g = undefined;
    this.sft = undefined;
    this.ReceiveCallback = undefined;
    this.hJs = () => {
      var e = ConfigManager_1.ConfigManager.SpringManorConfig.GetScoreRewardConfigById(this.Mne);
      if (ModelManager_1.ModelManager.SpringManorModel.ActivityData.IsScoreRewardCanReceived(e.Id)) {
        ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.RequestScoreRewardReceive(this.ReceiveCallback);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.sft[0].ItemId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    this.Q0g = new SmallItemGrid_1.SmallItemGrid();
    this.Q0g.Initialize(this.GetItem(2).GetOwner());
    this.Q0g.BindOnCanExecuteChange(() => false);
    this.Q0g.BindOnExtendToggleClicked(this.hJs);
  }
  Refresh(e, t, r) {
    this.Mne = e;
    var e = ConfigManager_1.ConfigManager.SpringManorConfig.GetScoreRewardConfigById(e);
    this.GetText(1).SetText(e.Score.toString());
    var i = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetCurrentMilestone();
    var i = i >= e.Score;
    this.GetSprite(0).SetUIActive(i);
    var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.DropId);
    this.sft = i[0];
    this.cNe(e);
  }
  cNe(e) {
    var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    var r = t.IsScoreRewardCanReceived(e.Id);
    var t = t.IsScoreRewardReceived(e.Id);
    var i = !r && !t;
    var e = {
      Data: e,
      Type: 4,
      ItemConfigId: this.sft[0].ItemId,
      BottomText: this.sft[1].toString(),
      IsReceivableVisible: r,
      IsReceivedVisible: t,
      IsRedDotVisible: r
    };
    this.Q0g.Apply(e);
    this.Q0g.SetLockBlackVisible(i);
  }
}
//# sourceMappingURL=SpringManorRewardBottomItem.js.map