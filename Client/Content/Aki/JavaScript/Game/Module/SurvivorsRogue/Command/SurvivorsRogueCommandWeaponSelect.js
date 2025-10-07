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
    this.MFd = (o, e) => {
      if (e && this.ViewProxy) {
        var r = this.ViewProxy.GetRoleStatePanel();
        var e = this.hbd().IEd.find(e => e.fEd?.w5n === o);
        if (e) {
          var t = r.GetWeaponGridByIndex(this.yFd);
          if (t) {
            var a = e.fEd.v9n;
            e.fEd.sEd.dEd.push(ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(a).Id);
            var e = new SurvivorsRogueGainData_1.SurvivorsWeaponGainData(e.fEd.w5n, a, e.fEd.sEd);
            t.Refresh({
              WeaponData: e,
              IsLock: false,
              IsDisable: false
            }, false, this.yFd);
            t.SetSingleAnim("PreArm");
            for (const i of ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.WeaponGainMap.values()) {
              if (i.Data.mEd === 0) {
                r.GetWeaponGrid(i.ConfigId)?.SetDisConnected();
              }
            }
            e = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponBondOwnedWeaponId(a);
            if (e) {
              e = (a = r.GetWeaponGrid(e)).GridIndex;
              e = Math.abs(this.yFd - e) - 1;
              a.SetConnected(false, e);
              t.SetConnected(true, e);
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
      CaptionId: "SurvivorWeaponSelection_ScreenName",
      TitleId: "SurvivorsNewWeapon_Title",
      ButtonId: "SurvivorsNewWeapon_ConfirtButton",
      ChooseData: this.GetChooseData(e, 0),
      GoodsList: e.IEd
    };
  }
}
exports.SurvivorsRogueCommandWeaponSelect = SurvivorsRogueCommandWeaponSelect;
//# sourceMappingURL=SurvivorsRogueCommandWeaponSelect.js.map