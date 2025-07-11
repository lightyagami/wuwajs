"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFetterInfoItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ANIM_TIME = 200;
class RogueBattleFetterInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dR1 = undefined;
    this.Pe = undefined;
    this._31 = 0;
    this.jYe = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView(this.Pe?.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[9, this.jYe]];
  }
  Refresh(t, e, i) {
    var r;
    var s = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t.Id);
    this.Pe = t;
    if (s && (r = t.AddStar + s.Whc >= s.ef1 && s.ef1 !== 0, this.GetItem(8).SetUIActive(r), this.GetItem(10).SetUIActive(r), this.GetText(1).SetText("" + (s.F6n + 1)), s.ef1 === 0 ? (this.GetSprite(4).SetFillAmount(1), this.GetSprite(5).SetFillAmount(1), this._31 = 1, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RogueBattleFetterUpItem_ExpMaxLevel"), this.GetText(3)?.SetUIActive(false)) : (this.GetSprite(4).SetFillAmount(s.Whc / s.ef1), this.GetSprite(5).SetFillAmount(s.Whc / s.ef1), this._31 = (s.Whc + t.AddStar) / s.ef1, this.GetText(3)?.SetUIActive(true), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RogueBattle_FetterInfo_Exp", (s.Whc + t.AddStar).toString(), s.ef1.toString()), this.PlayExpChangeAnim()), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RogueRes_FightFormation_RoleLevel", s.F6n), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "RogueBattle_FetterInfo_Exp_AddLevel", t.AddStar.toString()), r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t.Id))) {
      this.SetTextureShowUntilLoaded(r.Icon, this.GetTexture(7));
    }
  }
  OnBeforeHide() {
    this.mR1();
  }
  PlayExpChangeAnim() {
    this.mR1();
    var t = this.GetSprite(5).GetFillAmount();
    const i = Math.abs(this._31 - t) / ANIM_TIME;
    this.dR1 = TimerSystem_1.GameplayTimerSystem.Forever(t => {
      var e = this.GetSprite(5).GetFillAmount();
      if (Math.abs(e - this._31) < 0.01) {
        this.mR1();
      } else {
        e += i * t;
        this.GetSprite(5).SetFillAmount(e);
      }
    }, TimerSystem_1.MIN_TIME);
  }
  mR1() {
    if (this.dR1) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.dR1);
      this.dR1 = undefined;
    }
  }
}
exports.RogueBattleFetterInfoItem = RogueBattleFetterInfoItem;
//# sourceMappingURL=RogueBattleFetterInfoItem.js.map