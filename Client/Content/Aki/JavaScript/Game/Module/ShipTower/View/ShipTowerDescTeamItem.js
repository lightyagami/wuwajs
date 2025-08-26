"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerDescTeamItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerRoleItem_1 = require("./ShipTowerRoleItem");
const ShipTowerWordItem_1 = require("./ShipTowerWordItem");
class ShipTowerDescTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.tFe = undefined;
    this.GG_ = undefined;
    this.fDo = undefined;
    this.RoleClickCallBack = undefined;
    this.BuffClickCallBack = undefined;
    this.MechanismClickCallBack = undefined;
    this.ks_ = () => {
      this.MechanismClickCallBack?.(this.fGt);
    };
    this.IA_ = () => {
      this.RoleClickCallBack?.(this.fGt);
    };
    this.Os_ = () => {
      this.fDo.SetSelected(false, true);
      this.BuffClickCallBack?.(this.fGt);
    };
    this.uyi = () => {
      return new ShipTowerRoleItem_1.ShipTowerRoleItem();
    };
    this.KHe = () => {
      return new ShipTowerWordItem_1.ShipTowerWordItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIVerticalLayout], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UIExtendToggle], [14, UE.UIMultiTemplateLayout], [13, UE.UIText], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ks_], [12, this.IA_]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetHorizontalLayout(10);
    var i = this.GetMultiTemplateLayout(14);
    var t = this.GetItem(15).GetOwner();
    this.tFe = new GenericLayout_1.GenericLayout(e, this.uyi);
    this.GG_ = new GenericLayout_1.GenericLayout(i, this.KHe, t);
    this.fDo = new SmallItemGrid_1.SmallItemGrid();
    this.fDo.Initialize(this.GetItem(11).GetOwner());
    this.fDo.BindOnExtendToggleClicked(this.Os_);
    this.fDo.BindEmptySlotButtonCallback(this.Os_);
    this.fDo.BindOnCanExecuteChange(() => false);
    this.GetExtendToggle(12).bLockStateOnSelect = true;
    this.SetTeamToggleIsSelect(false);
  }
  OnBeforeCreate() {}
  OnStart() {}
  OnBeforeDestroy() {}
  Refresh(e) {
    var i = (this.fGt = e).GetInstanceDungeonCfg();
    var t = e.GetShipTowerStageCfg();
    var r = ModelManager_1.ModelManager.ShipTowerModel.GetRecommendLevelByInstId(e.InstId);
    this.GetText(0).ShowTextNew(e.TeamInstName);
    this.GetText(16).ShowTextNew(e.TeamName);
    this.GetText(1).SetText(e.CurrentScore.toString());
    this.Gs_(t?.BuffId ?? []);
    this.GetText(3).ShowTextNew("GhostShipMonster_Text1");
    this.GetText(13).ShowTextNew(i.DungeonDesc);
    this.SetTextureByPath(i.DifficultyIcon, this.GetTexture(8));
    var t = this.GetText(9);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, ShipTowerDefine_1.shipTowerTextKey.RecommendLevel, r);
    var i = e.StageId;
    var t = ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(i);
    this.GetItem(17).SetUIActive(t.IsQuickPass);
    this.UpdateRoleList();
    this.UpdateBuff();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, this.constructor.name, ["Refresh", this.fGt]);
    }
  }
  SetTeamToggleIsSelect(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(12)?.SetToggleStateForce(e);
  }
  Gs_(e) {
    var i = ShipTowerDefine_1.shipTowerTextKey.WordTitle;
    let t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i);
    if (!e.length) {
      i = ShipTowerDefine_1.shipTowerTextKey.WordNull;
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i);
      t = t + "  " + e;
    }
    this.GetText(2).SetText(t);
    this.GG_.RefreshByData(this.fGt.GetWordInfoList());
  }
  UpdateRoleList() {
    this.tFe.RefreshByData(this.fGt.GetUseRoleList());
  }
  UpdateBuff() {
    var e = this.fGt.BuffDataEdit?.ItemId ?? 0;
    if (e > 0) {
      e = {
        Data: this.fGt,
        Type: 4,
        ItemConfigId: e
      };
      this.fDo.Apply(e);
    } else {
      this.fDo.Apply({
        Type: 1
      });
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    let i = undefined;
    switch (e[0]) {
      case "Desc":
        i = this.GetText(13)?.GetParentAsUIItem();
        break;
      case "Item":
        i = this.fDo.GetRootItem();
        break;
      case "TeamAndItem":
        i = this.GetGuideUiItem("1");
        break;
      case "TeamAndItemOuter":
        i = this.GetExtendToggle(12)?.GetRootComponent();
    }
    if (i) {
      return [i, i];
    } else {
      return undefined;
    }
  }
}
exports.ShipTowerDescTeamItem = ShipTowerDescTeamItem;
//# sourceMappingURL=ShipTowerDescTeamItem.js.map