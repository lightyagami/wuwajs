"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerNormalLevelChoseItem = void 0;
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerNormalLevelChoseItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.gQl = !1, this.dEc = !1, this.yq = 0, this.OnClickButtonCallBack = void 0, this.fbc = void 0, this.nqe = e => {
      this.gQl && this.OnClickButtonCallBack?.(this.yq), this.fbc.StopCurrentSequence()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [2, UE.UIText],
      [1, UE.UIText],
      [4, UE.UITexture],
      [3, UE.UIItem],
      [5, UE.UIText],
      [7, UE.UIItem],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.nqe]
    ]
  }
  OnStart() {
    this.fbc = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  Refresh(e, t, i) {
    this.GetText(1).SetText(i + 1 + ""), this.yq = e.ELl;
    i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(e.ELl), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.NameText), StringUtils_1.StringUtils.IsEmpty(i.DesText) ? this.GetText(10).SetUIActive(!1) : (this.GetText(10).SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.DesText)), this.SetTextureByPath(i.Texture, this.GetTexture(4)), this.GetItem(3).SetUIActive(e.dMs && e.jX_ >= i.PassStar), i = MathUtils_1.MathUtils.LongToNumber(e.yzs);
    this.gQl = i <= TimeUtil_1.TimeUtil.GetServerTimeStamp(), this.GetItem(7).SetUIActive(this.gQl), this.GetItem(8).SetUIActive(!this.gQl), this.gQl ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BabelTowerLevelGoto") : (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat((i - TimeUtil_1.TimeUtil.GetServerTimeStamp()) * TimeUtil_1.TimeUtil.Millisecond), this.GetText(9).SetText(e.CountDownText)), this.dEc ? RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerNewLevel", this.GetItem(6), this.yq) : this.dEc = !0, RedDotController_1.RedDotController.BindRedDot("BabelTowerNewLevel", this.GetItem(6), void 0, this.yq), ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle === this.yq ? this.PlayLoopSequence() : this.StopLoopSequence()
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerNewLevel", this.GetItem(6), this.yq)
  }
  PlayLoopSequence() {
    this.fbc.IsPlayingSequence("Loop_Diffculty") ? this.fbc.ReplaySequenceByKey("Loop_Diffculty") : this.fbc.PlayLevelSequenceByName("Loop_Diffculty")
  }
  StopLoopSequence() {
    this.fbc.StopCurrentSequence(!1, !0)
  }
  IsPlayingSequence() {
    return this.fbc.IsPlayingSequence("Loop_Diffculty")
  }
}
exports.BabelTowerNormalLevelChoseItem = BabelTowerNormalLevelChoseItem;
//# sourceMappingURL=BabelTowerNormalLevelChoseItem.js.map