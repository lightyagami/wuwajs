"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedDollProgressItem = undefined;
const UE = require("ue");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelGeneralNetworks_1 = require("../../LevelGeneralNetworks");
const ADD_SCORE_ANIMNAME = "Add";
const SUB_SCORE_ANIMNAME = "Subtract";
const QTE_EVENTKEY1 = "BrokenRockEventKey1";
const QTE_EVENTKEY2 = "BrokenRockEventKey2";
const QTE_EVENTKEY3 = "BrokenRockEventKey3";
const QTE_EVENTKEY4 = "BrokenRockEventKey4";
const QTE_EVENTKEY5 = "BrokenRockEventKey5";
const QTE_EVENTKEY_PROGRESS2 = 0.2;
const QTE_EVENTKEY_PROGRESS3 = 0.4;
const QTE_EVENTKEY_PROGRESS4 = 0.6;
const QTE_EVENTKEY_PROGRESS5 = 0.8;
class BigStuffedDollProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Afl = 0;
    this.IDl = 0;
    this.ScoreMax = 0;
    this.AutoIncreaseScore = 0;
    this.BAl = 0;
    this.LevelSequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    var e = this.GetItem(1);
    this.Afl = e.GetWidth();
    e.SetStretchLeft(0);
    e.SetStretchRight(this.Afl);
    e.SetUIActive(true);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.IDl = 0;
  }
  Init(e) {
    this.ScoreMax = e.ScoreMax ?? 100;
    this.AutoIncreaseScore = e.ScoreUp;
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(ModelManager_1.ModelManager.BigStuffedDollModel.BrokenRockEntityCreatureDataId, QTE_EVENTKEY1);
    this.Yqe();
    this.GetSprite(0).SetFillAmount(0);
    this.GetItem(3)?.SetAnchorOffsetX(this.Afl * -0.5);
  }
  OnTick(e) {
    if (ModelManager_1.ModelManager.BigStuffedDollModel.GetGameStage() === 2) {
      e = e / 1000;
      if (this.AutoIncreaseScore) {
        this.AddScore(e * this.AutoIncreaseScore, false);
      }
      this.TDl(e);
      this.bAl();
    }
  }
  AddScore(e, t = true) {
    var E;
    var s = ModelManager_1.ModelManager.BigStuffedDollModel;
    if (t) {
      this.IDl = s.CurrentScore;
    }
    s.CurrentScore = MathCommon_1.MathCommon.Clamp(s.CurrentScore + e, 0, this.ScoreMax);
    var s = this.Yqe();
    if (t) {
      t = this.GetItem(1);
      E = this.pje(this.IDl);
      t.SetStretchLeft(this.Afl * E);
      t.SetStretchRight(this.Afl * (1 - s));
      this.LevelSequencePlayer.StopCurrentSequence(true, true);
      this.LevelSequencePlayer.PlayLevelSequenceByName(e >= 0 ? ADD_SCORE_ANIMNAME : SUB_SCORE_ANIMNAME);
    } else {
      this.GetSprite(0).SetFillAmount(s);
    }
  }
  TDl(e) {
    var t = this.GetCurrentProgress();
    this.IDl = MathCommon_1.MathCommon.Clamp(this.IDl + e * 10, 0, ModelManager_1.ModelManager.BigStuffedDollModel.CurrentScore);
    var e = this.pje(this.IDl);
    this.GetSprite(0).SetFillAmount(e);
    var E = this.GetItem(1);
    E.SetStretchLeft(this.Afl * e);
    E.SetStretchRight(this.Afl * (1 - t));
    this.GetItem(3)?.SetAnchorOffsetX(this.Afl * (e - 0.5));
  }
  bAl() {
    var e = ModelManager_1.ModelManager.BigStuffedDollModel;
    var t = this.GetCurrentProgress();
    if (t > QTE_EVENTKEY_PROGRESS2 && this.BAl <= QTE_EVENTKEY_PROGRESS2) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(e.BrokenRockEntityCreatureDataId, QTE_EVENTKEY2);
    } else if (t > QTE_EVENTKEY_PROGRESS3 && this.BAl <= QTE_EVENTKEY_PROGRESS3) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(e.BrokenRockEntityCreatureDataId, QTE_EVENTKEY3);
    } else if (t > QTE_EVENTKEY_PROGRESS4 && this.BAl <= QTE_EVENTKEY_PROGRESS4) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(e.BrokenRockEntityCreatureDataId, QTE_EVENTKEY4);
    } else if (t > QTE_EVENTKEY_PROGRESS5 && this.BAl <= QTE_EVENTKEY_PROGRESS5) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(e.BrokenRockEntityCreatureDataId, QTE_EVENTKEY5);
    }
    if (t >= 1) {
      e.GameResult = true;
      e.EnterNextGameStage();
    }
    this.BAl = t;
  }
  Yqe() {
    var e = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "TeddyBear_Progress");
    var t = e.GetText();
    var E = this.GetCurrentProgress();
    var s = this.GetCurrentProgressPercent();
    e.SetText(`${t}:${s}%`);
    return E;
  }
  GetCurrentProgress() {
    if (this.ScoreMax === 0) {
      return 1;
    } else {
      return this.pje(ModelManager_1.ModelManager.BigStuffedDollModel.CurrentScore);
    }
  }
  GetCurrentProgressPercent() {
    if (this.ScoreMax === 0) {
      return 100;
    } else {
      return Math.min(100, Math.floor(this.GetCurrentProgress() * 100));
    }
  }
  pje(e) {
    if (this.ScoreMax === 0) {
      return 1;
    } else {
      return e / this.ScoreMax;
    }
  }
}
exports.BigStuffedDollProgressItem = BigStuffedDollProgressItem;
//# sourceMappingURL=BigStuffedDollProgressItem.js.map