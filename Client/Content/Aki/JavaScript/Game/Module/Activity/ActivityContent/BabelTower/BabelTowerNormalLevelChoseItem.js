"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerNormalLevelChoseItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerNormalLevelChoseItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.gQl = false;
    this.dEc = false;
    this.yq = 0;
    this.OnClickButtonCallBack = undefined;
    this.fbc = undefined;
    this.nqe = e => {
      if (this.gQl) {
        this.OnClickButtonCallBack?.(this.yq);
      }
      this.fbc.StopCurrentSequence();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [2, UE.UIText], [1, UE.UIText], [4, UE.UITexture], [3, UE.UIItem], [5, UE.UIText], [7, UE.UIItem], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  OnStart() {
    this.fbc = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e, t, i) {
    this.GetText(1).SetText(i + 1 + "");
    this.yq = e.ELl;
    i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e.ELl);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.NameText);
    if (StringUtils_1.StringUtils.IsEmpty(i.DesText)) {
      this.GetText(10).SetUIActive(false);
    } else {
      this.GetText(10).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.DesText);
    }
    this.SetTextureByPath(i.Texture, this.GetTexture(4));
    this.GetItem(3).SetUIActive(e.dMs && e.jX_ >= i.PassStar);
    i = MathUtils_1.MathUtils.LongToNumber(e.yzs);
    this.gQl = i <= TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.GetItem(7).SetUIActive(this.gQl);
    this.GetItem(8).SetUIActive(!this.gQl);
    if (this.gQl) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BabelTowerLevelGoto");
    } else {
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat((i - TimeUtil_1.TimeUtil.GetServerTimeStamp()) * TimeUtil_1.TimeUtil.Millisecond);
      this.GetText(9).SetText(e.CountDownText);
    }
    if (this.dEc) {
      RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerNewLevel", this.GetItem(6), this.yq);
    } else {
      this.dEc = true;
    }
    RedDotController_1.RedDotController.BindRedDot("BabelTowerNewLevel", this.GetItem(6), undefined, this.yq);
    if (ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle === this.yq) {
      this.PlayLoopSequence();
    } else {
      this.StopLoopSequence();
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerNewLevel", this.GetItem(6), this.yq);
  }
  PlayLoopSequence() {
    if (this.fbc.IsPlayingSequence("Loop_Diffculty")) {
      this.fbc.ReplaySequenceByKey("Loop_Diffculty");
    } else {
      this.fbc.PlayLevelSequenceByName("Loop_Diffculty");
    }
  }
  StopLoopSequence() {
    this.fbc.StopCurrentSequence(false, true);
  }
  IsPlayingSequence() {
    return this.fbc.IsPlayingSequence("Loop_Diffculty");
  }
}
exports.BabelTowerNormalLevelChoseItem = BabelTowerNormalLevelChoseItem;
//# sourceMappingURL=BabelTowerNormalLevelChoseItem.js.map