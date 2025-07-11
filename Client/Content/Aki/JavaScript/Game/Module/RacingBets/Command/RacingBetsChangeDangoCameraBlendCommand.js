"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsChangeDangoCameraBlendCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsChangeDangoCameraBlendCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.eyc = 0;
    this.CommandType = 11;
  }
  async OnExecute() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoEntityId(this.eyc);
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e)?.Entity?.GetComponent(1)?.ActorLocationProxy;
    if (e) {
      const a = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.DangoGlobalController.ApplyDangoBeforeMoveCamera(e, () => {
        a.SetResult();
      });
      await a.Promise;
    }
  }
  SetDangoId(e) {
    this.eyc = e;
  }
  LogInfo() {
    return "RacingBetsChangeDangoCameraBlendCommand";
  }
}
exports.RacingBetsChangeDangoCameraBlendCommand = RacingBetsChangeDangoCameraBlendCommand;
//# sourceMappingURL=RacingBetsChangeDangoCameraBlendCommand.js.map