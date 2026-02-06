"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarLuhes = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarLuhesSlot_1 = require("./SpecialEnergyBarLuhesSlot");
const ADV_BAR_ID = 151002;
class SpecialEnergyBarLuhes extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.jHf = undefined;
    this._ii = 0;
    this.wZt = [];
    this.UPi = (t, e) => {
      this._Oe();
    };
    this.Qqg = t => {
      this.Kqg(t);
    };
    this.Xqg = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [];
    for (let t = 0; t < 9; ++t) {
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
    }
  }
  OnInitData() {
    super.OnInitData();
    this.wZt.push(this.Config);
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(ADV_BAR_ID));
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(2130310167, this.UPi);
    this.ListenForTagCountChanged(1524936646, this.Qqg);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.jHf = new SpecialEnergyBarLuhesSlot_1.SpecialEnergyBarLuhesSlot();
    this.jHf.InitData(this.RoleData, this.Config);
    this.jHf.ForceHideBottomLine = true;
    await this.jHf.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(5);
    this.InitTweenAnim(6);
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
  }
  OnBeforeShow() {
    this.Xqg = false;
    this._Oe();
    this.Kqg(this.TagComponent?.GetTagCount(1524936646) ?? 0, true);
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear(true);
    super.ClearAllTweenAnim();
  }
  tZf() {
    if (this._ii === 0) {
      this.jHf?.SwitchKeyItem(this.wZt[0]);
    } else {
      this.jHf?.SwitchKeyItem(this.wZt[1]);
    }
  }
  _Oe() {
    this._ii = this.TagComponent.HasTag(2130310167) ? 1 : 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 96, "陆赫斯能量条改变状态", ["new", this._ii]);
    }
    this.tZf();
  }
  Kqg(t, e = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 96, "陆赫斯能量条豆变更", ["", t]);
    }
    if (t === 0) {
      this.Xqg = false;
      this.TweenAnimPlayer?.PlayTweenAnim(e ? 5 : 6);
    } else if (t === 1) {
      this.Xqg = false;
      this.TweenAnimPlayer?.PlayTweenAnim(7);
    } else if (!this.Xqg) {
      this.Xqg = true;
      this.TweenAnimPlayer?.PlayTweenAnim(8);
    }
  }
  Tick(t) {
    super.Tick(t);
    this.jHf?.Tick(t);
  }
}
exports.SpecialEnergyBarLuhes = SpecialEnergyBarLuhes;
//# sourceMappingURL=SpecialEnergyBarLuhes.js.map