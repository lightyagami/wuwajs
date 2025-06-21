"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleSkillTips = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaBattleSkillTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Sequence = void 0, this.Nno = e => {
      "Close" === e && this.SetActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText]
    ]
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno)
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  Refresh(e) {
    var i, t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
    let s = void 0,
      a = void 0,
      r = [];
    r = e.IsPassive ? (i = t.PassiveSkillId.indexOf(e.SkillId), s = t.PassiveSkillNameList[i], a = t.PassiveSkillDescList[i], t.PassiveSkillDescParamsList[i] ? t.PassiveSkillDescParamsList[i].ArrayString : []) : (i = t.ActiveSkillId.indexOf(e.SkillId), s = t.SkillNameList[i], a = t.SkillDescList[i], t.SkillDescParamsList[i] ? t.SkillDescParamsList[i].ArrayString : []), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a, ...r)
  }
  SetAttachItem(e) {
    this.RootItem?.SetUIParent(e)
  }
  SetTipsActive(e) {
    e ? (this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequence("Start")) : (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequence("Close"))
  }
}
exports.PhantomArenaBattleSkillTips = PhantomArenaBattleSkillTips;
//# sourceMappingURL=PhantomArenaBattleSkillTips.js.map