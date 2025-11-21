"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrizeDrawingTearItemDouble = exports.PrizeDrawingTearItemSingle = exports.PrizeDrawingTearItemBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const rareToTexIdMap = new Map([[0, ["T_PrizeDrawingTearLevelS"]], [1, ["T_PrizeDrawingTearLevelA", "T_PrizeDrawingTearLevelA_Nml"]], [2, ["T_PrizeDrawingTearLevelB", "T_PrizeDrawingTearLevelB_Nml"]], [3, ["T_PrizeDrawingTearLevelC", "T_PrizeDrawingTearLevelC_Nml"]], [4, ["T_PrizeDrawingTearLevelD", "T_PrizeDrawingTearLevelD_Nml"]], [5, ["T_PrizeDrawingTearLevelE", "T_PrizeDrawingTearLevelE_Nml"]], [6, ["T_PrizeDrawingTearLevelF", "T_PrizeDrawingTearLevelF_Nml"]]]);
class PrizeDrawingTearItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RewardList = undefined;
    this.SPe = undefined;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.PlaySequencePurely("Reveal");
    this.SPe.StopCurrentSequence();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
  }
  PlayRevelAnimation() {
    this.SPe?.PlaySequencePurely("Reveal");
  }
  SetRewardList(e) {
    this.RewardList = e;
  }
  RareIdToTexPath(e, i) {
    e = rareToTexIdMap.get(e);
    i = i ? e[1] : e[0];
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
  }
}
class PrizeDrawingTearItemSingle extends (exports.PrizeDrawingTearItemBase = PrizeDrawingTearItemBase) {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i;
    if (!this.RewardList || this.RewardList.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 90, "一番赏刮奖卡传入奖励数据为空！");
      }
    } else {
      i = (e = this.RewardList[0]).Times === 1 && e.Rare !== 0;
      this.GetText(4)?.SetText("x" + e.Count);
      this.GetText(2)?.SetText("x" + e.Times);
      await Promise.all([this.SetItemIconAsync(this.GetTexture(0), e.ItemId), this.SetTextureAsync(this.RareIdToTexPath(e.Rare, i), this.GetTexture(5))]);
    }
  }
}
exports.PrizeDrawingTearItemSingle = PrizeDrawingTearItemSingle;
class PrizeDrawingTearItemDouble extends PrizeDrawingTearItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UITexture], [10, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i;
    if (!this.RewardList || this.RewardList.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 90, "一番赏刮奖卡传入奖励数据为空！");
      }
    } else {
      e = this.RewardList[0];
      i = this.RewardList[1];
      this.GetText(7)?.SetText("x" + e.Count);
      this.GetText(2)?.SetText("x" + e.Times);
      this.GetText(8)?.SetText("x" + i.Count);
      this.GetText(5)?.SetText("x" + i.Times);
      await Promise.all([this.SetItemIconAsync(this.GetTexture(0), e.ItemId), this.SetTextureAsync(this.RareIdToTexPath(e.Rare), this.GetTexture(9)), this.SetItemIconAsync(this.GetTexture(3), i.ItemId), this.SetTextureAsync(this.RareIdToTexPath(i.Rare), this.GetTexture(10))]);
    }
  }
}
exports.PrizeDrawingTearItemDouble = PrizeDrawingTearItemDouble;
//# sourceMappingURL=PrizeDrawingTearItem.js.map