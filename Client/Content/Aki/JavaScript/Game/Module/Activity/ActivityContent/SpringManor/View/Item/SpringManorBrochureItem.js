"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorBrochureItem = exports.BrochureItemData = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class BrochureItemData {
  constructor() {
    this.ConfigId = 0;
    this.State = 0;
    this.Index = 0;
  }
}
exports.BrochureItemData = BrochureItemData;
class SpringManorBrochureItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Yco = undefined;
    this.mFg = undefined;
    this.Pe = undefined;
    this.WOf = undefined;
    this.$pt = undefined;
    this.CIf = (e, t) => {
      if (t === "Sequence_Brochure_Unlock" && this.Pe) {
        this.Refresh(this.Pe, false, 0);
      }
    };
    this.eTt = () => {
      if (this.Yco) {
        this.Yco(this.Pe);
      }
    };
    this.qOe = () => {
      if (this.mFg) {
        this.mFg(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UISprite], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt], [3, this.qOe]];
  }
  OnStart() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetToggleCallBack(e) {
    this.Yco = e;
  }
  SetClickGetButtonCallBack(e) {
    this.mFg = e;
  }
  Refresh(e, t, i) {
    let r = (this.Pe = e).State;
    if (r === 1 && this.m9g(this.Pe.ConfigId)) {
      r = 0;
    }
    var s;
    var o;
    var h = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(e.ConfigId);
    if (h) {
      s = (o = r === 0) ? h.LockIcon : h.UnlockIcon;
      this.TrySetTextureByPath(s, this.GetTexture(1));
      this.WOf ||= this.GetTexture(1).GetOwner().GetComponentByClass(UE.UITextureTransitionComponent.StaticClass());
      this.SetTextureTransitionByPath(s, this.WOf);
      this.GetItem(2)?.SetUIActive(o);
      this.GetButton(3)?.RootUIComp?.SetUIActive(r === 1);
      if (o) {
        s = h.GuideTitle?.length > 0;
        this.GetText(5)?.ShowTextNew(s ? h.GuideTitle : h.DescriptionTitle);
      } else {
        this.GetText(5)?.ShowTextNew(h.DescriptionTitle);
      }
      o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_BrochureSort0" + (e.Index + 1));
      this.SetSpriteByPath(o, this.GetSprite(4), false);
      this.n4g(r === 1);
    }
  }
  n4g(e) {
    if (e) {
      this.$pt?.PlayLevelSequenceByName("Gift_Loop");
    } else {
      this.$pt?.StopSequenceByKey("Gift_Loop");
    }
  }
  m9g(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SpringManorBrochureUnlockSequencePlayed);
    return !t || !t.has(e);
  }
  CheckPlayUnlockSequence() {
    var e;
    if (this.Pe && this.Pe.State === 1 && !(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SpringManorBrochureUnlockSequencePlayed) ?? new Set())?.has(this.Pe.ConfigId)) {
      e.add(this.Pe.ConfigId);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SpringManorBrochureUnlockSequencePlayed, e);
      this.$pt?.PlayLevelSequenceByName("Unlock", false);
    }
  }
}
exports.SpringManorBrochureItem = SpringManorBrochureItem;
//# sourceMappingURL=SpringManorBrochureItem.js.map