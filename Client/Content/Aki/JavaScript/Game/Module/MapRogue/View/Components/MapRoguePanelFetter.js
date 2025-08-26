"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRoguePanelFetter = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RogueBattleDefine_1 = require("../../../RogueBattle/RogueBattleDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MapRogueFetterStarLvItem_1 = require("./MapRogueFetterStarLvItem");
const FETTER_DISPLAY_NUM = 5;
class MapRoguePanelFetter extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.FetterLayout = undefined;
    this.CheckCanOpenMenu = undefined;
    this.qo1 = true;
    this.oWi = () => {
      var e = new FetterItem();
      e.OpenMenuFunc = this.IQ1;
      return e;
    };
    this.Tp1 = () => {
      if (!this.CheckCanOpenMenu || !!this.CheckCanOpenMenu()) {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView();
      }
    };
    this.f0t = e => {
      if (e === "Close") {
        this.GetVerticalLayout(0).RootUIComp.SetUIActive(this.qo1);
        this.GetButton(2).RootUIComp.SetUIActive(this.qo1);
      }
    };
    this.cvu = () => {
      this.qo1 = !this.qo1;
      this.TE1();
      this.GetVerticalLayout(0).RootUIComp.SetUIActive(true);
      this.GetButton(2).RootUIComp.SetUIActive(true);
      if (this.qo1) {
        this.LevelSequencePlayer.PlayOrReplaySequenceByName("Start");
      } else {
        this.LevelSequencePlayer.PlayOrReplaySequenceByName("Close");
      }
    };
    this.IQ1 = e => {
      if (!!e.NewRoleBondInfo.v9n && (!this.CheckCanOpenMenu || !!this.CheckCanOpenMenu())) {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView(e.NewRoleBondInfo.v9n);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIExtendToggle], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.Tp1], [3, this.cvu]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.f0t);
    this.FetterLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.oWi);
    this.TE1();
  }
  OnBeforeShow() {
    this.RefreshFetter();
  }
  RefreshFetter() {
    var e = [];
    for (const i of ModelManager_1.ModelManager.RogueBattleModel.GetAllOwnedRoleBondData()) {
      var t = {
        NewRoleBondInfo: i,
        OldRoleBondInfo: i,
        AddStar: 0
      };
      e.push(t);
    }
    this.FetterLayout.RefreshByData(e.sort(RogueBattleDefine_1.sortRogueBattleRoleBondUpdateInfo).slice(0, FETTER_DISPLAY_NUM));
  }
  TE1() {
    var e = this.qo1 ? "RogueRes_BondMain_Open" : "RogueRes_BondMain_Close";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  SetToggleVisible(e) {
    this.GetExtendToggle(3).RootUIComp.SetUIActive(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && (e = this.FetterLayout?.GetGridByDisplayIndex(0))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.MapRoguePanelFetter = MapRoguePanelFetter;
class FetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.StarLvLayout = undefined;
    this.OpenMenuFunc = undefined;
    this.oWi = () => {
      return new MapRogueFetterStarLvItem_1.MapRogueFetterStarLvItem();
    };
    this.Tp1 = () => {
      this.OpenMenuFunc?.(this.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.Tp1]];
  }
  OnStart() {
    this.StarLvLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.oWi);
  }
  Refresh(e, t, i) {
    var r = (this.Data = e).NewRoleBondInfo;
    var e = this.GetTexture(2);
    var s = this.GetText(6);
    var o = this.GetText(3);
    var a = this.GetSprite(1);
    if (r.v9n === 0) {
      e.SetUIActive(false);
      s.SetUIActive(false);
    } else {
      var h = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(r.v9n);
      var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(r.F6n);
      if (h && n) {
        this.SetTextureShowUntilLoaded(h.Icon, e);
        e.SetChangeColor(r.F6n === 0, e.changeColor);
        var e = UE.Color.FromHex(n.LvColor);
        a.SetColor(e);
        a.SetUIActive(r.F6n > 0);
        o.SetChangeColor(r.F6n === 0, o.changeColor);
        LguiUtil_1.LguiUtil.SetLocalTextNew(o, h.Name);
        s.SetText(r.Whc.toString());
        s.SetUIActive(true);
        var l = [];
        var n = Array.from(h.StarMap.entries()).sort((e, t) => e[0] - t[0]);
        if (n.length > 0) {
          var u;
          var _;
          var g = n.at(-1)[0];
          for ([u, _] of n) {
            var d = {
              StageLv: u,
              StageStarLv: _,
              CurrentLv: r.F6n,
              MaxLv: g
            };
            l.push(d);
          }
          this.StarLvLayout.RefreshByData(l, undefined, true);
        } else {
          this.StarLvLayout.SetActive(false);
        }
      }
    }
  }
  SetButtonActive(e) {
    this.GetButton(0).SetSelfInteractive(e);
  }
}
//# sourceMappingURL=MapRoguePanelFetter.js.map