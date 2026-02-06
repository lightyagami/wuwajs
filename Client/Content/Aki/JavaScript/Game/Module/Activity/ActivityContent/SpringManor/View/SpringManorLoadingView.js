"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorLoadingView = undefined;
const UE = require("ue");
const SpineAnimationQueue_1 = require("../../../../Common/SpineAnimationQueue");
const LoadingViewBase_1 = require("../../../../Loading/View/LoadingViewBase");
class SpringManorLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments);
    this.$xg = [];
    this.Wxg = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.SpineSkeletonAnimationComponent], [3, UE.SpineSkeletonAnimationComponent], [4, UE.SpineSkeletonAnimationComponent], [5, UE.SpineSkeletonAnimationComponent], [6, UE.UINiagara]];
  }
  OnStart() {
    super.OnStart();
    this.$xg.push(new SpineAnimationQueue_1.SpineAnimationQueue(this.GetSpine(2)), new SpineAnimationQueue_1.SpineAnimationQueue(this.GetSpine(3)), new SpineAnimationQueue_1.SpineAnimationQueue(this.GetSpine(4)), new SpineAnimationQueue_1.SpineAnimationQueue(this.GetSpine(5)));
    this.$xg.forEach(e => {
      e.PushAnimation(0, "start", false);
      e.PushAnimation(0, "idle", true);
    });
    this.Wxg = this.GetUiNiagara(6);
  }
  UpdateProgressRate(e) {
    this.Wxg?.SetNiagaraVarFloat("Dissolve", e);
  }
  UpdateShowTipsUi(e, i) {
    this.GetText(1)?.ShowTextNew(i);
  }
  UpdateProgressValue(e) {}
}
exports.SpringManorLoadingView = SpringManorLoadingView;
//# sourceMappingURL=SpringManorLoadingView.js.map