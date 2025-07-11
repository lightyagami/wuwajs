"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProficiencyView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CookController_1 = require("../CookController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dGt = undefined;
    this.$pt = undefined;
    this.OnChangeRoleClick = () => {
      this?.dGt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[2, this.OnChangeRoleClick]];
  }
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(2).RootUIComp);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  BindChangeRoleClick(e) {
    this.dGt = e;
  }
  SetExpNum(e, i, r, t) {
    var r = i * r;
    var e = e * i;
    var n = r - e;
    var e = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CumulativeProficiency"), e.toString(), r.toString());
    if (n > 0) {
      r = Math.min(n, i * t);
      i = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "+" + Math.min(r, n)).concat(" ", "(", e, ")");
      this.GetText(0).SetText(i);
    } else {
      t = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "").concat(" ", "(", e, ")");
      this.GetText(0).SetText(t);
    }
  }
  SetRoleTexture(e, i) {
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.SetRoleIcon(r.GetRoleConfig().RoleHeadIconLarge, this.GetTexture(1), e);
    if (CookController_1.CookController.CheckIsBuffEx(e, i)) {
      if (this.$pt.GetCurrentSequence()) {
        this.$pt.ReplaySequenceByKey("Show");
      } else {
        this.$pt.PlayLevelSequenceByName("Show");
      }
    } else {
      this.$pt?.StopCurrentSequence(false, true);
    }
  }
  SetTypeContent(e = undefined) {
    var i = this.GetText(3);
    if (e) {
      i.SetUIActive(true);
      i.SetText(e);
    } else {
      i.SetUIActive(false);
    }
  }
}
exports.ProficiencyView = ProficiencyView;
//# sourceMappingURL=CookProficiencyView.js.map