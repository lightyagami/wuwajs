"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentResultItem = exports.SilentCategoryItem = exports.SilentAreaDetectDynamicItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaDetectDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.O8e = undefined;
    this.k8e = undefined;
    this.F8e = undefined;
    this.V8e = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.O8e ||= new SilentCategoryItem(this.GetItem(0));
    this.k8e ||= new SilentResultItem(this.GetItem(1));
  }
  GetUsingItem(t) {
    if (t.SilentAreaDetectionData) {
      const i = this.GetItem(1);
      return i.GetOwner();
    }
    const i = this.GetItem(0);
    return i.GetOwner();
  }
  Update(t, i) {
    this.Data = t;
    this.k8e.SetActive(false);
    this.O8e.SetActive(false);
    if (t.SilentAreaDetectionData) {
      this.k8e.SetActive(true);
      this.k8e.Update(t.SilentAreaDetectionData);
      this.k8e.BindResultCallback(this.V8e);
    } else {
      this.O8e.SetActive(true);
      this.O8e.Update([t.SilentAreaTitleData, t.IsShow]);
      this.O8e.BindCategoryCallback(this.F8e);
    }
  }
  BindClickCategoryCallback(t) {
    this.F8e = t;
  }
  BindClickResultCallback(t) {
    this.V8e = t;
  }
  ClearItem() {
    this.Destroy();
  }
  OnBeforeDestroy() {
    if (this.O8e) {
      this.O8e.Destroy();
      this.O8e = undefined;
    }
    if (this.k8e) {
      this.k8e.Destroy();
      this.k8e = undefined;
    }
  }
}
exports.SilentAreaDetectDynamicItem = SilentAreaDetectDynamicItem;
class SilentCategoryItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.$Ve = undefined;
    this.H8e = undefined;
    this.Pe = undefined;
    this.j8e = false;
    this.OnClickExtendToggle = t => {
      this.j8e = !this.j8e;
      if (this.H8e) {
        this.H8e(this.Pe.TypeDescription, this.$Ve, this.j8e);
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickExtendToggle]];
  }
  OnStart() {
    this.$Ve = this.GetExtendToggle(0);
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
    this.W8e();
    this.Pe = undefined;
    this.$Ve.OnPostAudioEvent.Unbind();
    this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Update(t) {
    this.Pe = t[0];
    this.j8e = t[1];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.TitleName);
    this.GetExtendToggle(0).SetToggleState(this.j8e ? 1 : 0, false);
    this.K8e();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("AdventureFirstAwardCategory", this.GetItem(3), undefined, this.Pe.TypeDescription);
  }
  W8e() {
    if (this.Pe) {
      RedDotController_1.RedDotController.UnBindGivenUi("AdventureFirstAwardCategory", this.GetItem(3), this.Pe.TypeDescription);
    }
  }
  RefreshRedDot(t) {
    this.GetItem(3).SetUIActive(t);
  }
  BindCategoryCallback(t) {
    this.H8e = t;
  }
}
exports.SilentCategoryItem = SilentCategoryItem;
class SilentResultItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Q8e = undefined;
    this.Pe = undefined;
    this.$Ve = undefined;
    this.OnClickExtendToggle = t => {
      if (this.Q8e) {
        this.Q8e(this.Pe.Conf.Id, this.$Ve);
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickExtendToggle]];
  }
  OnStart() {
    this.$Ve = this.GetExtendToggle(0);
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
    this.W8e();
    this.Pe = undefined;
    this.$Ve.OnPostAudioEvent.Unbind();
    this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Update(t) {
    this.Pe = t;
    var i = this.GetText(4);
    var s = t.Conf.Name;
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, s);
    this.GetText(3).SetUIActive(false);
    this.GetTexture(1).SetUIActive(false);
    var s = this.GetItem(2);
    if (t.IsLock) {
      s.SetUIActive(true);
      i.SetUIActive(false);
    } else {
      s.SetUIActive(false);
      i.SetUIActive(true);
    }
    this.GetSprite(5).SetUIActive(t.IsTargeting);
    this.K8e();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("AdventureFirstAwardResult", this.GetItem(6), undefined, this.Pe.Conf.Id);
  }
  W8e() {
    if (this.Pe) {
      RedDotController_1.RedDotController.UnBindGivenUi("AdventureFirstAwardResult", this.GetItem(6), this.Pe.Conf.Id);
    }
  }
  BindResultCallback(t) {
    this.Q8e = t;
  }
}
exports.SilentResultItem = SilentResultItem;
//# sourceMappingURL=SilentAreaDetectItem.js.map