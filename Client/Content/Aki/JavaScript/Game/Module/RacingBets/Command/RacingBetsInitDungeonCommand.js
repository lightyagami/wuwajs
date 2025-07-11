"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsInitDungeonCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CreatureController_1 = require("../../../World/Controller/CreatureController");
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsInitDungeonCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.mkc = [];
    this.fkc = [];
    this.CommandType = 50;
  }
  Init(o, e) {
    for (let e = o.length - 1; e >= 0; e--) {
      var t = o[e];
      var t = {
        Id: t.DangoId,
        CreatureDataId: t.EntityId,
        InitPointId: t.RealPoint()
      };
      this.mkc.push(t);
    }
    for (const n of e) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(n.EntityId);
      var r = {
        Id: n.Id,
        Location: Vector_1.Vector.Create(r?.Transform?.Pos.X ?? 0, r?.Transform?.Pos.Y ?? 0, r?.Transform?.Pos.Z ?? 0),
        Rotation: Rotator_1.Rotator.Create(r?.Transform?.Rot?.Y ?? 0, r?.Transform?.Rot?.Z ?? 0, r?.Transform?.Rot?.X ?? 0),
        SortIndex: n.SortId
      };
      this.fkc.push(r);
    }
  }
  async OnExecute() {
    ControllerHolder_1.ControllerHolder.CameraController.FreeCamera?.LogicComponent?.ResetToInit();
    const e = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.DangoGlobalController.InitGlobalConfig(RacingBetsDefine_1.DANGO_GLOBAL_CONFIG_PATH, () => {
      e.SetResult();
    });
    await e.Promise;
    await ChessController_1.ChessController.InitChessGameAsync(this.fkc, this.mkc, this.fkc[this.fkc.length - 1].Id);
    this.s3c(this.mkc);
  }
  s3c(e) {
    for (const t of e) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.CreatureDataId);
      if (o) {
        CreatureController_1.CreatureController.SetEntityEnable(o.Entity, true, "RacingBetsInitDungeonCommand active dango");
      }
    }
  }
  LogInfo() {
    return "RacingBetsInitDungeonCommand";
  }
}
exports.RacingBetsInitDungeonCommand = RacingBetsInitDungeonCommand;
//# sourceMappingURL=RacingBetsInitDungeonCommand.js.map