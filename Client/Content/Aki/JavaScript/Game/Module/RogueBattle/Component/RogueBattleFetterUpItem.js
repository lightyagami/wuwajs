"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFetterUpItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MapRogueFetterStarLvItem_1 = require("../../MapRogue/View/Components/MapRogueFetterStarLvItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleFetterUpItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.TDe = undefined;
    this.LevelSequencePlayer = undefined;
    this.Pe = undefined;
    this.Spu = undefined;
    this.oWi = () => {
      return new MapRogueFetterStarLvItem_1.MapRogueFetterStarLvItem();
    };
    this.nlo = () => {
      var e = this.Pe?.OldRoleBondInfo.v9n;
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIHorizontalLayout], [8, UE.UIItem]];
    this.BtnBindInfo = [[6, this.nlo]];
  }
  OnStart() {
    this.Spu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.oWi);
  }
  Refresh(e, t, r) {
    var i = (this.Pe = e).NewRoleBondInfo;
    var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(i.v9n);
    var o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(i.F6n);
    if (e && o) {
      var s = this.GetTexture(1);
      this.SetTextureShowUntilLoaded(e.Icon, s);
      s.SetChangeColor(i.F6n === 0, s.changeColor);
      var s = this.GetSprite(0);
      var o = UE.Color.FromHex(o.LvColor);
      s.SetColor(o);
      s.SetUIActive(i.F6n > 0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "RogueRes_FightFormation_RoleLevel", i.F6n);
      this.GetText(5).SetText(i.Whc.toString());
      var a = [];
      var o = Array.from(e.StarMap.entries()).sort((e, t) => e[0] - t[0]);
      if (o.length > 0) {
        var n;
        var u;
        var h = o.at(-1)[0];
        for ([n, u] of o) {
          var l = {
            StageLv: n,
            StageStarLv: u,
            CurrentLv: i.F6n,
            MaxLv: h
          };
          a.push(l);
        }
        this.Spu.RefreshByData(a, undefined, true);
      } else {
        this.Spu.SetActive(false);
      }
      this.GetItem(4).SetUIActive(false);
    }
  }
  async OnBeforeStartAsync() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    return super.OnBeforeStartAsync();
  }
  OnBeforeHide() {
    this.RemoveTimer();
  }
  PlayExpAnimation() {
    if (this.Pe?.OldRoleBondInfo.ef1 !== 0) {
      this.RemoveTimer();
    }
  }
  RemoveTimer() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.RogueBattleFetterUpItem = RogueBattleFetterUpItem;
//# sourceMappingURL=RogueBattleFetterUpItem.js.map