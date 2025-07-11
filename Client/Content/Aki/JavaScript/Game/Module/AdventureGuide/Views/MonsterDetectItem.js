"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDetectItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class MonsterDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.$Ve = undefined;
    this.q6e = undefined;
  }
  BindCallback(t) {
    this.q6e = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture]];
  }
  OnStart() {
    this.$Ve = this.GetExtendToggle(0);
    this.$Ve.OnStateChange.Add(t => {
      this.G6e();
    });
    this.$Ve.SetToggleState(0);
    this.$Ve.OnPostAudioEvent.Bind(t => {
      if (t) {
        this.PostClickAudioEvent(t);
      }
    });
    this.$Ve.OnPostAudioStateEvent.Bind((t, e) => {
      if (e) {
        this.PostClickAudioEvent(e);
      }
    });
  }
  OnBeforeDestroy() {
    this.$Ve.OnStateChange.Clear();
    this.$Ve.OnPostAudioEvent.Unbind();
    this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Refresh(t, e, i) {
    this.Pe = t;
    var s;
    var r = this.GetItem(2);
    var h = this.GetTexture(3);
    if (t.IsLock) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_UnDiscovered_Text");
      r.SetUIActive(true);
      h.SetUIActive(false);
    } else {
      s = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(t.Conf.MonsterInfoId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name);
      r.SetUIActive(false);
      h.SetUIActive(true);
      this.SetTextureByPath(s.Icon, h);
    }
    this.RootItem.SetUIActive(true);
    var r = ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId === t.Conf.Id;
    this.N6e(r, false);
    if (r) {
      this.G6e();
    }
  }
  OnSelected(t) {
    this.N6e(true);
  }
  OnDeselected(t) {
    this.N6e(false);
  }
  G6e() {
    if (this.q6e) {
      this.q6e(this.Pe.Conf.Id, this.$Ve);
    }
  }
  N6e(t, e = true) {
    if (t) {
      this.$Ve.SetToggleState(1, e);
    } else {
      this.$Ve.SetToggleState(0, false);
    }
  }
  GetToggleItem() {
    return this.GetExtendToggle(0).RootUIComp;
  }
}
exports.MonsterDetectItem = MonsterDetectItem;
//# sourceMappingURL=MonsterDetectItem.js.map