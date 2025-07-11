"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedDollModel = undefined;
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const BrokenRockConfigById_1 = require("../../../Core/Define/ConfigQuery/BrokenRockConfigById");
const BrokenRockRingById_1 = require("../../../Core/Define/ConfigQuery/BrokenRockRingById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const BigStuffedDefine_1 = require("./BigStuffedDefine");
class BigStuffedDollModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nfl = 0;
    this.BehaviorTreeConfigId = 0;
    this.BrokenRockEntityPbDataId = 0;
    this.BrokenRockEntityCreatureDataId = 0;
    this.GSl = undefined;
    this.kSl = undefined;
    this.OSl = undefined;
    this.GameInfo = new BigStuffedDefine_1.BigStuffedGameInfo();
    this.afl = 0;
    this.GameResult = false;
    this.CurrentScore = 0;
    this.CurrentArrowDirection = 0;
    this.LastGameStage = 0;
  }
  get Config() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.GSl;
    } else {
      return this.kSl;
    }
  }
  GameplayStart(e, t) {
    this.nfl = e;
    this.BehaviorTreeConfigId = t;
    this.SetGameStage(0);
    this.GameInfo.Clear();
    this.CurrentScore = 0;
    this.CurrentArrowDirection = 0;
    this.InitialConfig();
    if (this.Config) {
      e = this.Config.EntityUid.split("_");
      this.BrokenRockEntityPbDataId = Number(e[2]);
    }
  }
  InitialConfig() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.GSl = BrokenRockConfigById_1.configBrokenRockConfigById.GetConfig(this.nfl);
    } else {
      var e = IGlobal_1.globalConfig.BrokenRockConfig;
      if (e) {
        var e = (0, PublicUtil_1.getConfigPath)(e);
        var t = (0, puerts_1.$ref)("");
        ue_1.KuroStaticLibrary.LoadFileToString(t, e);
        e = (0, puerts_1.$unref)(t);
        var i = JSON.parse(e);
        if (i && (this.kSl = i.Config.find(e => e.Id === this.nfl), this.kSl)) {
          this.OSl = new Map();
          for (const r of this.kSl.Rings) {
            var s = i.Rings.find(e => e.Id === r);
            if (s) {
              s.BonusRate = this.FSl(s.BonusRate);
              s.Speed = this.FSl(s.Speed);
              this.OSl.set(r, s);
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 18, "大个布偶坚固岩石玩法找不到Json数据配置");
      }
    }
  }
  FSl(e) {
    var e = e.replace("[", "").replace("]", "").split(",");
    var t = new Map();
    for (const s of e) {
      var i = s.split(":");
      t.set(Number(i[0]), Number(i[1]));
    }
    return t;
  }
  GetCurrentGameplayId() {
    return this.nfl;
  }
  SetGameStage(e) {
    this.LastGameStage = this.afl;
    this.afl = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBigStuffedDollGameStageUpdate, this.afl);
  }
  GetGameStage() {
    return this.afl;
  }
  EnterNextGameStage() {
    this.LastGameStage = this.afl;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBigStuffedDollGameStageUpdate, ++this.afl);
  }
  ArrowEnterNextValidArea() {
    var e = this.GameInfo.GetValidAreaNum();
    if (e) {
      var t = this.GameInfo.CurrentArrowStayTotalIndex;
      switch (this.CurrentArrowDirection) {
        case 0:
          this.GameInfo.CurrentArrowStayTotalIndex++;
          break;
        case 1:
          this.GameInfo.CurrentArrowStayTotalIndex--;
      }
      if (this.GameInfo.CurrentArrowStayTotalIndex > e - 1) {
        this.GameInfo.CurrentArrowStayTotalIndex = 0;
      } else if (this.GameInfo.CurrentArrowStayTotalIndex < 0) {
        this.GameInfo.CurrentArrowStayTotalIndex = e - 1;
      }
      if (t !== this.GameInfo.CurrentArrowStayTotalIndex) {
        e = this.GameInfo.CurrentArrowStayRingId;
        this.GameInfo.UpdateCurrentArrowStayInfo();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBigStuffedDollArrowStayAreaUpdate, e, this.GameInfo.CurrentArrowStayRingId, this.GameInfo.CurrentArrowStayRelativeValidAreaIndex);
      }
    }
  }
  GetGlobalTime() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.GSl?.GlobalTime ?? 0;
    } else {
      return this.kSl?.GlobalTime ?? 0;
    }
  }
  GetScoreDown() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.GSl?.ScoreDown ?? 0;
    } else {
      return this.kSl?.ScoreDown ?? 0;
    }
  }
  GetRingConfig(e) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      return BrokenRockRingById_1.configBrokenRockRingById.GetConfig(e);
    } else {
      return this.OSl?.get(e);
    }
  }
  GetArrowSpeed(e) {
    let t = 0;
    if (e) {
      var i;
      var s;
      var r = this.CurrentScore;
      for ([i, s] of e.Speed) {
        if (!(r >= i)) {
          break;
        }
        t = s;
      }
    }
    return t;
  }
  ArrowDirectionReverse() {
    switch (this.CurrentArrowDirection) {
      case 0:
        this.CurrentArrowDirection = 1;
        break;
      case 1:
        this.CurrentArrowDirection = 0;
    }
    this.GameInfo.OnArrowDirectionReverse();
  }
}
exports.BigStuffedDollModel = BigStuffedDollModel;
//# sourceMappingURL=BigStuffedDollModel.js.map