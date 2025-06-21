"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TowerDefenseRankItem = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  FIRSTPLAYER_ICON = "FormationOnline1PIcon",
  SECONDPLAYER_ICON = "FormationOnline2PIcon",
  THIRDPLAYER_ICON = "FormationOnline3PIcon",
  getPosTexture = i => 0 === i ? FIRSTPLAYER_ICON : 1 === i ? SECONDPLAYER_ICON : THIRDPLAYER_ICON;
class RankGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.sft = void 0, this.rsc = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.sft = new SmallItemGrid_1.SmallItemGrid, await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  osc() {
    var i, t = this.GetTexture(2);
    this.Pe ? (t.SetUIActive(this.Pe.IsOnline), this.Pe.IsOnline && (i = getPosTexture(this.Pe.Pos), i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i), this.SetTextureByPath(i, t))) : t.SetUIActive(!1)
  }
  ssc() {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(this.Pe.RoleSkinId),
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.RoleId);
    this.rsc || (this.rsc = {
      Type: 2,
      Data: void 0
    }), this.rsc.ItemConfigId = i.RoleId, this.rsc.SkinId = this.Pe.RoleSkinId, this.rsc.BottomTextId = "Text_LevelShow_Text", this.rsc.BottomTextParameter = [this.Pe.RoleLevel], this.rsc.ElementId = t.ElementId, this.sft.Apply(this.rsc)
  }
  Odc() {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefensePhantomById(this.Pe.PhantomId),
      i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(i.PhantomItemId);
    this.SetTextureByPath(i.IconMiddle, this.GetTexture(1))
  }
  Refresh(i, t, s) {
    i = !(this.Pe = i).IsEmpty;
    this.GetItem(3)?.SetUIActive(i), this.GetItem(4)?.SetUIActive(!i), i && (this.osc(), this.ssc(), this.Odc())
  }
}
class OnlineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(), this.B9e = void 0, this.asc = !1, this.asc = i
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText]
    ]
  }
  P5e() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.B9e.PlayerId,
      t = this.GetText(1);
    this.asc && i ? (i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "", t.SetText(i)) : (i = this.B9e.PlayerName, StringUtils_1.StringUtils.IsBlank(i) ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, "OnlineGymnasium_AnonymityName") : t.SetText(i))
  }
  osc() {
    var i = this.GetTexture(0),
      t = getPosTexture(this.GridIndex),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, i)
  }
  Refresh(i, t, s) {
    this.B9e = i, this.P5e(), this.osc()
  }
}
class TowerDefenseRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(), this.ParentModel = void 0, this.asc = !1, this.hsc = void 0, this.lsc = void 0, this._sc = void 0, this.csc = () => new OnlineItem(this.asc), this.usc = () => new RankGridItem, this.asc = i
  }
  OnRegisterComponent() {
    this.ParentModel = this.OpenParam, this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UILayoutBase],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UILayoutBase],
      [9, UE.UIItem],
      [10, UE.UIItem]
    ]
  }
  OnStart() {
    this.dsc(), this.msc()
  }
  dsc() {
    this.hsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(5), this.csc, this.GetItem(6).GetOwner())
  }
  msc() {
    this.lsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(8), this.usc, this.GetItem(9).GetOwner())
  }
  Oxt() {
    this.GetText(1).SetUIActive(!1), this.GetText(2).SetUIActive(!1), this.GetItem(3).SetUIActive(!0), this.hsc.GetRootUiItem()?.SetUIActive(!1);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
    this.GetText(4).SetText(i), this.GetText(4).SetUIActive(!0), this.GetText(7).SetUIActive(!1), this.lsc.GetRootUiItem()?.SetUIActive(!1), this.GetItem(10).SetUIActive(!0), this.fsc()
  }
  fsc() {
    var i = !this.asc || this._sc.IsTopThree;
    this.GetTexture(0).SetUIActive(i), i && (i = this._sc.RankBg, i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i), this.SetTextureByPath(i, this.GetTexture(0)))
  }
  gsc() {
    var i = this._sc.IsTopThree,
      t = this.GetText(1),
      s = this.GetText(2);
    t.SetUIActive(i), s.SetUIActive(!i && this._sc.IsInRank), this.GetItem(3).SetUIActive(!this._sc.IsInRank), i ? (t.SetText(this._sc.Rank.toString()), t.outlineColor = UE.Color.FromHex(this._sc.TopThreeNumColor)) : this._sc.IsInRank && s.SetText(this._sc.Rank.toString())
  }
  async RefreshPlayerName() {
    var i = this._sc.IsOnline,
      t = this.GetText(4);
    t.SetUIActive(!i), this.hsc.GetRootUiItem()?.SetUIActive(i), i ? await this.hsc.RefreshByDataAsync(this._sc.GetPlayerNameList()) : this._sc.IsSelf && this.asc ? (i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "", t.SetText(i)) : (i = this._sc.GetPlayerNameList()[0].PlayerName, StringUtils_1.StringUtils.IsBlank(i) ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, "OnlineGymnasium_AnonymityName") : t.SetText(i))
  }
  Csc() {
    this.GetText(7).SetUIActive(!0);
    var i = this._sc.IsDifficult ? TimeUtil_1.TimeUtil.GetTimeDataFormat(this._sc.PassScore) : this._sc.PassScore.toString();
    this.GetText(7).SetText(i)
  }
  async psc() {
    this.GetItem(10).SetUIActive(!1), this.lsc.GetRootUiItem()?.SetUIActive(!0), await this.lsc.RefreshByDataAsync(this._sc.RoleDataList)
  }
  Refresh(i) {
    (this._sc = i).IsEmpty ? this.Oxt() : (this.fsc(), this.gsc(), this.RefreshPlayerName(), this.Csc(), this.psc())
  }
  IsSelfItem() {
    return this._sc.IsSelfInData
  }
}
exports.TowerDefenseRankItem = TowerDefenseRankItem;
//# sourceMappingURL=TowerDefenseRankItem.js.map