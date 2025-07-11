"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionBvbEventDataHelper = undefined;
const fb_common_1 = require("../../../../Game/World/EntityFb/fb-common");
const FbBvbAiBattleWinData_1 = require("./FbBvbAiBattleWinData");
const FbBvbAiChangeData_1 = require("./FbBvbAiChangeData");
const FbBvbAiDeployData_1 = require("./FbBvbAiDeployData");
const FbBvbAiDiscardData_1 = require("./FbBvbAiDiscardData");
const FbBvbAiEvolutionData_1 = require("./FbBvbAiEvolutionData");
const FbBvbAiGetBestDeployData_1 = require("./FbBvbAiGetBestDeployData");
const FbBvbAiGetBestRearrangeData_1 = require("./FbBvbAiGetBestRearrangeData");
const FbBvbAiGetBestSwapData_1 = require("./FbBvbAiGetBestSwapData");
const FbBvbAiRearrangeData_1 = require("./FbBvbAiRearrangeData");
const FbBvbAiRecycleData_1 = require("./FbBvbAiRecycleData");
const FbBvbAiSwapData_1 = require("./FbBvbAiSwapData");
const FbBvbAiTurnEndData_1 = require("./FbBvbAiTurnEndData");
const FbBvbBurnBuffTimeUpData_1 = require("./FbBvbBurnBuffTimeUpData");
const FbBvbEnableHatredData_1 = require("./FbBvbEnableHatredData");
const FbBvbPlayerBattleWinData_1 = require("./FbBvbPlayerBattleWinData");
const FbBvbPlayerTurnEndData_1 = require("./FbBvbPlayerTurnEndData");
const FbBvbPlayerTurnStartData_1 = require("./FbBvbPlayerTurnStartData");
const FbBvbSelectCardsEndData_1 = require("./FbBvbSelectCardsEndData");
const FbBvbStartAiData_1 = require("./FbBvbStartAiData");
const FbBvbStartBattleData_1 = require("./FbBvbStartBattleData");
const FbBvbStartRoundData_1 = require("./FbBvbStartRoundData");
const FbBvbWaitForGameBeginData_1 = require("./FbBvbWaitForGameBeginData");
class UnionBvbEventDataHelper {
  static GetUnionBvbEventDataObject(e) {
    switch (e) {
      case fb_common_1.UnionBvbEventData.BvbAiBattleWinData:
        return new fb_common_1.BvbAiBattleWinData();
      case fb_common_1.UnionBvbEventData.BvbAiChangeData:
        return new fb_common_1.BvbAiChangeData();
      case fb_common_1.UnionBvbEventData.BvbAiDeployData:
        return new fb_common_1.BvbAiDeployData();
      case fb_common_1.UnionBvbEventData.BvbAiDiscardData:
        return new fb_common_1.BvbAiDiscardData();
      case fb_common_1.UnionBvbEventData.BvbAiEvolutionData:
        return new fb_common_1.BvbAiEvolutionData();
      case fb_common_1.UnionBvbEventData.BvbAiGetBestDeployData:
        return new fb_common_1.BvbAiGetBestDeployData();
      case fb_common_1.UnionBvbEventData.BvbAiGetBestRearrangeData:
        return new fb_common_1.BvbAiGetBestRearrangeData();
      case fb_common_1.UnionBvbEventData.BvbAiGetBestSwapData:
        return new fb_common_1.BvbAiGetBestSwapData();
      case fb_common_1.UnionBvbEventData.BvbAiRearrangeData:
        return new fb_common_1.BvbAiRearrangeData();
      case fb_common_1.UnionBvbEventData.BvbAiRecycleData:
        return new fb_common_1.BvbAiRecycleData();
      case fb_common_1.UnionBvbEventData.BvbAiSwapData:
        return new fb_common_1.BvbAiSwapData();
      case fb_common_1.UnionBvbEventData.BvbAiTurnEndData:
        return new fb_common_1.BvbAiTurnEndData();
      case fb_common_1.UnionBvbEventData.BvbBurnBuffTimeUpData:
        return new fb_common_1.BvbBurnBuffTimeUpData();
      case fb_common_1.UnionBvbEventData.BvbEnableHatredData:
        return new fb_common_1.BvbEnableHatredData();
      case fb_common_1.UnionBvbEventData.BvbPlayerBattleWinData:
        return new fb_common_1.BvbPlayerBattleWinData();
      case fb_common_1.UnionBvbEventData.BvbPlayerTurnEndData:
        return new fb_common_1.BvbPlayerTurnEndData();
      case fb_common_1.UnionBvbEventData.BvbPlayerTurnStartData:
        return new fb_common_1.BvbPlayerTurnStartData();
      case fb_common_1.UnionBvbEventData.BvbSelectCardsEndData:
        return new fb_common_1.BvbSelectCardsEndData();
      case fb_common_1.UnionBvbEventData.BvbStartAiData:
        return new fb_common_1.BvbStartAiData();
      case fb_common_1.UnionBvbEventData.BvbStartBattleData:
        return new fb_common_1.BvbStartBattleData();
      case fb_common_1.UnionBvbEventData.BvbStartRoundData:
        return new fb_common_1.BvbStartRoundData();
      case fb_common_1.UnionBvbEventData.BvbWaitForGameBeginData:
        return new fb_common_1.BvbWaitForGameBeginData();
      default:
        return;
    }
  }
  static ReadUnionBvbEventData(e, a) {
    if (a !== undefined) {
      switch (e) {
        case fb_common_1.UnionBvbEventData.BvbAiBattleWinData:
          return FbBvbAiBattleWinData_1.FbBvbAiBattleWinData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiChangeData:
          return FbBvbAiChangeData_1.FbBvbAiChangeData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiDeployData:
          return FbBvbAiDeployData_1.FbBvbAiDeployData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiDiscardData:
          return FbBvbAiDiscardData_1.FbBvbAiDiscardData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiEvolutionData:
          return FbBvbAiEvolutionData_1.FbBvbAiEvolutionData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiGetBestDeployData:
          return FbBvbAiGetBestDeployData_1.FbBvbAiGetBestDeployData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiGetBestRearrangeData:
          return FbBvbAiGetBestRearrangeData_1.FbBvbAiGetBestRearrangeData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiGetBestSwapData:
          return FbBvbAiGetBestSwapData_1.FbBvbAiGetBestSwapData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiRearrangeData:
          return FbBvbAiRearrangeData_1.FbBvbAiRearrangeData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiRecycleData:
          return FbBvbAiRecycleData_1.FbBvbAiRecycleData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiSwapData:
          return FbBvbAiSwapData_1.FbBvbAiSwapData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbAiTurnEndData:
          return FbBvbAiTurnEndData_1.FbBvbAiTurnEndData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbBurnBuffTimeUpData:
          return FbBvbBurnBuffTimeUpData_1.FbBvbBurnBuffTimeUpData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbEnableHatredData:
          return FbBvbEnableHatredData_1.FbBvbEnableHatredData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbPlayerBattleWinData:
          return FbBvbPlayerBattleWinData_1.FbBvbPlayerBattleWinData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbPlayerTurnEndData:
          return FbBvbPlayerTurnEndData_1.FbBvbPlayerTurnEndData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbPlayerTurnStartData:
          return FbBvbPlayerTurnStartData_1.FbBvbPlayerTurnStartData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbSelectCardsEndData:
          return FbBvbSelectCardsEndData_1.FbBvbSelectCardsEndData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbStartAiData:
          return FbBvbStartAiData_1.FbBvbStartAiData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbStartBattleData:
          return FbBvbStartBattleData_1.FbBvbStartBattleData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbStartRoundData:
          return FbBvbStartRoundData_1.FbBvbStartRoundData.Create(a);
        case fb_common_1.UnionBvbEventData.BvbWaitForGameBeginData:
          return FbBvbWaitForGameBeginData_1.FbBvbWaitForGameBeginData.Create(a);
        default:
          return;
      }
    }
  }
}
exports.UnionBvbEventDataHelper = UnionBvbEventDataHelper;
//# sourceMappingURL=UnionBvbEventDataHelper.js.map