"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssRankItem = exports.DangoRankItemData = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AbyssDangoCircleQulityItem_1 = require("./AbyssDangoCircleQulityItem");
const FIRSTPLAYER_ICON = "FormationOnline1PIcon";
const SECONDPLAYER_ICON = "FormationOnline2PIcon";
const THIRDPLAYER_ICON = "FormationOnline3PIcon";
const getPosTexture = t => t === 0 ? FIRSTPLAYER_ICON : t === 1 ? SECONDPLAYER_ICON : THIRDPLAYER_ICON;
class DangoRankItemData {
  constructor() {
    this.AbyssChallengeInfo = undefined;
  }
}
exports.DangoRankItemData = DangoRankItemData;
class DangoAbyssRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.asc = false;
    this.PN1 = false;
    this._sc = undefined;
    this.hsc = undefined;
    this.lsc = undefined;
    this.csc = () => new OnlineItem(this.asc);
    this.usc = () => new RankRoleGridItem();
    this.asc = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UILayoutBase], [5, UE.UIItem], [6, UE.UIText], [7, UE.UILayoutBase], [8, UE.UIItem], [9, UE.UIItem]];
  }
  OnStart() {
    this.dsc();
    this.msc();
  }
  dsc() {
    this.hsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(4), this.csc, this.GetItem(5).GetOwner());
  }
  msc() {
    this.lsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(7), this.usc, this.GetItem(8).GetOwner());
  }
  Oxt() {
    this.GetText(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(true);
    this.hsc.GetRootUiItem()?.SetUIActive(false);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
    this.GetText(3).SetText(t);
    this.GetText(3).SetUIActive(true);
    this.GetText(6).SetUIActive(false);
    this.lsc.GetRootUiItem()?.SetUIActive(false);
    this.GetItem(9).SetUIActive(true);
    this.fsc();
  }
  fsc() {
    this.GetTexture(0).SetUIActive(true);
    var t = this.PN1 ? this._sc.AbyssChallengeInfo.RankBg : "T_AnniversaryCelebrationRankOwnBg";
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, this.GetTexture(0));
  }
  gsc() {
    var t = this.GetText(1);
    t.SetUIActive(true);
    this.GetItem(2).SetUIActive(!this._sc.AbyssChallengeInfo.IsInRank);
    t.SetText(this._sc.AbyssChallengeInfo.Rank.toString());
  }
  Csc() {
    var t;
    var i;
    this.GetText(6).SetUIActive(true);
    if (ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(this._sc.AbyssChallengeInfo.GetChallengeId()).IsEndless) {
      if ((i = this._sc.AbyssChallengeInfo.GetProgress()) === 100) {
        t = TimeUtil_1.TimeUtil.GetTimeDataFormat(this._sc.AbyssChallengeInfo.GetPassTime());
        this.GetText(6).SetText(t);
      } else {
        t = i + "%";
        this.GetText(6).SetText(t);
      }
    } else {
      i = TimeUtil_1.TimeUtil.GetTimeDataFormat(this._sc.AbyssChallengeInfo.GetPassTime());
      this.GetText(6).SetText(i);
    }
  }
  async RefreshPlayerName() {
    var i;
    var t = !this._sc.AbyssChallengeInfo.GetIsSingle();
    var s = this.GetText(3);
    s.SetUIActive(!t);
    this.hsc.GetRootUiItem()?.SetUIActive(t);
    if (t) {
      var e;
      var r;
      var h = [];
      for ([e, r] of this._sc.AbyssChallengeInfo.GetPlayerNameMap()) {
        var a = new OnlineData();
        a.PlayerId = e;
        a.PlayerName = r;
        h.push(a);
      }
      await this.hsc.RefreshByDataAsync(h);
    } else if (this._sc.AbyssChallengeInfo.IsSelf && this.asc) {
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
      s.SetText(t);
    } else {
      let t = "";
      for ([, i] of this._sc.AbyssChallengeInfo.GetPlayerNameMap()) {
        t = i;
        break;
      }
      if (StringUtils_1.StringUtils.IsBlank(t)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, "OnlineGymnasium_AnonymityName");
      } else {
        s.SetText(t);
      }
    }
  }
  async psc() {
    this.GetItem(9).SetUIActive(false);
    this.lsc.GetRootUiItem()?.SetUIActive(true);
    var t = this._sc.AbyssChallengeInfo.GetDangoAbyssRankRoleData();
    await this.lsc.RefreshByDataAsync(t);
  }
  Refresh(t, i = 0, s, e = true) {
    this.PN1 = e;
    if ((this._sc = t).AbyssChallengeInfo.IsEmpty) {
      this.Oxt();
    } else {
      this.fsc();
      this.gsc();
      this.RefreshPlayerName();
      this.Csc();
      this.psc();
    }
  }
  IsSelfItem() {
    return this._sc.AbyssChallengeInfo.IsSelfInData;
  }
}
exports.DangoAbyssRankItem = DangoAbyssRankItem;
class RankRoleGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.sft = undefined;
    this.rsc = undefined;
    this.hUc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.hUc = new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem();
    await this.hUc.CreateByActorAsync(this.GetItem(3).GetOwner());
  }
  osc() {
    var t;
    var i = this.GetTexture(2);
    if (!this.Pe.IsEmpty && this.Pe) {
      i.SetUIActive(this.Pe.IsOnline);
      if (this.Pe.IsOnline) {
        t = getPosTexture(this.Pe.Pos);
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
        this.SetTextureByPath(t, i);
      }
    } else {
      i.SetUIActive(false);
    }
  }
  ssc() {
    var t;
    var i;
    if (this.Pe.IsEmpty) {
      this.sft.SetActive(false);
    } else {
      this.sft.SetActive(true);
      t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(this.Pe.RoleSkinId);
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId);
      this.rsc ||= {
        Type: 2,
        Data: undefined
      };
      this.rsc.ItemConfigId = t.RoleId;
      this.rsc.SkinId = this.Pe.RoleSkinId;
      this.rsc.BottomTextId = "Text_LevelShow_Text";
      this.rsc.BottomTextParameter = [this.Pe.RoleLevel];
      this.rsc.ElementId = i.ElementId;
      this.sft.Apply(this.rsc);
    }
  }
  vUc() {
    var t;
    if (!this.Pe.IsEmpty && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(this.Pe.DangoId)?.GetFormationIcon() ?? "")) {
      this.GetTexture(1).SetUIActive(true);
      this.SetTextureByPath(t, this.GetTexture(1));
    } else {
      this.GetTexture(1).SetUIActive(false);
    }
  }
  rR1() {
    var t;
    var i;
    if (this.Pe.IsEmpty) {
      this.hUc.SetActive(false);
    } else {
      t = this.Pe.GetEquipPluginMap();
      (i = new AbyssDangoCircleQulityItem_1.DangoCircleQualityData()).PluginIdMap = t;
      this.hUc.RefreshData(i);
      this.hUc.SetActive(true);
    }
  }
  Refresh(t, i, s) {
    this.Pe = t;
    this.osc();
    this.ssc();
    this.vUc();
    this.rR1();
  }
}
class OnlineData {
  constructor() {
    this.PlayerId = 0;
    this.PlayerName = "";
  }
}
class OnlineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.asc = false;
    this.asc = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  P5e() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.Pe.PlayerId;
    var i = this.GetText(1);
    if (this.asc && t) {
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
      i.SetText(t);
    } else {
      t = this.Pe.PlayerName;
      if (StringUtils_1.StringUtils.IsBlank(t)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "OnlineGymnasium_AnonymityName");
      } else {
        i.SetText(t);
      }
    }
  }
  osc() {
    var t = this.GetTexture(0);
    var i = getPosTexture(this.GridIndex);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(i, t);
  }
  Refresh(t, i, s) {
    this.Pe = t;
    this.P5e();
    this.osc();
  }
}
//# sourceMappingURL=DangoAbyssRankItem.js.map