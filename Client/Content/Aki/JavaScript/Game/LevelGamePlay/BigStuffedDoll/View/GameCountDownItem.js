"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameCountDownItem = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ONE_HUNDRED = 100;
class GameCountDownItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HSl = false;
    this.mNe = 0;
    this.cJt = "";
    this.mJt = "";
    this.dJt = "";
    this.Oct = undefined;
    this.LevelSequencePlayer = undefined;
    this.HGe = undefined;
    this.TYe = undefined;
    this.UpdateCountDown = t => {
      var e;
      if (t <= 0) {
        this.GetUiNiagara(2).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(false);
        this.TYe?.SetText("00:00:00");
        ModelManager_1.ModelManager.BigStuffedDollModel.GameResult = false;
        ModelManager_1.ModelManager.BigStuffedDollModel.EnterNextGameStage();
      } else {
        this.GetUiNiagara(2).SetUIActive(t <= 10);
        this.GetUiNiagara(3).SetUIActive(t > 10);
        e = Math.floor(t % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute);
        this.mJt = (e < 10 ? "0" : "") + e;
        e = Math.floor(t % TimeUtil_1.TimeUtil.Minute);
        this.dJt = (e < 10 ? "0" : "") + e;
        e = Math.floor((t - Math.floor(t)) * ONE_HUNDRED);
        this.cJt = (e < 10 ? "0" : "") + e;
        this.TYe?.SetText(`${this.mJt}:${this.dJt}:${this.cJt}`);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.HGe = this.GetText(0);
    this.TYe = this.GetText(1);
    this.Oct = UE.Color.FromHex("FFFFFFFF");
  }
  async StartCountDown(t) {
    if (t) {
      this.HSl = true;
      this.mNe = t;
      await this.ShowAsync();
      this.UpdateCountDown(t);
    } else {
      this.HSl = false;
    }
  }
  OnTick(t) {
    if (ModelManager_1.ModelManager.BigStuffedDollModel.GetGameStage() === 2 && this.HSl) {
      this.mNe -= t / 1000;
      if (this.mNe <= 10) {
        if (this.LevelSequencePlayer.GetCurrentSequence() !== "Loop") {
          this.LevelSequencePlayer.PlayLevelSequenceByName("Loop");
        }
      } else {
        if (this.LevelSequencePlayer.GetCurrentSequence() === "Loop") {
          this.LevelSequencePlayer.StopCurrentSequence();
        }
        this.HGe?.SetColor(this.Oct);
        this.TYe?.SetColor(this.Oct);
        this.HGe?.SetUIItemScale(Vector_1.Vector.OneVector);
        this.TYe?.SetUIItemScale(Vector_1.Vector.OneVector);
      }
      this.UpdateCountDown(this.mNe);
    }
  }
}
exports.GameCountDownItem = GameCountDownItem;
//# sourceMappingURL=GameCountDownItem.js.map