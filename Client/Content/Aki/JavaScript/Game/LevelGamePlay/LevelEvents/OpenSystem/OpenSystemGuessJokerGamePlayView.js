"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemGuessJokerGamePlayView = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemGuessJokerGamePlayView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    const o = new CustomPromise_1.CustomPromise();
    let s = -1;
    if (e.GuessJokerLevel) {
      s = e.GuessJokerLevel;
    } else {
      if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "[LevelEventOpenSystem] 打开猜鬼牌游戏界面时找不到交互对象，直接关闭界面");
        }
        o.SetResult(false);
        return o.Promise;
      }
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "[LevelEventOpenSystem] 打开猜鬼牌游戏界面时找不到实体，直接关闭界面");
        }
        o.SetResult(false);
        return o.Promise;
      }
      e = e.PbDataId;
      s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelIdByNpcId(e);
    }
    if (s === -1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "[LevelEventOpenSystem] 打开猜鬼牌游戏界面时找不到关卡配置，直接关闭界面");
      }
      o.SetResult(false);
    } else {
      ControllerHolder_1.ControllerHolder.GuessJokerController.RequestJokerGuessStartNew(s, () => {
        o.SetResult(true);
      });
    }
    return o.Promise;
  }
  GetViewName(e, r) {}
}
exports.OpenSystemGuessJokerGamePlayView = OpenSystemGuessJokerGamePlayView;
//# sourceMappingURL=OpenSystemGuessJokerGamePlayView.js.map