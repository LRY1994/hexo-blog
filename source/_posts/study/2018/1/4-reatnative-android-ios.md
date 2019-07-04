---
layout: post
title:  "reat-native在Android和IOS平台的区别"
date:   2018/1/30 
categories: 
    - 学习
    - 
tags:
    - 读书笔记
---

读《React-Native跨平台移动应用开发第2版》
![cover](/images/book/React-Native.jpg)
 
* 在Android平台上，TextInput组件可以按照字体大小来自动设置高度
IOS上必须要在样式上设置高度，否则不会显示
Solution: TextInput组件设置高度

* Iphone手机没有返回键，需要时iphone应用通常在屏幕左上角放置一个返回按钮

* 在Android上，Alert API实现的弹出选择框最多只能有三个选项。按下返回键会让弹出框消失，并且不会触发Alert API提供的回调函数。
IOS上，选项没有个数限制。选项上设置 style:’cancel’只对IOS有效，使选项排列到最下方

* overflow只对IOS有效
默认为hidden

* elevation:数值 只有android平台特有，产生组件浮现在手机屏幕上的视觉效果

* renderHarwareTextureAndroid,needsOffscreenAlphaCompositing  android特有，与动画效果有关
shouldRasterizeIOS   IOS特有，与动画效果有关

* accessibilityComponentType,accessibilityLiveRegion,importantForAccessibility为android特有
accessibilityTraits,onAccessibilityTap为IOS特有
accessible,accessibilityLabel为android和IOS共有

* IOS支持GIF和WebP格式
Android默认不支持这个两种格式，需要在android/app/build.gradle添加设置
RN本身还不支持SVG

* 苹果要求苹果移动应用开发者在应用中不能使用HTTP协议，转为使用HTTPS协议，所以在IOS工程中，使用的网络图片等资源必须是https。可以通过设置改变。

* resizeMode取值为repeat只对IOS有效

* tintColor 为IOS特有，可以让图片中的非透明像素部分有一种被染色的效果
overlayColor为android特有，强行将需要圆角的部分使用指定颜色填充，从而实现圆角效果

* TouchableNativeFeedback为android专用组件

* textAlign:justify只在IOS下有效，在Android下等价于left

* ios独有的样式
fontVariant,letterSpacing,writingDirection,textDecorationStyle,textDecorationColor，
adjustsFontSizeToFit,allowFontScaling,minimumFontScale,suppressHighlighting
android独有
includeFontPadding,selectionColor,textAlignVertical,textBreakStrategy
ellipizeMode:head/middle/tail只有IOS支持， android所有取值和clip一样。ellipizeMode需要和numberOfLines配合使用

* TextInput、Text组件设置borderWidth在android无效

* TextInput组件alignItems:’center’在IOS上无效

* IOS上TextInput组件没有设置height会不显示

* Ios支持keyboardWillHide，android不支持
