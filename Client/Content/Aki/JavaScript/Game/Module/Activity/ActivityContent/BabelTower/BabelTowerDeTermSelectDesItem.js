"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerDeTermSelectDesItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerDeTermSelectDesItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DeTermId = 0;
    this.LevelSequencePlayer = undefined;
    this.OnClickCallBack = undefined;
    this.YP = () => {
      this.OnClickCallBack?.(this.DeTermId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.YP]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e, t, i) {
    this.DeTermId = e;
    e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.DesText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NameText);
    this.GetText(1).SetText(e.Star + "");
    this.LevelSequencePlayer?.StopCurrentSequence(false, true);
  }
  PlayChoseSequence() {
    this.LevelSequencePlayer?.StopCurrentSequence(false, true);
    this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop_Center_Once");
  }
}
exports.BabelTowerDeTermSelectDesItem = BabelTowerDeTermSelectDesItem;
//# sourceMappingURL=BabelTowerDeTermSelectDesItem.js.map