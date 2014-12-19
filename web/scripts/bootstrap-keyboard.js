/*******************************************************
* 名称：遵循Bootstrap相关ui规范的自定义WEB键盘工具
* 作者：Beven
* 描述：默认包含两个键盘即 完整键盘 与单纯的数字键盘 当然也可以自己扩展键盘
*********************************************************/
(function ($) {
    'use strict';
    
    //功能
    function WebKeyBoard(element, options) {
        this.Init(element, options);
    }
    //插件
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.keyboard')
            var options = typeof option == 'object' && option
            if (!data) $this.data('bs.keyboard', (data = new WebKeyBoard(this, options)))
            else {
                data.toggle();
                WebKeyBoard.DoFocus();
            }
        });
    }
    //版本
    WebKeyBoard.VERSION = "1.0.0";
    //默认配置
    WebKeyBoard.DEFAULTS = {
        keyboard: 'all', // 键盘类型：默认为基本键盘 值： all/digit/customer,
        mykeyboard: null,
        hover: null,
        top: null,
        left: null,
        parent: null
    }
    //当前活跃的输入框
    WebKeyBoard.Input = null;
    //配置数据
    WebKeyBoard.prototype.Options = null;
    //键盘容器
    WebKeyBoard.prototype.Container = null;
    //初始化功能
    WebKeyBoard.prototype.Init = function (element, options) {
        this.Options = $.extend({}, WebKeyBoard.DEFAULTS, options);
        var self = this;
        this.InitKeyBoard();
        $(document).on('mousedown.bs.keyboard', '.key', function (e) { self.OnSyncKeyClick(e); });
        $(document).on('mouseup.bs.keyboard', '.key', function (e) { WebKeyBoard.ClearElapse('syncinput'); });
        this.Container.find("[data-event=Backspace]").mousedown(function (e) { WebKeyBoard.Elapse('del', WebKeyBoard.Backspace, WebKeyBoard); e.stopPropagation() });
        this.Container.find("[data-event=Backspace]").mouseup(function (e) { WebKeyBoard.ClearElapse('del'); e.stopPropagation() });
        this.open();
        WebKeyBoard.DoFocus();
    }
    //是否有设置参数
    WebKeyBoard.prototype.HasOption = function (name) {
        var v = this.Options[name];
        return (v != null && v.replace(/\s/g, '') != '');
    }
    //初始化键盘面板
    WebKeyBoard.prototype.InitKeyBoard = function () {
        var options = this.Options;
        var html = '';
        switch (options.keyboard) {
            case 'custom':
                html = this.InitCustomKeyboard();
                break;
            case 'digit':
                html = this.InitDigitKeyboard();
                break;
            default:
                html = this.InitNormalKeyboard();
                break;
        }
        var c = this.Container = $('<div class="pos-bs-keyboard" style="display:none"></div>');
        var p = this.HasOption('parent')?$(options.parent):$(document.body);
        if (this.HasOption('hover')) {
            p.addClass("dialog");
            this.HasOption('top') && p.css("top", options.top + "px");
            this.HasOption('left') && p.css("left", options.top + "px");
        }
        c.html(html);
        p.append(c);
    }
    //初始化正常键盘
    WebKeyBoard.prototype.InitNormalKeyboard = function () {
        var keys = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '\\', '/', 1, 2, 3],
            ['Tab', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 4, 5, 6],
            ['大写锁定', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', ',', 7, 8, 9],
            ['收起键盘', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '00', '0', '.']
        ];
        var htmls = [];
        var key = null;
        htmls.push('<div class="pos-keyboard">');
        for (var i = 0, k = keys.length; i < k; i++) {
            htmls.push('<div class="row">');
            htmls.push('<div class="col-md-12">');
            for (var j = 0, kv = keys[i], n = kv.length; j < n; j++) {
                key = kv[j];
                htmls.push('<i class="key ' + this.GetKeyClass(key) + '" ' + this.GetUpperAttribute(key) + ' ' + this.GetDataEvent(key) + ' data-value="' + key + '">' + key + '</i>');
            }
            htmls.push('</div>');
            htmls.push('</div>');

        }
        htmls.push('<div class="pos-keyboard-right"><i class="key lg pos-orange block bd-family" data-event="Backspace">删除</i><i class="key lg pos-orange pos-enter bd-family">确定</i></div>');
        htmls.push('</div>');
        return htmls.join('\n');
    }
    //获取指定键的大写值属性
    WebKeyBoard.prototype.GetUpperAttribute = function (key) {
        if (/^[A-Za-z]+$/.test(key)) {
            return 'data-upper="' + key.toUpperCase() + '"';
        } else {
            return '';
        }
    }
    //获取指定键的事件
    WebKeyBoard.prototype.GetDataEvent = function (key) {
        if (key == 'Tab') {
            return 'data-event="tab"';
        }
        else if (key == '大写锁定') {
            return 'data-event="upper"';
        } else if (key == '收起键盘') {
            return 'data-event="close"';
        } else {
            return "";
        }
    }
    //获取指定键对应的样式
    WebKeyBoard.prototype.GetKeyClass = function (key) {
        if (!isNaN(key) || key == '.') {
            return 'lg pos-gray';
        } else if (/^[A-Za-z]+$/.test(key)) {
            return "lg pos-gray";
        }
        else if (key == 'Tab') {
            return 'lg pos-orange';
        }
        else if (key == '大写锁定') {
            return 'mlg pos-orange bd-family';
        } else if (key == '收起键盘') {
            return 'blg pos-orange bd-family';
        } else {
            return 'md pos-white';
        }
    }
    //初始化数字键盘
    WebKeyBoard.prototype.InitDigitKeyboard = function () {
        var htmls = [
            ''
        ];
        return htmls.join('\n');
    }
    //初始化用户自定义键盘
    WebKeyBoard.prototype.InitCustomKeyboard = function () {
        var options = this.Options;
        var s = options.mykeyboard;
        var html = '';
        if (typeof s == 'function') {
            html = $(s).html();
            $(e).remove();
        }
        return html;
    }
    //按键按下同步输入
    WebKeyBoard.prototype.OnSyncKeyClick = function (e) {
        var target = $(e.srcElement || e.target);
        var inp = WebKeyBoard.Input;
        if (!this.DispatchEvent(target)) {
            WebKeyBoard.DoFocus();
            return;
        }
        if (WebKeyBoard.CanInput(inp)) {
            var v = this.GetClickKeyKeyCode(target);
            if (v) {
                WebKeyBoard.Elapse('syncinput', this.SyncInput, this, [inp, v]);
            }
            WebKeyBoard.DoFocus();
        }
    }
    //设置指定表单指定值
    WebKeyBoard.prototype.SyncInput = function (inp, char) {
        inp.val(inp.val() + char);
    }
    //执行指定按钮事件
    WebKeyBoard.prototype.DispatchEvent = function (target) {
        var ev = target.attr("data-event");
        if (ev) {
            if (this[ev]) {
                return this[ev](target, WebKeyBoard.Input);
            }
        }
        return true;
    }
    //获取按下键的值
    WebKeyBoard.prototype.GetClickKeyKeyCode = function (target) {
        return target.attr("data-value");
    }
    //回退
    WebKeyBoard.prototype.Backspace = function (target, input) {
        WebKeyBoard.Backspace();
    }
    //切换键盘是否显示
    WebKeyBoard.prototype.toggle = function () {
        var c = this.Container;
        if (c) {
            c.toggle();
        }
    }
    //打开键盘
    WebKeyBoard.prototype.open = function () {
        var c = this.Container
        if (c) {
            c.show().addClass("fade").addClass("in");
        }
    }
    //关闭键盘
    WebKeyBoard.prototype.close = function () {
        if (this.Container) {
            this.Container.hide();
        }
    }
    //大写锁定
    WebKeyBoard.prototype.upper = function () {
        var elements = this.Container.find(".key[data-upper]");
        var self = this;
        elements.each(function () {
            var item = $(this);
            var v = self.GetClickKeyKeyCode(item);
            var bv = item.attr("data-upper]");
            if (v != item.attr("data-upper]")) {
                item.attr("data-normal", v);
                item.attr("data-value", bv);
            }
        });
    }
    //事件列表
    WebKeyBoard.prototype.Events = {}
    //支持
    WebKeyBoard.Support = function () {
        var old = $.fn.keyboard
        $.fn.keyboard = Plugin
        $.fn.keyboard.Constructor = WebKeyBoard
        $.fn.keyboard.noConflict = function () {
            $.fn.keyboard = old
            return this
        }
    }
    //重新聚焦表单
    WebKeyBoard.DoFocus = function () {
        WebKeyBoard.Input && WebKeyBoard.Input.focus();
    }
    //监听表单
    WebKeyBoard.ReadFocus = function (e) {
        var target = $(e.srcElement || e.target);
        if (!target.is('[data-toggle="keyboard"]')) {
            this.Input = target;
        }
    }
    //判断指定dom元素是否可以输入值
    WebKeyBoard.CanInput = function (inp) {
        return inp && inp.is("input,select,textarea") && inp.not("input[readonly],:button,:image,:hidden,:file,:submit,:reset,:radio,:checkbox,:disabled");
    }
    //回退
    WebKeyBoard.Backspace = function () {
        var input = this.Input;
        if (this.CanInput(input)) {
            var v = input.val();
            if (v.length > 0) {
                v = v.substring(0, v.length - 1);
            }
            input.val(v);
        }
    }
    //按一定事件指定指定函数
    WebKeyBoard.Elapse = function (name, fn, invoker, args) {
        WebKeyBoard.ClearElapse(name);
        fn.apply(invoker, args);
        WebKeyBoard[name] = setTimeout(function () {
            WebKeyBoard.ClearElapse(name);
            fn.apply(invoker, args);
            WebKeyBoard.Elapse(name, fn, invoker, args);
        }, 150);
    }
    //取消timeout
    WebKeyBoard.ClearElapse = function (name) {
        clearTimeout(WebKeyBoard[name]);
    }
    //初始化
    WebKeyBoard.Regist = function () {
        WebKeyBoard.Support();
        $(document).on("click.bs.keyboard.data-api", '[data-toggle="keyboard"]', function () {
            var target = $(this);
            var keyboard = target.attr("data-keyboard");
            var mykeyboard = target.attr("data-mykeyboard");
            var top = target.attr("data-top");
            var left = target.attr("data-left");
            var parent = target.attr("data-parent");
            var hover = target.attr("data-hover");
            Plugin.call(target, { keyboard: keyboard, mykeyboard: mykeyboard, hover: hover, top: top, left: left, parent: parent });
        })
        .on('click.bs.keyboard.data-api', '.pos-bs-keyboard', function (e) { WebKeyBoard.DoFocus(); e.stopPropagation() })
        .on('click', function (e) { WebKeyBoard.ReadFocus(e); });
    }
    //执行插件注册
    WebKeyBoard.Regist();
})(jQuery);