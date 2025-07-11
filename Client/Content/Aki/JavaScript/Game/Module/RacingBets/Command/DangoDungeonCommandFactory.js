"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoDungeonCommandFactory = undefined;
const OpenRacingBetsDungeonResultViewCommand_1 = require("./OpenRacingBetsDungeonResultViewCommand");
const OpenRacingBetsGamePlayPreviewViewCommand_1 = require("./OpenRacingBetsGamePlayPreviewViewCommand");
const OpenRacingBetsGamePlayViewCommand_1 = require("./OpenRacingBetsGamePlayViewCommand");
const RacingBetsChangeDangoCameraBlendCommand_1 = require("./RacingBetsChangeDangoCameraBlendCommand");
const RacingBetsDangoChangeHighCommand_1 = require("./RacingBetsDangoChangeHighCommand");
const RacingBetsDangoDestinationCommand_1 = require("./RacingBetsDangoDestinationCommand");
const RacingBetsDangoMoveCommand_1 = require("./RacingBetsDangoMoveCommand");
const RacingBetsDangoRankChangeCommand_1 = require("./RacingBetsDangoRankChangeCommand");
const RacingBetsDangoRoundStartCommand_1 = require("./RacingBetsDangoRoundStartCommand");
const RacingBetsDiceCommand_1 = require("./RacingBetsDiceCommand");
const RacingBetsDungeonBeginCommand_1 = require("./RacingBetsDungeonBeginCommand");
const RacingBetsInitDungeonCommand_1 = require("./RacingBetsInitDungeonCommand");
const RacingBetsNextRoundRequestCommand_1 = require("./RacingBetsNextRoundRequestCommand");
const RacingBetsRoundStartCommand_1 = require("./RacingBetsRoundStartCommand");
const RacingBetsSkillCommand_1 = require("./RacingBetsSkillCommand");
class DangoDungeonCommandFactory {
  static CreateRacingBetsInitDungeonCommand(e, n) {
    var a = new RacingBetsInitDungeonCommand_1.RacingBetsInitDungeonCommand();
    a.Init(e, n);
    return a;
  }
  static CreateOpenRacingBetsGameplayView() {
    return new OpenRacingBetsGamePlayViewCommand_1.OpenRacingBetsGamePlayViewCommand();
  }
  static CreateOpenRacingBetsGamePlayPreviewView() {
    return new OpenRacingBetsGamePlayPreviewViewCommand_1.OpenRacingBetsGamePlayPreviewViewCommand();
  }
  static CreateRacingBetsDungeonBeginCommand() {
    return new RacingBetsDungeonBeginCommand_1.RacingBetsDungeonBeginCommand();
  }
  static CreateRacingBetsRoundStartCommand() {
    return new RacingBetsRoundStartCommand_1.RacingBetsRoundStartCommand();
  }
  static CreateRacingBetsDangoRoundStartCommand(e) {
    var n = new RacingBetsDangoRoundStartCommand_1.RacingBetsDangoRoundStartCommand();
    n.Init(e);
    return n;
  }
  static CreateRacingBetsDiceCommand(e, n) {
    var a = new RacingBetsDiceCommand_1.RacingBetsDiceCommand();
    a.Init(e, n);
    return a;
  }
  static CreateRacingBetsSkillCommand(e) {
    var n = new RacingBetsSkillCommand_1.RacingBetsSkillCommand();
    n.Init(e);
    return n;
  }
  static CreateRacingBetsDangoMoveCommand(e) {
    var n = new RacingBetsDangoMoveCommand_1.RacingBetsDangoMoveCommand();
    n.Init(e);
    return n;
  }
  static CreateRacingBetsDangoChangeHighCommand(e) {
    var n = new RacingBetsDangoChangeHighCommand_1.RacingBetsDangoChangeHighCommand();
    n.Init(e);
    return n;
  }
  static CreateRacingBetsChangeDangoCameraBlendCommand(e) {
    var n = new RacingBetsChangeDangoCameraBlendCommand_1.RacingBetsChangeDangoCameraBlendCommand();
    n.SetDangoId(e);
    return n;
  }
  static CreateRacingBetsNextRoundRequestCommand(e, n, a) {
    var t = new RacingBetsNextRoundRequestCommand_1.RacingBetsNextRoundRequestCommand();
    t.Init(e, n, a);
    return t;
  }
  static CreateOpenRacingBetsDungeonResultView(e) {
    var n = new OpenRacingBetsDungeonResultViewCommand_1.OpenRacingBetsDungeonResultViewCommand();
    n.Init(e);
    return n;
  }
  static CreateRacingBetsDangoDestinationCommand(e) {
    var n = new RacingBetsDangoDestinationCommand_1.RacingBetsDangoDestinationCommand();
    n.Init(e);
    return n;
  }
  static CreateRacingBetsDangoRankChangeCommand(e) {
    var n = new RacingBetsDangoRankChangeCommand_1.RacingBetsDangoRankChangeCommand();
    n.Init(e);
    return n;
  }
}
exports.DangoDungeonCommandFactory = DangoDungeonCommandFactory;
//# sourceMappingURL=DangoDungeonCommandFactory.js.map