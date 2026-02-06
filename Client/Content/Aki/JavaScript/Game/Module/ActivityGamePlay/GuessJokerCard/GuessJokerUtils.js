"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerUtils = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const GuessJokerDefine_1 = require("./GuessJokerDefine");
class GuessJokerUtils {
  static ServerPlayerTransToClient(e) {
    if (e === Protocol_1.Aki.Protocol.VXm.Proto_Who) {
      return 0;
    } else {
      return 1;
    }
  }
  static ServerUseSkillTransToClient(e) {
    return e === Protocol_1.Aki.Protocol.HXm.Proto_Use;
  }
  static LogCardsGlobalIndex(e, r = "") {
    var a = [];
    for (const t of e) {
      a.push(t.GetGlobalIndex());
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, r + ": cards index", ["globalIndexList", a.join(",")]);
    }
  }
  static LogCardsIdList(e, r = "") {
    var a = [];
    for (const t of e) {
      a.push(t.Data.Id);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, r + ": cards ids", ["idList", a.join(",")]);
    }
  }
  static CalculateCardLayoutInfo(r, e) {
    var e = (0, GuessJokerDefine_1.getCardPositionConfig)(e);
    var a = e.Spacing;
    var t = e.Size ?? 1;
    var o = e.Alpha ?? 1;
    var s = UiLayer_1.UiLayer.UiRootItem.GetHeight();
    var i = e.PositionRate * s / 100;
    var n = [];
    var u = [];
    var l = [];
    let C = 0;
    for (let e = 0; e < r; e++) {
      var c = t * (0, GuessJokerDefine_1.calculateCardScaleByIndex)(e, r);
      u.push(c);
      var d = (0, GuessJokerDefine_1.calculateCardRotation)(e, r);
      l.push(d);
      var d = GuessJokerDefine_1.GUESS_JOKER_CARD_WIDTH * c;
      if (e === 0) {
        C += d;
      } else {
        C += a + d;
      }
    }
    let g = -C / 2;
    for (let e = 0; e < r; e++) {
      var f = GuessJokerDefine_1.GUESS_JOKER_CARD_WIDTH * u[e];
      if (e === 0) {
        g += f / 2;
      } else {
        g += a + f / 2;
      }
      n.push({
        X: g,
        Y: i,
        Scale: u[e],
        Rotation: l[e],
        Alpha: o
      });
      g += f / 2;
    }
    return n;
  }
  static GetPlotConfig(r, a, t) {
    r = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiPlotConfig(r, a, t);
    if (r) {
      a = r.PlotIdList;
      if (a.length !== 0) {
        t = r.Id;
        const o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLastUsedPlotId(t);
        let e = a;
        r = (e = (e = o !== undefined && a.length > 1 ? a.filter(e => e !== o) : e).length === 0 ? a : e)[Math.floor(Math.random() * e.length)];
        return ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerPlotConfig(r);
      }
    }
  }
  static CalculateNpcState(e, r = 0) {
    var a = ModelManager_1.ModelManager.GuessJokerGamePlayModel;
    if (!a) {
      return 0;
    }
    var t = a.GetHandCardsByPlayer(1);
    var o = t.length;
    var s = a.GetHandCardsByPlayer(0).length;
    var i = t.some(e => e.Type === 1);
    let n = false;
    if (r > 0 && (t = a.GetCardDataById(r))) {
      n = t.Type === 1;
    }
    let u = 0;
    switch (e) {
      case 1:
        u = o > GuessJokerUtils.GetJokerParamConfig("GuessJokerBeChooseAiCardCount") ? 2 : 1;
        break;
      case 2:
        u = o === 0 || n ? 3 : o <= GuessJokerUtils.GetJokerParamConfig("GuessJokerBeDrawAiCardCount") && i ? 4 : 0;
        break;
      case 3:
        u = o > GuessJokerUtils.GetJokerParamConfig("GuessJokerDrawAiCardCount") ? 5 : 6;
        break;
      case 4:
        u = s === 0 || n ? 8 : s <= GuessJokerUtils.GetJokerParamConfig("GuessJokerDrawAiCardCount") ? 7 : 0;
        break;
      default:
        u = 0;
    }
    return u;
  }
  static GetPlayerGetCardState(e) {
    var r = ModelManager_1.ModelManager.GuessJokerGamePlayModel;
    if (!r) {
      return 12;
    }
    var a = r.GetHandCardsByPlayer(0).length;
    var t = r.GetHandCardsByPlayer(1).length;
    let o = false;
    if (e > 0 && (r = r.GetCardDataById(e))) {
      o = r.Type === 1;
    }
    if (t === 0 || o) {
      return 11;
    } else if (a <= GuessJokerUtils.GetJokerParamConfig("GuessJokerBeDrawPlayerCardCount")) {
      return 10;
    } else {
      return 12;
    }
  }
  static GetOtherPlayerType(e) {
    if (e === 1) {
      return 0;
    } else {
      return 1;
    }
  }
  static GetCameraNameByCameraId(e) {
    e = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraMappingConfigById(e);
    if (e !== undefined) {
      return e.ViewName;
    }
  }
  static GetCameraSettingNameByCameraId(e) {
    e = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraMappingConfigById(e);
    if (e !== undefined) {
      return e.DefaultUiCameraSettingsName;
    }
  }
  static GetJokerParamConfig(e) {
    e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerParam(e);
    if (e === undefined) {
      return 0;
    } else {
      return e.Value;
    }
  }
}
exports.GuessJokerUtils = GuessJokerUtils;
//# sourceMappingURL=GuessJokerUtils.js.map