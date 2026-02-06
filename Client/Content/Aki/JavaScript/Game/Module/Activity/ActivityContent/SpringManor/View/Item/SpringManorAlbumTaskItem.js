"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAlbumTaskItem = exports.AlbumTaskData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class AlbumTaskData {
  constructor() {
    this.ConfigId = 0;
    this.State = 0;
    this.IsFollowing = false;
    this.IsMainQuest = false;
    this.Type = 2;
  }
}
exports.AlbumTaskData = AlbumTaskData;
class SpringManorAlbumTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Yco = undefined;
    this.Pe = undefined;
    this.Lyg = 2;
    this.Xy = 0;
    this.eTt = () => {
      if (this.Yco && this.Pe) {
        this.Yco(this.Pe, this.Xy);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  SetToggleCallBack(t) {
    this.Yco = t;
  }
  OnSelected(t) {
    this.SetSelectedState(true);
  }
  OnDeselected(t) {
    this.SetSelectedState(false);
  }
  Refresh(t, s, i) {
    this.Pe = t;
    this.Xy = i;
    var e;
    var a;
    var i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(t.ConfigId);
    if (i) {
      this.Lyg = t.Type;
      this.SetSelectedState(s);
      s = t.State === 1;
      e = t.State === 2;
      if (s || e) {
        this.GetText(1)?.ShowTextNew(i.DescriptionTitle);
      } else {
        a = i.GuideTitle?.length > 0;
        this.GetText(1)?.ShowTextNew(a ? i.GuideTitle : i.DescriptionTitle);
      }
      this.GetSprite(4)?.SetUIActive(t.IsFollowing);
      if (t.IsFollowing) {
        a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t.IsMainQuest ? "SP_IconTaskZhuXian" : "SP_IconTaskYaoYue");
        this.SetSpriteByPath(a, this.GetSprite(4), false);
      }
      this.GetSprite(5)?.SetUIActive(s || e);
      this.GetItem(3)?.SetUIActive(s);
    }
  }
  SetSelectedState(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0);
    this.wyg(t);
  }
  wyg(t) {
    let s = undefined;
    if (this.Lyg === 0) {
      s = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(t ? "SP_AlbumTabBIconASel" : "SP_AlbumTabBIconANml");
    } else if (this.Lyg === 1) {
      s = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(t ? "SP_AlbumTabBIconBNml" : "SP_AlbumTabBIconBSel");
    }
    if (s) {
      this.SetSpriteByPath(s, this.GetSprite(2), false, undefined, () => {
        this.GetSprite(2).GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass()).SetAllStateSprite(this.GetSprite(2).GetSprite());
      });
    }
  }
}
exports.SpringManorAlbumTaskItem = SpringManorAlbumTaskItem;
//# sourceMappingURL=SpringManorAlbumTaskItem.js.map