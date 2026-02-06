"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRankItem = undefined;
const UE = require("ue");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const MotorFightItemSmallGrid_1 = require("./MotorFightItemSmallGrid");
const rankLightBgList = ["/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemBgGold.T_ItemBgGold", "/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemBgSliver.T_ItemBgSliver", "/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemBgCopper.T_ItemBgCopper"];
const rankBgList = ["/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemRankRoleBg1.T_ItemRankRoleBg1", "/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemRankRoleBg2.T_ItemRankRoleBg2", "/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemRankRoleBg3.T_ItemRankRoleBg3", "/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Rank/RankList/T_ItemRankRoleBg4.T_ItemRankRoleBg4"];
const rankNumberColor = ["f3eba1", "dfe9f1", "f6e1c7", "bfbfbf"];
class MotorFightRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Bqe = () => {
      return new MotorFightItemSmallGrid_1.MotorFightItemSmallGrid();
    };
    this.dxl = () => {
      UiManager_1.UiManager.OpenView("MotorFightRankDetailView", this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIArtText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UITexture]];
    this.BtnBindInfo = [[8, this.dxl]];
  }
  Refresh(t, i, e) {
    this.Pe = t;
    if (e !== -1 && e < 3) {
      this.SetTextureByPath(rankLightBgList[e], this.GetTexture(0));
      this.SetTextureByPath(rankBgList[e], this.GetTexture(1));
      this.GetArtText(2)?.SetColor(UE.Color.FromHex(rankNumberColor[e]));
    } else {
      this.GetTexture(0)?.SetUIActive(false);
      this.SetTextureByPath(rankBgList[3], this.GetTexture(1));
      this.GetArtText(2)?.SetColor(UE.Color.FromHex(rankNumberColor[3]));
    }
    this.SetTextureByPath(t.TexturePath, this.GetTexture(3));
    this.SetTextureByPath(t.TexturePath, this.GetTexture(10));
    this.GetText(4)?.SetText(t.Name);
    this.GetText(5)?.SetText(t.Score.toString());
    this.GetButton(8)?.RootUIComp.SetUIActive(t.HasData);
    if (t.HasData) {
      e = e + 1;
      this.GetArtText(2)?.SetText(e / 10 < 1 ? "0" + e : "" + e);
      new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Bqe).RefreshByData(t.ItemList);
      this.GetText(9)?.SetUIActive(t.ItemList.length === 0);
    } else {
      this.GetArtText(2)?.SetText("--");
      this.GetScrollViewWithScrollbar(6)?.RootUIComp?.SetUIActive(false);
      this.GetText(9)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "MotorFightGame_RankingInfo_01");
    }
  }
}
exports.MotorFightRankItem = MotorFightRankItem;
//# sourceMappingURL=MotorFightRankItem.js.map