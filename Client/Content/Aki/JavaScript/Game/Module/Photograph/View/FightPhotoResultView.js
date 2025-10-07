"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoResultView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const LguiUtil_1 = require("../../Util/LguiUtil");
class FightPhotoResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Yyd = () => {
      ControllerHolder_1.ControllerHolder.PhotographController.CloseFightPhotographMode();
    };
    this.zyd = () => {
      this.CloseMe();
    };
    this.Jyd = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.LeaveInstanceDungeon();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIText], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Yyd], [11, this.zyd], [12, this.Jyd]];
  }
  OnStart() {
    var e = ControllerHolder_1.ControllerHolder.PhotographController.GetSavedFightPhotos();
    for (let t = 0; t < e.length; t++) {
      var i = e[t];
      var r = this.GetTexture(6 + t);
      this.nwd(r, i);
      var r = this.GetTexture(2 + t);
      this.nwd(r, i);
    }
    var t = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.GetActivityData().GetCurrentLevelData();
    this.SetTextureByPath(t.NpcHeadIcon, this.GetTexture(9));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.NpcDialogue);
    var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.IsDifficulty ? "FightPhotoDifficulty" : "FightPhotoEasy");
    this.GetText(5)?.SetText(o + "-" + t);
  }
  nwd(t, e) {
    t.SetTexture(e);
    var i = e.Blueprint_GetSizeX();
    var e = e.Blueprint_GetSizeY();
    var r = t.GetWidth();
    var o = t.GetHeight();
    var l = i / e;
    var s = r / o;
    let n = new UE.Vector4(0, 0, 1, 1);
    n = s < l ? (l = (i - (s = r / (o / e))) / 2 / i, s = s / i, new UE.Vector4(l, 0, s, 1)) : (s = (e - (l = o / (r / i))) / 2 / e, o = l / e, new UE.Vector4(0, s, 1, o));
    t.SetUVRect(n);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.PhotographController.ClearAllSavedFightPhotos();
  }
}
exports.FightPhotoResultView = FightPhotoResultView;
//# sourceMappingURL=FightPhotoResultView.js.map