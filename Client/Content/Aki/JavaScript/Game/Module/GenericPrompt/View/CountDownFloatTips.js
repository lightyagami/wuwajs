"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDownFloatTips = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
const ONE_HUNDRED = 100;
class CountDownFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments);
    this.uJt = -0;
    this.cJt = "";
    this.mJt = "";
    this.dJt = "";
    this.Oct = undefined;
    this.LevelSequencePlayer = undefined;
    this.PYt = e => {
      var t;
      if ((this.uJt = e) <= 0) {
        this.GetUiNiagara(2).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(false);
        ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = true;
        this.CloseMe(e => {
          if (e) {
            ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = false;
          }
        });
      } else {
        this.GetUiNiagara(2).SetUIActive(e <= 10);
        this.GetUiNiagara(3).SetUIActive(e > 10);
        t = Math.floor(e % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute);
        this.mJt = (t < 10 ? "0" : "") + t;
        t = Math.floor(e % TimeUtil_1.TimeUtil.Minute);
        this.dJt = (t < 10 ? "0" : "") + t;
        t = Math.floor((e - Math.floor(e)) * ONE_HUNDRED);
        this.cJt = (t < 10 ? "0" : "") + t;
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UINiagara]);
    this.ComponentRegisterInfos.push([3, UE.UINiagara]);
    this.Oct = UE.Color.FromHex("FFFFFFFF");
  }
  OnStart() {
    super.OnStart();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGamePlayCdChanged, this.PYt);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGamePlayCdChanged, this.PYt);
  }
  OnTick(e) {
    if (this.mJt && this.dJt && this.cJt) {
      if (this.uJt <= 10) {
        if (this.LevelSequencePlayer.GetCurrentSequence() !== "Loop") {
          this.LevelSequencePlayer.PlayLevelSequenceByName("Loop");
        }
      } else {
        if (this.LevelSequencePlayer.GetCurrentSequence() === "Loop") {
          this.LevelSequencePlayer.StopCurrentSequence();
        }
        this.MainText.SetColor(this.Oct);
        this.ExtraText.SetColor(this.Oct);
        this.MainText.SetUIItemScale(Vector_1.Vector.OneVector);
        this.ExtraText.SetUIItemScale(Vector_1.Vector.OneVector);
      }
      if (this.uJt === 0) {
        this.cJt = "00";
      }
      this.SetExtraText(this.mJt, this.dJt, this.cJt);
    }
  }
}
exports.CountDownFloatTips = CountDownFloatTips;
//# sourceMappingURL=CountDownFloatTips.js.map