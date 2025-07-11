"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerCoverItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerCoverRoleItem_1 = require("./ShipTowerCoverRoleItem");
class ShipTowerCoverItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.Ts_ = false;
    this.bs_ = undefined;
    this.Ls_ = undefined;
    this.As_ = undefined;
    this.xs_ = undefined;
    this.Rs_ = undefined;
    this.ConfirmCallback = undefined;
    this.Qho = () => {
      this.ConfirmCallback?.(this.fGt, this.Ts_);
    };
    this.uyi = () => new ShipTowerCoverRoleItem_1.ShipTowerCoverRoleItem();
    this.Os_ = e => {};
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.bs_ = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.bs_.SetFunction(this.Qho);
    this.Ls_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.uyi);
    this.As_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.uyi);
    this.xs_ = new SmallItemGrid_1.SmallItemGrid();
    this.xs_.Initialize(this.GetItem(2).GetOwner());
    this.xs_.BindOnExtendToggleClicked(this.Os_);
    this.Rs_ = new SmallItemGrid_1.SmallItemGrid();
    this.Rs_.Initialize(this.GetItem(3).GetOwner());
    this.Rs_.BindOnExtendToggleClicked(this.Os_);
  }
  UpdateData(e, i = false) {
    this.fGt = e;
    this.Ts_ = i;
    let t = undefined;
    let s = undefined;
    let r = undefined;
    let o = undefined;
    if (this.Ts_) {
      t = e.TeamDataList[0].GetRoleIdListEdit();
      s = e.TeamDataList[1].GetRoleIdListEdit();
      r = e.TeamDataList[0].BuffDataEdit;
      o = e.TeamDataList[1].BuffDataEdit;
      this.bs_.SetShowText(ShipTowerDefine_1.shipTowerTextKey.Confirm);
    } else {
      this.bs_.SetShowText(ShipTowerDefine_1.shipTowerTextKey.Cancel);
      t = e.TeamDataList[0].GetRoleIdList();
      s = e.TeamDataList[1].GetRoleIdList();
      r = e.TeamDataList[0].BuffData;
      o = e.TeamDataList[1].BuffData;
    }
    this.Ls_.RefreshByData(t);
    this.As_.RefreshByData(s);
    this.xs_.Apply({
      Data: r,
      Type: 4,
      ItemConfigId: r?.ItemId ?? 1
    });
    this.Rs_.Apply({
      Data: o,
      Type: 4,
      ItemConfigId: o?.ItemId ?? 1
    });
    var i = this.Ts_ ? e.NewChallengeScore : e.CurrentScore;
    this.GetText(4).SetText(i.toString());
    var h = this.GetTexture(5);
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetStageGradeResIdByStageId(e.Id, i);
    h.SetUIActive(!!e);
    if (e) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(i, h);
    }
  }
}
exports.ShipTowerCoverItem = ShipTowerCoverItem;
//# sourceMappingURL=ShipTowerCoverItem.js.map