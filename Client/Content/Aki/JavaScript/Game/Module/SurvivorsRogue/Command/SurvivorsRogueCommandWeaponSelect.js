"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandWeaponSelect = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SurvivorsRogueGainData_1 = require("../Data/SurvivorsRogueGainData");
const SurvivorsRogueCommandBaseObtain_1 = require("./SurvivorsRogueCommandBaseObtain");
class SurvivorsRogueCommandWeaponSelect extends SurvivorsRogueCommandBaseObtain_1.SurvivorsRogueCommandBaseObtain {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
    this.yFd = 0;
    this.SFd = () => {
      this.ViewProxy?.GetRoleStatePanel()?.GetWeaponGridByIndex(this.yFd)?.SetSingleAnim("Unlock");
    };
    this.MFd = (t, e) => {
      if (e && this.ViewProxy) {
        var e = this.ViewProxy.GetRoleStatePanel();
        var i = this.hbd().IEd.find(e => e.fEd?.w5n === t);
        if (i) {
          const r = e.GetWeaponGridByIndex(this.yFd);
          if (r) {
            var o = i.fEd.v9n;
            i.fEd.sEd.dEd.push(ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(o).Id);
            var i = new SurvivorsRogueGainData_1.SurvivorsWeaponGainData(i.fEd.w5n, o, i.fEd.sEd);
            r.Refresh({
              WeaponData: i,
              IsLock: false,
              IsDisable: false
            }, false, this.yFd);
            r.SetSingleAnim("PreArm");
            for (const r of e.GetAllWeaponGrid()) {
              r.SetDisConnected();
            }
            i = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponBondOwnedWeaponId(o);
            if (i) {
              e = (o = e.GetWeaponGrid(i)).GridIndex;
              i = Math.abs(this.yFd - e) - 1;
              o.SetConnected(false, i);
              r.SetConnected(true, i);
            }
          }
        }
      }
    };
  }
  OnUpdate() {
    this.yFd = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.WeaponGainMap.size;
  }
  OnBindView() {
    if (this.ViewProxy) {
      this.ViewProxy.OnGoodsSelected = this.MFd;
      this.ViewProxy.OnSeqStartFinished = this.SFd;
    }
  }
  ToString() {
    return `[WeaponSelect] Count: ${this.hbd().IEd.length} `;
  }
  hbd() {
    return this.Data.pEd.MEd;
  }
  GetViewInfo() {
    var e = this.hbd();
    return {
      TitleId: "SurvivorsNewWeapon_Title",
      ButtonId: "SurvivorsNewWeapon_ConfirtButton",
      ChooseData: this.GetChooseData(e, 0),
      GoodsList: e.IEd
    };
  }
}
exports.SurvivorsRogueCommandWeaponSelect = SurvivorsRogueCommandWeaponSelect;
//# sourceMappingURL=SurvivorsRogueCommandWeaponSelect.js.map