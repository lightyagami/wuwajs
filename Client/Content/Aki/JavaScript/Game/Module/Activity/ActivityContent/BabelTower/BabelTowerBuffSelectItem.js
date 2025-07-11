"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerBuffSelectItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerBuffSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BuffId = 0;
    this.LevelId = 0;
    this.OnClickToggleCallBack = undefined;
    this.OnCancelClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.kqe = t => {
      if (t === 1) {
        this.OnClickToggleCallBack?.(this.BuffId);
      } else {
        this.OnCancelClickToggleCallBack?.(this.BuffId);
      }
    };
    this.yMa = () => {
      var t = {
        IsDeTerm: false,
        ConfigId: this.BuffId,
        ShowWays: true
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.GetExtendToggle(0).GetToggleState() === 1 || !this.CanClickCallBack || this.CanClickCallBack(this.BuffId));
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.yMa);
  }
  Refresh(t, i, e) {
    this.BuffId = t.Id;
    this.LevelId = t.LevelId ?? 0;
    var s;
    var r = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(this.BuffId);
    if (r) {
      s = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, r.NameText);
      this.SetTextureByPath(r.Texture, this.GetTexture(3));
      this.GetItem(4).SetUIActive(t.IsRecommend);
      this.RefreshState(t.State);
    }
  }
  RefreshState(t) {
    var i = this.GetText(1);
    var e = this.GetText(2);
    e.SetUIActive(t !== 0);
    e.SetChangeColor(t !== 0, e.changeColor);
    i.SetChangeColor(t !== 0, i.changeColor);
    if (t === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "BabelTowerBuffUse");
    } else if (t === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "BabelTowerBuffLock");
    }
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleStateForce(t, false);
  }
}
exports.BabelTowerBuffSelectItem = BabelTowerBuffSelectItem;
//# sourceMappingURL=BabelTowerBuffSelectItem.js.map