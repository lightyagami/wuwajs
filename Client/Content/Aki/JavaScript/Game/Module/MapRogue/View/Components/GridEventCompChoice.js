"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridEventChoice = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class GridEventChoice extends UiPanelBase_1.UiPanelBase {
  constructor(i, t = 2) {
    super();
    this.StepId = i;
    this.StepType = t;
    this.CanInteractCallback = undefined;
    this.ExecuteStep = undefined;
    this.ToggleLayout = undefined;
    this.ToggleDataMap = new Map();
    this.FinishItem = undefined;
    this.J6u = false;
    this.Ao1 = () => {
      var i = new GridEventChoiceToggle();
      i.OnExtendToggleStateChanged = this.Jgt;
      i.OnCanExecuteChangeFunc = this.TKi;
      return i;
    };
    this.Jgt = (i, t) => {
      if (i) {
        i = this.ToggleDataMap.get(t);
        this.FinishItem.Refresh(i);
        this.ToggleLayout.GetRootUiItem()?.SetUIActive(false);
        this.FinishItem.SetActive(true);
        this.ExecuteStep?.(this.StepId, t);
      }
    };
    this.TKi = (i, t) => this.J6u;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.FinishItem = new GridEventChoiceFinish();
    await this.FinishItem.CreateByActorAsync(this.GetItem(7).GetOwner());
  }
  OnStart() {
    this.ToggleLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.Ao1);
  }
  async Refresh(s) {
    this.J6u = false;
    var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(this.StepId);
    if (i) {
      var e = !StringUtils_1.StringUtils.IsEmpty(i.TitleKey);
      var r = !StringUtils_1.StringUtils.IsEmpty(i.TextKey);
      this.GetItem(0).SetUIActive(e || r);
      this.RDt(i.TitleKey, i.TagColor);
      var e = this.GetText(4);
      if (r) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextKey);
      }
      e.SetUIActive(r);
      this.ToggleDataMap.clear();
      var h = [];
      let t = -1;
      for (let i = 0; i < s.length; i++) {
        var n;
        var o;
        var a = s[i];
        var U = a.v9n;
        var l = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(U);
        if (l) {
          if (a.go1) {
            t = i;
          }
          o = !(n = (a.ZI1?.s5n ?? 0) > 0) || a.ZI1.lMs >= a.ZI1.j6n;
          o = {
            Id: U,
            Icon: l.Icon,
            TitleId: l.TitleKey,
            DescId: l.TextKey,
            IsDisabled: !o,
            ProgressId: n ? l.ProcessText : undefined,
            ProgressParams: n ? [a.ZI1.lMs.toString(), a.ZI1.j6n.toString()] : undefined
          };
          h.push(o);
          this.ToggleDataMap.set(U, o);
        }
      }
      if (t >= 0) {
        for (let i = 0; i < h.length; i++) {
          h[i].IsDisabled = t !== i;
        }
      }
      await this.ToggleLayout.RefreshByDataAsync(h, true);
      this.SetActive(true);
      TimerSystem_1.TimerSystem.Delay(() => {
        this.J6u = true;
        this.CanInteractCallback?.(this.StepId, this.StepType);
      }, CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueEventChoiceForbiddenDuration") ?? 100);
    }
  }
  RDt(i, t) {
    var s = this.GetText(2);
    var e = this.GetSprite(3);
    var r = this.GetItem(1);
    if (StringUtils_1.StringUtils.IsEmpty(i)) {
      r.SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, i);
      if (t) {
        s = UE.Color.FromHex(t);
        e.SetColor(s);
      }
      r.SetUIActive(true);
    }
  }
}
exports.GridEventChoice = GridEventChoice;
class GridEventChoiceToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.LVi = 0;
    this.OnExtendToggleStateChanged = undefined;
    this.OnCanExecuteChangeFunc = undefined;
    this.N8e = () => {
      this.OnExtendToggleStateChanged?.(this.GetExtendToggle(0).GetToggleState(), this.LVi);
    };
    this.Lke = () => !this.OnCanExecuteChangeFunc || this.OnCanExecuteChangeFunc(this.GetExtendToggle(0).GetToggleState(), this.LVi);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIExtendToggleSpriteTransition], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
  }
  Refresh(i, t, s) {
    this.LVi = i.Id;
    var e = this.GetText(5);
    var r = this.GetText(3);
    var h = this.GetText(4);
    var n = i.IsDisabled ? 2 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(n);
    const o = this.GetSprite(1);
    this.SetSpriteByPath(i.Icon, o, false, undefined, () => {
      this.GetUiExtendToggleSpriteTransition(2).SetAllStateSprite(o.GetSprite());
    });
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, i.TitleId);
    h.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(i.DescId));
    if (i.DescId) {
      if (i.DescParams) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, i.DescId, ...i.DescParams);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, i.DescId);
      }
    }
    e.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(i.ProgressId));
    if (i.ProgressId) {
      if (i.ProgressParams) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.ProgressId, ...i.ProgressParams);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.ProgressId);
      }
    }
    n = !StringUtils_1.StringUtils.IsEmpty(i.DescId) || !StringUtils_1.StringUtils.IsEmpty(i.ProgressId);
    this.GetItem(6).SetUIActive(n);
  }
}
class GridEventChoiceFinish extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIExtendToggleSpriteTransition], [3, UE.UIItem]];
  }
  Refresh(i) {
    var t = this.GetText(0);
    if (!StringUtils_1.StringUtils.IsEmpty(i.Icon)) {
      const s = this.GetSprite(1);
      this.SetSpriteByPath(i.Icon, s, false, undefined, () => {
        this.GetUiExtendToggleSpriteTransition(2).SetAllStateSprite(s.GetSprite());
      });
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.TitleId);
  }
}
//# sourceMappingURL=GridEventCompChoice.js.map