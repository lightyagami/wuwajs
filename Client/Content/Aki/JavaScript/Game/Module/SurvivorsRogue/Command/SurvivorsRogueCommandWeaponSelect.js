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
    this.s6d = 0;
    this.a6d = () => {
      this.ViewProxy?.GetRoleStatePanel()?.GetWeaponGridByIndex(this.s6d)?.SetSingleAnim("Unlock");
    };
    this.h6d = (o, e) => {
      if (e && this.ViewProxy) {
        var r = this.ViewProxy.GetRoleStatePanel();
        var e = this.Uwd().zTd.find(e => e.VTd?.w5n === o);
        if (e) {
          var t = r.GetWeaponGridByIndex(this.s6d);
          if (t) {
            var a = e.VTd.v9n;
            e.VTd.xTd.FTd.push(ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(a).Id);
            var e = new SurvivorsRogueGainData_1.SurvivorsWeaponGainData(e.VTd.w5n, a, e.VTd.xTd);
            t.Refresh({
              WeaponData: e,
              IsLock: false,
              IsDisable: false
            }, false, this.s6d);
            t.SetSingleAnim("PreArm");
            for (const i of ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.WeaponGainMap.values()) {
              if (i.Data.NTd === 0) {
                r.GetWeaponGrid(i.ConfigId)?.SetDisConnected();
              }
            }
            e = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponBondOwnedWeaponId(a);
            if (e) {
              e = (a = r.GetWeaponGrid(e)).GridIndex;
              e = Math.abs(this.s6d - e) - 1;
              a.SetConnected(false, e);
              t.SetConnected(true, e);
            }
          }
        }
      }
    };
  }
  OnUpdate() {
    this.s6d = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.WeaponGainMap.size;
  }
  OnBindView() {
    if (this.ViewProxy) {
      this.ViewProxy.OnGoodsSelected = this.h6d;
      this.ViewProxy.OnSeqStartFinished = this.a6d;
    }
  }
  ToString() {
    return `[WeaponSelect] Count: ${this.Uwd().zTd.length} `;
  }
  Uwd() {
    return this.Data.$Td.XTd;
  }
  GetViewInfo() {
    var e = this.Uwd();
    return {
      CaptionId: "SurvivorWeaponSelection_ScreenName",
      TitleId: "SurvivorsNewWeapon_Title",
      ButtonId: "SurvivorsNewWeapon_ConfirtButton",
      ChooseData: this.GetChooseData(e, 0),
      GoodsList: e.zTd
    };
  }
}
exports.SurvivorsRogueCommandWeaponSelect = SurvivorsRogueCommandWeaponSelect;
//# sourceMappingURL=SurvivorsRogueCommandWeaponSelect.js.map