/*
* Tencent is pleased to support the open source community by making Puerts available.
* Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
* Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may be subject to their corresponding license terms.
* This file is subject to the terms and conditions defined in file 'LICENSE', which is part of this source code package.
*/

var global = global || (function () { return this; }());
(function (global) {
    "use strict";
    
    let levels = ['log', 'info', 'warn', 'error']

    let sendRequestSync = puerts.sendRequestSync;
    
    let tgjsLog = global.__tgjsLog || function(nlevel, msg) {
        sendRequestSync(levels[nlevel], msg);
    }
    global.__tgjsLog = undefined;

    const console_org = global.console;
    var console = {}

    function log(level, args) {
        tgjsLog(level, Array.prototype.map.call(args, x => {
            try {
                return x+'';
            } catch (err){
                return err;
            }
        }).join(','));
    }

    console.log = function() {
        // if (console_org) console_org.log.apply(null, Array.prototype.slice.call(arguments));   // Kuro
        log(0, arguments);
    }

    console.info = function() {
        // if (console_org) console_org.info.apply(null, Array.prototype.slice.call(arguments));    // Kuro
        log(1, arguments);
    }

    console.warn = function() {
        // if (console_org) console_org.warn.apply(null, Array.prototype.slice.call(arguments));    // Kuro
        log(2, arguments);
    }

    console.error = function() {
        // if (console_org) console_org.error.apply(null, Array.prototype.slice.call(arguments));   // Kuro
        log(3, arguments);
    }

    var consoleEx = {}
    consoleEx.log = function(content) {
        // if (console_org) console_org.log.apply(null, Array.prototype.slice.call(arguments));   // Kuro
        tgjsLog(0, content);
    }

    consoleEx.info = function(content) {
        // if (console_org) console_org.info.apply(null, Array.prototype.slice.call(arguments));    // Kuro
        tgjsLog(1, content);
    }

    consoleEx.warn = function(content) {
        // if (console_org) console_org.warn.apply(null, Array.prototype.slice.call(arguments));    // Kuro
        tgjsLog(2, content);
    }

    consoleEx.error = function(content) {
        // if (console_org) console_org.error.apply(null, Array.prototype.slice.call(arguments));   // Kuro
        tgjsLog(3, content);
    }

    // Kuro begin
    // 禁止游戏业务代码使用console，使用logger代替
    var newConsole = {};
    newConsole.log = function() { console.error('console已弃用，使用Log输出日志！', (new Error()).stack); }
    newConsole.info = function() { console.error('console已弃用，使用Log输出日志！', (new Error()).stack); }
    newConsole.warn = function() { console.error('console已弃用，使用Log输出日志！', (new Error()).stack); }
    newConsole.error = function() { console.error('console已弃用，使用Log输出日志！', (new Error()).stack); }

    global.puerts.console = newConsole;
    global.console = newConsole;

    global.puerts.logger = consoleEx;
    global.logger = console;
    // Kuro end
}(global));
