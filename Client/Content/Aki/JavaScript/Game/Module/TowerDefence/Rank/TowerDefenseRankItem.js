"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseRankItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FIRSTPLAYER_ICON = "FormationOnline1PIcon";
const SECONDPLAYER_ICON = "FormationOnline2PIcon";
const THIRDPLAYER_ICON = "FormationOnline3PIcon";
const getPosTexture = i => i === 0 ? FIRSTPLAYER_ICON : i === 1 ? SECONDPLAYER_ICON : THIRDPLAYER_ICON;
class RankGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.sft = undefined;
    this.rsc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  osc() {
    var i;
    var t = this.GetTexture(2);
    if (this.Pe) {
      t.SetUIActive(this.Pe.IsOnline);
      if (this.Pe.IsOnline) {
        i = getPosTexture(this.Pe.Pos);
        i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        this.SetTextureByPath(i, t);
      }
    } else {
      t.SetUIActive(false);
    }
  }
  ssc() {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(this.Pe.RoleSkinId);
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.RoleId);
    this.rsc ||= {
      Type: 2,
      Data: undefined
    };
    this.rsc.ItemConfigId = i.RoleId;
    this.rsc.SkinId = this.Pe.RoleSkinId;
    this.rsc.BottomTextId = "Text_LevelShow_Text";
    this.rsc.BottomTextParameter = [this.Pe.RoleLevel];
    this.rsc.ElementId = t.ElementId;
    this.sft.Apply(this.rsc);
  }
  Odc() {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefensePhantomById(this.Pe.PhantomId);
    var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(i.PhantomItemId);
    this.SetTextureByPath(i.IconMiddle, this.GetTexture(1));
  }
  Refresh(i, t, s) {
    i = !(this.Pe = i).IsEmpty;
    this.GetItem(3)?.SetUIActive(i);
    this.GetItem(4)?.SetUIActive(!i);
    if (i) {
      this.osc();
      this.ssc();
      this.Odc();
    }
  }
}
class OnlineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super();
    this.B9e = undefined;
    this.asc = false;
    this.asc = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  P5e() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.B9e.PlayerId;
    var t = this.GetText(1);
    if (this.asc && i) {
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
      t.SetText(i);
    } else {
      i = this.B9e.PlayerName;
      if (StringUtils_1.StringUtils.IsBlank(i)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "OnlineGymnasium_AnonymityName");
      } else {
        t.SetText(i);
      }
    }
  }
  osc() {
    var i = this.GetTexture(0);
    var t = getPosTexture(this.GridIndex);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, i);
  }
  Refresh(i, t, s) {
    this.B9e = i;
    this.P5e();
    this.osc();
  }
}
class TowerDefenseRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super();
    this.ParentModel = undefined;
    this.asc = false;
    this.hsc = undefined;
    this.lsc = undefined;
    this._sc = undefined;
    this.csc = () => new OnlineItem(this.asc);
    this.usc = () => new RankGridItem();
    this.asc = i;
  }
  OnRegisterComponent() {
    this.ParentModel = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIText], [8, UE.UILayoutBase], [9, UE.UIItem], [10, UE.UIItem]];
  }
  OnStart() {
    this.dsc();
    this.msc();
  }
  dsc() {
    this.hsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(5), this.csc, this.GetItem(6).GetOwner());
  }
  msc() {
    this.lsc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(8), this.usc, this.GetItem(9).GetOwner());
  }
  Oxt() {
    this.GetText(1).SetUIActive(false);
    this.GetText(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    this.hsc.GetRootUiItem()?.SetUIActive(false);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
    this.GetText(4).SetText(i);
    this.GetText(4).SetUIActive(true);
    this.GetText(7).SetUIActive(false);
    this.lsc.GetRootUiItem()?.SetUIActive(false);
    this.GetItem(10).SetUIActive(true);
    this.fsc();
  }
  fsc() {
    var i = !this.asc || this._sc.IsTopThree;
    this.GetTexture(0).SetUIActive(i);
    if (i) {
      i = this._sc.RankBg;
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      this.SetTextureByPath(i, this.GetTexture(0));
    }
  }
  gsc() {
    var i = this._sc.IsTopThree;
    var t = this.GetText(1);
    var s = this.GetText(2);
    t.SetUIActive(i);
    s.SetUIActive(!i && this._sc.IsInRank);
    this.GetItem(3).SetUIActive(!this._sc.IsInRank);
    if (i) {
      t.SetText(this._sc.Rank.toString());
      t.outlineColor = UE.Color.FromHex(this._sc.TopThreeNumColor);
    } else if (this._sc.IsInRank) {
      s.SetText(this._sc.Rank.toString());
    }
  }
  async RefreshPlayerName() {
    var i = this._sc.IsOnline;
    var t = this.GetText(4);
    t.SetUIActive(!i);
    this.hsc.GetRootUiItem()?.SetUIActive(i);
    if (i) {
      await this.hsc.RefreshByDataAsync(this._sc.GetPlayerNameList());
    } else if (this._sc.IsSelf && this.asc) {
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
      t.SetText(i);
    } else {
      i = this._sc.GetPlayerNameList()[0].PlayerName;
      if (StringUtils_1.StringUtils.IsBlank(i)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "OnlineGymnasium_AnonymityName");
      } else {
        t.SetText(i);
      }
    }
  }
  Csc() {
    this.GetText(7).SetUIActive(true);
    var i = this._sc.IsDifficult ? TimeUtil_1.TimeUtil.GetTimeDataFormat(this._sc.PassScore) : this._sc.PassScore.toString();
    this.GetText(7).SetText(i);
  }
  async psc() {
    this.GetItem(10).SetUIActive(false);
    this.lsc.GetRootUiItem()?.SetUIActive(true);
    await this.lsc.RefreshByDataAsync(this._sc.RoleDataList);
  }
  Refresh(i) {
    if ((this._sc = i).IsEmpty) {
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
    return this._sc.IsSelfInData;
  }
}
exports.TowerDefenseRankItem = TowerDefenseRankItem;
//# sourceMappingURL=TowerDefenseRankItem.js.map