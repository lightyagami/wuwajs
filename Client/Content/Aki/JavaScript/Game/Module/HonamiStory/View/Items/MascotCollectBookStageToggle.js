"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MascotCollectBookStageToggle = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MascotCollectBookStageToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.xOl = undefined;
    this.F5d = undefined;
    this.yvm = undefined;
    this.Cke = () => {
      this.F5d?.(this);
    };
  }
  OnBeforeCreateImplement() {
    this.yvm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.yvm);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UITexture]];
    this.BtnBindInfo = [[0, this.Cke]];
  }
  OnStart() {
    this.CNe ||= ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  get Data() {
    return this.xOl;
  }
  Refresh(t, e, i) {
    this.xOl = t;
    this.sbi();
    if (t.IsSecretFinished) {
      this.yvm?.PlaySequence("Unlock");
    }
  }
  sbi() {
    var e = this.xOl.IsAreaUnlock;
    this.GetItem(9).SetUIActive(!e);
    this.GetItem(10).SetUIActive(e);
    this.GetItem(11).SetUIActive(e);
    this.GetExtendToggle(0).SetSelfInteractive(e);
    this.GetText(8)?.ShowTextNew(this.xOl.Name);
    if (e) {
      var e = this.xOl.CollectMascotState;
      this.GetSprite(4)?.SetUIActive(e === 1);
      this.GetTexture(3)?.SetUIActive(e === 0);
      var i = this.GetTexture(1);
      if (e !== 0) {
        this.SetTextureShowUntilLoaded(this.xOl.Config.ToggleBgPath, i);
      }
      i.SetUIActive(e !== 0);
      var i = this.CNe.GetHonamiStoryMascotDataListByAreaId(this.xOl.Id);
      let t = 5;
      for (const s of i) {
        this.GetSprite(t)?.SetUIActive(s.State !== 0);
        t++;
      }
    } else {
      this.GetText(8)?.ShowTextNew("HonamiStory_UnknownAreaName");
    }
    this.SetTextureShowUntilLoaded(this.xOl.Config.ToggleBgPath, this.GetTexture(12));
  }
  BindStageToggleClick(t) {
    this.F5d = t;
  }
  OnSelected() {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected() {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
exports.MascotCollectBookStageToggle = MascotCollectBookStageToggle;
//# sourceMappingURL=MascotCollectBookStageToggle.js.map