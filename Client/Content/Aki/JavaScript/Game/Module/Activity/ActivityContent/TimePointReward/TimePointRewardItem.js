"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePointRewardItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TimePointRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.gOe = undefined;
    this.qsi = undefined;
    this.OnClickToGet = undefined;
    this.UFe = () => {
      if (this.Pe?.RewardState === 1) {
        this.OnClickToGet?.(this.Pe.Id);
      }
    };
    this.hJs = () => {
      if (this.Pe?.RewardState === 1) {
        this.OnClickToGet?.(this.Pe.Id);
      } else if (this.qsi) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.qsi[0].ItemId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.UFe]];
  }
  OnStart() {
    this.gOe = new SmallItemGrid_1.SmallItemGrid();
    this.gOe.Initialize(this.GetItem(1).GetOwner());
    this.gOe.BindOnCanExecuteChange(() => false);
    this.gOe.BindOnExtendToggleClicked(this.hJs);
  }
  Refresh(i, t, e) {
    this.Pe = i;
    var r = ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetTimePointRewardById(this.Pe.Id);
    if (r) {
      var s;
      var h;
      var a = [];
      for ([s, h] of r.RewardItem) {
        var o = [{
          IncId: 0,
          ItemId: s
        }, h];
        a.push(o);
      }
      this.qsi = a[0];
      var n = this.GetItem(3);
      var d = this.GetText(4);
      switch (i.RewardState) {
        case 0:
          n.SetUIActive(false);
          d.ShowTextNew("TimePointRewardActivity_RewardDesc01");
          this.lJs(false);
          break;
        case 1:
          n.SetUIActive(true);
          d.ShowTextNew("TimePointRewardActivity_RewardDesc02");
          this.lJs(false);
          break;
        case 2:
          n.SetUIActive(false);
          d.ShowTextNew("TimePointRewardActivity_RewardDesc03");
          this.lJs(true);
      }
      this._Js(e + 1);
      this.uJs(this.Pe.RewardTime);
      this.cNe();
    }
  }
  cNe() {
    var i = {
      Data: this.Pe,
      Type: 4,
      ItemConfigId: this.qsi[0].ItemId,
      BottomText: this.qsi[1].toString()
    };
    this.gOe.Apply(i);
    this.gOe.SetReceivableVisible(this.Pe?.RewardState === 1);
    this.gOe.SetLockVisible(this.Pe?.RewardState === 0);
    this.gOe.SetReceivedVisible(this.Pe?.RewardState === 2);
  }
  uJs(i) {
    i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(i * TimeUtil_1.TimeUtil.Millisecond);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "TimePointRewardActivity_TimeDesc01", i.Month, i.Day);
  }
  _Js(i) {
    const t = this.GetSprite(5);
    t.SetUIActive(false);
    i = "SP_TimePointReward_Index0" + i;
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(i, t, false, undefined, () => {
      t.SetUIActive(true);
    });
  }
  lJs(i) {
    this.GetText(4).SetChangeColor(i, this.GetText(4).changeColor);
  }
}
exports.TimePointRewardItem = TimePointRewardItem;
//# sourceMappingURL=TimePointRewardItem.js.map