"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsFinalMatchInfo = exports.RacingBetsFourDangoMatchInfo = exports.RacingBetsSixDangoMatchInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RacingBetsSixDangoMatchInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tFe = undefined;
    this._e1 = [2, 3, 4, 5, 6, 7];
    this.ifa = () => {
      return new RacingBetsDangoItemWithName();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIVerticalLayout], [9, UE.UIItem]];
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(8), this.ifa);
  }
  SetData(e) {
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(e);
    var s = [];
    if (t) {
      var i = t?.GetPromoteDangoList();
      var a = new Set(i);
      var r = t.IsGroupMatchFinished();
      for (const n of t.GetInGameDangoList()) {
        var o = {
          GroupMatchId: e,
          DangoId: n,
          IsMatchFinished: r,
          IsPromote: a.has(n),
          IsBasicGroupMatch: t.IsBasicGroupMatch()
        };
        s.push(o);
      }
    }
    var h = this._e1.length;
    for (let t = s.length; t < h; ++t) {
      s.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: false,
        IsPromote: false,
        IsBasicGroupMatch: false
      });
    }
    this.RefreshRoleLayout(s);
    this.RefreshLine(s);
    i = t?.IsGroupMatchFinished() ?? false;
    this.GetSprite(0).SetUIActive(!i);
    this.GetTexture(1).SetUIActive(i);
  }
  RefreshRoleLayout(t) {
    this.tFe?.RefreshByData(t);
  }
  RefreshLine(e) {
    for (let t = 0; t < this._e1.length; ++t) {
      var s = e[t];
      var i = this._e1[t];
      this.GetItem(i).SetUIActive(s.IsMatchFinished && s.IsPromote);
    }
  }
}
exports.RacingBetsSixDangoMatchInfo = RacingBetsSixDangoMatchInfo;
class RacingBetsFourDangoMatchInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tFe = undefined;
    this._e1 = [2, 3, 4, 5];
    this.ifa = () => {
      return new RacingBetsDangoItemWithName();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout], [7, UE.UIItem]];
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.ifa);
  }
  SetData(e) {
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(e);
    var s = [];
    if (t) {
      var i = t?.GetPromoteDangoList();
      var a = new Set(i);
      var r = t.IsGroupMatchFinished();
      for (const n of t.GetInGameDangoList()) {
        var o = {
          GroupMatchId: e,
          DangoId: n,
          IsMatchFinished: r,
          IsPromote: a.has(n),
          IsBasicGroupMatch: t.IsBasicGroupMatch()
        };
        s.push(o);
      }
    }
    var h = this._e1.length;
    for (let t = s.length; t < h; ++t) {
      s.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: false,
        IsPromote: false,
        IsBasicGroupMatch: false
      });
    }
    this.RefreshRoleLayout(s);
    this.RefreshLine(s);
    i = t?.IsGroupMatchFinished() ?? false;
    this.GetSprite(0).SetUIActive(!i);
    this.GetTexture(1).SetUIActive(i);
  }
  RefreshRoleLayout(t) {
    this.tFe?.RefreshByData(t);
  }
  RefreshLine(e) {
    for (let t = 0; t < this._e1.length; ++t) {
      var s = e[t];
      var i = this._e1[t];
      this.GetItem(i).SetUIActive(s.IsMatchFinished && s.IsPromote);
    }
  }
}
exports.RacingBetsFourDangoMatchInfo = RacingBetsFourDangoMatchInfo;
class RacingBetsFinalMatchInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Ek1 = undefined;
    this.Ik1 = undefined;
    this.dF1 = 2;
    this.Tk1 = [5, 6];
    this.bk1 = [11, 12];
    this.ifa = () => {
      return new RacingBetsDangoItemWithName();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIVerticalLayout], [14, UE.UIItem]];
  }
  OnStart() {
    this.Ek1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.ifa);
    this.Ik1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(13), this.ifa);
  }
  SetData(e) {
    var s = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(e);
    var i = [];
    var a = [];
    var r = s?.IsGroupMatchFinished() ?? false;
    if (s) {
      var o = this.GetTexture(1);
      let t = 0;
      if (r) {
        t = s.GetPromoteDangoList()[0];
        c = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(t)?.Icon ?? "";
        this.SetTextureShowUntilLoaded(c, o);
      }
      var h = [];
      for (const U of s.GetInGameDangoList()) {
        var n = {
          GroupMatchId: e,
          DangoId: U,
          IsMatchFinished: r,
          IsPromote: U === t,
          IsBasicGroupMatch: s.IsBasicGroupMatch()
        };
        h.push(n);
      }
      var c = h.length;
      if (c <= this.dF1) {
        i.push(...h);
      } else {
        o = Math.floor(c / this.dF1);
        i.push(...h.slice(0, o));
        a.push(...h.slice(o, c));
      }
    }
    var g = this.Tk1.length;
    var u = this.bk1.length;
    for (let t = i.length; t < g; ++t) {
      i.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: false,
        IsPromote: false,
        IsBasicGroupMatch: false
      });
    }
    for (let t = a.length; t < u; ++t) {
      a.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: false,
        IsPromote: false,
        IsBasicGroupMatch: false
      });
    }
    this.RefreshRoleLayout(i, this.Ek1);
    this.RefreshRoleLayout(a, this.Ik1);
    this.RefreshLine(i, this.Tk1);
    this.RefreshLine(a, this.bk1);
    this.GetItem(0).SetUIActive(r);
    this.GetSprite(2).SetUIActive(!r);
    this.GetTexture(4).SetUIActive(r);
    this.GetTexture(10).SetUIActive(r);
  }
  RefreshRoleLayout(t, e) {
    e?.RefreshByData(t);
  }
  RefreshLine(e, s) {
    for (let t = 0; t < s.length; ++t) {
      var i = e[t];
      var a = s[t];
      this.GetItem(a).SetUIActive(i.IsMatchFinished && i.IsPromote);
    }
  }
}
exports.RacingBetsFinalMatchInfo = RacingBetsFinalMatchInfo;
class RacingBetsDangoItemWithName extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UISprite], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem]];
  }
  Refresh(t, e, s) {
    this.RefreshItem(t);
  }
  RefreshItem(e) {
    var t = e.DangoId;
    var s = t !== 0;
    this.GetSprite(2).SetUIActive(!s);
    this.GetText(1).SetUIActive(s && e.IsBasicGroupMatch);
    var i = e.IsMatchFinished && !e.IsPromote;
    this.GetItem(7).SetUIActive(s && i);
    this.GetItem(6).SetUIActive(s && !i);
    if (s) {
      i = ConfigManager_1.ConfigManager.DangoConfig.GetDangoById(t);
      if (i) {
        var s = this.GetTexture(0);
        var a = this.GetTexture(5);
        this.SetTextureShowUntilLoaded(i.IconDamage, s);
        this.SetTextureShowUntilLoaded(i.IconDamage, a);
        var s = this.GetTexture(3);
        this.SetTextureShowUntilLoaded(i.IconAttack, s);
        var a = i.Name;
        this.GetText(1).ShowTextNew(a);
        let t = false;
        s = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().GetCurLegMatchData();
        if (t = s && (i = s.GetLegMatchState(), s.ParentGroupMatchData.Id === e.GroupMatchId) && i !== 4 && i !== 0 ? true : t) {
          this.SequencePlayer.PlayLevelSequenceByName("Hold");
        } else {
          this.SequencePlayer.PlayLevelSequenceByName("Reset");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "RacingBetsDangoItemWithName RefreshItem dangoConfig is null ", ["dangoId", t]);
      }
    } else {
      this.SequencePlayer.StopPlayingSequence();
    }
  }
}
//# sourceMappingURL=RacingBetsMatchInfoItem.js.map