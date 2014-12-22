/*******************************************************
* 名称：遵循Bootstrap相关ui规范的自定义WEB键盘工具
* 作者：Beven
* 描述：默认包含两个键盘即 完整键盘 与单纯的数字键盘 当然也可以自己扩展键盘
*********************************************************/
(function ($) {
    'use strict';

    //功能
    function Keyboard(element, options) {
        this.init(element, options);
    }
    //插件
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.keyboard')
            var options = typeof option == 'object' && option
            if (!data) $this.data('bs.keyboard', (data = new Keyboard(this, options)))
            else {
                data.toggle();
            }
        });
    }
    //版本
    Keyboard.VERSION = "1.0.0";
    //默认配置
    Keyboard.DEFAULTS = {
        keyboard: 'all', // 键盘类型：默认为基本键盘 值： all/digit/customer,
        mykeyboard: null,
        shown: null,
        closen: null,
        hover: null,
        top: null,
        left: null,
        parent: null
    }
    //当前活跃的输入框
    Keyboard.INPUT = null;
    Keyboard.TIMERS = {};
    Keyboard.KEYS = {
        ctrl: { "192": "~", "49": "!", "50": "@", "51": "#", "52": "$", "53": "%", "54": "^", "55": "&", "56": "*", "57": "(", "48": ")", "189": "_", "187": "+", "219": "{", "221": "}", "220": "|", "186": ":", "222": "\"", "190": ">", "191": "?", "188": "<" },
        specs: { "219": "[", "221": "]", "220": "\\\\", "186": ";", "222": "'", "188": ",", "190": ".", "191": "/", "189": "-", "187": "=", "9": "tab", "20": "caps", "13": "enter", "8": "bksp" }
    };

    //支持
    Keyboard.support = function () {
        var old = $.fn.keyboard
        $.fn.keyboard = Plugin
        $.fn.keyboard.Constructor = Keyboard
        $.fn.keyboard.noConflict = function () {
            $.fn.keyboard = old
            return this
        }
    }
    //聚焦当前活跃的表单
    Keyboard.focusOn = function (e) {
        this.INPUT && this.INPUT.focus();
        e && e.stopPropagation();
    }
    //监听表单
    Keyboard.listener = function (e) {
        var target = $(e.srcElement || e.target);
        if (!target.is('[data-toggle="keyboard"]')) {
            this.INPUT = target;
        }
    }
    //判断指定dom元素是否可以输入值
    Keyboard.isReader = function (inp) {
        return inp && inp.is("input,select,textarea") && inp.not("input[readonly],:button,:image,:hidden,:file,:submit,:reset,:radio,:checkbox,:disabled");
    }
    //按一定事件指定指定函数
    Keyboard.timerRun = function (name, fn, invoker, timeout, args, afterTimeout) {
        timeout = timeout || 200;
        Keyboard.TIMERS[name] = setTimeout(function () {
            Keyboard.timerStop(name);
            Keyboard.do(fn, invoker, args);
            Keyboard.timerRun(name, fn, invoker, (afterTimeout || timeout), args);
        }, timeout);
    }
    //取消timeout
    Keyboard.timerStop = function (name) {
        clearTimeout(Keyboard.TIMERS[name]);
    }
    //委托执行
    Keyboard.do = function (fn, invokder, args) {
        if (typeof fn == 'function') {
            return fn.apply(invokder, args);
        }
    }
    //获取一个托管执行函数
    Keyboard.bind = function (fn, arg1, argN) {
        var self = this;
        var args = Array.prototype.splice.call(arguments, 1);
        return function () {
            return fn.apply(self, args.concat.apply(args, arguments));
        }
    }
    //输入框回退
    Keyboard.bksp = function () {
        var inp = Keyboard.INPUT;
        if (Keyboard.isReader(inp)) {
            var pos = Keyboard.getCursorPosition(inp);
            if (pos < 0) { return; }
            var v = inp.val();
            v = (v.substring(0, pos - 1) + v.substring(pos, v.length));
            inp.val(v);
            pos = (pos - 1);
            pos = pos < 0 ? 0 : pos;
            Keyboard.markCursorPosition(inp, pos, pos);
            Keyboard.focusOn();
        }
    }
    //获取当前光标在输入框的位置
    Keyboard.getCursorPosition = function (target) {
        var pos = -1;
        if (Keyboard.isReader(target)) {
            var inp = target[0];
            if (document.selection) {
                inp.focus();
                var range = document.selection.createRange();
                range.moveStart('character', -inp.value.length);
                pos = range.text.length;
            } else if (inp.selectionStart) {
                pos = inp.selectionStart;
            }
        }
        //$(".logo").append("<span>" + pos + ",</span>");
        return pos;
    }
    //定位光标
    Keyboard.markCursorPosition = function (target, start, end) {
        if (isNaN(start) || start < 0) { return; }
        end = (end == null ? (start + 1) : end)
        if (Keyboard.isReader(target)) {
            var inp = target[0];
            if (document.selection) {
                document.selection
                inp.focus();
                var range = document.selection.createRange();
                range.collapse(true);
                range.moveStart('character', start);
                range.moveEnd('character', end - start);
                range.select();
            } else if (inp.selectionStart) {
                inp.selectionStart = start;
                inp.selectionEnd = end;
            }
        }
    }
    //获取光标前一个字符
    Keyboard.getCharOfPrevCursor = function (target) {
        var c = '';
        if (Keyboard.isReader(target)) {
            var pos = Keyboard.getCursorPosition(target) - 1;
            pos = pos < 0 ? 0 : pos;
            var v = target.val();
            c = v.substring(pos, pos + 1);
        }
        return c;
    }
    //根据输入的指定keyCode获取对应的字符
    Keyboard.getKeyStringFromCharCode = function (charCode, shift) {
        var char = null;
        if (shift) {
            char = Keyboard.KEYS.ctrl[charCode] || "";
        }
        if (char != null && char != '') {
            return char;
        }
        else if ((charCode > 46 && charCode < 59) || (charCode > 64 && charCode < 91)) {
            return String.fromCharCode(charCode);
        }
        return Keyboard.KEYS.specs[charCode] || "";
    }
    //构造键盘插件
    Keyboard.create = function (e) {
        Keyboard.prototype.stopParentAndDefault(e);
        var target = $((e.srcElement || e.target));
        var keyboard = target.attr("data-keyboard");
        var mykeyboard = target.attr("data-mykeyboard");
        var top = target.attr("data-top");
        var left = target.attr("data-left");
        var parent = target.attr("data-parent");
        var hover = target.attr("data-hover") == "true";
        var shown = target.attr("data-shown");
        var closen = target.attr("data-closen");
        Plugin.call(target, { keyboard: keyboard, closen: closen, shown: shown, mykeyboard: mykeyboard, hover: hover, top: top, left: left, parent: parent });
    }
    //初始化
    Keyboard.regist = function () {
        this.support();
        $(document)
        .on("click.bs.keyboard.data-api", '[data-toggle="keyboard"]', this.bind(this.create))
        .on('click.bs.keyboard.data-api', '.pos-bs-keyboard', this.bind(this.focusOn))
        .on('click', this.bind(this.listener));
    }
    //配置数据
    Keyboard.prototype.options = null;
    //键盘容器
    Keyboard.prototype.elementKeyboard = null;
    //获取一个托管执行函数
    Keyboard.prototype.bind = function (fn, arg1, argN) {
        return Keyboard.bind.apply(this, arguments);
    }
    //使用当前对象执行指定函数
    Keyboard.prototype.invoke = function (fn, arg1, argN) {
        return Keyboard.do(fn, this, Array.prototype.splice.call(arguments, 1));
    }
    //初始化功能
    Keyboard.prototype.init = function (element, options) {
        this.parseOptions(options);
        this.initKeyboard();
        this.initHandlers();
        this.open();
    }
    //解析参数
    Keyboard.prototype.parseOptions = function (options) {
        this.options = $.extend({}, Keyboard.DEFAULTS, options);
        this.catchEvent('shown');
        this.catchEvent('closen');
    }
    //抓取事件
    Keyboard.prototype.catchEvent = function (name) {
        if (typeof name == 'string') {
            this['on' + name] = window[name];
        } else {
            this['on' + name] = name;
        }
    }
    //执行事件
    Keyboard.prototype.doEvent = function (name) {
        Keyboard.do(this['on' + name], this);
    }
    //初始化事件
    Keyboard.prototype.initHandlers = function () {
        $(document).on('mousedown.bs.keyboard', '.key', this.bind(this.onKeyboardKeydown));
        $(document).mouseup(this.bind(this.onKeyboardKeyup));
        $(document).keydown(this.bind(this.onFormKeydown));
        $(document).keyup(this.bind(this.onFormKeyup));
    }
    //是目标表单元素聚焦
    Keyboard.prototype.focus = function () {
        Keyboard.focusOn();
    }
    //是否有设置参数
    Keyboard.prototype.has = function (name) {
        var v = this.options[name];
        return (v != null && v.replace(/\s/g, '') != '');
    }
    //初始化键盘面板
    Keyboard.prototype.initKeyboard = function () {
        var options = this.options;
        var html = '';
        switch (options.keyboard) {
            case 'custom':
                html = this.getCustomKeyboard();
                break;
            case 'digit':
                html = this.getDigitKeyboard();
                break;
            default:
                html = this.getNormalKeyboard();
                break;
        }
        var c = this.elementKeyboard = $('<div class="pos-bs-keyboard dialog" style="display:none"></div>');
        var p = this.has('parent') ? $(options.parent) : $(document.body);
        if (options.hover == true) {
            this.has('top') && c.css("top", options.top + "px");
            this.has('left') && c.css("left", options.top + "px");
        }
        c.html(html);
        p.append(c);
    }
    //初始化正常键盘
    Keyboard.prototype.getNormalKeyboard = function () {
        var keys = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '\\', '/', 1, 2, 3],
            ['Tab', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 4, 5, 6],
            ['大写锁定', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', ',', 7, 8, 9],
            ['收起键盘', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '00', '0', '.']
        ];
        var htmls = [];
        var cfg = null;
        htmls.push('<div class="pos-keyboard">');
        for (var i = 0, k = keys.length; i < k; i++) {
            htmls.push('<div class="row">');
            htmls.push('<div class="col-md-12">');
            for (var j = 0, kv = keys[i], n = kv.length; j < n; j++) {
                cfg = this.getKeyItemCfg(kv[j]);
                htmls.push('<i ' + cfg + '>' + kv[j] + '</i>');
            }
            htmls.push('</div>');
            htmls.push('</div>');
        }
        htmls.push('<div class="pos-keyboard-right">');
        htmls.push('<i data-match="bksp" data-down="pos-orange-active" class="key lg pos-orange block bd-family" data-event="bskp">删除</i>');
        htmls.push('<i data-match="enter" data-down="pos-orange-active" class="key lg pos-orange pos-enter bd-family" data-event="enter">确定</i></div>');
        htmls.push('</div>');
        return htmls.join('\n');
    }
    //初始化数字键盘
    Keyboard.prototype.getDigitKeyboard = function () {
        var htmls = [
            ''
        ];
        return htmls.join('\n');
    }
    //初始化用户自定义键盘
    Keyboard.prototype.getCustomKeyboard = function () {
        var options = this.options;
        var s = options.mykeyboard;
        var html = '';
        if (typeof s == 'function') {
            html = $(s).html();
            $(e).remove();
        }
        return html;
    }
    //阻止冒泡与默认事件行为
    Keyboard.prototype.stopParentAndDefault = function (e) {
        e && e.preventDefault && e.preventDefault();
        e && e.stopPropagation && e.stopPropagation();
    }
    //键盘按键按下事件
    Keyboard.prototype.onKeyboardKeydown = function (e) {
        var target = $(e.srcElement || e.target);
        var inp = Keyboard.INPUT;
        this.stopParentAndDefault(e);
        if (!this.dispatchKeyAction(target, e)) {
            this.focus();
            return;
        }
        if (Keyboard.isReader(inp)) {
            var v = this.getKeyItemCode(target);
            if (v) {
                this.syncAction(inp, v);
                Keyboard.timerRun('sync', this.syncAction, this, 800, [inp, v], 50);
            }
        }
    }
    //当输入框输入按下键时
    Keyboard.prototype.onFormKeydown = function (e) {
        if (e.keyCode == 16) { return; }
        if (this.elementKeyboard) {
            var char = Keyboard.getKeyStringFromCharCode(e.keyCode, e.shiftKey).toLowerCase();
            if (char == '') { return; }
            var k = this.elementKeyboard.find(".key[data-match='" + char + "']");
            k.addClass(k.attr("data-down"));
        }
        if (e.keyCode == 20) {
            this.capslk(this.elementKeyboard.find('.key[data-event="capslk"]'));
        }
    }
    //当输入框输入键释放按键
    Keyboard.prototype.onFormKeyup = function (e) {
        if (e.keyCode == 16) { return; }
        if (this.elementKeyboard) {
            var char = Keyboard.getKeyStringFromCharCode(e.keyCode, e.shiftKey).toLowerCase();
            if (char == '') { return; }
            var k = this.elementKeyboard.find(".key[data-match='" + char + "']");
            k.removeClass(k.attr("data-down"));
        }
    }
    //松开按键事件
    Keyboard.prototype.onKeyboardKeyup = function (e) {
        Keyboard.timerStop('sync');
        Keyboard.timerStop('bksp');
    }
    //设置指定表单指定值
    Keyboard.prototype.syncAction = function (inp, char) {
        var pos = Keyboard.getCursorPosition(inp);
        pos = pos < 0 ? 0 : pos;
        var v = inp.val();
        v = v.substring(0, pos) + char + v.substring(pos, v.length);
        inp.val(v);
        pos = pos + char.length;
        Keyboard.markCursorPosition(inp, pos, pos);
        this.focus();
    }
    //执行指定按钮事件
    Keyboard.prototype.dispatchKeyAction = function (target, e) {
        var ev = target.attr("data-event");
        if (ev) {
            if (this[ev]) {
                return this[ev](target, e, Keyboard.INPUT);
            }
        }
        return true;
    }
    //获取指定键的配置元数据
    Keyboard.prototype.getKeyItemCfg = function (key) {
        var cfg = '';
        switch (key) {
            case 'Tab':
                cfg = 'data-match="tab" data-down="pos-orange-active" class="key lg pos-orange" data-event="tab"';
                break;
            case '大写锁定':
                cfg = 'data-match="caps" data-down="pos-orange-active" class="key bd-family mlg pos-orange" data-event="capslk"';
                break;
            case '收起键盘':
                cfg = 'data-down="pos-orange-active" class="key bd-family blg pos-orange" data-event="close"';
                break;
            default:
                var isAlphabet = /[a-zA-Z]/.test(key);
                if (isAlphabet || !isNaN(key) || key == ".") {
                    cfg = 'data-match=\'' + key + '\' data-down="pos-gray-active" class="key lg pos-gray" data-value=\'' + key + '\'';
                } else {
                    cfg = 'data-match=\'' + key + '\' data-down="pos-white-active" class="key md pos-white" data-value=\'' + key + '\'';
                }
                if (isAlphabet) {
                    cfg = cfg + ' data-normal="' + key + '" data-upper="' + (key).toUpperCase() + '"';
                }
                break;
        }
        return cfg;
    }
    //获取按下键的值
    Keyboard.prototype.getKeyItemCode = function (target) {
        return target.attr("data-value");
    }
    //切换键盘是否显示
    Keyboard.prototype.toggle = function () {
        var c = this.elementKeyboard;
        if (c) {
            c.toggle();
        }
        this.focus();
    }
    //回退
    Keyboard.prototype.bskp = function () {
        Keyboard.bksp();
        Keyboard.timerRun('bksp', Keyboard.bksp, Keyboard, 500, [], 50);
    }
    //打开键盘
    Keyboard.prototype.open = function () {
        var c = this.elementKeyboard
        if (c) {
            c.show();
            this.doEvent('shown');
            this.focus();
        }
    }
    //关闭键盘
    Keyboard.prototype.close = function () {
        if (this.elementKeyboard) {
            this.elementKeyboard.hide();
            this.focus();
            this.doEvent('shown');
        }
    }
    //大写锁定
    Keyboard.prototype.capslk = function (target) {
        var elements = this.elementKeyboard.find(".key[data-upper]");
        var self = this;
        var lk = target.data('capslk') == true;
        if (lk) {
            target.html("大写锁定");
        } else {
            target.html("取消大写");
        }
        elements.each(function () {
            var item = $(this);
            var v = self.getKeyItemCode(item);
            var bv = item.attr("data-upper");
            var nv = item.attr("data-normal");
            v = lk ? nv : bv;
            item.attr("data-value", v);
            item.html(v);
        });
        target.data('capslk', (!lk));
    }
    //执行tab键功能
    Keyboard.prototype.tab = function (target, e, input) {
        //this.trigger(input[0], 'KeyboardEvent', ['keydown', true, true, null, 0, 0, 0, 0, 9, String.fromCharCode(9)]);
        var ev = document.createEvent('KeyboardEvent');
        input.keydown(function (ev) {
            debugger;
        });
        ev.initKeyboardEvent('keydown', true, true, document.defaultView, 'A', 0, '', 0);
        input[0].dispatchEvent(ev);
    }
    //事件模拟
    Keyboard.prototype.trigger = function (element, eventType, args) {
        var ev = document.createEvent(eventType);
        ev.initEvent.apply(ev, args);
        element.dispatchEvent(ev);
    }
    //执行插件注册
    Keyboard.regist();
})(jQuery);
