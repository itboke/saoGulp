# saoGulp
This is a saoGulp

#####  事先说明 ######

1 : 代码写的很乱   不能理解的就不要理解了【开心很重要】;
2 ：完全可以完善代码 根据自己原则

#使用方法

1: 开发环境下 src/ less && html 目录下 如果出现以下划线开头_XX 的目录 将不会被构建到 build/ 下
   如果要在这两个目录/scr/less && /src/html 下建立目录 请务必以下划线开头 _xx

2: other目录 是存放 一般静态资源的其他资源如 音频 或者 flash (还没有扩展)

3: 当在开发环境时 初始化构建的时候 会清理一下build/html | js | img | css 的文件!  运行 gulp

4：当需要构建发布代码的时候  请运行 gulp --e test  OR  gulp --e www   输入错误代码 可能报错

5：发布代码中含有map 资源定位文件  已分 js \ css \img \ coreJS{核心JS工具是独立map.json}



