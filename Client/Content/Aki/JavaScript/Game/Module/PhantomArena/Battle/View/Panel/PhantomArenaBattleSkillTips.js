"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleSkillTips = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaBattleSkillTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Nno = e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  Refresh(e) {
    var i;
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
    let s = undefined;
    let a = undefined;
    let r = [];
    r = e.IsPassive ? (i = t.PassiveSkillId.indexOf(e.SkillId), s = t.PassiveSkillNameList[i], a = t.PassiveSkillDescList[i], t.PassiveSkillDescParamsList[i] ? t.PassiveSkillDescParamsList[i].ArrayString : []) : (i = t.ActiveSkillId.indexOf(e.SkillId), s = t.SkillNameList[i], a = t.SkillDescList[i], t.SkillDescParamsList[i] ? t.SkillDescParamsList[i].ArrayString : []);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a, ...r);
  }
  SetAttachItem(e) {
    this.RootItem?.SetUIParent(e);
  }
  SetTipsActive(e) {
    if (e) {
      this.SetActive(true);
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequence("Start");
    } else {
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequence("Close");
    }
  }
}
exports.PhantomArenaBattleSkillTips = PhantomArenaBattleSkillTips;
//# sourceMappingURL=PhantomArenaBattleSkillTips.js.map