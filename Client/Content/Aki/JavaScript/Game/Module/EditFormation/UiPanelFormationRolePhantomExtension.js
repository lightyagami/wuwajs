"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPanelFormationRolePhantomExtension = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController");
const TowerDefenceDefine_1 = require("../TowerDefence/TowerDefenceDefine");
class UiPanelFormationRolePhantomExtension extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.PlayerId = TowerDefenceDefine_1.DEFAULT_ID;
    this.RoleCfgId = TowerDefenceDefine_1.DEFAULT_ID;
    this.mzt = undefined;
    this.nsa = undefined;
    this.ssa = undefined;
    this.xua = undefined;
    this.Pua = false;
    this.eTt = () => {
      TowerDefenceController_1.TowerDefenseController.TryOpenPhantomViewByPlayerIdAndRoleId(this.PlayerId, this.RoleCfgId);
    };
    this.mzt = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIItem], [22, UE.UISprite], [23, UE.UISprite], [24, UE.UITexture]];
    this.BtnBindInfo = [[20, this.eTt]];
  }
  OnBeforeDestroy() {
    this.PlayerId = TowerDefenceDefine_1.DEFAULT_ID;
    this.RoleCfgId = TowerDefenceDefine_1.DEFAULT_ID;
    this.nsa?.StopCurrentSequence();
    this.nsa = undefined;
    this.Pua = false;
    this.ssa?.StopCurrentSequence();
    this.ssa = undefined;
    this.xua = undefined;
  }
  OnStart() {
    this.nsa = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(19));
    this.ssa = new LevelSequencePlayer_1.LevelSequencePlayer(this.mzt);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = this.GetButton(20)?.GetRootComponent();
    if (i !== undefined) {
      return [i, i];
    }
  }
  SetRedDotActive(e) {
    this.GetItem(21).SetUIActive(e);
  }
  SetIcon(e, i = true) {
    var t = this.GetSprite(22);
    var s = this.GetSprite(23);
    var o = this.GetTexture(24);
    this.GetButton(20).IsSelfInteractive = i;
    var n = e !== this.xua;
    if (this.xua = e) {
      t.SetUIActive(false);
      s.SetUIActive(false);
      o.SetUIActive(true);
      this.SetTextureByPath(e, this.GetTexture(24));
      if (n) {
        if (!i) {
          this.nsa.StopCurrentSequence();
          this.Pua = false;
        }
        this.ssa.PlayLevelSequenceByName("VisionIn");
      }
    } else {
      t.SetUIActive(i);
      s.SetUIActive(!i);
      o.SetUIActive(false);
      if (i) {
        if (n) {
          this.ssa.PlayLevelSequenceByName("VisionOut");
        }
      } else if (!this.Pua) {
        this.Pua = true;
        this.nsa.PlayLevelSequenceByName("Loop");
      }
    }
  }
  SetRelativeUiActive(e) {
    this.GetItem(19).SetUIActive(e);
  }
}
exports.UiPanelFormationRolePhantomExtension = UiPanelFormationRolePhantomExtension;
//# sourceMappingURL=UiPanelFormationRolePhantomExtension.js.map