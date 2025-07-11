"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
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
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite]];
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
    this.$Ve.OnPostAudioStateEvent.Bind((t, i) => {
      if (i) {
        this.PostClickAudioEvent(i);
      }
    });
  }
  OnBeforeDestroy() {
    this.$Ve.OnStateChange.Clear();
    this.$Ve.OnPostAudioEvent.Unbind();
    this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Refresh(t, i, e) {
    this.Pe = t.SilentAreaDetectionData;
    if (this.Pe.IsLock) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_UnDiscovered_Text");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.Conf.Name);
    }
    var t = this.GetSprite(2);
    t.SetUIActive(true);
    var s = this.Pe.Conf.DangerType;
    var s = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(s);
    this.SetSpriteByPath(s.Icon, t, false);
    this.RootItem.SetUIActive(true);
    var s = ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId === this.Pe.Conf.Id;
    this.N6e(s, false);
    if (s) {
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
    if (this.q6e && this.Pe) {
      this.q6e(this.Pe.Conf.Id, this.$Ve);
    }
  }
  N6e(t, i = true) {
    if (t) {
      this.$Ve.SetToggleState(1, i);
    } else {
      this.$Ve.SetToggleState(0, false);
    }
  }
}
exports.SilentAreaItem = SilentAreaItem;
//# sourceMappingURL=SilentAreaItem.js.map