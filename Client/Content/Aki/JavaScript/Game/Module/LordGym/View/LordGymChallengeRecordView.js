"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDownTitle = exports.LordGymChallengeRecordView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const DropDownItemBase_1 = require("../../Common/DropDown/Item/DropDownItemBase");
const TitleItemBase_1 = require("../../Common/DropDown/Item/TitleItemBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LordGymDefine_1 = require("../LordGymDefine");
const LordRecordItemView_1 = require("./LordRecordItemView");
const MIN_DIFFICULTY = 1;
const MAX_DIFFICULTY = 6;
class LordGymChallengeRecordView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.wSi = 1;
    this.vDt = LordGymDefine_1.NONE_FILTER_TYPE;
    this.BFl = undefined;
    this.BSi = undefined;
    this.bSi = undefined;
    this.IJl = 0;
    this.qFl = 0;
    this.qSi = (i, e) => {
      return new DropDownItem(i);
    };
    this.GSi = i => {
      return new DropDownTitle(i);
    };
    this.NSi = (i, e) => {
      this.vDt = e.Id;
      this.OSi();
    };
    this.kSi = () => {
      this.wSi = Math.max(MIN_DIFFICULTY, this.wSi - 1);
      this.OSi();
    };
    this.FSi = () => {
      this.wSi = Math.min(MAX_DIFFICULTY, this.wSi + 1);
      this.OSi();
    };
    this.VSi = () => new LordRecordItemView_1.LoadRecordItemView();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText]];
    this.BtnBindInfo = [[3, this.kSi], [4, this.FSi]];
  }
  async OnBeforeStartAsync() {
    var i;
    this.IJl = this.OpenParam;
    if (this.IJl) {
      i = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(this.IJl);
      i = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(i[0]);
      this.qFl = i.FilterType;
    }
    this.BSi = new CommonDropDown_1.CommonDropDown(this.GetItem(5), this.qSi, this.GSi);
    await this.BSi.Init();
  }
  OnStart() {
    this.BFl = ConfigManager_1.ConfigManager.LordGymConfig.GetAllLordGymFilterTypeConfig();
    this.BSi.InitScroll(this.BFl, i => i);
    this.BSi?.SetOnSelectCall(this.NSi);
    this.BSi?.SetShowType(1);
    this.bSi = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.VSi);
    let e = 0;
    if (this.qFl) {
      for (let i = 0; i < this.BFl.length; i++) {
        if (this.BFl[i].Id === this.qFl) {
          e = i;
          break;
        }
      }
    }
    this.BSi?.SetSelectedIndex(e);
    this.NSi(e, this.BFl[e]);
  }
  OnBeforeDestroy() {
    this.BSi?.Destroy();
    this.BSi = undefined;
  }
  HSi() {
    let i = undefined;
    var e = ConfigManager_1.ConfigManager.LordGymConfig;
    var t = e.GetLordGymAllConfigByDifficulty(this.wSi);
    t?.filter(i => !i.IsDebug);
    i = this.vDt === LordGymDefine_1.NONE_FILTER_TYPE ? ConfigCommon_1.ConfigCommon.ToList(t) : t?.filter(i => i.FilterType === this.vDt);
    if (this.IJl) {
      t = e.GetLordGymEntranceLordList(this.IJl);
      if (t.length < this.wSi || this.wSi <= 0) {
        return i;
      }
      const s = t[this.wSi - 1];
      i?.sort((i, e) => i.Id === s ? -1 : i.Id - e.Id);
    }
    return i;
  }
  OSi() {
    this.GetButton(3)?.SetSelfInteractive(this.wSi !== MIN_DIFFICULTY);
    this.GetButton(4)?.SetSelfInteractive(this.wSi !== MAX_DIFFICULTY);
    var i = this.HSi();
    if (i) {
      this.bSi.RefreshByData(i);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "LordGymDifficulty", this.wSi);
  }
}
exports.LordGymChallengeRecordView = LordGymChallengeRecordView;
class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
  }
  OnShowDropDownItemBase(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name);
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
}
const TEXT_INDEX = 0;
class DropDownTitle extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[TEXT_INDEX, UE.UIText]];
  }
  ShowTemp(i, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(TEXT_INDEX), i.Name);
  }
}
exports.DropDownTitle = DropDownTitle;
//# sourceMappingURL=LordGymChallengeRecordView.js.map