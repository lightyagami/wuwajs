"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemGuessJokerSelectRoleView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemGuessJokerSelectRoleView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    var o;
    if (ModelManager_1.ModelManager.SpringManorModel.ActivityData) {
      if ((o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId()) === -1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "[LevelEventOpenSystem] 打开猜鬼牌选角界面时找不到关卡配置，直接关闭界面", ["levelId", o]);
        }
        return false;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GuessJokerCard", 78, "[LevelEventOpenSystem] 打开猜鬼牌选角界面", ["levelId", o]);
        }
        await ModelManager_1.ModelManager.GuessJokerGamePlayModel.OpenSelectRoleView();
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "[LevelEventOpenSystem] 打开猜鬼牌选角界面时找不到活动数据，直接关闭界面");
      }
      return false;
    }
  }
  GetViewName(e, s) {}
}
exports.OpenSystemGuessJokerSelectRoleView = OpenSystemGuessJokerSelectRoleView;
//# sourceMappingURL=OpenSystemGuessJokerSelectRoleView.js.map