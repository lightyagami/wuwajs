"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapFetterInfoItem = exports.RogueBattleMapFetterInfoDescItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
const bgColor = new Map([[true, "#D9CF86"], [false, "#9B9A96"]]);
const txtColor = new Map([[true, "#B8EB60"], [false, "#C4C4C4"]]);
const iconColor = new Map([[true, "#FDF6C6"], [false, "#C4C4C4"]]);
const descColor = new Map([[true, "#ECE5D8"], [false, "#ADADAD"]]);
class RogueBattleMapFetterInfoDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(e, t, r) {
    if (e.Param) {
      o = e.Param.split("#");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TextId, ...o);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TextId);
    }
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RogueBattleDefine_1.fetterTypeIconMap.get(e.EffectType));
    this.SetTextureByPath(o, this.GetTexture(0), undefined, () => {
      this.GetTexture(0).SetColor(UE.Color.FromHex(iconColor.get(e.IsReached)));
    });
    this.GetText(1).SetColor(UE.Color.FromHex(descColor.get(e.IsReached)));
  }
}
exports.RogueBattleMapFetterInfoDescItem = RogueBattleMapFetterInfoDescItem;
class RogueBattleMapFetterInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Gxt = undefined;
    this.Bqe = () => new RogueBattleMapFetterInfoDescItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem]];
  }
  OnStart() {
    this.Gxt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.Bqe);
  }
  OnBeforeDestroy() {
    this.Gxt = undefined;
  }
  Refresh(e, t, r) {
    var o;
    var i;
    var s;
    var a = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e.ConfigId);
    this.GetText(1)?.SetText("Lv." + e.Level);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RogueRes_Overall_Synergy_6", a.StarMap.get(e.Level));
    var n = [];
    let u = 0;
    for (const l of a.BattleEffect) {
      if (l[0] === e.Level) {
        o = {
          TextId: a.FightEffectDesc[u],
          Param: a.FightEffectDescParam[u],
          IsReached: e.IsReached,
          EffectType: 0
        };
        n.push(o);
      }
      u++;
    }
    u = 0;
    for (const c of a.ExploreEffect) {
      if (c[0] === e.Level) {
        i = {
          TextId: a.ExploreEffectDesc[u],
          Param: a.ExploreEffectDescParam[u],
          IsReached: e.IsReached,
          EffectType: 1
        };
        n.push(i);
      }
      u++;
    }
    for (const f of a.LinkEffect) {
      if (f[0] === e.Level) {
        s = {
          TextId: a.LinkEffectDesc.get(f[0]),
          Param: a.LinkEffectDescParam.get(f[0]),
          IsReached: e.IsReached,
          EffectType: 2
        };
        n.push(s);
      }
    }
    this.Gxt.RefreshByData(n);
    this.GetSprite(0).SetColor(UE.Color.FromHex(bgColor.get(e.IsReached)));
    this.GetText(2).SetColor(UE.Color.FromHex(txtColor.get(e.IsReached)));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    var r;
    if (e && !(e.length < 3)) {
      if ((r = e[2]) === "Star") {
        if (t = this.GetGuideUiItem("0")) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (r === "Item" && !(e.length < 4) && (t = Number(e[3]), r = this.Gxt?.GetItemByIndex(t - 1))) {
        return [r, r];
      } else {
        return undefined;
      }
    }
  }
}
exports.RogueBattleMapFetterInfoItem = RogueBattleMapFetterInfoItem;
//# sourceMappingURL=RogueBattleMapFetterItem.js.map