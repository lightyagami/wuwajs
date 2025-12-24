"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLimitTaskScoreItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class HonamiStoryLimitTaskScoreItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.gOe = undefined;
    this.qsi = undefined;
    this.OnClickToGet = undefined;
    this.FIm = undefined;
    this.hJs = () => {
      if (this.Pe.State === 1) {
        this.OnClickToGet?.();
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.qsi[0].ItemId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnStart() {
    this.gOe = new SmallItemGrid_1.SmallItemGrid();
    this.gOe.Initialize(this.GetItem(0).GetOwner());
    this.gOe.BindOnCanExecuteChange(() => false);
    this.gOe.BindOnExtendToggleClicked(this.hJs);
    this.FIm = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnBeforeDestroy() {
    this.FIm?.Clear();
    this.FIm = undefined;
  }
  Refresh(e, i, t) {
    this.Pe = e;
    this.GetText(3).SetText(e.Score.toString());
    var r = HonamiStoryDefine_1.collectStateToScoreRewardMap.get(e.State);
    if (r) {
      r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
      this.SetSpriteByPath(r, this.GetSprite(1), false);
    }
    var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Pe.DropId);
    var e = e.State === 1;
    this.GetItem(2).SetUIActive(e);
    if (e) {
      this.FIm?.PlayLevelSequenceByName("Loop");
    }
    this.qsi = r[0];
    this.cNe();
  }
  cNe() {
    var e = this.Pe.State === 0;
    var i = this.Pe.State === 1;
    var t = this.Pe.State === 2;
    var t = {
      Data: this.Pe,
      Type: 4,
      ItemConfigId: this.qsi[0].ItemId,
      BottomText: this.qsi[1].toString(),
      IsReceivableVisible: i,
      IsReceivedVisible: t,
      IsRedDotVisible: i
    };
    this.gOe.Apply(t);
    this.gOe.SetLockBlackVisible(e);
  }
}
exports.HonamiStoryLimitTaskScoreItem = HonamiStoryLimitTaskScoreItem;
//# sourceMappingURL=HonamiStoryLimitTaskScoreItem.js.map