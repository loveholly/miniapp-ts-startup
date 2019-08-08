# miniapp ts startup

由于目前小程序官方已经支持`TypeScript`和`npm`，但是依然存在一些使用上的细节体验不好。本项目是小程序的一个`TypeScript`脚手架项目，主要是为了解决官方TS模板中`TypeScript`源码与编译之后的JS代码在同一个文件夹下的问题，这个会导致源码的管理不方便，即你没办法只把你的`TypeScript`源码交给`Git`来管理。
用这个脚手架项目之后，你只需要关注`src`目录下面的源代码即可，平时的编码工作就是如下几步：

1. 编写`TypeScript`代码
2. `npm run build`
3. `npm i`，如果有安装新的包
4. 使用微信开发者工具`构建npm`，如果引入了新的npm包

> 其他指令请参考根目录下面的`package.json`文件；

另外，需要保证根目录下面的`package.config.json`里面的`miniprogramRoot`字段需要与编译之后的目录名称保持一致，这样微信开发者工具才能正确识别你的小程序代码根目录在哪，并且会根据这个根目录去找`node_modules`目录。为了演示需要，我在该项目中默认安装了`dayjs`和`rxjs`两个库，不需要的可以自行删除。
