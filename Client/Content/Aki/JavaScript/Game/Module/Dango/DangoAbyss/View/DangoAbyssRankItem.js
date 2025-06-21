"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssRankItem = exports.DangoRankItemData = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AbyssDangoCircleQulityItem_1 = require("./AbyssDangoCircleQulityItem"),
  FIRSTPLAYER_ICON = "FormationOnline1PIcon",
  SECONDPLAYER_ICON = "FormationOnline2PIcon",
  THIRDPLAYER_ICON = "FormationOnline3PIcon",
  getPosTexture = t => 0 === t ? FIRSTPLAYER_ICON : 1 === t ? SECONDPLAYER_ICON : THIRDPLAYER_ICON;
class DangoRankItemData {
  constructor() {
    this.AbyssChallengeInfo = void 0
  }
}
exports.DangoRankItemData = DangoRankItemData;
class DangoAbyssRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(), this.asc = !1, this.eN1 = !1, this._sc = void 0, this.hsc = void 0, this.lsc = void 0, this.csc = () => new OnlineItem(this.asc), this.usc = () => new RankRoleGridItem, this.asc = t
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UILayoutBase],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UILayoutBase],
      [8, UE.UIItem],
      [9, UE.UIItem]
    ]
  }
  OnStart() {
    this.dsc(), this.msc()
  }
  dsc() {
    this.hsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(4), this.csc, this.GetItem(5).GetOwner())
  }
  msc() {
    this.lsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(7), this.usc, this.GetItem(8).GetOwner())
  }
  Oxt() {
    this.GetText(1).SetUIActive(!1), this.GetItem(2).SetUIActive(!0), this.hsc.GetRootUiItem()?.SetUIActive(!1);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
    this.GetText(3).SetText(t), this.GetText(3).SetUIActive(!0), this.GetText(6).SetUIActive(!1), this.lsc.GetRootUiItem()?.SetUIActive(!1), this.GetItem(9).SetUIActive(!0), this.fsc()
  }
  fsc() {
    this.GetTexture(0).SetUIActive(!0);
    var t = this.eN1 ? this._sc.AbyssChallengeInfo.RankBg : "T_AnniversaryCelebrationRankOwnBg",
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, this.GetTexture(0))
  }
  gsc() {
    var t = this.GetText(1);
    t.SetUIActive(!0), this.GetItem(2).SetUIActive(!this._sc.AbyssChallengeInfo.IsInRank), t.SetText(this._sc.AbyssChallengeInfo.Rank.toString())
  }
  Csc() {
    var t, i;
    this.GetText(6).SetUIActive(!0), ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(this._sc.AbyssChallengeInfo.GetChallengeId()).IsEndless ? 100 === (i = this._sc.AbyssChallengeInfo.GetProgress()) ? (t = TimeUtil_1.TimeUtil.GetTimeDataFormat(this._sc.AbyssChallengeInfo.GetPassTime()), this.GetText(6).SetText(t)) : (t = i + "%", this.GetText(6).SetText(t)) : (i = TimeUtil_1.TimeUtil.GetTimeDataFormat(this._sc.AbyssChallengeInfo.GetPassTime()), this.GetText(6).SetText(i))
  }
  async RefreshPlayerName() {
    var i, t = !this._sc.AbyssChallengeInfo.GetIsSingle(),
      s = this.GetText(3);
    if (s.SetUIActive(!t), this.hsc.GetRootUiItem()?.SetUIActive(t), t) {
      var e, r, h = [];
      for ([e, r] of this._sc.AbyssChallengeInfo.GetPlayerNameMap()) {
        var a = new OnlineData;
        a.PlayerId = e, a.PlayerName = r, h.push(a)
      }
      await this.hsc.RefreshByDataAsync(h)
    } else if (this._sc.AbyssChallengeInfo.IsSelf && this.asc) t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "", s.SetText(t);
    else {
      let t = "";
      for ([, i] of this._sc.AbyssChallengeInfo.GetPlayerNameMap()) {
        t = i;
        break
      }
      StringUtils_1.StringUtils.IsBlank(t) ? LguiUtil_1.LguiUtil.SetLocalTextNew(s, "OnlineGymnasium_AnonymityName") : s.SetText(t)
    }
  }
  async psc() {
    this.GetItem(9).SetUIActive(!1), this.lsc.GetRootUiItem()?.SetUIActive(!0);
    var t = this._sc.AbyssChallengeInfo.GetDangoAbyssRankRoleData();
    await this.lsc.RefreshByDataAsync(t)
  }
  Refresh(t, i = 0, s, e = !0) {
    this.eN1 = e, (this._sc = t).AbyssChallengeInfo.IsEmpty ? this.Oxt() : (this.fsc(), this.gsc(), this.RefreshPlayerName(), this.Csc(), this.psc())
  }
  IsSelfItem() {
    return this._sc.AbyssChallengeInfo.IsSelfInData
  }
}
exports.DangoAbyssRankItem = DangoAbyssRankItem;
class RankRoleGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.sft = void 0, this.rsc = void 0, this.hUc = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.sft = new SmallItemGrid_1.SmallItemGrid, await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.hUc = new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem, await this.hUc.CreateByActorAsync(this.GetItem(3).GetOwner())
  }
  osc() {
    var t, i = this.GetTexture(2);
    !this.Pe.IsEmpty && this.Pe ? (i.SetUIActive(this.Pe.IsOnline), this.Pe.IsOnline && (t = getPosTexture(this.Pe.Pos), t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t), this.SetTextureByPath(t, i))) : i.SetUIActive(!1)
  }
  ssc() {
    var t, i;
    this.Pe.IsEmpty ? this.sft.SetActive(!1) : (this.sft.SetActive(!0), t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(this.Pe.RoleSkinId), i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId), this.rsc || (this.rsc = {
      Type: 2,
      Data: void 0
    }), this.rsc.ItemConfigId = t.RoleId, this.rsc.SkinId = this.Pe.RoleSkinId, this.rsc.BottomTextId = "Text_LevelShow_Text", this.rsc.BottomTextParameter = [this.Pe.RoleLevel], this.rsc.ElementId = i.ElementId, this.sft.Apply(this.rsc))
  }
  vUc() {
    var t;
    !this.Pe.IsEmpty && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(this.Pe.DangoId)?.GetFormationIcon() ?? "") ? (this.GetTexture(1).SetUIActive(!0), this.SetTextureByPath(t, this.GetTexture(1))) : this.GetTexture(1).SetUIActive(!1)
  }
  Pb1() {
    var t, i;
    this.Pe.IsEmpty ? this.hUc.SetActive(!1) : (t = this.Pe.GetEquipPluginMap(), (i = new AbyssDangoCircleQulityItem_1.DangoCircleQualityData).PluginIdMap = t, this.hUc.RefreshData(i), this.hUc.SetActive(!0))
  }
  Refresh(t, i, s) {
    this.Pe = t, this.osc(), this.ssc(), this.vUc(), this.Pb1()
  }
}
class OnlineData {
  constructor() {
    this.PlayerId = 0, this.PlayerName = ""
  }
}
class OnlineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(), this.Pe = void 0, this.asc = !1, this.asc = t
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText]
    ]
  }
  P5e() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.Pe.PlayerId,
      i = this.GetText(1);
    this.asc && t ? (t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "", i.SetText(t)) : (t = this.Pe.PlayerName, StringUtils_1.StringUtils.IsBlank(t) ? LguiUtil_1.LguiUtil.SetLocalTextNew(i, "OnlineGymnasium_AnonymityName") : i.SetText(t))
  }
  osc() {
    var t = this.GetTexture(0),
      i = getPosTexture(this.GridIndex),
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(i, t)
  }
  Refresh(t, i, s) {
    this.Pe = t, this.P5e(), this.osc()
  }
}
//# sourceMappingURL=DangoAbyssRankItem.js.map