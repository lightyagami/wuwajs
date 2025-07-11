"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDetailDescComponent = exports.VisionDetailDesc = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const HelpController_1 = require("../../../Help/HelpController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
const NORMALCOLOR = "EBE5D7FF";
const GREENCOLOR = "97FF86FF";
const GRAYCOLOR = "ADADADFF";
const COUNTERHELPID = 59;
class VisionDetailDesc {
  constructor() {
    this.Title = "";
    this.TitleItemShowState = true;
    this.JumpCallBack = undefined;
    this.NeedActiveState = false;
    this.GreenActiveState = false;
    this.NewState = false;
    this.FetterId = 0;
    this.FetterData = undefined;
    this.IfMainPosition = false;
    this.EmptyState = false;
    this.EmptyText = "";
    this.EmptyContentText = "";
    this.SkillConfig = undefined;
    this.Level = 0;
    this.FetterGroupId = 0;
    this.X8i = true;
    this.DoNotNeedCheckSimplyState = false;
    this.NeedSimplyStateChangeAnimation = false;
    this.AnimationState = true;
    this.Quality = 0;
    this.TitleType = -1;
    this.EquipSameMonster = false;
    this.EquipOverNeed = false;
    this.CompareState = false;
  }
  SetNeedCheckChangeColor(t) {
    this.X8i = t;
  }
  GetNeedCheckChangeColor() {
    return this.X8i;
  }
  GetNeedWarn() {
    return this.EquipSameMonster || this.EquipOverNeed;
  }
  static CreateEmptySkillDescData() {
    var t = new Array();
    var i = new VisionDetailDesc();
    i.TitleItemShowState = true;
    i.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionSkillTitle") ?? "";
    i.EmptyState = true;
    i.EmptyText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MainVisionEmpty") ?? "";
    i.TitleType = 0;
    t.push(i);
    return t;
  }
  static CreateEmptyFetterDescData() {
    var t = new Array();
    var i = new VisionDetailDesc();
    i.TitleItemShowState = true;
    i.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionFetterTitle") ?? "";
    i.EmptyState = true;
    i.EmptyText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FetterEmpty") ?? "";
    i.TitleType = 1;
    t.push(i);
    return t;
  }
  static CreateSameMonsterTips() {
    var t = new Array();
    var i = new VisionDetailDesc();
    i.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionFetterTitle") ?? "";
    i.EquipSameMonster = true;
    i.TitleItemShowState = false;
    t.push(i);
    return t;
  }
  static CreateOverNeedTips() {
    var t = new Array();
    var i = new VisionDetailDesc();
    i.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionFetterTitle") ?? "";
    i.EquipOverNeed = true;
    i.TitleItemShowState = false;
    t.push(i);
    return t;
  }
  static ConvertVisionSkillDescToDescData(t, i, e, s, r) {
    var n = new Array();
    var h = new VisionDetailDesc();
    h.TitleItemShowState = true;
    h.SkillConfig = t;
    h.Level = i;
    h.Quality = r;
    h.IfMainPosition = e && !s;
    h.NeedActiveState = true;
    h.GreenActiveState = !!e && !s;
    var i = t.IfCounterSkill;
    if (i) {
      h.JumpCallBack = () => {
        HelpController_1.HelpController.OpenHelpById(COUNTERHELPID);
      };
      h.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionCounterSkillText") ?? "";
    } else {
      h.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionSkillTitle") ?? "";
    }
    n.push(h);
    return n;
  }
  static ConvertVisionFetterDataToDetailDescData(i, e, s, r = undefined) {
    var n = new Array();
    var h = i.length;
    for (let t = 0; t < h; t++) {
      var a = new VisionDetailDesc();
      if (t >= 1) {
        a.TitleItemShowState = false;
      }
      a.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionFetterTitle") ?? "";
      a.NeedActiveState = true;
      a.NewState = i[t].NewAdd;
      a.EquipSameMonster = e;
      a.EquipOverNeed = s ?? false;
      if (i[t].ActiveState || i[t].NewAdd) {
        a.GreenActiveState = true;
      } else {
        a.GreenActiveState = false;
      }
      a.FetterGroupId = i[t].FetterGroupId;
      a.FetterId = i[t].FetterId;
      a.FetterData = i[t];
      a.JumpCallBack = r;
      n.push(a);
    }
    return n;
  }
}
exports.VisionDetailDesc = VisionDetailDesc;
class VisionDetailDescComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.wqe = undefined;
    this.$8i = undefined;
    this.Y8i = undefined;
    this.J8i = undefined;
    this.z8i = false;
    this.Z8i = () => {
      if (this.z8i) {
        this.GetScrollViewWithScrollbar(0)?.ScrollTo(this.GetItem(2));
      }
    };
    this.e9i = () => {
      if (this.$8i) {
        this.$8i.forEach(t => {
          t.NeedSimplyStateChangeAnimation = true;
        });
        this.Refresh(this.$8i, true);
      }
    };
    this.t9i = () => {
      this.z8i = false;
    };
    this.wqe = t;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIVerticalLayout]];
  }
  async OnBeforeStartAsync() {
    this.Y8i = new VisionDetailDescItem(this.GetItem(1));
    await this.Y8i.Init();
    this.Y8i.SetActive(true);
    this.J8i = new VisionDetailDescItem(this.GetItem(2));
    await this.J8i.Init();
    this.J8i.SetActive(true);
    this.GetVerticalLayout(3)?.OnRebuildLayoutDelegate.Bind(this.Z8i);
  }
  OnStart() {
    this.mSe();
  }
  GetTxtItemByIndex(t) {
    if (t === 0) {
      return this.GetItem(1);
    } else if (t === 1) {
      this.z8i = true;
      return this.GetItem(2);
    } else {
      return undefined;
    }
  }
  mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeVisionSimplyState, this.e9i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupFinished, this.t9i);
  }
  dSe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeVisionSimplyState, this.e9i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupFinished, this.t9i);
  }
  Refresh(t, i = 0) {
    this.$8i = t;
    const e = new Array();
    const s = new Array();
    t.forEach(t => {
      if (t.SkillConfig || t.TitleItemShowState && t.TitleType === 0) {
        e.push(t);
      }
      if (t.FetterId > 0 || t.TitleItemShowState && t.TitleType === 1 || t.GetNeedWarn()) {
        s.push(t);
      }
    });
    this.Y8i?.Update(e);
    this.J8i?.Update(s);
    t.forEach(t => {
      t.NeedSimplyStateChangeAnimation = false;
    });
  }
  OnBeforeDestroy() {
    this.dSe();
  }
}
exports.VisionDetailDescComponent = VisionDetailDescComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.wqe = undefined;
    this.CurrentData = undefined;
    this.Pe = undefined;
    this.eGe = undefined;
    this.sGe = () => new VisionDetailDescContentItem();
    this.i9i = () => {
      if (this.Pe && this.Pe.JumpCallBack) {
        this.Pe.JumpCallBack();
      }
    };
    this.wqe = t;
  }
  Clear() {}
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
    this.SetUiActive(true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIItem]];
    this.BtnBindInfo = [[1, this.i9i]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.sGe);
    this.GetItem(3).SetUIActive(false);
  }
  Update(t) {
    let i = undefined;
    const e = new Array();
    t.forEach(t => {
      if ((t.SkillConfig || t.TitleItemShowState && t.TitleType === 0) && (i = t).SkillConfig) {
        e.push(i);
      }
      if ((t.FetterId > 0 || t.TitleItemShowState && t.TitleType === 1 || t.GetNeedWarn()) && (t.TitleItemShowState && (i = t), t.FetterId > 0 || t.GetNeedWarn())) {
        e.push(t);
      }
    });
    if (this.Pe = i) {
      this.mGe(i);
      this.o9i(i);
      this.Oxt(i);
      this.kxt(i);
      this.Vxt(i);
      this.Pqe(e);
    }
  }
  Pqe(t) {
    this.eGe?.RefreshByData(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t.Title);
  }
  o9i(t) {
    this.GetButton(1).RootUIComp.SetUIActive(t.JumpCallBack !== undefined && !t.CompareState);
  }
  Oxt(t) {
    this.GetItem(2).SetUIActive(t.EmptyState);
    if (t.EmptyState) {
      this.GetItem(8).SetUIActive(t.TitleType === 0);
    }
  }
  Vxt(t) {
    this.GetText(5).SetText(t.EmptyText);
  }
  kxt(t) {
    this.GetItem(4).SetUIActive(t.TitleItemShowState);
  }
}
class VisionDetailDescContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.r9i = true;
    this.CurrentData = undefined;
    this.bxt = undefined;
    this.Pe = undefined;
  }
  Refresh(t, i, e) {
    this.Update(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [6, UE.UIText], [5, UE.UIItem], [1, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(5));
    await this.bxt.Init();
    this.bxt.SetActive(true);
    this.SetUiActive(true);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7));
  }
  Update(t) {
    this.Pe = t;
    if (this.Pe) {
      this.n9i(t);
      this.s9i(t);
      this.Dke(t);
      this.Hxt(t);
      this.a9i(t);
      this.h9i(t);
      this.l9i(t);
    }
  }
  l9i(t) {
    if (t.NeedSimplyStateChangeAnimation && t.AnimationState) {
      this.SPe.StopSequenceByKey("Switch", false, true);
      this.SPe.PlayLevelSequenceByName("Switch");
    }
  }
  h9i(e) {
    if (this.r9i && e.AnimationState) {
      let t = undefined;
      let i = false;
      if (e.GreenActiveState && e.NewState && e.FetterId > 0) {
        t = "Choose";
        i = true;
      }
      if (e.FetterId > 0 && !i && e.FetterData.ActiveState) {
        t = "Activate";
      }
      var s = this.SPe.GetCurrentSequence();
      if (s !== undefined && t !== s) {
        this.SPe.StopSequenceByKey(s, false, true);
      }
      if (t !== undefined) {
        if (t !== s) {
          this.SPe.PlayLevelSequenceByName(t);
        } else {
          this.SPe.ReplaySequenceByKey(t);
        }
      }
      this.GetItem(10)?.SetUIActive(e.GetNeedWarn() && t === undefined);
    } else {
      this.GetItem(10)?.SetUIActive(e.GetNeedWarn());
    }
  }
  s9i(t) {
    this.GetItem(0).SetUIActive(t.NeedActiveState || t.GetNeedWarn());
  }
  n9i(t) {
    if (t.NeedActiveState) {
      this.GetItem(2).SetUIActive(t.GreenActiveState);
    } else if (t.GetNeedWarn()) {
      this.GetItem(2).SetUIActive(false);
    }
  }
  a9i(t) {
    if (t.GreenActiveState && !t.NewState && t.FetterId > 0 || t.GetNeedWarn() || t.GreenActiveState && t.SkillConfig) {
      this.GetItem(1).SetUIActive(false);
    } else {
      this.GetItem(1).SetUIActive(true);
    }
  }
  Hxt(e) {
    if (e.FetterId > 0) {
      this.GetItem(5).SetUIActive(true);
      var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e.FetterGroupId);
      this.bxt.Update(s);
      let t = e.FetterData.ActiveFetterGroupNum > e.FetterData.NeedActiveNum ? e.FetterData.NeedActiveNum : e.FetterData.ActiveFetterGroupNum;
      if (e.EquipOverNeed) {
        t = e.FetterData.ActiveFetterGroupNum;
      }
      s = StringUtils_1.StringUtils.Format("({0}/{1})", t.toString(), e.FetterData.NeedActiveNum.toString());
      let i = NORMALCOLOR;
      i = e.FetterData.ActiveState ? GREENCOLOR : GRAYCOLOR;
      this.GetText(9).SetText(s);
      this.GetText(9).SetColor(UE.Color.FromHex(i));
    } else {
      this.GetItem(5).SetUIActive(false);
    }
  }
  Dke(i) {
    if (!i.GetNeedWarn() || i.FetterId > 0) {
      let t = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
      t = !t;
      if (i.DoNotNeedCheckSimplyState) {
        t = true;
      }
      if (i.FetterId > 0) {
        var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(i.FetterId);
        var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "";
        this.GetText(4).SetText(s);
        if (t) {
          if (StringUtils_1.StringUtils.IsEmpty(e.SimplyEffectDesc)) {
            this.GetText(6).SetText("");
          } else {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.SimplyEffectDesc);
          }
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.EffectDescription, ...e.EffectDescriptionParam);
        }
        this.GetText(4).SetUIActive(true);
        this.GetText(6).SetUIActive(true);
        if (i.GetNeedCheckChangeColor()) {
          let t = NORMALCOLOR;
          t = i.FetterData.ActiveState ? GREENCOLOR : GRAYCOLOR;
          this.GetText(4).SetColor(UE.Color.FromHex(t));
          this.GetText(6).SetColor(UE.Color.FromHex(t));
        }
      } else if (i.SkillConfig) {
        if (t) {
          if (StringUtils_1.StringUtils.IsEmpty(i.SkillConfig.SimplyDescription)) {
            this.GetText(6).SetText("");
          } else {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.SkillConfig.SimplyDescription);
          }
        } else {
          s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(i.SkillConfig.Id, i.Quality);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.SkillConfig.DescriptionEx, ...s);
        }
        this.GetItem(8).SetUIActive(false);
        this.GetText(6).SetUIActive(true);
        if (i.GetNeedCheckChangeColor()) {
          let t = GRAYCOLOR;
          if (i.IfMainPosition) {
            t = GREENCOLOR;
          }
          this.GetText(6).SetColor(UE.Color.FromHex(t));
        }
      }
    } else {
      e = this.GetText(6);
      this.GetItem(8).SetUIActive(false);
      e.SetUIActive(true);
      this.GetText(4).SetUIActive(false);
      e.SetColor(UE.Color.FromHex(GRAYCOLOR));
      s = i.EquipSameMonster ? "SameVisionNoCountValue" : "OverNeedWarnText";
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, s);
    }
  }
  OnBeforeHide() {
    this.SPe.StopCurrentSequence();
  }
}
//# sourceMappingURL=VisionDetailDescComponent.js.map