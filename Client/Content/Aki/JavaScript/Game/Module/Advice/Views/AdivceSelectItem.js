"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceSelectItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SPRITEONE = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnOne.SP_AdviceBtnOne";
const SPRITETWO = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnTwo.SP_AdviceBtnTwo";
const SPRITETHREE = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnThree.SP_AdviceBtnThree";
const SPRITEEXPRESSION = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnbiaoqing.SP_AdviceBtnbiaoqing";
const SPRITECHANGE = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnHuan.SP_AdviceBtnHuan";
const SPRITEADD = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnJia.SP_AdviceBtnJia";
const SPRITEDECREASE = "/Game/Aki/UI/UIResources/UiAdvice/Atlas/SP_AdviceBtnJian.SP_AdviceBtnJian";
class AdviceSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.J9e = new Array();
    this.z9e = new Array();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
  }
  RefreshView(e) {
    this.Z9e();
    let i = 0;
    let s = 0;
    e.forEach(e => {
      var t;
      if (e.GetIndex() !== 4) {
        (t = this.e7e(i)).GetRootItem().SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem);
        t.RefreshView(e);
        i++;
      } else {
        this.t7e(s).GetRootItem().SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem);
        s++;
      }
    });
  }
  Z9e() {
    this.J9e.forEach(e => {
      e.GetRootItem().SetUIActive(false);
      e.GetRootItem().SetUIParent(this.RootItem);
    });
    this.z9e.forEach(e => {
      e.GetRootItem().SetUIActive(false);
      e.GetRootItem().SetUIParent(this.RootItem);
    });
  }
  e7e(e) {
    if (this.J9e.length > e) {
      this.J9e[e].GetRootItem().SetUIActive(true);
      return this.J9e[e];
    } else {
      (e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), undefined)).SetUIActive(true);
      e = new AdviceSelectBtnContentItem(e);
      this.J9e.push(e);
      return e;
    }
  }
  t7e(e) {
    if (this.z9e.length > e) {
      this.z9e[e].GetRootItem().SetUIActive(true);
      return this.z9e[e];
    } else {
      (e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), undefined)).SetUIActive(true);
      e = new AdviceSelectLineContentItem(e);
      this.z9e.push(e);
      return e;
    }
  }
}
exports.AdviceSelectItem = AdviceSelectItem;
class AdviceSelectBtnContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Pe = undefined;
    this.i7e = () => {
      var e;
      if (this.Pe.GetIndex() === 0 || this.Pe.GetIndex() === 2) {
        e = this.Pe.GetIndex() === 0 ? 0 : 1;
        if ((e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(e)) > 0) {
          e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(e);
          this.GetText(1).SetText(e);
          this.GetText(1).useChangeColor = true;
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "AdviceFunc_1");
          this.GetText(1).useChangeColor = false;
        }
      }
    };
    this.o7e = () => {
      var e;
      if (this.Pe.GetIndex() === 1) {
        if ((e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId) > 0) {
          e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(e);
          this.GetText(1).SetText(e);
          this.GetText(1).useChangeColor = true;
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "AdviceFunc_1");
          this.GetText(1).useChangeColor = false;
        }
      }
    };
    this.r7e = () => {
      this.n7e();
      this.s7e();
    };
    this.a7e = () => {
      ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId = 0;
      this.s7e();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectAdviceExpression);
    };
    this.h7e = () => {
      ModelManager_1.ModelManager.AdviceModel.PreSelectAdviceItemId = this.Pe.GetIndex();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceSelectItem);
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.h7e], [3, this.a7e]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectAdviceExpression, this.r7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectAdviceWord, this.i7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeAdviceWord, this.o7e);
  }
  n7e() {
    var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
    if (this.Pe.GetIndex() === 3) {
      if (e !== 0) {
        e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e);
        this.GetText(1).ShowTextNew(e.Name);
        this.GetText(1).useChangeColor = true;
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "AdviceFunc_2");
        this.GetText(1).useChangeColor = false;
      }
    }
  }
  RefreshView(e) {
    this.Pe = e;
    this.l7e();
    this._7e();
    this.u7e();
    this.i7e();
    this.o7e();
    this.s7e();
  }
  s7e() {
    var e;
    if (this.Pe.GetIndex() === 3) {
      e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
      this.GetButton(3).RootUIComp.SetUIActive(e !== 0);
    } else {
      this.GetButton(3).RootUIComp.SetUIActive(false);
    }
  }
  _7e() {
    var e = this.Pe.GetIndex();
    if (e !== 0 && e !== 1 && e !== 2 && e !== 5 && e === 3) {
      this.n7e();
    }
  }
  l7e() {
    var e = this.Pe.GetIndex();
    let t = "";
    if (e === 0 || e === 1 || e === 2) {
      t = "AdviceFunc_1";
    } else if (e === 5) {
      t = "AdviceFunc_3";
    } else if (e === 3) {
      t = "AdviceFunc_2";
    } else if (e === 6) {
      t = ModelManager_1.ModelManager.AdviceModel.CurrentLineModel === 0 ? "AdviceFunc_4" : "AdviceFunc_5";
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
  }
  u7e() {
    var e = this.Pe.GetIndex();
    let t = "";
    if (e === 0) {
      t = SPRITEONE;
    } else if (e === 1) {
      t = SPRITETWO;
    } else if (e === 2) {
      t = SPRITETHREE;
    } else if (e === 5) {
      t = SPRITECHANGE;
    } else if (e === 3) {
      t = SPRITEEXPRESSION;
    } else if (e === 6) {
      t = ModelManager_1.ModelManager.AdviceModel.CurrentLineModel === 0 ? SPRITEADD : SPRITEDECREASE;
    }
    this.SetSpriteByPath(t, this.GetSprite(2), false);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectAdviceExpression, this.r7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectAdviceWord, this.i7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeAdviceWord, this.o7e);
  }
}
class AdviceSelectLineContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
}
//# sourceMappingURL=AdivceSelectItem.js.map