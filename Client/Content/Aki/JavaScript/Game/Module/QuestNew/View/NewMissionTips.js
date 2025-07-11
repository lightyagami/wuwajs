"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewMissionTips = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class NewMissionTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this._no = "";
    this.uno = "";
    this.mNe = 5;
    this.cno = false;
    this.mno = () => {
      var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.uno);
      this.GetText(0)?.SetText(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  OnBeforeCreate() {
    super.OnBeforeCreate();
    var i = this.OpenParam;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
    if (e) {
      this._no = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e.QuestMarkId) ?? "";
      this.uno = e.NameKey;
      this.mNe = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(e.Type) ?? 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "Quest:NewMissionTips.OnBeforeCreate 找不到任务", ["questId", i]);
      }
      this.CloseMe();
    }
  }
  OnStart() {
    super.OnStart();
    var i = this.GetSprite(1);
    if (i && !StringUtils_1.StringUtils.IsBlank(this._no)) {
      this.SetSpriteByPath(this._no, i, false);
      i.SetUIActive(true);
    }
    var i = this.GetText(0);
    i.OnSelfLanguageChange.Bind(this.mno);
    this.mno();
    i.SetUIActive(true);
  }
  OnTick(i) {
    this.mNe = Math.max(this.mNe - i / 1000 * Time_1.Time.TimeDilation, 0);
    if (this.mNe <= 0 && !this.cno) {
      this.$Oe();
    }
  }
  $Oe() {
    this.cno = true;
    this.CloseMe();
  }
}
exports.NewMissionTips = NewMissionTips;
//# sourceMappingURL=NewMissionTips.js.map