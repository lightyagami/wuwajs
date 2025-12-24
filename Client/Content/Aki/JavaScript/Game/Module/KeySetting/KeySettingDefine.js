"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keySettingDeviceInfoRecord = exports.menuKeySettingExclusiveTypeList = exports.KeySettingExclusiveTypeData = undefined;
class KeySettingExclusiveTypeData {
  constructor() {
    this.Type = 0;
    this.NameTextId = undefined;
    this.IconSpritePath = undefined;
  }
}
exports.KeySettingExclusiveTypeData = KeySettingExclusiveTypeData;
exports.menuKeySettingExclusiveTypeList = [0, 2];
exports.keySettingDeviceInfoRecord = {
  [0]: {
    DeviceType: 0,
    NameTextId: ""
  },
  1: {
    DeviceType: 1,
    NameTextId: "Text_KeyBoard_Text"
  },
  2: {
    DeviceType: 2,
    NameTextId: "Text_Handle_Text"
  }
}; //# sourceMappingURL=KeySettingDefine.js.map